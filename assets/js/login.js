import {
  signInWithPopup,
  provider,
  auth,
  GoogleAuthProvider,
} from "./firebase";

import axios from "axios";

// 替 input 框加上警示或通過的樣式
function addIsInvalid(inputItem) {
  inputItem.classList.remove("is-valid");
  inputItem.classList.add("is-invalid");
  return;
}
function addIsValid(inputItem) {
  inputItem.classList.remove("is-invalid");
  inputItem.classList.add("is-valid");
}

// input 的值
let userInfo = {
  email: "",
  password: "",
  phone: "",
  name: "",
  role: "學生",
  title: "",
  avatar:
    "https://raw.githubusercontent.com/Peg-L/project-code/0a1e1a3dcd659bc9a4c72332f12ef660630a103e/assets/images/logo-img.svg",
  birthdate: "",
  gender: "",
  address: "",
  followList: [],
};

// 取得欄位值
function getValues(e) {
  const form = e.target.form;

  userInfo = {
    email: form.Email.value,
    password: form.密碼.value,
    phone: "",
    name: "",
    role: "學生",
    title: "",
    avatar: form.頭像
      ? form.頭像.value
      : "https://raw.githubusercontent.com/Peg-L/project-code/0a1e1a3dcd659bc9a4c72332f12ef660630a103e/assets/images/logo-img.svg",
    birthdate: "",
    gender: "",
    address: "",
    followList: [],
  };
}

const loginForm = document.querySelector("#loginForm");
const loginBtn = document.querySelector("#loginButton");
const login_inputs = document.querySelectorAll(
  "input[type=email], input[type=password]"
);

const pwd_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
// validate 欄位限制
const login_constraints = {
  Email: {
    presence: {
      message: "Email 為必填",
    },
    email: {
      message: "Email 格式不符",
    },
  },
  密碼: {
    presence: {
      message: "密碼為必填",
    },
    format: {
      pattern: pwd_pattern,
      message: "密碼格式不符",
    },
  },
};

let token = "";

// 登入表單驗證
function loginFormValidate() {
  login_inputs.forEach((login_input) => {
    login_input.addEventListener("change", function () {
      const login_inputName = login_input.name;
      document.querySelector(
        `p[data-message="${login_inputName}"]`
      ).textContent = "";

      let errors = validate(loginForm, login_constraints, {
        fullMessages: false,
      });

      // 驗證欄位
      if (errors) {
        // 欄位驗證未成功
        document.querySelector(
          `[data-message="${login_inputName}"]`
        ).textContent = errors[login_inputName];

        // 輸入狀態提示 (紅綠外框)
        if (errors[login_inputName] == undefined) {
          addIsValid(login_input);
        } else {
          addIsInvalid(login_input);
        }
        loginBtn.setAttribute("disabled", "true");
      } else {
        // 欄位驗證成功
        addIsValid(login_input);
        loginBtn.removeAttribute("disabled");
      }
    });
  });
}

if (loginForm) {
  loginFormValidate();

  loginBtn.addEventListener("click", function (e) {
    e.preventDefault();
    getValues(e);
    handleLogin(userInfo, false);
  });
}

// 會員登入
function handleLogin(userInfo, isGoogle) {
  axios
    .post(`${_url}/login`, userInfo)
    .then((res) => {
      console.log("handleLogin res", res);

      token = res.data.accessToken;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", res.data.user.id);
      localStorage.setItem("isLogin", "1");

      location.href = "./index.html";
    })
    .catch((err) => {
      console.log("登入問題 handleLogin", err);

      if (err.response.data == "Email and password are required") {
        Swal.fire({
          icon: "error",
          title: "請輸入帳號密碼",
          confirmButtonColor: "#115BC9",
          confirmButtonText: "OK",
        });
      } else if (err.response.data == "Cannot find user") {
        if (isGoogle) {
          // 註冊
          axios.post(`${_url}/users`, userInfo).then((res) => {
            console.log(res.data.user.id);
            // 新增新註冊的使用者相關資料
            // postNewUserRelatedData(res.data.user.id);
            handleLogin(userInfo, true);
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "查無此帳號",
            confirmButtonColor: "#115BC9",
            confirmButtonText: "OK",
          });
        }
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

// google 登入
const googleLogin = document.querySelector("#google-login");
if (googleLogin) {
  googleLogin.addEventListener("click", function () {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);

        token = credential.accessToken;
        localStorage.setItem("token", token);
        // The signed-in user info.
        const user = result.user;

        userInfo.email = user.email;
        userInfo.password = "00000000"; // 需要密碼才能 post 進 json server auth
        userInfo.name = user.displayName;
        userInfo.phone = user.phoneNumber;
        userInfo.avatar = user.photoURL;

        handleLogin(userInfo, true);
      })
      .catch((error) => {
        console.error(error);
      });
  });
}

//// 修改密碼
// const updatePasswordBtn = document.querySelector("#updatePassword");
// updatePasswordBtn.addEventListener("click", updatePassword);

// function updatePassword() {
//   const userId = localStorage.getItem("userId");
//   let token = localStorage.getItem("token");

//   axios
//     .patch(
//       `${_url}/600/users/${userId}`,
//       { password: "Bb222222" },
//       {
//         headers: {
//           authorization: `Bearer ${token}`,
//         },
//       }
//     )
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

export { handleLogin };
