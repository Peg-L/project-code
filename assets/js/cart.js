const apiUrl = "http://localhost:3000";
let userId = 1; // 假設的
// 日期、數字三位一點規則
const dateReg = /^(\d{4}-\d{2}-\d{2}).*/;
const separatorReg = /\B(?=(?:\d{3})+(?!\d))/g;
const cartGroup = document.querySelector(".js-cartGroup");
const cartContainer = document.querySelector(".js-cartContainer");
// 取得 付款資訊按鈕
const paymentInfoBtns = document.querySelectorAll(".js-paymentInfoBtn");
// 取得 付款按鈕
const payBtns = document.querySelectorAll(".js-payBtn");
let myCarts;
let cartCourseId;

// 按購物車課程的任一按鈕
cartGroup.addEventListener("click", (e) => {
  e.preventDefault(); // 防止連結跳轉的問題發生
  const target = e.target;
  const listItem = target.closest("li");

  if (listItem) {
    // 若點擊 刪除 按鈕
    if (target.classList.contains("delete-order")) {
      deleteOrder(listItem);
    }
    // 若點擊 下次再買 按鈕
    else if (target.classList.contains("js-tempDeleteBtn")) {
      tempDeleteOrder(listItem);
    }
    console.dir(target);
    // 若點擊任一按鈕要重新確認優惠券資格和折價
    if (
      target.getAttribute("type") === "button" ||
      target.getAttribute("role") === "button"
    ) {
      reCheckCoupon(listItem);
    }
  }
});

// 更改數量時 json-server 同步更新
cartGroup.addEventListener("change", (e) => {
  if ((e.target.name = "count")) {
    updateQuantity(e.target);
    CalculateToTalSum();
  }
});

// 點擊付款後渲染繳款資訊
paymentInfoBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => renderPaymentInfo(e.target));
});

// 下次再買 功能
function tempDeleteOrder(listItem) {
  const courseId = listItem.dataset.course;
  listItem.remove(); // 刪除 listItem
  CalculateToTalSum(); // 計算價格
  tempDeleteCart(courseId); // 刪除購物車資料，但不刪除 db.json 資料
  delUsedCoupon(courseId); // 刪除使用的優惠券資料
}

// 刪除購物車內的課程
function deleteOrder(listItem) {
  const courseId = listItem.dataset.course;
  listItem.remove(); // 刪除 listItem
  CalculateToTalSum(); // 計算價格
  deleteCart(courseId); // 刪除購物車資料
  delUsedCoupon(courseId); // 刪除使用的優惠券資料
}

// $(function () {
//   CalculateToTalSum();
// });

// 使用 jQuery 實現增加數字輸入的值
function incrementValue(id) {
  // 原本用 .val() 只有改變 innerText 的值，改用 .attr()才能改變屬性 value 的值
  $("#" + id).attr("value", function (i, currentValue) {
    return parseInt(currentValue) + 1;
  });
  CalculateToTalSum();
  // 更新 json-server 的值
  updateQuantity($("#" + id)[0]);
}

