import"./backtotop-81d6d365.js";import"./account-b92f704f.js";import"./axios-21b846bc.js";const p=document.querySelector(".days"),v=document.querySelector(".current-date"),L=document.querySelectorAll(".icons span");let n=new Date().getFullYear(),t=new Date().getMonth();const k=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],m=()=>{let a=new Date(n,t,1).getDay(),o=new Date(n,t+1,0).getDate(),i=new Date(n,t,o).getDay(),y=new Date(n,t,0).getDate(),r="";for(let e=a;e>0;e--)r+=`<li class="inactive">${y-e+1}</li>`;for(let e=1;e<=o;e++){let l=e===new Date().getDate()&&t===new Date().getMonth()&&n===new Date().getFullYear()?"active":"",S=`${t+1}/${String(e).padStart(2,"0")}`;r+=`<li class="${l}" data-day="${S}">${e}</li>`}for(let e=i;e<6;e++)r+=`<li class="inactive">${e-i+1}</li>`;v.innerText=`${k[t]} ${n}`,p.innerHTML=r;const u=document.querySelectorAll(".days li"),D=e=>{u.forEach(l=>l.classList.remove("active")),e.classList.add("active")};u.forEach(e=>{e.addEventListener("click",l=>{D(l.currentTarget),l.target.getAttribute("data-day"),viewTimeCourse()})})};m();L.forEach(c=>{c.addEventListener("click",()=>{t=c.id==="prev"?t-1:t+1,(t<0||t>11)&&(n=c.id==="prev"?n-1:n+1,t=t<0?11:0),m()})});$.datepicker.setDefaults($.datepicker.regional["zh-TW"]);$(function(){$(".jq-appointmentDate").datepicker({minDate:0,maxDate:"+1M +10D",formatDate:"yy-mm-dd"})});$(function(){$(".jq-birthday").datepicker({changeMonth:!0,changeYear:!0})});const E=document.querySelectorAll("#largeFold"),d=document.querySelectorAll(".arrow"),T=document.querySelectorAll("#littleFold"),f=document.querySelectorAll(".plus");E.forEach((c,a)=>{c.addEventListener("click",o=>{d[a].classList.toggle("fa-chevron-up"),d[a].classList.toggle("fa-chevron-down")})});T.forEach((c,a)=>{c.addEventListener("click",o=>{f[a].classList.toggle("fa-plus"),f[a].classList.toggle("fa-minus")})});const h=document.querySelector(".faq-search-btn"),g=document.querySelector(".faq-search-input");let s="";console.log(s);h.addEventListener("click",w);function w(){s=g.value,s?(console.log("faqSearchValue 有值"),document.querySelectorAll(".faq-team").forEach(a=>{const o=a.querySelector(".faq-question");o&&(o.textContent.includes(s)?a.classList.remove("d-none"):a.classList.add("d-none"))})):(console.log("faqSearchValue 沒有值"),document.querySelectorAll(".faq-team").forEach(a=>{a.classList.remove("d-none")}))}document.addEventListener("keyup",function(c){c.key==="Enter"&&h.click()});const A=document.querySelector(".clear-input");A.addEventListener("click",function(){g.value=""});const M=document.querySelector("#teacher-tab"),b=document.querySelector("#student-tab"),q=sessionStorage.getItem("faq");q=="teacherFaq"?M.click():q=="studentFaq"&&b.click();