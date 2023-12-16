import {
  signInWithPopup,
  provider,
  auth,
  GoogleAuthProvider,
} from "./firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { handleLogin } from "./login";
import axios from "axios";

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
    phone: form.手機.value,
    name: form.姓名.value,
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

// 註冊表單驗證
const registerBtn = document.querySelector("#registerBtn");

// 表單驗證
const phone_pattern = /^09\d{8}$/;
const pwd_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const verifyCode_pattern = /^\d{6}$/;

// validate 欄位限制
const register_constraints = {
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
  確認密碼: {
    presence: {
      message: "確認密碼為必填",
    },
    equality: {
      attribute: "密碼",
      message: "確認密碼與密碼不符",
    },
  },
  手機: {
    presence: {
      message: "手機為必填",
    },
    format: {
      pattern: phone_pattern,
      message: "手機格式不符",
    },
  },
  驗證碼: {
    presence: {
      message: "驗證碼為必填",
    },
    format: {
      pattern: verifyCode_pattern,
      message: "驗證碼格式不符",
    },
  },
  姓名: {
    presence: {
      message: "姓名為必填",
    },
  },
};

// 註冊
const registerForm = document.querySelector("#registerForm");
const register_inputs = document.querySelectorAll(
  "input[type=email], input[type=text], input[type=tel], input[type=password]"
);

// 註冊表單驗證
function registerFormValidate() {
  register_inputs.forEach((register_input) => {
    register_input.addEventListener("change", function () {
      const register_inputName = register_input.name;
      document.querySelector(
        `p[data-message="${register_inputName}"]`
      ).textContent = "";

      let errors = validate(registerForm, register_constraints, {
        fullMessages: false,
      });

      // 驗證欄位
      if (errors) {
        // 欄位驗證未成功
        document.querySelector(
          `[data-message="${register_inputName}"]`
        ).textContent = errors[register_inputName];

        registerBtn.setAttribute("disabled", "true");

        // 輸入狀態提示 (紅綠外框)
        if (!errors[register_inputName]) {
          addIsValid(register_input);
        } else {
          addIsInvalid(register_input);
        }
      } else {
        // 欄位驗證成功
        addIsValid(register_input);
        registerBtn.removeAttribute("disabled");
      }

      // 手機格式正確，啟用發送驗證碼
      const phoneInput = document.querySelector('[name="手機"]');
      if (phone_pattern.test(phoneInput.value)) {
        sendCode.removeAttribute("disabled");
      } else {
        sendCode.setAttribute("disabled", "disabled");
      }
    });
  });
}
registerFormValidate();

// - 驗證 手機
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
  let phone = getPhoneFromInput();
  phoneNumber = "+886" + phone;

  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      inputVerifyCode.classList.remove("d-none");
      sendCodeSpinner.classList.add("d-none");

      window.confirmationResult = confirmationResult;
      console.log(window.confirmationResult);
    })
    .catch((error) => {
      console.log("signInWithPhoneNumber error", error);

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
const verifySuccessMsg = document.querySelector("#verifySuccessMsg");

verifyBtn.addEventListener("click", function () {
  code = getCodeFromUserInput();

  confirmationResult
    .confirm(code)
    .then((result) => {
      const user = result.user;

      inputVerifyCode.classList.add("d-none");
      verifySuccessMsg.classList.remove("d-none");
      sendCode.classList.add("d-none");
    })
    .catch((error) => {
      console.log("confirm error", error);
    });
});
// ----- 驗證 手機 end

registerBtn.addEventListener("click", function (event) {
  event.preventDefault();
  getValues(event);

  handleRegister(userInfo, false);
});

// email 遮罩
function maskEmail(email) {
  let matches = email.match(/^(.)(.*)(.)@(.+)$/);

  // 保留最前面 1個字符和最後 2個字符，其他用 6 個星號代替
  let maskedPrefix = matches[1] + "******" + matches[3];

  let maskedEmail = maskedPrefix + "@" + matches[4];

  return maskedEmail;
}

// 新增新註冊的使用者相關資料(獲得優惠券、使用者上課紀錄容器)
async function postNewUserRelatedData(userId) {
  try {
    const headers = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let timestamp = Date.now(); //毫秒
    // 到期日的 23:59:59 過期
    let dueDate = new Date(timestamp);
    dueDate.setDate(dueDate.getDate() + 30);
    dueDate.setHours(23, 59, 59, 999);
    // 優惠券
    const couponData = {
      userId,
      couponId: 1,
      canUse: true,
      timestamp,
      dueDate,
    };
    // 使用者上課紀錄容器
    const userCourseData = {
      userId,
      purchased: [],
      attendTime: [],
    };
    await Promise.all([
      axios.post(`${_url}/myCoupons`, couponData, headers),
      axios.post(`${_url}/user_courses`, userCourseData, headers),
    ]);
  } catch (error) {
    console.log("postNewUserRelatedData", error);
  }
}

// 會員註冊 API
function handleRegister(userInfo, isGoogle) {
  axios
    .post(`${_url}/users`, userInfo)
    .then((res) => {
      // 處理 "註冊成功 modal" 內容
      let userEmail = maskEmail(userInfo.email);
      const emailVerified = document.querySelector("#emailVerified");
      emailVerified.innerHTML = `<p class="mb-4">
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

      // 新增新註冊的使用者相關資料
      postNewUserRelatedData(res.data.user.id);

      if (isGoogle) {
        // google 註冊完直接登入
        handleLogin(userInfo, true);
      } else {
        handleLogin(userInfo, false);
        // // 一般註冊跳 modal
        // const registerSuccessModal = new bootstrap.Modal("#registerSuccess");
        // registerSuccessModal.show();
      }
    })
    .catch((err) => {
      console.error("handleRegister error", err);
      if (err.response.data == "Email already exists") {
        if (isGoogle) {
          // 使用 google 註冊但已有帳戶，直接登入
          console.log("轉 google 登入");

          handleLogin(userInfo, true);
        } else {
          // 使用手動註冊但已有帳戶，跳警示
          Swal.fire({
            icon: "error",
            title: "此帳號已註冊",
            text: "請前往登入頁面或註冊新帳號",
          });
        }
      }
    });
}

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
        console.log("user", user);

        userInfo.email = user.email;
        userInfo.password = "00000000"; // 需要密碼才能 post 進 json server auth
        userInfo.name = user.displayName;
        userInfo.phone = user.phoneNumber;
        userInfo.avatar = user.photoURL;

        handleRegister(userInfo, true);
      })
      .catch((error) => {
        console.error(error);
      });
  });
}
