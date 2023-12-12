/***** 渲染 *****/
import { myCarts, nextPurchaseCarts, dateReg, separatorReg } from "./cart";
import { useCouponBtn, cartCoupons, usedCouponData } from "./coupon";

const cartList = document.querySelector(".js-cartList");
const nextCartList = document.querySelector(".js-nextCartList");

/***** 購物車 *****/

// 渲染購物項目
function renderCart() {
  let cartHtml = "";

  myCarts.length
    ? myCarts.forEach((cart, index) => {
        cartHtml += `
          <li data-course="${cart.courseId}">
            <div
              class="shadow rounded-2 p-4 pb-md-4 pt-md-6 px-md-8 mb-1 mb-md-2"
            >
              <h3 class="fs-5 fs-md-4 fw-bold mb-4 mb-md-6 text-secondary2">
                ${cart.course?.name}
              </h3>
              <div class="row justify-content-between">
                <!-- 老師區塊 -->
                <div
                  class="col-4 col-sm-3 d-flex flex-column align-items-start"
                >
                  <div class="text-center">
                    <div>
                      <img
                        class="img-fluid rounded-circle mb-2"
                        src="${cart.course?.teacher?.avatar}"
                        alt="teacher"
                        width="90px"
                        height="90px"
                      />
                    </div>
                    <h5 class="fs-7 fs-md-6">
                      ${cart.course?.teacher?.name}
                    </h5>
                  </div>
                </div>
  
                <div class="col-8 col-sm-9 order">
                  <!-- 堂數 -->
                  <form class="mb-3 mb-md-5" action="#">
                    <div
                      class="d-flex flex-wrap align-items-center column-gap-8 row-gap-3"
                    >
                      <label for="hour${index}"
                        >單堂時長 (分鐘)
                        <select
                          class="form-select border-primary fw-bold mt-2 py-1 py-sm-2 w-150px"
                          name="hour"
                          id="hour${index}"
                          disabled
                        >
                          <option value="${cart.course?.duration}" selected>
                            ${cart.course?.duration}
                          </option>
                        </select>
                      </label>
  
                      <label class="w-150px" for="count${index}"
                        >堂數 (堂)
                        <div class="input-group w-fit mt-2">
                          <button
                            type="button"
                            class="btn btn-outline-primary rounded-start-2 border-2 py-0 fw-bold fs-4 w-45px js-decrement"
                          >
                            -
                          </button>
                          <input
                            class="form-control border-primary fw-bold text-center py-1 py-sm-2"
                            type="text"
                            name="count"
                            id="count${index}"
                            value="${cart.quantity}"
                            inputmode="numeric"
                          />
                          <button
                            type="button"
                            class="btn btn-outline-primary rounded-end-2 border-2 py-0 fw-bold fs-4 w-45px js-increment"
                          >
                            +
                          </button>
                        </div>
                      </label>
                    </div>
                  </form>
  
                  <!-- 價格 -->
                  <div class="d-flex justify-content-between mb-3">
                    <div class="d-flex gap-3">
                      <h4 class="fs-5 fs-md-4 fw-bold">
                        NT$
                        <span class="OriginalCoursePrice">
                        ${cart.course?.price //數字三位一撇
                          .toString()
                          .replace(separatorReg, ",")}
                        </span>
                      </h4>
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-end gap-4">
                  <p class="fs-sm fs-md-7">
                    預約截止日
                    <time datetime="${cart.dueDate}">
                    ${cart.dueDate}</time
                    >
                  </p>
                  <a
                    class="text-decoration-underline js-nextPurchaseBtn"
                    role="button"
                    href="#"
                    >下次再買</a
                  >
                  <a
                    class="text-decoration-underline delete-order"
                    role="button"
                    href="#"
                    >刪除</a
                  >
                </div>
              </div>
            </div>
          <div class="d-flex align-items-center js-usedCoupon"></div>
        </li>`;
      })
    : (cartHtml = `
      <div class="d-flex flex-column align-items-center text-center h-100 px-10 pt-10 mb-4">
        <p class="fs-4 mb-10">購物車內沒有商品</p>
        <a href="./course.html"
          class="btn btn-secondary2 rounded-2 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
        >
          繼續選購
        </a>
      </div>
      `);
  cartList.innerHTML = cartHtml;
  checkDisabled();
}

// 空購物車時按鈕要加上 disabled
function checkDisabled() {
  const payment = document.querySelector("#payWay");
  if (myCarts.length) {
    payment.querySelectorAll("button").forEach((item) => {
      item.disabled = false;
    });
    useCouponBtn.disabled = false;
  } else {
    payment.querySelectorAll("button").forEach((item) => {
      item.disabled = true;
    });
    useCouponBtn.disabled = true;
  }
}

