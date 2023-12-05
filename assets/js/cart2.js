let purchasedCarts = [];
const cartList = document.querySelector(".js-cartList");
const confirmBtn = document.querySelector(".js-confirmBtn");
const addOrder = document.querySelector(".btn-addOrder");
const reduceOrder = document.querySelector(".btn-reduceOrder");

// 課程卡片
let cartCard;
// 預約課程的父元素 ul
let orderList;
// 第幾個購物車項目
let cartIndex;

confirmBtn.addEventListener("click", () => {
  Swal.fire({
    title: "確定完成預約嗎?",
    text: "之後可至會員中心修改預約時間或預約剩餘堂數",
    showDenyButton: true,
    confirmButtonColor: "#115BC9",
    confirmButtonText: "確認",
    denyButtonText: "我再想想",
  }).then((result) => {
    if (result.isConfirmed) {
      // 檢查是否都有填
      const appointments = cartList.querySelectorAll(".js-appointment");
      let isBlank = false;
      appointments.forEach((item) => {
        if (item.value === "") {
          isBlank = true;
        }
      });
      if (isBlank) {
        Swal.fire("預約欄位請勿空白，沒有要預約的堂數可先刪除");
      } else {
        // 複製 purchasedCarts
        let appointmentData = purchasedCarts;
        // 取得每張卡片預約的 ul
        const orderLists = document.querySelectorAll(".js-orderList");
        orderLists.forEach((ul, index) => {
          // 取得預約 ul 內的所有 li
          const orders = ul.querySelectorAll("li");
          orders.forEach((order) => {
            // 取得 日期
            const date = order.querySelector("[name='appointmentDate']");
            // 取得 時間
            const time = order.querySelector("[name='appointmentTime']");
            // 將日期和時間加入資料
            const appointmentObj = {
              date: date.value,
              time: time.value,
            };
            appointmentData[index].appointment.push(appointmentObj);
          });
        });
        console.log(appointmentData);
        sessionStorage.setItem("appointment", JSON.stringify(appointmentData));
        location.href = "cart3.html";
      }
    }
  });
});

cartList.addEventListener("click", (e) => {
  cartCard = e.target.closest("[data-cart]");
  if (cartCard) {
    orderList = cartCard.querySelector(".js-orderList");
    cartIndex = cartCard.dataset.cart;
  }
  // 按減少按鈕
  if (e.target.classList.contains("btn-reduceOrder")) {
    purchasedCarts[cartIndex].orderNum--;
    // 幫新增、刪除按鈕加 disabled
    updateOrderBtn();
    // 更新剩餘堂數
    updateRemainNum();
    // 刪除 InputGroup
    deleteLastInputGroup();
  }
  // 按增加按鈕
  else if (e.target.classList.contains("btn-addOrder")) {
    purchasedCarts[cartIndex].orderNum++;
    // 幫新增、刪除按鈕加 disabled
    updateOrderBtn();
    // 更新剩餘堂數
    updateRemainNum();
    // 新增 InputGroup
    addInputGroup();
    // 幫新增的 InputGroup 加上 datepicker
    datepicker();
  }
});

// 幫新增、刪除按鈕加 disabled
function updateOrderBtn() {
  const addBtn = cartCard.querySelector(".btn-addOrder");
  const reduceBtn = cartCard.querySelector(".btn-reduceOrder");
  addBtn.disabled = false;
  reduceBtn.disabled = false;
  // 若預約堂數已滿就不能再加
  if (
    purchasedCarts[cartIndex].orderNum == purchasedCarts[cartIndex].quantity
  ) {
    addBtn.disabled = true;
  }
  // 若預約1糖就不能再刪
  if (purchasedCarts[cartIndex].orderNum == 1) {
    reduceBtn.disabled = true;
  }
}

function addInputGroup() {
  // 第幾堂
  const classNum = purchasedCarts[cartIndex].orderNum;
  // 寫入 html
  const inputGroup = `
    <li class="d-flex flex-wrap align-items-center column-gap-3 row-gap-2 mb-3 mb-md-5">
        <p class="fw-bold w-150px">第 ${classNum} 堂 (50 分鐘)</p>
        <div class="d-flex gap-2 w-300px">
        <input
            class="form-control border-primary cursor-pointer fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-md-4 js-appointment"
            type="text"
            name="appointmentDate"
            value=""
            placeholder="日期"
            autocomplete="off"
            required
        />
        <select
            class="form-select border-primary fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-md-4 js-appointment"
            name="appointmentTime" required"
        >
            <option value="" disabled selected hidden>時間</option>
            <option value="9:00">9:00</option>
            <option value="10:00">10:00</option>
            <option value="16:00">16:00</option>
        </select>
        </div>
    </li>`;
  orderList.insertAdjacentHTML("beforeend", inputGroup);
}

function deleteLastInputGroup() {
  // 所有 li
  const listItems = orderList.querySelectorAll("li");
  // li 有幾個
  const length = listItems.length;
  // 刪除最後一個 li
  listItems[length - 1].remove();
}

