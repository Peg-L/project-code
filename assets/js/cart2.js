import axios from "axios";
import { userId } from "./config";

let appointCarts = [];
const cartList = document.querySelector(".js-cartList");
const confirmBtn = document.querySelector(".js-confirmBtn");

const headers = {
  headers: {
    "Content-Type": "application/json",
  },
};

// 課程卡片
let cartCard;
// 預約課程的父元素 ul
let appointmentList;
// 第幾個購物車項目
let cartIndex;
// 使用者的歷史預約
let attendTimeData = [];
// 使用者的歷史購買課程數
let purchasedData = [];
let user_coursesId;

/***** 初始 *****/

init();
async function init() {
  try {
    await Promise.all([getPurchasedCart(), getUserCourses()]);
    renderPurchasedCart();
    datepicker();
  } catch (error) {
    console.log(error);
  }
}

// 取得已購買的課程
async function getPurchasedCart() {
  try {
    // 取得課程
    const api = `${_url}/myCarts?userId=${userId}&status=appointment&_expand=course`;
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
    console.log("getPurchasedCart", error);
  }
}

async function getUserCourses() {
  try {
    const userId = 1; // 測試用
    const api = `${_url}/user_courses?userId=${userId}`;
    const { data } = await axios.get(api);
    attendTimeData = data[0].attendTime;
    purchasedData = data[0].purchased;
    user_coursesId = data[0].id;
  } catch (error) {
    console.log(error);
  }
}

