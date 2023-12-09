// let userId = 1; // 假設的
// 日期、數字三位一點規則
const dateReg = /^(\d{4}-\d{2}-\d{2}).*/;
const separatorReg = /\B(?=(?:\d{3})+(?!\d))/g;
let cartList = document.querySelector(".js-cartList");
const nextCartList = document.querySelector(".js-nextCartList");
const purchaseTabContent = document.querySelector("#purchaseTabContent");
const cartContainer = document.querySelector("#mainPurchase");
// 取得 付款資訊按鈕
const paymentInfoBtns = document.querySelectorAll(".js-paymentInfoBtn");
// 取得 付款按鈕
const payBtns = document.querySelectorAll(".js-payBtn");
// 取得 nav-tabs 的 ul
const purchaseTab = document.querySelector("#purchaseTab");

// 目前網址
// const currentURL = window.location.href;
// const newURL = currentURL.replace("cart", "course_intro");

const headers = {
  headers: {
    "Content-Type": "application/json",
  },
};
let cartInitialHtml = "";

let myCarts = [];
let nextPurchaseCarts = [];
let cartCourseId;
let usedCouponData = [];

/***** 初始化、取資料 *****/

init();
async function init() {
  cartInitialHtml = cartContainer.innerHTML; // 取得購物項目初始 html，因為空購物車渲染會把這些蓋掉
  renderLoading(); // 渲染loading
  await getMyCart(); // 取得我的購物車資料

  if (myCarts.length) {
    renderCart();
    CalculateToTalSum();
    couponInit();
    getCoupons();
  } else {
    renderEmptyCart();
  }
  renderNextPurchaseCart();
}

// 取得購買項目和下次購買的課程
async function getMyCart() {
  try {
    // 取得課程
    const api = `${_url}/myCarts?userId=${userId}&status=purchase&_expand=course`;
    const { data } = await axios.get(api);
    if (data !== undefined) {
      // 取得各課程的老師資料
      const courseUrls = data.map(
        (item) => `${_url}/courses/${item.courseId}?_expand=teacher`
      );

      const responses = await Promise.all(
        courseUrls.map((courseUrl) => axios.get(courseUrl))
      );

      data.forEach((item, index) => {
        item.course = responses[index].data;
      });
      handleData(data);
    }
  } catch (error) {
    console.log("getMyCart", error);
  }
}

function handleData(data) {
  // 到期日(一年後)的 23:59:59 過期
  let dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 365);
  dueDate.setHours(23, 59, 59, 999);
  dueDate = dateReg.exec(dueDate.toISOString())[1];
  data.forEach((item) => {
    item.dueDate = dueDate;
  });

  // 購買項目
  myCarts = data.filter((item) => !item.isNextPurchase);
  // 下次再買項目
  nextPurchaseCarts = data.filter((item) => item.isNextPurchase);
}

function CalculateToTalSum() {
  // 選擇每一張訂單
  const Orders = $(".order");

  // 初始化原始價格總和
  let OriginalTotalPrice = 0;
  let CourseDiscountPrice = 0;
  // 用each跑遍整個order
  Orders.each(function () {
    const Order = $(this);

    // 獲取課堂數量的值
    const Count = parseInt(Order.find('[name="count"]').val());

    // 獲取每個 order 的價格並轉成 Int
    const CoursePriceText = Order.find(".CoursePrice").text().replace(",", "");
    const CoursePrice = parseInt(CoursePriceText) || 0;

    // 獲取每個 order 的原始價格並轉成 Int
    const OriginalPriceText = Order.find(".OriginalCoursePrice")
      .text()
      .replace(",", "");
    const OriginalPrice = parseInt(OriginalPriceText);

    // 計算每個小計的價格
    const Subtotal = Count * OriginalPrice;

    // 將小計加到原價
    OriginalTotalPrice += Subtotal;

    // 計算課程優惠價格
    // const Discount = OriginalPrice - CoursePrice;
    // if (CoursePrice != 0) {
    //   CourseDiscountPrice += Discount * Count;
    // }
  });
  //獲取網頁上原價的物件
  const OriginalPriceObject = $("#OriginalPrice");
  //將原價顯示在上面
  OriginalPriceObject.text(
    OriginalTotalPrice.toString().replace(separatorReg, ",")
  );
  //獲取課程優惠的價格
  CourseDiscountPrice = parseInt($("#CourseDiscount").text().replace(",", ""));
  //獲取全站優惠的價格
  const WebDiscountPrice = parseInt($("#WebDiscount").text().replace(",", ""));
  //總金額為原價-課程優惠-全站優惠
  const TotalPrice =
    OriginalTotalPrice - CourseDiscountPrice - WebDiscountPrice;
  //獲取並將總額顯示在上面
  // const CourseDiscountPriceText =
  //   $("#CourseDiscount").text(CourseDiscountPrice);
  const TotalPriceText = $("#TotalPrice").text(
    TotalPrice.toString().replace(separatorReg, ",")
  );
}