// 更新剩餘堂數
function updateRemainNum() {
  // 選取剩餘堂數
  const remainNum = orderList.nextElementSibling.querySelector(".js-remainNum");
  remainNum.innerText = `剩餘 ${
    purchasedCarts[cartIndex].quantity - purchasedCarts[cartIndex].orderNum
  } 堂`;
}

init();
async function init() {
  await getPurchasedCart();
  renderPurchasedCart();
  datepicker();
}

// 取得已購買的課程
async function getPurchasedCart() {
  try {
    // 取得課程
    const { data } = await axios.get(
      `${_url}/myCarts?userId=${userId}&isPurchased=${true}&_expand=course`
    );
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
      console.log(data);

      handleData(data);
      console.log(purchasedCarts);
    }
  } catch (error) {
    console.log("getPurchasedCart", error);
  }
}

// 整理資料
function handleData(data) {
  purchasedCarts = data.map((cart) => {
    let obj = {
      courseId: cart.courseId,
      courseName: cart.course.name,
      teacherName: cart.course?.teacher?.name,
      teacherImg: cart.course?.teacher?.avatar,
      quantity: cart.quantity,
      myCartId: cart.id,
      orderNum: 1,
      appointment: [],
    };
    return obj;
  });
}
// 渲染已購買的課程
function renderPurchasedCart() {
  let cartHtml = "";
  purchasedCarts.forEach((cart, index) => {
    cartHtml += `
    <li class="shadow rounded-2 p-4 pb-md-4 pt-md-6 px-md-8 mb-1 mb-md-2" data-cart="${index}">
    <h3 class="fs-5 fs-md-4 fw-bold mb-4 mb-md-6 text-secondary2">
    ${cart.courseName}
    </h3>
    <div class="row justify-content-between">
      <!-- 左 -->
      <div class="col-4 col-sm-3 d-flex flex-column align-items-start">
        <div class="text-center">
          <div>
            <div>
              <img
                class="img-fluid rounded-circle mb-2"
                src="${cart.teacherImg}"
                alt="teacher"
                width="90px"
                height="90px"
              />
            </div>
            <h5 class="fs-7 fs-md-6 mb-2">${cart.teacherName}</h5>
          </div>
          <ul>
            <li class="fs-sm fs-sm-7" title="已購買但尚未預約">
              未預約：<span class="text-secondary2">0</span> 堂
            </li>
            <li class="fs-sm fs-sm-7" title="已預約但老師尚未確認">
              請求中：<span class="text-secondary2">0</span> 堂
            </li>
          </ul>
        </div>
      </div>
      <!-- 右 -->
      <div class="col-8 col-sm-9">
        <p class="fs-7 fs-md-6 text-primary fw-bold mb-2">
          請先選取日期再預約時間 ：
        </p>
        <div class="mb-2">
          <button type="button" class="btn btn-primary text-white btn-sm me-1 btn-addOrder" ${
            cart.quantity == 1 ? "disabled" : ""
          }>增加預約</button>
          <button type="button" class="btn btn-primary text-white btn-sm btn-reduceOrder" disabled>減少預約</button>
        </div>
        <ul class="js-orderList">
          <li class="d-flex flex-wrap align-items-center column-gap-3 row-gap-2 mb-3 mb-md-5">
              <p class="fw-bold w-150px">第 1 堂 (50 分鐘)</p>
              <div class="d-flex gap-2 w-300px">
                  <input
                  class="form-control border-primary cursor-pointer fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-md-4 js-appointment"
                  type="text"
                  name="appointmentDate"
                  placeholder="日期"
                  value=""
                  autocomplete="off"
                  required
                  />
                  <select
                  class="form-select border-primary fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-md-4 js-appointment"
                  name="appointmentTime"
                  required
                  >
                  <option value="" disabled selected hidden>時間</option>
                  <option value="9:00">9:00</option>
                  <option value="10:00">10:00</option>
                  <option value="16:00">16:00</option>
                  </select>
              </div>
              <span class="fs-sm fs-md-7 text-primary"
                  >請至少預約一堂，剩餘堂數可在會員中心預約
              </span>
          </li>
        </ul>
        <div class="d-flex justify-content-end align-items-center gap-4 mt-auto">
          <p class="fs-sm fs-md-7 js-remainNum">剩餘 ${
            cart.quantity - cart.orderNum
          } 堂</p>
          <p class="fs-sm fs-md-7">
            <time datetime="2024-02-01">2024/2/1</time> 到期
          </p>
        </div>
      </div>
    </div>
  </li>`;
  });
  cartList.innerHTML = cartHtml;
}

function datepicker() {
  $.datepicker.setDefaults($.datepicker.regional["zh-TW"]);
  $(function () {
    $("[name='appointmentDate']").datepicker({
      minDate: 0,
      maxDate: "+1M +10D",
      formatDate: "yy-mm-dd",
      onSelect: function (dateText) {
        // 在選擇日期時，將選擇的日期設置為相應 input 元素的值
        $(this).attr("value", dateText);
      },
    });
  });
}
