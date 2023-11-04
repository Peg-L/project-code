//優惠券
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

// 取得 已套用優惠文字的父元素
const usedCoupons = document.querySelectorAll(".js-usedCoupon");
// 取得 已套用優惠的 X 按鈕
const delCouponBtns = document.querySelectorAll(".js-delCoupon");
// 取得 使用優惠券input
const couponInput = document.querySelector("#coupon");
// 取得 使用優惠券按鈕
const useCouponBtn = document.querySelector(".js-useCouponBtn");
// 取得每堂課價格
const originalCoursePrice = document.querySelectorAll(".OriginalCoursePrice");

let cartCourseId = [1, 3]; // 假設的
let userCouponId = [];
let coupons = [];
let couponDiscount;
// 已使用 coupon 的標題和價格
let usedCouponArray = Array.from({ length: usedCoupons.length }, () => ({
  title: "",
  price: 0,
}));

const apiUrl = "http://localhost:3000";
getCouponId();

// 按下使用優惠券按鈕
useCouponBtn.addEventListener("click", (e) => {
  e.preventDefault();
  handleUsedCoupon();
});

usedCoupons.forEach((item, index) => {
  item.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-close")) {
      usedCoupons[index].innerHTML = "";
      // 紀錄已使用的優惠券資訊
      usedCouponArray[index].price = 0;
      usedCouponArray[index].title = "";

      // 渲染 全站折扣
      document.querySelector("#WebDiscount").innerHTML =
        usedCouponArray[usedCouponArray.length - 1].price;
    }
  });
});

async function getCouponId() {
  let userId = 1; // 假設的
  try {
    const userUrl = `${apiUrl}/users?id=${userId}`;
    const { data } = await axios.get(userUrl);
    userCouponId = data[0].couponList;
    console.log("CouponIdArray", userCouponId);

    getCoupons();
  } catch (error) {
    console.log("getCouponId", error);
  }
}

// 取得 coupons
async function getCoupons() {
  try {
    let userCouponIdUrl = userCouponId
      .map((item) => (item = `id=${item}`))
      .join("&");

    const couponUrl = `${apiUrl}/coupons?${userCouponIdUrl}`;
    const { data } = await axios.get(couponUrl);
    coupons = data;
    renderCouponOption();
  } catch (error) {
    console.log("getCoupons", error);
  }
}

function renderCouponOption() {
  const couponOption = document.querySelector("#couponOption");
  let couponOptionHtml = "";

  // 只顯示在購物車的課程的優惠券
  coupons = coupons.filter((coupon) => {
    if (coupon.is_enabled === true) {
      return cartCourseId.some(
        (courseId) => coupon.courseId == courseId || coupon.type === "allCourse"
      );
    }
  });
  console.log(coupons);
  if (coupons.length) {
    coupons.forEach((coupon) => {
      couponOptionHtml += `<option value="${coupon.title}"></option>`;
    });
  }
  couponOption.innerHTML = couponOptionHtml;
}

function handleUsedCoupon() {
  const couponValue = couponInput.value;
  const { couponsIndex, usedCouponIndex } = findCouponIndex(couponValue);
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

    let { discount, minSpending, discountCourseNum } = coupons[couponsIndex];

    let discountPrice = calculateDiscountPrice(
      usedCouponIndex,
      originalTotalPrice,
      discount,
      discountCourseNum
    );
    // 判斷是否符合條件-低消
    if (minSpending <= originalTotalPrice) {
      // 判斷是否符合條件-課程數量
      if (
        discountCourseNum === "" ||
        discountCourseNum <= courseNum[usedCouponIndex].value
      ) {
        // 該課程還沒使用優惠券
        if (!usedCoupons[usedCouponIndex].innerHTML) {
          //將輸入優惠券的 input 清空
          couponInput.value = "";
          // 紀錄已使用的優惠券資訊
          usedCouponArray[usedCouponIndex].price = discountPrice;
          usedCouponArray[usedCouponIndex].title = couponValue;
          console.log(usedCouponArray);
          // 使用全部課程優惠券的折價
          if (usedCouponIndex === cartCourseId.length) {
            updateWebDiscount();
          } else {
            updateCourseDiscount();
          }
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

function findCouponIndex(couponValue) {
  for (let i = 0; i < coupons.length; i++) {
    // 比對可用的 coupon 和輸入的 coupon
    if (coupons[i].title === couponValue) {
      const usedCouponIndex = coupons[i].courseId
        ? // 獲得輸入的 coupon 是在購物車中第幾個課程
          cartCourseId.indexOf(coupons[i].courseId)
        : // 若輸入的 coupon 是全課程優惠券，由於 length - 1 是最後一個課程的位置，因此將全課程優惠的 index 設為 length
          cartCourseId.length;
      return { couponsIndex: i, usedCouponIndex };
    }
  }
  return { couponsIndex: null, usedCouponIndex: null };
}
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
