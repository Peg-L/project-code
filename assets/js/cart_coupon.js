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

// 取得 已套用優惠的 X 按鈕
const delCouponBtns = document.querySelectorAll(".js-delCoupon");
// 取得 使用優惠券input
const couponInput = document.querySelector("#coupon");
// 取得 使用優惠券按鈕
const useCouponBtn = document.querySelector(".js-useCouponBtn");
// 取得 每堂課價格
const originalCoursePrice = document.querySelectorAll(".OriginalCoursePrice");

let myCoupons = [];
let usedCouponData = [];
let chooseCoupon = {};
function couponInit() {
  // 已使用 coupon 的id、標題和價格
  usedCouponData = Array.from({ length: myCarts.length + 1 }, () => ({
    myCouponId: "",
    originPrice: "",
    courseId: "",
    type: "",
    title: "",
    discount: 0,
    minSpending: "",
    discountCourseNum: "",
    discountPrice: 0,
  }));
}

// 按下使用優惠券按鈕
useCouponBtn.addEventListener("click", (e) => {
  e.preventDefault();
  handleToUseCoupon();
});

// 付款時把使用的優惠券 canUse 改成 false
async function confirmToUseCoupon() {
  try {
    // 各課程的優惠券欄位跑迴圈
    for (const item of usedCouponData) {
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

// 取得 coupons
async function getCoupons() {
  try {
    // 取得 myCoupons
    const userUrl = `${apiUrl}/myCoupons?_expand=coupon&userId=${userId}&_sort=couponId&_order=asc`;
    const { data } = await axios.get(userUrl);
    if (data.length) {
      for (item of data) {
        const couponUrl = `${apiUrl}/coupons/${item.couponId}?_expand=teacher&_expand=course`;
        const res = await axios.get(couponUrl);
        item.coupon = res.data;
      }
    }
    // 確認有無過期
    checkDueDate(data);
    console.log("coupon", data);
    console.log("myCoupons", myCoupons);
  } catch (error) {
    console.log("getCoupon", error);
  }
}

// 確認有無過期，過期的改為 canUse: false 不顯示
async function checkDueDate(data) {
  let today = new Date().getTime();
  for (const coupon of data) {
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

        data = data.filter((coupon) => coupon.canUse === true);
      }
    } catch (error) {
      console.log("checkDueDate", error);
    }
  }
  // 將 coupon 整理成想要的格式
  handleCouponData(data);
}

function handleCouponData(data) {
  // 先清空之前的資料
  myCoupons = [];
  // 篩選出任何課程都能使用的優惠券
  let couponArr = data.forEach((coupon) => {
    if (coupon.coupon.type === "allCourse") {
      const {
        courseId,
        type,
        title,
        minSpending,
        discountCourseNum,
        discount,
      } = coupon.coupon;
      const obj = {
        myCouponId: coupon.id,
        originPrice: null,
        courseId,
        type,
        title,
        discount,
        minSpending,
        discountCourseNum,
      };
      myCoupons.push(obj);
    }
  });
  // 篩選出在購物車的課程的優惠券
  myCarts.forEach((cart) => {
    let couponArr = data.forEach((coupon) => {
      if (coupon.coupon.type === "course") {
        const {
          courseId,
          type,
          title,
          discount,
          minSpending,
          discountCourseNum,
        } = coupon.coupon;
        const { price } = coupon.coupon.course;
        if (courseId == cart.courseId) {
          const obj = {
            myCouponId: coupon.id,
            originPrice: price,
            courseId,
            type,
            title,
            discount,
            minSpending,
            discountCourseNum,
          };
          myCoupons.push(obj);
        }
      }
    });
  });
  // 渲染優惠券選項
  renderCouponOption();
}

// 使用優惠券
function handleToUseCoupon() {
  // 取出輸入的優惠券資訊
  const chooseCoupon = myCoupons.filter(
    (item) => item.title === couponInput.value
  )[0];
  console.log("chooseCoupon", chooseCoupon);
  // 有此優惠券並可使用
  if (chooseCoupon !== undefined) {
    // 取得總金額(已去掉 , )
    const originalTotalPrice = document
      .querySelector("#OriginalPrice")
      .textContent.replace(",", "");
    // 購物商品的 li
    const listItem = document.querySelectorAll("li[data-course]");
    // 輸入的優惠券資訊：折扣、低銷、折抵課堂數
    const { minSpending, discountCourseNum, courseId } = chooseCoupon;
    // 是否是特定課程優惠券

    Toast.fire({
      icon: "success",
      title: "已使用優惠券",
    });

    // 判斷是否符合條件-低消
    if (minSpending <= originalTotalPrice) {
      //  若是指定課程優惠券
      if (chooseCoupon.type === "course") {
        listItem.forEach((li, cartIndex) => {
          const cartCourseId = li.dataset.course;

          // 找到指定課程優惠券是哪個欄位的
          if (courseId == cartCourseId) {
            // 要購買的課程數量
            const courseNum = li.querySelector("input[name='count']");
            // 判斷是否符合條件-購買課程數量
            if (
              discountCourseNum === "" ||
              discountCourseNum <= courseNum.value
            ) {
              // 若該課程還沒使用優惠券
              if (usedCouponData[cartIndex].myCouponId == "") {
                //將輸入優惠券的 input 清空
                couponInput.value = "";
                // 紀錄已使用的優惠券資訊
                updateUsedCoupon(cartIndex, chooseCoupon);
              } else {
                Swal.fire({
                  icon: "error",
                  title: "每個課程只能使用一張優惠券",
                });
              }
            } else {
              Swal.fire({
                icon: "error",
                title: "未符合使用條件",
                text: `須購買指定課程達 ${discountCourseNum} 堂課`,
              });
            }
          }
        });
      } else {
        const lastIndex = usedCouponData.length - 1;
        // 若該課程還沒使用優惠券
        if (usedCouponData[lastIndex].myCouponId == "") {
          //將輸入優惠券的 input 清空
          couponInput.value = "";
          // 紀錄已使用的優惠券資訊
          updateUsedCoupon(lastIndex, chooseCoupon);
        } else {
          Swal.fire({
            icon: "error",
            title: "每個課程只能使用一張優惠券",
          });
        }
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

// 重新確認優惠券資格
function reCheckCoupon(listItem) {
  // 取得總金額(已去掉 , )
  const originalTotalPrice = document
    .querySelector("#OriginalPrice")
    .textContent.replace(",", "");
  const cartCourseId = listItem.dataset.course;
  // 要購買的課程數量
  const courseNum = listItem.querySelector("input[name='count']");

  usedCouponData.forEach((coupon, index) => {
    // 輸入的優惠券資訊：折扣、低銷、折抵課堂數
    const { minSpending, discountCourseNum, courseId, myCouponId } = coupon;

    // 判斷是否符合條件-低消
    if (minSpending <= originalTotalPrice) {
      // 找到指定課程優惠券是哪個欄位的
      if (courseId == cartCourseId) {
        // 判斷是否符合條件-購買課程數量
        if (discountCourseNum === "" || discountCourseNum <= courseNum.value) {
          // 紀錄已使用的優惠券資訊
          updateUsedCoupon(index, coupon);
        } else {
          clearUsedCoupon(index);
        }
      }
      // 若是有使用全課程優惠券
      else if (index == usedCouponData.length - 1 && myCouponId !== "") {
        // 紀錄已使用的優惠券資訊
        updateUsedCoupon(index, coupon);
      } else {
        clearUsedCoupon(index);
      }
    } else {
      clearUsedCoupon(index);
    }
  });
}

// 將該欄位的優惠券清空
function clearUsedCoupon(index) {
  // 將該欄位的優惠券資訊清空
  usedCouponData[index].type = "";
  usedCouponData[index].originPrice = 0;
  usedCouponData[index].discountPrice = 0;
  usedCouponData[index].title = "";
  usedCouponData[index].myCouponId = "";
  usedCouponData[index].courseId = "";
  usedCouponData[index].discount = "";
  usedCouponData[index].minSpending = 0; // 總消費低消
  usedCouponData[index].discountCourseNum = 0; // 最低購買量
  console.log(usedCouponData);

  renderCoupon();
}

// 寫入使用優惠券資訊
function updateUsedCoupon(index, coupon) {
  usedCouponData[index] = {
    ...coupon,
    discountPrice: calculateDiscountPrice(coupon),
  };
  console.log(usedCouponData);
  renderCoupon();
}

//折抵金額計算
function calculateDiscountPrice(coupon) {
  const { type, originPrice, discount, discountCourseNum } = coupon;
  // 使用指定課程優惠券的折價
  if (type === "course") {
    return Math.round(
      Number(originPrice) * (1 - Number(discount)) * Number(discountCourseNum)
    );
  }
  // 使用全部課程優惠券的折價
  else {
    // 取得總金額(已去掉 , )
    const originPrice = document
      .querySelector("#OriginalPrice")
      .textContent.replace(",", "");
    return Math.round(Number(originPrice) * (1 - Number(discount)));
  }
}

// 將該欄位刪除時，要讓該課程的優惠券不顯示
function delUsedCoupon(courseId) {
  usedCouponData = usedCouponData.filter((item) => item.courseId != courseId);
  myCoupons = myCoupons.filter((item) => item.courseId != courseId);
  console.log(usedCouponData);

  renderCoupon();
}

// 渲染優惠券選項
function renderCouponOption() {
  const couponOption = document.querySelector("#couponOption");
  let couponOptionHtml = "";
  if (myCoupons.length) {
    myCoupons.forEach((myCoupon) => {
      couponOptionHtml += `<option value="${myCoupon.title}"></option>`;
    });
  }
  couponOption.innerHTML = couponOptionHtml;
}

// 渲染使用的優惠券、渲染優惠券折扣
function renderCoupon() {
  // 渲染、計算指定課程優惠券全部折扣
  updateCourseDiscount();
  // 渲染全課程優惠券折扣
  updateWebDiscount();
  // 渲染使用的優惠券
  renderUsedCoupon();
  // 計算價格
  CalculateToTalSum();
}

// 渲染 全站折扣
function updateWebDiscount() {
  document.querySelector("#WebDiscount").innerHTML =
    usedCouponData[usedCouponData.length - 1].discountPrice;
}

// 渲染 計算課程全部折扣
function updateCourseDiscount() {
  const courseDiscount = usedCouponData.reduce((acc, cur, index) => {
    return index < usedCouponData.length - 1 ? acc + cur.discountPrice : acc;
  }, 0);
  document.querySelector("#CourseDiscount").innerHTML = courseDiscount;
}

// 渲染 已使用的優惠券
function renderUsedCoupon() {
  const usedCoupons = document.querySelectorAll(".js-usedCoupon");
  usedCoupons.forEach((div, index) => {
    if (usedCouponData[index].myCouponId !== "") {
      div.innerHTML = `<button type="button" class="btn btn-close fs-sm js-delCoupon" onclick="clearUsedCoupon(${index})"></button>
      <p>
        已套用 <span class="fw-bold text-secondary2">${usedCouponData[index].title}</span
        ><i class="fa-solid fa-arrow-right mx-1"></i
        ><span class="fw-bold text-primary">折價 <span class="js-usedCouponDiscount">${usedCouponData[index].discountPrice}</span> 元</span>
      </p>`;
    } else {
      div.innerHTML = "";
    }
  });
}
