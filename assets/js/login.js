import firebase from "./firebase";
const _url = "https://project-code-json-k0ti.onrender.com";
const loginButton = document.querySelector("#loginButton");

let emailLoginInput = document.querySelector("#floatingEmailLogin");
let passwordLoginInput = document.querySelector("#floatingPasswordLogin");
let emailLoginValue;
let passwordLoginValue;

const userInfo = {
  email: "",
  password: "",
  user_phone: "",
  user_name: "",
  user_role: "學生",
  user_title: "",
  user_avatar: "",
  user_birthdate: "",
  user_gender: "",
  user_address: "",
};
let token = "";

function handleLogin(userInfo) {
  axios
    .post(`${_url}/login`, userInfo)
    .then((res) => {
      // console.log(res.data);

      localStorage.setItem("userId", res.data.user.id);

      // 跳轉到首頁
      location.href = "./index.html";
      localStorage.setItem("isLogin", "1");
    })
    .catch((err) => {
      console.error(err);

      if (err.response.data == "Email and password are required") {
        Swal.fire({
          icon: "error",
          title: "請輸入帳號密碼",
          confirmButtonColor: "#115BC9",
          confirmButtonText: "OK",
        });
      } else if (err.response.data == "Cannot find user") {
        Swal.fire({
          icon: "error",
          title: "查無此帳號",
          confirmButtonColor: "#115BC9",
          confirmButtonText: "OK",
        });
      } else if (err.response.data == "Incorrect password") {
        Swal.fire({
          icon: "error",
          title: "密碼錯誤",
          confirmButtonColor: "#115BC9",
          confirmButtonText: "OK",
        });
      }
    });
}

if (window.location.href.includes("login.html")) {
  loginButton.addEventListener("click", function () {
    emailLoginValue = emailLoginInput.value;
    passwordLoginValue = passwordLoginInput.value;

    userInfo.email = emailLoginValue;
    userInfo.password = passwordLoginValue;

    handleLogin(userInfo);
  });
}

// google 登入
const googleLogin = document.querySelector("#google-login");
if (googleLogin) {
  googleLogin.addEventListener("click", function () {
    console.log("點擊按鈕");

    firebase
      .signInWithPopup(firebase.auth, firebase.provider)
      .then((result) => {
        const credential =
          firebase.GoogleAuthProvider.credentialFromResult(result);

        token = credential.accessToken;
        localStorage.setItem("accessToken", token);
        // The signed-in user info.
        const user = result.user;

        userInfo.email = user.email;
        userInfo.password = "00000000"; // 需要密碼才能 post 進 json server auth

        handleLogin(userInfo);
      })
      .catch((error) => {
        console.error(error);
      });
  });
}
