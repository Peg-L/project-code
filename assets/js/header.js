const loginBtn = document.querySelector("#loginButton");

let navbarMemberBtns = document.querySelectorAll(".btn-member");
let navbarLogoutBtns = document.querySelectorAll(".btn-logout");

let navbarLoginBtns = document.querySelectorAll(".btn-login");
let navbarRegisterBtns = document.querySelectorAll(".btn-register");

let isLogin = localStorage.getItem("isLogin");

function checkLogin() {
  if (isLogin === "1") {
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
  .then((res) => {
    console.log("success");
  })
  .catch((error) => {
    console.log(error);
  });

// 登出
navbarLogoutBtns.forEach(function (navbarLogoutBtn) {
  navbarLogoutBtn.addEventListener("click", function () {
    localStorage.clear();
  });
});
