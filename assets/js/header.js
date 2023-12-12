// import { Modal } from "bootstrap";
import axios from "axios";
import { userId, isLogin } from "./config";

const cateItems = document.querySelectorAll(".cateitem");
cateItems.forEach((cateItem) => {
  cateItem.addEventListener("click", function () {
    let cateItemName = cateItem.getAttribute("name");

    sessionStorage.setItem("cateItemName", cateItemName);

    location.href = "./course.html";
  });
});

// 常見問答
const teacherFaqBtn = document.querySelector(".teacher-faq");
const studentFaqBtns = document.querySelectorAll(".student-faq");

teacherFaqBtn.addEventListener("click", function () {
  sessionStorage.setItem("faq", "teacherFaq");
  location.href = "./faq.html";
});

studentFaqBtns.forEach((studentFaqBtn) => {
  studentFaqBtn.addEventListener("click", function () {
    sessionStorage.setItem("faq", "studentFaq");
    location.href = "./faq.html";
  });
});

// 登入註冊
const loginBtn = document.querySelector("#loginButton");

let navbarMemberBtns = document.querySelectorAll(".btn-member");
let navbarLogoutBtns = document.querySelectorAll(".btn-logout");

let navbarLoginBtns = document.querySelectorAll(".btn-login");
let navbarRegisterBtns = document.querySelectorAll(".btn-register");

// let isLogin = JSON.parse(localStorage.getItem("isLogin"));

function checkLogin() {
  if (isLogin == "1") {
    navbarMemberBtns.forEach(function (navbarMemberBtn) {
      navbarMemberBtn.style.display = "block";
    });
    navbarLogoutBtns.forEach(function (navbarLogoutBtn) {
      navbarLogoutBtn.style.display = "block";
    });

    navbarLoginBtns.forEach(function (navbarLoginBtn) {
      navbarLoginBtn.style.display = "none";
    });
    navbarRegisterBtns.forEach(function (navbarRegisterBtn) {
      navbarRegisterBtn.style.display = "none";
    });
  }
}

checkLogin();

// 聯絡老師
ClassicEditor.create(document.querySelector("#editor"), {
  placeholder: "說些什麼...",
  toolbar: ["uploadImage"],
})
  .then((res) => {})
  .catch((error) => {
    console.log(error);
  });

// 登出
navbarLogoutBtns.forEach(function (navbarLogoutBtn) {
  navbarLogoutBtn.addEventListener("click", function () {
    localStorage.clear();
    localStorage.setItem("isLogin", "0");
  });
});

// 點購物車圖示判斷有無登入
const toMyCartBtn = document.querySelectorAll(".js-toMyCart");

// 提示跳轉 login 頁面
function handleLoginModal() {
  // 設定倒數秒數
  let count = 5;
  let countdownActive = true;
  // 將秒數寫在指定元素中
  document.getElementById("timeBox").innerHTML = count;

  // 取得 btn-close 元素
  let closeBtnEl = document.querySelector("#btn-close");

  function countDown() {
    if (countdownActive) {
      // 當 count = 0 時跳轉頁面
      if (count == 0) {
        location.href = "./login.html";
      }

      // 將秒數寫在指定元素中
      document.getElementById("timeBox").innerHTML = count;
      // 每次執行就減1
      count -= 1;

      // 設定每秒執行1次

      setTimeout(countDown, 1000);
    }
  }

  // 監聽 close-btn 點擊事件
  closeBtnEl.addEventListener("click", function () {
    // 停止倒計時
    countdownActive = false;
  });

  // 執行 countDown
  countDown();
}

// 若未登入出現登入註冊 Modal
function myCartCheckLogin() {
  if (!isLogin) {
    toMyCartBtn.forEach((btn) => {
      btn.setAttribute("data-bs-toggle", "modal");

      btn.addEventListener("click", function () {
        handleLoginModal();
      });
    });
  } else {
    toMyCartBtn.forEach((btn) => {
      btn.setAttribute("href", "./cart.html");
    });
  }
}
myCartCheckLogin();
// 購物車: 產品數量提示

function renderCartNum() {
  const hasProductsEl = document.querySelectorAll("span.hasProducts");

  hasProductsEl.forEach(async (el) => {
    let cartNum = await getCartLength();

    el.textContent = cartNum ? `${cartNum}` : "";
  });
}
renderCartNum();

async function getCartLength() {
  try {
    // 取得課程長度
    const { data } = await axios.get(
      `${_url}/myCarts?userId=${userId}&status=purchase&isNextPurchase=false`
    );

    let cartNum = data.length;
    return cartNum;
  } catch (error) {
    console.log("getCartLength", error);
  }
}

export { getCartLength, renderCartNum, handleLoginModal };
