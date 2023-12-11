import { myCarts } from "./cart";
import { userId } from "./config";
import axios from "axios";

let usedCouponData = [];

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
let cartCoupons = [];
let chooseCoupon = {};
const usedCouponInitObj = {
  myCouponId: "",
  originPrice: "",
  courseId: "",
  type: "",
  title: "",
  discount: 0,
  minSpending: "",
  discountCourseNum: "",
  discountPrice: 0,
};
function couponInit() {
  // 已使用 coupon 的id、標題和價格
  usedCouponData = Array.from(
    { length: myCarts.length + 1 },
    () => usedCouponInitObj
  );
}

// 按下使用優惠券按鈕
useCouponBtn.addEventListener("click", (e) => {
  e.preventDefault();
  handleToUseCoupon();
});

// 付款時把使用的優惠券 canUse 改成 false
async function patchMyCoupon() {
  try {
    // 各課程的優惠券欄位跑迴圈
    for (const item of usedCouponData) {
      // 該課程有用到優惠券才需要呼叫 api
      if (item.myCouponId) {
        const usedUrl = `${_url}/myCoupons/${item.myCouponId}`;
        const patchData = {
          canUse: false,
        };
        await axios.patch(usedUrl, patchData, headers);
      }
    }
  } catch (error) {
    console.log("confirmToUseCoupon", error);
  }
}

// 取得 coupons
async function getCoupons() {
  try {
    // 取得 cartCoupons
    const userUrl = `${_url}/myCoupons?_expand=coupon&userId=${userId}&_sort=couponId&_order=asc`;
    const { data } = await axios.get(userUrl);

    if (data.length) {
      const couponUrls = data.map((item) => {
        return `${_url}/coupons/${item.couponId}?_expand=teacher&_expand=course`;
      });

      const responses = await Promise.all(
        couponUrls.map((couponUrl) => axios.get(couponUrl))
      );

      data.forEach((item, index) => {
        item.coupon = responses[index].data;
      });
    }

    myCoupons = data;

    // 確認有無過期
    checkDueDate();

    // console.log("cartCoupons", cartCoupons);
  } catch (error) {
    console.log("getCoupon", error);
  }
}

// 確認有無過期，過期的改為 canUse: false 不顯示
async function checkDueDate() {
  const expiredCoupons = [];
  // 標記過期優惠券
  myCoupons.forEach((coupon) => {
    let today = new Date().getTime();
    if (new Date(coupon.dueDate).getTime() < today) {
      coupon.canUse = false;
      expiredCoupons.push(coupon);
    }
  });

  // 如果有過期優惠券就發送 patch 請求
  if (expiredCoupons.length > 0) {
    await Promise.all(
      expiredCoupons.map(async (coupon) => {
        try {
          await axios.patch(
            `${_url}/myCoupons/${coupon.id}`,
            {
              canUse: false,
            },
            headers
          );
          // console.log("過期", coupon);
        } catch (error) {
          console.log("checkDueDate", error);
        }
      })
    );
    // 移除過期的優惠券
    myCoupons = myCoupons.filter((coupon) => coupon.canUse === true);
  }

  // 將 coupon 整理成想要的格式、並取得要顯示的優惠券
  getCartCouponsData();
}

