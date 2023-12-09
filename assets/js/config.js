// const _url = "https://project-code-json-k0ti.onrender.com";
const _url = "http://localhost:3000";
const userId = localStorage.getItem("userId");
// 取得 登入狀態
const isLogin = JSON.parse(localStorage.getItem("isLogin"));

// 防止 input 按 enter 的預設行為
function inputPreventEnter(element) {
  const inputs = element.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
      }
    });
  });
}
