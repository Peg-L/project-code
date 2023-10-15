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

// 取得 input
let emailInput = document.querySelector("#floatingEmail");
let nameInput = document.querySelector("#floatingName");
let phoneInput = document.querySelector("#floatingTel");
let passwordInput = document.querySelector("#floatingPassword");
let passwordCheckInput = document.querySelector("#floatingCheckPassword");



// 監聽 input
if (window.location.href.includes("register.html")) {
  emailInput.addEventListener("input", emailValidate);
  nameInput.addEventListener("input", nameValidate);
  phoneInput.addEventListener("input", phoneValidate);
  passwordInput.addEventListener("input", passwordValidate);
  passwordCheckInput.addEventListener("input", passwordCheckValidate);
}

// input 的值
let emailValue;
let passwordValue;
let phoneValue;
let nameValue;

// 驗證狀態
let emailState = false;
let nameState = false;
let phoneState = false;
let passwordState = false;
let passwordCheckState = false;

// 驗證格式
// - 驗證 email 格式
function emailValidate() {
  emailValue = emailInput.value;
  
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (emailRegex.test(emailValue)) {
    addIsValid(emailInput);
    emailState = true;
  } else {
    addIsInvalid(emailInput);
  }
}

// - 驗證 姓名 格式
function nameValidate() {
  nameValue = nameInput.value;

  const nameRegex = /^.{1,20}$/;

  if (nameRegex.test(nameValue)) {
    addIsValid(nameInput);
    nameState = true;
  } else {
    addIsInvalid(nameInput);
  }
}

// - 驗證 手機 格式
function phoneValidate() {
  phoneValue = phoneInput.value;
  console.log("phoneValue：", phoneValue);

  const phoneRegex = /^09\d{8}$/;

  if (phoneRegex.test(phoneValue)) {
    addIsValid(phoneInput);
    phoneState = true;
  } else {
    addIsInvalid(phoneInput);
  }
}

// - 驗證 密碼 格式
function passwordValidate() {
  passwordValue = passwordInput.value;
  console.log("passwordValue：", passwordValue);

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  if (passwordRegex.test(passwordValue)) {
    addIsValid(passwordInput);
    passwordState = true;
  } else {
    addIsInvalid(passwordInput);
  }
}

function passwordCheckValidate() {
  let passwordValue = passwordInput.value;
  let passwordCheckValue = passwordCheckInput.value;
  console.log("passwordCheckValue：", passwordCheckValue);

  if (passwordCheckValue == passwordValue) {
    addIsValid(passwordCheckInput);
    passwordCheckState = true;
  } else {
    addIsInvalid(passwordCheckInput);
  }
}

// 送出按鈕
const registerBtn = document.querySelector("#registerBtn");

if (window.location.href.includes("register.html")) {
registerBtn.addEventListener("click", function (event) {
  event.preventDefault();
  if (
    emailState &&
    nameState &&
    phoneState &&
    passwordState &&
    passwordCheckState
  ) {
    
    axios
      .post(`${_url}/users`, {
      "email": emailValue,
      "password": passwordValue,
      "user_phone": phoneValue,
      "user_name": nameValue,
      "user_role": "學生",
      "user_title": "",
      "user_avatar": "",
      "user_birthdate": "",
      "user_gender": "",
      "user_address": ""
      })
      .then((res) => {
        console.log(res.data);
        const registerSuccessModal = new bootstrap.Modal("#registerSuccess");
        registerSuccessModal.show();
      }).catch((err)=> {
        alert(err.data.message)
      });
  } else {
    alert("註冊失敗，請確認資料格式");
    return;
  }
});
}