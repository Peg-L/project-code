import axios from "axios";
import {
  signInWithPopup,
  provider,
  auth,
  GoogleAuthProvider,
} from "./firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

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
  followList: [],
};

// 驗證狀態
let emailState = false;
let nameState = false;
let phoneState = false;
let passwordState = false;
let passwordCheckState = false;
let phoneVerifiedState = false;

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

    // 手機格式正確，才可點擊發送驗證碼
    sendCode.removeAttribute("disabled");
  } else {
    addIsInvalid(phoneInput);
    sendCode.setAttribute("disabled", "disabled");
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
// email 遮罩
function maskEmail(email) {
  let matches = email.match(/^(.)(.*)(.)@(.+)$/);

  // 保留最前面 1個字符和最後 2個字符，其他用 6 個星號代替
  let maskedPrefix = matches[1] + "******" + matches[3];

  let maskedEmail = maskedPrefix + "@" + matches[4];

  return maskedEmail;
}

function handleRegister(userInfo, isGoogle) {
  axios
    .post(`${_url}/users`, userInfo)
    .then((res) => {
      console.log(res.data);

      let userEmail = maskEmail(userInfo.email);
      const emailVerified = document.querySelector("#emailVerified");
      emailVerified.innerHTML = isGoogle
        ? ""
        : `<p class="mb-4">
我們已寄送一封帳號驗證信至您的信箱
<br />
${userEmail}
</p>
<p class="mb-10">
請點擊驗證信的「<strong>連結</strong>」來開通帳號
</p>
<div
class="text-center mb-2 d-flex justify-content-between align-items-center"
>
<span>沒收到信嗎?</span>
<button
  type="button"
  class="btn btn-outline-secondary2 rounded-1 py-2"
>
  重新寄送驗證信
</button>
</div>`;

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
    passwordCheckState &&
    phoneVerifiedState
  ) {
    registerBtn.removeAttribute("disabled");
  } else {
    registerBtn.setAttribute("disabled", "true");
  }
}
enableRegisterBtn();

registerBtn.addEventListener("click", function (event) {
  event.preventDefault();

  handleRegister(userInfo, false);
});

// google 註冊
const googleRegister = document.querySelector("#google-register");
if (googleRegister) {
  googleRegister.addEventListener("click", function () {
    // console.log("點擊註冊按鈕");

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);

        userInfo.email = user.email;
        userInfo.password = "00000000"; // 需要密碼才能 post 進 json server auth
        userInfo.user_name = user.email;
        userInfo.user_phone = user.phoneNumber;
        userInfo.user_avatar = user.photoURL;

        handleRegister(userInfo, true);
      })
      .catch((error) => {
        console.error(error);
      });
  });
}

// 驗證手機
const inputVerifyCode = document.querySelector("#inputVerifyCode");

window.recaptchaVerifier = new RecaptchaVerifier(auth, "verify-button", {
  size: "invisible",
  callback: (res) => {
    console.log("res：", res);
  },
});

function getPhoneFromInput() {
  const phoneValue = document.querySelector("#floatingTel").value;
  return phoneValue;
}

let phoneNumber;
const sendCode = document.querySelector("#sendCode");
const sendCodeSpinner = document.querySelector("#sendCodeSpinner");
const appVerifier = window.recaptchaVerifier;

sendCode.addEventListener("click", function () {
  sendCodeSpinner.classList.remove("d-none");

  phoneNumber = "+886" + getPhoneFromInput();

  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      console.log("手機驗證");
      inputVerifyCode.classList.remove("d-none");
      sendCodeSpinner.classList.add("d-none");

      window.confirmationResult = confirmationResult;
      console.log(window.confirmationResult);
    })
    .catch((error) => {
      if (
        error ==
        "FirebaseError: Firebase: Invalid format. (auth/invalid-phone-number)."
      ) {
        alert("手機格式不符，請重新輸入");
      }

      grecaptcha.reset(window.recaptchaWidgetId);

      // Or, if you haven't stored the widget ID:
      window.recaptchaVerifier.render().then(function (widgetId) {
        grecaptcha.reset(widgetId);
      });
    });
});

function getCodeFromUserInput() {
  const codeValue = document.querySelector("#floatingVerifyCode").value;
  return codeValue;
}

let code;
const verifyBtn = document.querySelector("#verify-button");

verifyBtn.addEventListener("click", function () {
  code = getCodeFromUserInput();

  confirmationResult
    .confirm(code)
    .then((result) => {
      const user = result.user;
      console.log("user", user);

      phoneVerifiedState = true;
      inputVerifyCode.classList.add("d-none");
      sendCode.textContent = "驗證成功";
      sendCode.setAttribute("disabled", "disabled");

      enableRegisterBtn();
    })
    .catch((error) => {
      console.log(error);
    });
});