// 取得、更新購物車課程的優惠券資訊
function getCartCouponsData() {
  // 先清空之前的資料
  cartCoupons = [];
  // 篩選出任何課程都能使用的優惠券
  myCoupons.forEach((coupon) => {
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
      cartCoupons.push(obj);
    }
  });
  // 篩選出在購物車的課程的優惠券
  myCarts.forEach((cart) => {
    myCoupons.forEach((coupon) => {
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
          cartCoupons.push(obj);
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
  const chooseCoupon = cartCoupons.filter(
    (item) => item.title === couponInput.value
  )[0];
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

function handleCouponDelBtn(index) {
  clearUsedCoupon(index);
  renderCoupon();
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
    // 使用的優惠券資訊：折扣、低銷、折抵課堂數
    const { minSpending, discountCourseNum, courseId, myCouponId } = coupon;

    // 判斷是否符合條件-低消
    if (minSpending <= originalTotalPrice) {
      // 找到指定課程優惠券是哪個欄位的
      if (courseId == cartCourseId) {
        // 判斷是否符合條件-購買課程數量
        if (discountCourseNum === "" || discountCourseNum <= courseNum.value) {
          // 更新特定課程優惠券的折價
          // updateUsedCoupon(index, coupon);
          coupon.discountPrice = calculateDiscountPrice(coupon);
        } else {
          clearUsedCoupon(index);
        }
      }
      // 若是有使用全課程優惠券
      else if (index == usedCouponData.length - 1 && myCouponId !== "") {
        // 更新全優惠券的折價
        coupon.discountPrice = calculateDiscountPrice(coupon);
      } else {
        clearUsedCoupon(index);
      }
    } else {
      clearUsedCoupon(index);
    }
  });
  renderCoupon();
}

// 將該欄位的優惠券資訊清空
function clearUsedCoupon(index) {
  usedCouponData[index].type = "";
  usedCouponData[index].originPrice = 0;
  usedCouponData[index].discountPrice = 0;
  usedCouponData[index].title = "";
  usedCouponData[index].myCouponId = "";
  usedCouponData[index].courseId = "";
  usedCouponData[index].discount = "";
  usedCouponData[index].minSpending = 0; // 總消費低消
  usedCouponData[index].discountCourseNum = 0; // 最低購買量
}

// 寫入使用優惠券資訊
function updateUsedCoupon(index, coupon) {
  usedCouponData[index] = {
    ...coupon,
    discountPrice: calculateDiscountPrice(coupon),
  };
  // console.log("usedCouponData", usedCouponData);
  renderCoupon();
}

// 使用優惠券的折抵金額計算
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

// 刪除購買項目課程時將優惠券欄位刪除
function delUsedCoupon(courseId) {
  // 刪除使用的優惠券
  usedCouponData = usedCouponData.filter(
    (coupon) => coupon.courseId != courseId
  );
}

// 當從下次購買 移置 購買項目
function addEmptyUsedCoupon() {
  if (usedCouponData.length >= 2) {
    // 從下次購買移置購買項目的課程優惠券 index
    lastTwoIndex = usedCouponData.length - 2;
    // 在全課程優惠券前增加空 obj 以記錄移置購買項目課程的優惠券
    usedCouponData.splice(lastTwoIndex, 0, usedCouponInitObj);
  }
  renderCoupon();
}

/***** 渲染 *****/

// 渲染優惠券選項
function renderCouponOption() {
  const couponOption = document.querySelector("#couponOption");
  let couponOptionHtml = "";
  if (cartCoupons.length) {
    cartCoupons.forEach((myCoupon) => {
      couponOptionHtml += `<option value="${myCoupon.title}"></option>`;
    });
  }
  couponOption.innerHTML = couponOptionHtml;
}

// 渲染使用的優惠券、渲染優惠券折扣
function renderCoupon() {
  updateCourseDiscount(); // 渲染、計算指定課程優惠券全部折扣
  updateWebDiscount(); // 渲染全課程優惠券折扣
  renderUsedCoupon(); // 渲染使用的優惠券
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
    if (usedCouponData[index].myCouponId === "") {
      div.innerHTML = "";
    } else {
      div.innerHTML = `<button type="button" class="btn btn-close fs-sm js-delCoupon" onclick="handleCouponDelBtn(${index})"></button>
      <p>
        已套用 <span class="fw-bold text-secondary2">${usedCouponData[index].title}</span
        ><i class="fa-solid fa-arrow-right mx-1"></i
        ><span class="fw-bold text-primary">折價 <span class="js-usedCouponDiscount">${usedCouponData[index].discountPrice}</span> 元</span>
      </p>`;
    }
  });
}

export {
  couponInit,
  getCartCouponsData,
  getCoupons,
  delUsedCoupon,
  renderCoupon,
  confirmToUseCoupon,
};
