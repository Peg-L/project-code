import { Modal } from "bootstrap";
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

let isLogin = JSON.parse(localStorage.getItem("isLogin"));

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

toMyCartBtn.forEach((btn) => {
  btn.addEventListener("click", checkLoginModal);
});

// 若未登入出現登入註冊 Modal
function checkLoginModal() {
  const loginModal = new Modal("#loginModal");
  isLogin ? (location.href = "./cart.html") : loginModal.show();
}
