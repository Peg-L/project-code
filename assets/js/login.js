import { logInWithGoogle } from "./firebase";
import { userInfo } from "./register";

const loginButton = document.querySelector("#loginButton");

let emailLoginInput = document.querySelector("#floatingEmailLogin");
let passwordLoginInput = document.querySelector("#floatingPasswordLogin");
let emailValue;
let passwordValue;
let token = "";

function handleLogin(userInfo) {
  axios
    .post(`${_url}/login`, userInfo)
    .then((res) => {
      // console.log(res.data);
      token = res.data.accessToken;
      localStorage.setItem("accessToken", token);
      localStorage.setItem("userId", res.data.user.id);

      // 跳轉到首頁
      location.href = "./index.html";
      localStorage.setItem("isLogin", "1");
    })
    .catch((err) => {
      console.log(err);
    });
}

if (window.location.href.includes("login.html")) {
  loginButton.addEventListener("click", function () {
    emailValue = emailLoginInput.value;
    passwordValue = passwordLoginInput.value;

    userInfo.email = emailValue;
    userInfo.password = passwordValue;

    handleLogin(userInfo);
  });
}

// google 登入
const googleLogin = document.querySelector("#google-login");
if (googleLogin) {
  googleLogin.addEventListener("click", logInWithGoogle);
}

export { handleLogin };
