import axios from "axios";
// import "./firebase";
import firebase from "./firebase";

const _url = "https://project-code-json-k0ti.onrender.com";

// 替 input 框加上警示或通過的樣式
function addIsInvalid(inputItem) {
  // console.log("失敗");
  inputItem.classList.remove("is-valid");
  inputItem.classList.add("is-invalid");
  return;
}
function addIsValid(inputItem) {
  // console.log("成功");
  inputItem.classList.remove("is-invalid");
  inputItem.classList.add("is-valid");
}

// 取得 input
let emailInput = document.querySelector("#floatingEmail");
let nameInput = document.querySelector("#floatingName");
let phoneInput = document.querySelector("#floatingTel");
let passwordInput = document.querySelector("#floatingPassword");
let passwordCheckInput = document.querySelector("#floatingCheckPassword");

// 監聽 input
emailInput.addEventListener("input", emailValidate);
nameInput.addEventListener("input", nameValidate);
phoneInput.addEventListener("input", phoneValidate);
passwordInput.addEventListener("input", passwordValidate);
passwordCheckInput.addEventListener("input", passwordCheckValidate);

// input 的值
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

// 驗證狀態
let emailState = false;
let nameState = false;
let phoneState = false;
let passwordState = false;
let passwordCheckState = false;

// 驗證格式
// - 驗證 email 格式
function emailValidate() {
  const emailValue = emailInput.value;
  userInfo.email = emailValue;

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (emailRegex.test(emailValue)) {
    addIsValid(emailInput);
    emailState = true;
  } else {
    addIsInvalid(emailInput);
  }

  enableRegisterBtn();
}

// - 驗證 姓名 格式
function nameValidate() {
  const nameValue = nameInput.value;
  userInfo.user_name = nameValue;

  const nameRegex = /^.{1,20}$/;

  if (nameRegex.test(nameValue)) {
    addIsValid(nameInput);
    nameState = true;
  } else {
    addIsInvalid(nameInput);
  }

  enableRegisterBtn();
}

// - 驗證 手機 格式
function phoneValidate() {
  const phoneValue = phoneInput.value;
  userInfo.user_phone = phoneValue;

  const phoneRegex = /^09\d{8}$/;

  if (phoneRegex.test(phoneValue)) {
    addIsValid(phoneInput);
    phoneState = true;
  } else {
    addIsInvalid(phoneInput);
  }

  enableRegisterBtn();
}

// - 驗證 密碼 格式
function passwordValidate() {
  const passwordValue = passwordInput.value;
  userInfo.password = passwordValue;

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  if (passwordRegex.test(passwordValue)) {
    addIsValid(passwordInput);
    passwordState = true;
  } else {
    addIsInvalid(passwordInput);
  }

  enableRegisterBtn();
}

function passwordCheckValidate() {
  let passwordValue = passwordInput.value;
  let passwordCheckValue = passwordCheckInput.value;
  console.log("passwordCheckValue：", passwordCheckValue);

  if (passwordCheckValue == passwordValue && passwordCheckValue) {
    addIsValid(passwordCheckInput);
    passwordCheckState = true;
  } else {
    addIsInvalid(passwordCheckInput);
  }

  enableRegisterBtn();
}

// 註冊
function handleRegister(userInfo) {
  axios
    .post(`${_url}/users`, userInfo)
    .then((res) => {
      console.log(res.data);

      const registerSuccessModal = new bootstrap.Modal("#registerSuccess");
      registerSuccessModal.show();
    })
    .catch((err) => {
      console.error(err);

      if (err.response.data == "Email already exists") {
        Swal.fire({
          icon: "error",
          title: "此帳號已註冊",
          text: "請前往登入頁面或註冊新帳號",
        });
      }
    });
}

// 送出按鈕
const registerBtn = document.querySelector("#registerBtn");

function enableRegisterBtn() {
  if (
    emailState &&
    nameState &&
    phoneState &&
    passwordState &&
    passwordCheckState
  ) {
    registerBtn.removeAttribute("disabled");
  } else {
    registerBtn.setAttribute("disabled", "true");
  }
}
enableRegisterBtn();

registerBtn.addEventListener("click", function (event) {
  event.preventDefault();

  handleRegister(userInfo);
});

// google 註冊
const googleRegister = document.querySelector("#google-register");
if (googleRegister) {
  googleRegister.addEventListener("click", function () {
    // console.log("點擊註冊按鈕");

    firebase
      .signInWithPopup(firebase.auth, firebase.provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential =
          firebase.GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;

        userInfo.email = user.email;
        userInfo.password = "00000000"; // 需要密碼才能 post 進 json server auth
        userInfo.user_name = user.email;
        userInfo.user_phone = user.phoneNumber;
        userInfo.user_avatar = user.photoURL;

        handleRegister(userInfo);
      })
      .catch((error) => {
        console.error(error);
      });
  });
}
