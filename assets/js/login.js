const loginButton = document.querySelector("#loginButton");

let emailLoginInput = document.querySelector("#floatingEmailLogin");
let passwordLoginInput = document.querySelector("#floatingPasswordLogin");
let emailValue;
let passwordValue;
let token = "";

if (window.location.href.includes("login.html")) {
  loginButton.addEventListener("click", function(){
    emailValue = emailLoginInput.value;
    passwordValue = passwordLoginInput.value;
    console.log(emailValue, passwordValue);
    
    axios.post(`${_url}/login`, {
      "email": emailValue,
      "password": passwordValue
    }).then(res=>{
      console.log(res.data);
      token = res.data.accessToken
      localStorage.setItem("accessToken",token);
      localStorage.setItem("userId",res.data.user.id);

      // 跳轉到首頁
      location.href = "./index.html";
      localStorage.setItem("isLogin", "1");
    }).catch(err=> {
      console.log(err);
    });
  })
}