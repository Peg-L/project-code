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
  .then((res) => {})
  .catch((error) => {
    console.log(error);
  });

// 登出
navbarLogoutBtns.forEach(function (navbarLogoutBtn) {
  navbarLogoutBtn.addEventListener("click", function () {
    localStorage.clear();
  });
});

// 購物車: 產品數量提示
const hasProductsEl = document.querySelector("span.hasProducts");

let cartNum = 0;

if (hasProductsEl) {
  await getCartLength();

  hasProductsEl.innerHTML = cartNum > 0 ? `${cartNum}` : "";
}

async function getCartLength() {
  try {
    // 取得課程長度
    const { data } = await axios.get(
      `${_url}/myCarts?userId=${userId}&isPurchased=${false}`
    );
    cartNum = data.length;
  } catch (error) {
    console.log("getMyCart", error);
  }
}
