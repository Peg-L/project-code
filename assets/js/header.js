console.log("header 頁面開始");

let navbarMemberBtns = document.querySelectorAll(".btn-member");
let navbarLoginBtns = document.querySelectorAll(".btn-login");
let navbarRegisterBtns = document.querySelectorAll(".btn-register");

let isLogin = sessionStorage.getItem("isLogin");

function checkLogin() {
  if (isLogin === "1") {
    // alert("判斷成功");
    navbarMemberBtns.forEach(function (navbarMemberBtn) {
      navbarMemberBtn.style.display = "block";
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