// 使用 jQuery 實現減少數字輸入的值
function decrementValue(id) {
  // 原本用 .val() 只有改變 innerText 的值，改用 .attr()才能改變屬性 value 的值
  $("#" + id).attr("value", function (i, currentValue) {
    currentValue = parseInt(currentValue);
    return currentValue > 1 ? currentValue - 1 : currentValue;
  });
  CalculateToTalSum();
  // 更新 json-server 的值
  updateQuantity($("#" + id)[0]);
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

init();
async function init() {
  myCarts = await getMyCart();
  console.log("myCarts", myCarts);
  checkMyCart();
  couponInit();
}

function checkMyCart() {
  if (myCarts.length) {
    renderCart();
    getCoupons();
    CalculateToTalSum();
  } else {
    renderEmptyCart();
  }
}

async function getMyCart() {
  try {
    // 取得課程
    const { data } = await axios.get(
      `${apiUrl}/myCarts?userId=${userId}&isPurchased=${false}&_expand=course`
    );
    if (data !== undefined) {
      for (let item of data) {
        // 取得各課程的老師資料
        const courseRes = await axios.get(
          `${apiUrl}/courses/${item.courseId}?_expand=teacher`
        );
        item.course = courseRes.data;
      }
      return data;
    }
  } catch (error) {
    console.log("getMyCart", error);
  }
}
function tempDeleteCart(id) {
  myCarts = myCarts.filter((item) => {
    return item.courseId != id;
  });
  checkMyCart();
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
    await axios.patch(
      `${apiUrl}/myCarts/${myCartId}`,
      { userId: "", courseId: "", quantity: "" },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // await axios.delete(`${apiUrl}/myCarts/${myCartId}`); // coupons 的 id 1 和 2 也會一起被刪掉，不知道為什麼，所以先改成用 patch

    checkMyCart();
  } catch (error) {
    console.log("deleteCart", error);
  }
}

// 更新課程購買數量
async function updateQuantity(target) {
  try {
    const listItem = target.closest("li");
    const courseId = listItem.dataset.course;
    let myCartId;
    myCarts.forEach((cart) => {
      if (cart.courseId == courseId) {
        myCartId = cart.id;
      }
    });

    await axios.patch(
      `${apiUrl}/myCarts/${myCartId}`,
      { quantity: target.value },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log("updateQuantity", error);
  }
}

// 按下付款按鈕-紀錄使用的優惠券、購買的課程
payBtns.forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    await confirmToUseCoupon();
    await confirmToBuy();
    location.href = "cart2.html";
  });
});

async function confirmToBuy() {
  try {
    for (const item of myCarts) {
      const buyUrl = `${apiUrl}/myCarts/${item.id}`;
      await axios.patch(
        buyUrl,
        { isPurchased: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  } catch (error) {
    console.log("confirmToBuy", error);
  }
}

/***** 渲染 *****/

// 渲染購物車
function renderCart() {
  let cartHtml = "";
  // 到期日(一年後)的 23:59:59 過期
  let dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 365);
  dueDate.setHours(23, 59, 59, 999);
  dueDate = dueDate.toISOString();

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
                    <h5 class="fs-7 fs-md-6">${cart.course?.teacher?.name}</h5>
                  </div>
                </div>

                <div class="col-8 col-sm-9 order">
                  <!-- 堂數 -->
                  <form class="mb-3 mb-md-5" action="#">
                    <div
                      class="d-flex flex-wrap align-items-center column-gap-8 row-gap-3"
                    >
                      <label for="hour2"
                        >單堂時長 (分鐘)
                        <select
                          class="form-select border-primary fw-bold mt-2 py-1 py-sm-2 w-150px"
                          name="hour2"
                          id="hour2"
                          disabled
                        >
                          <option value="${cart.course?.duration}" selected>${
          cart.course?.duration
        }</option>
                        </select>
                      </label>

                      <label class="w-150px" for="count2"
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
                            pattern="[0-9]"
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
                    <time datetime="${dateReg.exec(dueDate)[1]}">${
          dateReg.exec(dueDate)[1]
        }</time>
                  </p>
                  <a class="text-decoration-underline js-tempDeleteBtn" role="button" href="#">下次再買</a>
                  <a class="text-decoration-underline delete-order" role="button" href="#"
                    >刪除</a
                  >
                </div>
              </div>
            </div>
            <div class="d-flex align-items-center js-usedCoupon"></div>
          </li>`;
      })
    : "";
  cartGroup.innerHTML = cartHtml;
}
function renderEmptyCart() {
  console.log("購物車內沒有商品");
  const emptyCart = `
  <div class="d-flex flex-column justify-content-center text-center h-100 px-10 pt-10">
    <p class="fs-3 mb-4">購物車內沒有商品</p>
  </div>
  `;
  cartContainer.innerHTML = emptyCart;
}

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
