import"./backtotop-46b93ac6.js";import{s as c,G as u,p as d,a as g}from"./firebase-9e2df465.js";const m=document.querySelector("#loginButton");let f=document.querySelector("#floatingEmailLogin"),p=document.querySelector("#floatingPasswordLogin"),r,a;const t={email:"",password:"",user_phone:"",user_name:"",user_role:"學生",user_title:"",user_avatar:"",user_birthdate:"",user_gender:"",user_address:""};let n="";function l(o){axios.post("http://localhost:3000/login",o).then(e=>{n=e.data.accessToken,console.log(n),localStorage.setItem("token",n),localStorage.setItem("userId",e.data.user.id),location.href="./index.html",localStorage.setItem("isLogin","1")}).catch(e=>{console.log(e),e.response.data=="Email and password are required"?Swal.fire({icon:"error",title:"請輸入帳號密碼",confirmButtonColor:"#115BC9",confirmButtonText:"OK"}):e.response.data=="Cannot find user"?Swal.fire({icon:"error",title:"查無此帳號",confirmButtonColor:"#115BC9",confirmButtonText:"OK"}):e.response.data=="Incorrect password"&&Swal.fire({icon:"error",title:"密碼錯誤",confirmButtonColor:"#115BC9",confirmButtonText:"OK"})})}window.location.href.includes("login.html")&&m.addEventListener("click",function(){r=f.value,a=p.value,t.email=r,t.password=a,l(t)});const i=document.querySelector("#google-login");i&&i.addEventListener("click",function(){console.log("點擊按鈕"),c(g,d).then(o=>{n=u.credentialFromResult(o).accessToken,localStorage.setItem("token",n);const s=o.user;t.email=s.email,t.password="00000000",l(t)}).catch(o=>{console.error(o)})});
