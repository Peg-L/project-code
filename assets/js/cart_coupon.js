const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const apiUrl = "http://localhost:3000";

// 取得 已套用優惠文字的父元素
const usedCoupons = document.querySelectorAll(".js-usedCoupon");
// 取得 已套用優惠的 X 按鈕
const delCouponBtns = document.querySelectorAll(".js-delCoupon");
// 取得 使用優惠券input
const couponInput = document.querySelector("#coupon");
// 取得 使用優惠券按鈕
const useCouponBtn = document.querySelector(".js-useCouponBtn");
// 取得 每堂課價格
const originalCoursePrice = document.querySelectorAll(".OriginalCoursePrice");
// 取得 付款按鈕
const payBtns = document.querySelectorAll(".js-payBtn");

let cartCourseId = [1, 3]; // 假設的
let myCoupons = [];
let couponDiscount;
// 已使用 coupon 的id、標題和價格
let usedCouponArray = Array.from({ length: usedCoupons.length }, () => ({
  myCouponId: "",
  title: "",
  price: 0,
}));

getCoupons();

// 按下使用優惠券按鈕
useCouponBtn.addEventListener("click", (e) => {
  e.preventDefault();
  handleUsedCoupon();
});

// 按下付款按鈕-紀錄使用的優惠券
payBtns.forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    await confirmToUseCoupon();
    location.href = "cart2.html";
  });
});

// 付款時把使用的優惠券 canUse 改成 false
async function confirmToUseCoupon() {
  try {
    // 各課程的優惠券欄位跑迴圈
    for (const item of usedCouponArray) {
      // 該課程有用到優惠券才需要呼叫 api
      if (item.myCouponId) {
        const usedUrl = `${apiUrl}/myCoupons/${item.myCouponId}`;
        await axios.patch(
          usedUrl,
          {
            canUse: false,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
    }
  } catch (error) {
    console.log("confirmToUseCoupon", error);
  }
}

// 刪除使用的優惠券
usedCoupons.forEach((item, index) => {
  item.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-close")) {
      usedCoupons[index].innerHTML = "";
      // 紀錄已使用的優惠券資訊
      usedCouponArray[index].price = 0;
      usedCouponArray[index].title = "";
      usedCouponArray[index].myCouponId = "";
      console.log(usedCouponArray);

      // 渲染 全站折扣
      document.querySelector("#WebDiscount").innerHTML =
        usedCouponArray[usedCouponArray.length - 1].price;
    }
  });
});

// 取得 coupons
async function getCoupons() {
  let userId = 1; // 假設的
  try {
    const userUrl = `${apiUrl}/myCoupons?_expand=coupon&userId=${userId}&_sort=couponId&_order=asc`;
    const { data } = await axios.get(userUrl);
    for (item of data) {
      const couponUrl = `${apiUrl}/coupons/${item.couponId}?_expand=teacher`;
      const res = await axios.get(couponUrl);
      item.coupon = res.data;
    }
    myCoupons = data;
    checkDueDate();
    console.log("myCoupon", myCoupons);
  } catch (error) {
    console.log("getCoupon", error);
  }
}