// 依據購物車商品數量來進行渲染購買項目和下次再買項目
async function checkAndRenderMyCart() {
  if (myCarts.length) {
    renderCart(); // 渲染購買項目
    getCartCouponsData(); // 取得課程優惠券、渲染優惠券選項
  } else {
    renderEmptyCart(); // 渲染空購物車
  }
  renderNextPurchaseCart(); // 渲染下次購買

  // 渲染navbar 購物車數量顯示
  await getCartLength();
  renderCartNum();
}

/***** 購物車卡片按鈕事件 *****/

// 購物車卡片的按鈕監聽
purchaseTabContent.addEventListener("click", (e) => {
  const target = e.target;
  const listItem = target.closest("li");

  if (listItem) {
    e.preventDefault(); // 防止連結跳轉的問題發生
    // 若點擊 刪除 按鈕
    if (target.classList.contains("delete-order")) {
      deleteOrder(listItem);
    }
    // 若點擊 下次再買 按鈕
    else if (target.classList.contains("js-nextPurchaseBtn")) {
      nextPurchaseOrder(listItem);
    }
    // 若點擊 移至購買項目 按鈕
    else if (target.classList.contains("js-mainPurchaseBtn")) {
      mainPurchaseOrder(listItem);
    }
  }
});

/*** 刪除 ***/

// 刪除購物車內的課程
function deleteOrder(listItem) {
  Swal.fire({
    title: "確定要刪除嗎?",
    showDenyButton: true,
    confirmButtonColor: "#115BC9",
    confirmButtonText: "確定刪除",
    denyButtonText: `我再想想`,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "已刪除課程",
        showConfirmButton: false,
        timer: 1500,
      });
      const courseId = listItem.dataset.course;
      // listItem.remove(); // 刪除 listItem
      deleteCart(courseId); // 刪除購物車資料
      delUsedCoupon(courseId); // 刪除使用的優惠券資料
      couponInit(); // 清除所有使用的優惠券
      renderCoupon();
      // reCheckCoupon(listItem); // 重新確認優惠券資格
      CalculateToTalSum(); // 計算總額
    }
  });
}

// 刪除購物車課程
async function deleteCart(id) {
  try {
    let myCartId;
    myCarts = myCarts.filter((item) => {
      if (item.courseId == id) {
        myCartId = item.id;
      }
      return item.courseId != id;
    });
    nextPurchaseCarts = nextPurchaseCarts.filter((item) => {
      if (item.courseId == id) {
        myCartId = item.id;
      }
      return item.courseId != id;
    });
    checkAndRenderMyCart(); // 渲染購買項目和下次再買項目
    await axios.patch(
      `${_url}/myCarts/${myCartId}`,
      { userId: "", courseId: "", quantity: "" },
      headers
    );
    // await axios.delete(`${_url}/myCarts/${myCartId}`); // coupons 的 id 1 和 2 也會一起被刪掉，不知道為什麼，所以先改成用 patch
  } catch (error) {
    console.log("deleteCart", error);
  }
}

/*** 移至 下次再買 或 購買清單 ***/

// 移至下次再買 功能
async function nextPurchaseOrder(listItem) {
  const result = await Swal.fire({
    title: "確定要下次再買該課程嗎?",
    showDenyButton: true,
    confirmButtonColor: "#115BC9",
    confirmButtonText: "確定",
    denyButtonText: `我再想想`,
  });
  if (result.isConfirmed) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "已移至下次再買",
      showConfirmButton: false,
      timer: 1500,
    });
    const courseId = listItem.dataset.course;
    // listItem.remove(); // 刪除 listItem
    toNextPurchase(courseId); // 將課程移置 下次再買
    delUsedCoupon(courseId); // 刪除使用的優惠券資料
    couponInit(); // 清除所有使用的優惠券
    renderCoupon();
    // reCheckCoupon(listItem); // 重新確認優惠券資格
    CalculateToTalSum(); // 計算總額
  }
}

// 購買項目 移至 下次購買
async function toNextPurchase(courseId) {
  try {
    let myCartId;
    // 移除購買項目
    myCarts = myCarts.filter((item) => {
      if (item.courseId == courseId) {
        myCartId = item.id; // 取得 id
        nextPurchaseCarts.push(item); // 加進下次再買項目
      }
      return item.courseId != courseId;
    });
    checkAndRenderMyCart(); // 渲染購買項目和下次再買項目
    await axios.patch(
      `${_url}/myCarts/${myCartId}`,
      { isNextPurchase: true },
      headers
    );
  } catch (error) {
    console.log("toNextPurchase", error);
  }
}

// 移至 購買項目 功能
function mainPurchaseOrder(listItem) {
  Swal.fire({
    title: "確定將該課程移至購物車嗎?",
    showDenyButton: true,
    confirmButtonColor: "#115BC9",
    confirmButtonText: "確定",
    denyButtonText: `我再想想`,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "已移置購買項目",
        showConfirmButton: false,
        timer: 1500,
      });
      const courseId = listItem.dataset.course;
      // listItem.remove(); // 刪除 listItem
      toMainPurchase(courseId); // 將課程移置 購買項目
      // addEmptyUsedCoupon(); // 新增優惠券欄位
      couponInit(); // 清除所有使用的優惠券
      renderCoupon();
      CalculateToTalSum(); // 計算總額
    }
  });
}

