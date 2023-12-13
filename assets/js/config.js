const _url = "https://project-code-json-k0ti.onrender.com";
// const _url = "http://localhost:3000";
const userId = localStorage.getItem("userId");
// 取得 登入狀態
const isLogin = JSON.parse(localStorage.getItem("isLogin"));
// console.log("isLogin", isLogin);

// 目前網址
const currentURL = window.location.href;

export { userId, isLogin, currentURL };