// 整理資料
function handleData(data) {
  appointCarts = data.map((cart) => {
    // 取得未預約堂數
    const purchasedItem = purchasedData.find(
      (item) => item.courseId == cart.courseId
    );
    const notAppointedNum = purchasedItem
      ? purchasedItem.total - purchasedItem.used
      : 0;

    // 渲染用物件
    const obj = {
      courseId: cart.courseId,
      courseName: cart.course.name,
      teacherName: cart.course?.teacher?.name,
      teacherImg: cart.course?.teacher?.avatar,
      quantity: cart.quantity,
      myCartId: cart.id,
      appointmentNum: 1,
      appointment: [],
      dueDate: cart.dueDate,
      notAppointedNum,
    };
    return obj;
  });
}
// 渲染已購買的課程
function renderPurchasedCart() {
  let cartHtml = "";
  appointCarts.forEach((cart, index) => {
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
              先前未預約：<span class="text-secondary2">${
                cart.notAppointedNum
              }</span> 堂
            </li>
          </ul>
        </div>
      </div>
      <!-- 右 -->
      <div class="col-8 col-sm-9">
        <p class="fs-7 fs-md-6 text-primary fw-bold mb-2">
          預約時間：
        </p>
        <div class="mb-2">
          <button type="button" class="btn btn-primary text-white btn-sm me-1 btn-addAppointment" ${
            cart.quantity == 1 ? "disabled" : ""
          }>增加預約</button>
          <button type="button" class="btn btn-primary text-white btn-sm btn-reduceAppointment" disabled>減少預約</button>
        </div>
        <ul class="js-appointmentList">
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
                  </select>
              </div>
              <p class="fs-sm fs-md-7"
                  ><span class="text-danger">請至少預約一堂</span>，剩餘堂數可在會員中心預約
              </p>
          </li>
        </ul>
        <div class="d-flex justify-content-end align-items-center gap-4 mt-auto">
          <p class="fs-sm fs-md-7 js-remainNum">剩餘 ${
            cart.quantity - cart.appointmentNum
          } 堂</p>
          <p class="fs-sm fs-md-7">
          預約截止日 <time datetime="${cart.dueDate}">${cart.dueDate}</time>
          </p>
        </div>
      </div>
    </div>
  </li>`;
  });
  cartList.innerHTML = cartHtml;
}

/***** 卡片增加、減少預約按鈕 *****/

// 課程卡片 ul 監聽點擊事件
cartList.addEventListener("click", (e) => {
  // 取得 課程卡片
  cartCard = e.target.closest("[data-cart]");
  if (cartCard) {
    // 取得 該課程卡片預約的 ul
    appointmentList = cartCard.querySelector(".js-appointmentList");
    // 取得 該課程卡片的 index
    cartIndex = cartCard.dataset.cart;
  }
  // 按減少按鈕
  if (e.target.classList.contains("btn-reduceAppointment")) {
    appointCarts[cartIndex].appointmentNum--;
    // 幫新增、刪除按鈕加 disabled
    updateAppointmentBtn();
    // 更新剩餘堂數
    updateRemainNum();
    // 刪除 InputGroup
    deleteLastInputGroup();
  }
  // 按增加按鈕
  else if (e.target.classList.contains("btn-addAppointment")) {
    appointCarts[cartIndex].appointmentNum++;
    // 幫新增、刪除按鈕加 disabled
    updateAppointmentBtn();
    // 更新剩餘堂數
    updateRemainNum();
    // 新增 InputGroup
    addInputGroup();
    // 幫新增的 InputGroup 加上 datepicker
    datepicker();
  }
});

// 幫新增、刪除按鈕加 disabled
function updateAppointmentBtn() {
  const addBtn = cartCard.querySelector(".btn-addAppointment");
  const reduceBtn = cartCard.querySelector(".btn-reduceAppointment");
  addBtn.disabled = false;
  reduceBtn.disabled = false;
  // 若預約堂數已滿就不能再加
  if (
    appointCarts[cartIndex].appointmentNum == appointCarts[cartIndex].quantity
  ) {
    addBtn.disabled = true;
  }
  // 若預約1堂就不能再刪
  if (appointCarts[cartIndex].appointmentNum == 1) {
    reduceBtn.disabled = true;
  }
}

// 新增 InputGroup
function addInputGroup() {
  // 第幾堂
  const classNum = appointCarts[cartIndex].appointmentNum;
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
        </select>
        </div>
    </li>`;
  appointmentList.insertAdjacentHTML("beforeend", inputGroup);
}

// 刪除 InputGroup
function deleteLastInputGroup() {
  // 所有 li
  const listItems = appointmentList.querySelectorAll("li");
  // li 有幾個
  const length = listItems.length;
  // 刪除最後一個 li
  listItems[length - 1].remove();
}

// 更新剩餘堂數
function updateRemainNum() {
  // 選取剩餘堂數
  const remainNum =
    appointmentList.nextElementSibling.querySelector(".js-remainNum");
  remainNum.innerText = `剩餘 ${
    appointCarts[cartIndex].quantity - appointCarts[cartIndex].appointmentNum
  } 堂`;
}

/***** 日期、時間選取 *****/

// jquery datepicker
function datepicker() {
  $.datepicker.setDefaults($.datepicker.regional["zh-TW"]);

  $(function () {
    $("[name='appointmentDate']").datepicker({
      minDate: 0,
      maxDate: "+1M +10D",
      formatDate: "yy-mm-dd",
      // 選擇日期後觸發
      onSelect: async function (dateText) {
        this.setAttribute("value", dateText);

        const index = this.closest("[data-cart]").dataset.cart;
        const { courseId } = appointCarts[index];
        // 取得 可預約時間
        const time = await getTeacherOpenTime(courseId, dateText);
        // 取得 select 後渲染選項
        const select = this.nextElementSibling;
        renderTime(select, time);
      },
    });
  });
}

// 取得 可預約時間
async function getTeacherOpenTime(courseId, dateText) {
  try {
    // 取得老師的時間
    const api = `${_url}/courses/${courseId}?_expand=teacher`;
    const { data } = await axios.get(api);
    // 取得老師在選取日期的時間
    const openTime = data.teacher.openTime.find(
      (item) => item.date === dateText.slice(-5)
    );
    // 篩選可以預約(還沒被預約)的時間
    const time = openTime.time.filter(
      (item) => !openTime.useTime.includes(item)
    );
    return time;
  } catch (error) {}
}

// 渲染時間選項
function renderTime(target, time) {
  let optionHtml = `
  <option value="" disabled="" selected="" hidden="">${
    time !== undefined ? "時間" : "無預約時間"
  }</option>`;
  if (time !== undefined) {
    optionHtml += time
      .map((item) => `<option value="${item}">${item}</option>`)
      .join("");
  }
  target.innerHTML = optionHtml;
}

/***** 確定預約 *****/

// 按下確定預約按鈕
confirmBtn.addEventListener("click", async () => {
  try {
    const result = await Swal.fire({
      title: "確定完成預約嗎?",
      text: "之後可至會員中心修改預約時間或預約剩餘堂數",
      showDenyButton: true,
      confirmButtonColor: "#115BC9",
      confirmButtonText: "確認",
      denyButtonText: "我再想想",
    });
    // 按下確認
    if (result.isConfirmed) {
      // 檢查是否都有填
      const appointments = cartList.querySelectorAll(".js-appointment");
      let isBlank = false;
      appointments.forEach((item) => {
        if (item.value === "") {
          isBlank = true;
        }
      });
      // 若發現有空白
      if (isBlank) {
        Swal.fire({
          title: "預約欄位請勿空白",
          text: "請至少預約一堂，沒有要預約的堂數可先刪除",
          confirmButtonColor: "#115BC9",
          confirmButtonText: "確認",
        });
      }
      // 若都有填
      else {
        patchPurchasedCart(); // patch 購物車狀態
        handleAppointmentData(); // 處理預約資料(sessionStorage、patch)
        await Swal.fire({
          icon: "success",
          title: "預約成功！",
          text: "已發送預約給教師，需等待教師進行確認，如教師拒絕或是未在24小時內確認，系統將系統將自動歸還自動歸還課堂數給您。",
          showConfirmButton: true,
          confirmButtonColor: "#115BC9",
          confirmButtonText: "確認",
        });
        location.href = "cart3.html";
      }
    }
  } catch (error) {
    console.log("確定預約", error);
  }
});

// patch 購物車狀態
async function patchPurchasedCart() {
  try {
    const urls = appointCarts.map((item) => `${_url}/myCarts/${item.myCartId}`);
    const patchData = { status: "finish" };
    await Promise.all(urls.map((url) => axios.patch(url, patchData, headers)));
  } catch (error) {
    console.log("patchPurchasedCart", error);
  }
}

// 處理預約資料(sessionStorage、patch)
function handleAppointmentData() {
  // 取得每張卡片預約的 ul
  const appointmentLists = document.querySelectorAll(".js-appointmentList");
  appointmentLists.forEach((ul, index) => {
    // 取得預約 ul 內的所有 li
    const appointments = ul.querySelectorAll("li");
    appointments.forEach((appointment) => {
      // 取得 日期
      const date = appointment.querySelector("[name='appointmentDate']");
      // 取得 時間
      const time = appointment.querySelector("[name='appointmentTime']");
      // 將日期和時間加入資料
      const appointmentObj = {
        date: date.value,
        time: time.value,
      };
      appointCarts[index].appointment.push(appointmentObj);
    });
  });
  // 存入 sessionStorage 供下一頁購物明細使用
  sessionStorage.setItem("appointment", JSON.stringify(appointCarts));
  // patch 預約資料到 json
  patchAppointmentData();
}

// patch 預約資料到 json
async function patchAppointmentData() {
  try {
    appointCarts.forEach((cartItem) => {
      // 預約時間
      cartItem.appointment.forEach((timeItem) => {
        const attendTimeObj = {
          uid: generateRandomCode(4),
          courseId: Number(cartItem.courseId),
          date: timeItem.date,
          time: timeItem.time,
          isCheck: false,
        };
        attendTimeData.push(attendTimeObj);
      });

      // 總預約數量
      const foundItem = purchasedData.find(
        (item) => item.courseId == cartItem.courseId
      );
      if (foundItem) {
        // 若已買過該課程
        foundItem.total += Number(cartItem.quantity);
        foundItem.used += Number(cartItem.appointmentNum);
      } else {
        // 若沒買過
        purchasedData.push({
          courseId: Number(cartItem.courseId),
          total: Number(cartItem.quantity),
          used: Number(cartItem.appointmentNum),
        });
      }
    });

    // patch api
    const api = `${_url}/user_courses/${user_coursesId}`;
    const patchData = { purchased: purchasedData, attendTime: attendTimeData };
    await axios.patch(api, patchData, headers);
  } catch (error) {
    console.log("patchAppointmentData", error);
  }
}

function generateRandomCode(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  // 第一個字是英文字母
  const firstCharIndex = Math.floor(Math.random() * (characters.length - 10));
  result += characters.charAt(firstCharIndex);

  for (let i = 1; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}
