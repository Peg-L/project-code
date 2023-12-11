// import { Modal } from "bootstrap";
import axios from "axios";
import { userId } from "./config";

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

// 若未登入出現登入註冊 Modal
function myCartCheckLogin() {
  // const loginModal = new bootstrap.Modal("#loginModal");
  // isLogin ? (location.href = "./cart.html") : loginModal.show();
  if (!isLogin) {
    toMyCartBtn.forEach((btn) => {
      btn.setAttribute("data-bs-toggle", "modal");
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

export { getCartLength, renderCartNum };