// 確認有無過期，過期的改為 canUse: false 不顯示
async function checkDueDate() {
  let today = new Date().getTime();
  for (const coupon of myCoupons) {
    try {
      if (new Date(coupon.dueDate).getTime() < today) {
        coupon.canUse = false;
        await axios.patch(
          `${apiUrl}/myCoupons/${coupon.id}`,
          {
            canUse: false,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("過期", coupon);
      }
      renderCouponOption();
    } catch (error) {
      console.log("checkDueDate", error);
    }
  }
}

// 使用優惠券
function handleUsedCoupon() {
  // 輸入的優惠券
  const couponValue = couponInput.value;
  // couponsIndex：輸入的 coupon 在 myCoupons 的 index。
  // usedCouponIndex：輸入的 coupon 要放在購物車的哪個位置
  const { couponsIndex, usedCouponIndex } = findCouponIndex(couponValue);
  // 要購買的課程數量
  const courseNum = document.querySelectorAll("input[name='count']");
  // 取得總金額(已去掉 , )
  const originalTotalPrice = document
    .querySelector("#OriginalPrice")
    .textContent.replace(",", "");

  // 有此優惠券並可使用
  if (usedCouponIndex !== null) {
    Toast.fire({
      icon: "success",
      title: "已使用優惠券",
    });

    // 輸入的優惠券資訊：折扣、低銷、折抵課堂數
    let { discount, minSpending, discountCourseNum } =
      myCoupons[couponsIndex].coupon;

    // 折抵金額計算
    let discountPrice = calculateDiscountPrice(
      usedCouponIndex,
      originalTotalPrice,
      discount,
      discountCourseNum
    );
    // 判斷是否符合條件-低銷
    if (minSpending <= originalTotalPrice) {
      // 判斷是否符合條件-購買課程數量
      if (
        discountCourseNum === "" ||
        discountCourseNum <= courseNum[usedCouponIndex].value
      ) {
        // 若該課程還沒使用優惠券
        if (!usedCoupons[usedCouponIndex].innerHTML) {
          //將輸入優惠券的 input 清空
          couponInput.value = "";
          // 紀錄已使用的優惠券資訊
          usedCouponArray[usedCouponIndex].price = discountPrice;
          usedCouponArray[usedCouponIndex].title = couponValue;
          usedCouponArray[usedCouponIndex].myCouponId =
            myCoupons[couponsIndex].id;
          console.log(usedCouponArray);
          // 若使用"全"課程優惠券的折價
          if (usedCouponIndex === cartCourseId.length) {
            updateWebDiscount();
          } else {
            // 若使用"單"課程優惠券的折價
            updateCourseDiscount();
          }
          // 渲染使用的優惠券
          renderUsedCoupon(usedCouponIndex, couponValue, discountPrice);
        } else {
          Swal.fire({
            icon: "error",
            title: "每個課程只能使用一張優惠券",
          });
          console.log("每個課程只能使用一張優惠券");
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "未符合使用條件",
          text: `須購買指定課程達 ${discountCourseNum} 堂課`,
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "未符合使用條件",
        text: `折價前的消費總額須達 NT$ ${minSpending}`,
      });
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "沒有匹配的優惠券",
    });
  }
}

// 獲得 輸入的 coupon 在 myCoupons 和購物車的 index
function findCouponIndex(couponValue) {
  for (let i = 0; i < myCoupons.length; i++) {
    // 比對可用的 coupon 和輸入的 coupon
    if (myCoupons[i].coupon.title === couponValue) {
      // usedCouponIndex 代表輸入的 coupon 要放在購物車的哪個位置
      const usedCouponIndex = myCoupons[i].coupon.courseId
        ? cartCourseId.indexOf(myCoupons[i].coupon.courseId) // 真值：代表"單"課程優惠券，並找出第幾個課程
        : cartCourseId.length; // 假值：代表"全"課程優惠券，由於 length - 1 是最後一個課程的位置，因此將全課程優惠的 index 設為 length (最後一個課程的下一個)

      // couponsIndex：輸入的 coupon 在 myCoupons 的 index。
      // usedCouponIndex：輸入的 coupon 要放在購物車的哪個位置
      return { couponsIndex: i, usedCouponIndex };
    }
  }
  return { couponsIndex: null, usedCouponIndex: null };
}

//折抵金額計算
function calculateDiscountPrice(usedCouponIndex, price, discount, num) {
  // 使用全部課程優惠券的折價
  if (usedCouponIndex === cartCourseId.length) {
    return Math.round(Number(price) * (1 - Number(discount)));
  } else {
    // 使用課程優惠券的折價
    return Math.round(
      Number(
        originalCoursePrice[usedCouponIndex].textContent.replace(",", "")
      ) *
        (1 - Number(discount)) *
        num
    );
  }
}

// 渲染優惠券選項
function renderCouponOption() {
  const couponOption = document.querySelector("#couponOption");
  let couponOptionHtml = "";

  // 只顯示在購物車的課程的優惠券
  myCoupons = myCoupons.filter((myCoupon) => {
    if (myCoupon.canUse === true) {
      return cartCourseId.some(
        (courseId) =>
          myCoupon.coupon.courseId == courseId ||
          myCoupon.coupon.type === "allCourse"
      );
    }
  });
  if (myCoupons.length) {
    myCoupons.forEach((myCoupon) => {
      couponOptionHtml += `<option value="${myCoupon.coupon.title}"></option>`;
    });
  }
  couponOption.innerHTML = couponOptionHtml;
}

// 渲染 全站折扣
function updateWebDiscount() {
  document.querySelector("#WebDiscount").innerHTML =
    usedCouponArray[usedCouponArray.length - 1].price;
}

// 渲染 計算課程全部折扣
function updateCourseDiscount() {
  const courseDiscount = usedCouponArray.reduce((acc, cur, index, array) => {
    return index < array.length - 1 ? acc + cur.price : acc;
  }, 0);
  document.querySelector("#CourseDiscount").innerHTML = courseDiscount;
}

// 渲染 已使用的優惠券
function renderUsedCoupon(usedCouponIndex, couponValue, discountPrice) {
  usedCoupons[
    usedCouponIndex
  ].innerHTML = `<button type="button" class="btn btn-close fs-sm js-delCoupon"></button>
  <p>
    已套用 <span class="fw-bold text-secondary2">${couponValue}</span
    ><i class="fa-solid fa-arrow-right mx-1"></i
    ><span class="fw-bold text-primary">折價 <span class="js-usedCouponDiscount">${discountPrice}</span> 元</span>
  </p>`;
}