// 渲染下次再買
function renderNextPurchaseCart() {
  let cartHtml = "";

  nextPurchaseCarts.length
    ? nextPurchaseCarts.forEach((cart, index) => {
        cartHtml += `
      <li data-course="${cart.courseId}">
              <div
                class="shadow rounded-2 p-4 pb-md-4 pt-md-6 px-md-8 mb-1 mb-md-2"
              >
                <h3 class="fs-5 fs-md-4 fw-bold mb-4 mb-md-6 text-secondary2">
                  ${cart.course?.name}
                </h3>
                <div class="row justify-content-between">
                  <!-- 老師區塊 -->
                  <div
                    class="col-4 col-sm-3 d-flex flex-column align-items-start"
                  >
                    <div class="text-center">
                      <div>
                        <img
                          class="img-fluid rounded-circle mb-2"
                          src="${cart.course?.teacher?.avatar}"
                          alt="teacher"
                          width="90px"
                          height="90px"
                        />
                      </div>
                      <h5 class="fs-7 fs-md-6">${
                        cart.course?.teacher?.name
                      }</h5>
                    </div>
                  </div>
  
                  <div class="col-8 col-sm-9">
                    <!-- 堂數 -->
                    <form class="mb-3 mb-md-5" action="#">
                      <div
                        class="d-flex flex-wrap align-items-center column-gap-8 row-gap-3"
                      >
                        <label for="nextHour${index}"
                          >單堂時長 (分鐘)
                          <select
                            class="form-select border-primary fw-bold mt-2 py-1 py-sm-2 w-150px"
                            name="nextHour"
                            id="nextHour${index}"
                            disabled
                          >
                            <option value="${cart.course?.duration}" selected>${
          cart.course?.duration
        }</option>
                          </select>
                        </label>
  
                        <label class="w-150px" for="nextCount${index}"
                          >堂數 (堂)
                          <div class="w-fit mt-2">
                            <input
                              class="form-control border-primary fw-bold text-center py-1 py-sm-2"
                              type="text"
                              name="nextCount"
                              id="nextCount${index}"
                              value="${cart.quantity}"
                              inputmode="numeric"
                              pattern="[0-9]"
                              disabled
                            />
                          </div>
                        </label>
                      </div>
                    </form>
  
                    <!-- 價格 -->
                    <div class="d-flex justify-content-between mb-3">
                      <div class="d-flex gap-3">
                        <h4 class="fs-5 fs-md-4 fw-bold">
                          NT$ <span class="OriginalCoursePrice">${cart.course?.price //數字三位一撇
                            .toString()
                            .replace(separatorReg, ",")}</span>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-end gap-4">
                    <p class="fs-sm fs-md-7">
                      預約截止日
                      <time datetime="${cart.dueDate}">${cart.dueDate}</time>
                    </p>
                    <a class="text-decoration-underline js-mainPurchaseBtn" role="button" href="#">移至購物車</a>
                    <a class="text-decoration-underline delete-order" role="button" href="#"
                      >刪除</a
                    >
                  </div>
                </div>
              </div>
            </li>`;
      })
    : (cartHtml += `<div class="d-flex flex-column align-items-center text-center h-100 px-10 pt-10 mb-4">
      <p class="fs-4 mb-10">沒有商品</p>
    </div>`);
  nextCartList.innerHTML = cartHtml;
}

// 渲染loading
function renderLoading() {
  const loading = `
      <div class="d-flex justify-content-center py-10">
        <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>`;
  cartList.innerHTML = loading;
}

/*** 優惠券 ***/

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
    console.log(usedCouponData, index);
    if (usedCouponData[index].myCouponId === "") {
      div.innerHTML = "";
    } else {
      div.innerHTML = `<button type="button" class="btn btn-close fs-sm js-delCoupon" data-index="${index}"></button>
        <p>
          已套用 <span class="fw-bold text-secondary2">${usedCouponData[index].title}</span
          ><i class="fa-solid fa-arrow-right mx-1"></i
          ><span class="fw-bold text-primary">折價 <span class="js-usedCouponDiscount">${usedCouponData[index].discountPrice}</span> 元</span>
        </p>`;
    }
  });
}

/*** 確定購買 ***/

// 渲染繳款資訊
function renderPaymentInfo(target) {
  // 取得 按鈕的 data-bs-target 的值
  const bsTarget = target.getAttribute("data-bs-target");
  // 取得繳款資訊父元素
  const info = document.querySelector(bsTarget);
  // 取得總金額
  const totalPrice = document.querySelector("#TotalPrice").innerText;
  // 取得過期日
  let dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 5);
  dueDate = dueDate.toISOString();
  // 繳款金額
  info.querySelector(".js-paymentPrice").innerHTML = `NT$ ${totalPrice}`;
  // 繳費期限
  info.querySelector(".js-dueDate").innerHTML = `${
    dateReg.exec(dueDate)[1]
  } 23:59:59`;
}

export {
  renderCart,
  renderLoading,
  renderNextPurchaseCart,
  renderPaymentInfo,
  renderCoupon,
  renderCouponOption,
};