// 下次購買 移至 購買項目
async function toMainPurchase(courseId) {
  try {
    let myCartId;
    // 移除下次再買項目
    nextPurchaseCarts = nextPurchaseCarts.filter((item) => {
      if (item.courseId == courseId) {
        myCartId = item.id;
        // 加進購買項目
        myCarts.push(item);
      }
      return item.courseId != courseId;
    });
    checkAndRenderMyCart(); // 渲染購買項目和下次再買項目
    await axios.patch(
      `${_url}/myCarts/${myCartId}`,
      { isNextPurchase: false },
      headers
    );
  } catch (error) {
    console.log("toMainPurchase", error);
  }
}

/*** 購買課程數量 ***/

// 使用 jQuery 實現增加數字輸入的值
function incrementValue(id) {
  $("#" + id).val(function (i, currentValue) {
    return parseInt(currentValue) + 1;
  });
  // 更新數量
  quantityChange($("#" + id)[0]);
}

// 使用 jQuery 實現減少數字輸入的值
function decrementValue(id) {
  $("#" + id).val(function (i, currentValue) {
    currentValue = parseInt(currentValue);
    return currentValue > 1 ? currentValue - 1 : currentValue;
  });
  // 更新數量
  quantityChange($("#" + id)[0]);
}

// 直接更改數量
document.addEventListener("change", (e) => {
  if (e.target.name === "count") {
    // 若是輸入非數字或為0，就變成預設的值
    if (e.target.value.match(/[^0-9]|^0$/g)) {
      e.target.value = e.target.defaultValue;
    }
    // 輸入數字執行數量變更
    else {
      quantityChange(e.target);
    }
  }
});

// 更新課程購買數量
async function updateQuantity(target) {
  try {
    const listItem = target.closest("li");
    const courseId = listItem.dataset.course;
    let myCartId;
    myCarts.forEach((cart) => {
      if (cart.courseId == courseId) {
        myCartId = cart.id; // 取得 id
        cart.quantity = target.value; // 更新數量
      }
    });
    // 更新遠端數量
    patchQuantity(myCartId, target.value);
  } catch (error) {
    console.log("updateQuantity", error);
  }
}

async function patchQuantity(id, quantity) {
  try {
    const api = `${_url}/myCarts/${id}`;
    const patchData = { quantity };
    await axios.patch(api, patchData, headers);
  } catch (error) {}
}

function quantityChange(input) {
  const listItem = input.closest("li");
  updateQuantity(input);
  reCheckCoupon(listItem); // 重新確認優惠券資格
  CalculateToTalSum();
}

/***** 付款按鈕 *****/

// 點擊付款後渲染繳款資訊
paymentInfoBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => renderPaymentInfo(e.target));
});

// 按下付款按鈕-紀錄使用的優惠券、購買的課程
payBtns.forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    await patchMyCoupon(); // 按確認購買後優惠券 canUse 改成 false
    await patchMyCarts(); // 按確認購買後更新商品狀態
    location.href = "cart2.html";
  });
});

// 按確認購買後更新商品狀態
function patchMyCarts() {
  const buyUrls = myCarts.map((item) => `${_url}/myCarts/${item.id}`);

  return Promise.all(
    buyUrls.map((url, index) => {
      const patchData = {
        status: "appointment",
        dueDate: myCarts[index].dueDate,
      };
      return axios.patch(url, patchData, headers);
    })
  );
}

/***** 渲染 *****/

// 渲染購物車
function renderCart() {
  // 重置cartContainer，避免是空購物車會沒有cartList、優惠券、付款資訊
  cartContainer.innerHTML = cartInitialHtml;
  // 重抓一次 cartList
  cartList = document.querySelector(".js-cartList");

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
                          class="btn btn-outline-primary rounded-start-2 border-2 py-0 fw-bold fs-4 w-45px"
                          onclick="decrementValue('count${index}');"
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
                          class="btn btn-outline-primary rounded-end-2 border-2 py-0 fw-bold fs-4 w-45px"
                          onclick="incrementValue('count${index}');"
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
    : "";
  cartList.innerHTML = cartHtml;
  inputPreventEnter(document); // 防止整頁 input 按 enter 的預設行為(在 config.js)
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
                    <h5 class="fs-7 fs-md-6">${cart.course?.teacher?.name}</h5>
                  </div>
                </div>

                <div class="col-8 col-sm-9 order">
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

// 渲染空購物車
function renderEmptyCart() {
  const emptyCart = `
  <div class="d-flex flex-column align-items-center text-center h-100 px-10 pt-10 mb-4">
    <p class="fs-4 mb-10">購物車內沒有商品</p>
    <a href="./course.html"
      class="btn btn-secondary2 rounded-2 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
    >
      繼續選購
    </a>
  </div>
  `;
  cartContainer.innerHTML = emptyCart;
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
