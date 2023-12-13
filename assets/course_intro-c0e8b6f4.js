import{c as h,a as l,i}from"./backtotop-9d7c375e.js";import"./openTime-482ad5b4.js";import{h as m}from"./startCourse-5023c858.js";const y=new URLSearchParams(window.location.search),d=y.get("courseId");let e=[];const b=document.querySelector("#teacherImg"),f=document.querySelector("#teacher_name"),v=document.querySelector("#course_title"),w=document.querySelector("#courseClass"),S=document.querySelector("#course_info"),x=document.querySelector("#teacher_degree"),$=document.querySelector("#teacher_experience"),q=document.querySelector("#language"),j=document.querySelector("#level"),k=document.querySelector("#intro"),C=document.querySelector("#PreviousWeek"),L=document.querySelector("#NextWeek");function P(){l.get(`https://project-code-json-k0ti.onrender.com/courses/${d.toString()}?_expand=teacher`).then(function(c){e=c.data,b.setAttribute("src",e.teacher.avatar),f.textContent=e.teacher.name,v.textContent=e.name,w.textContent=e.topics,S.textContent=e.info,x.textContent=e.teacher.education,$.textContent=e.teacher.experience,q.textContent=e.teacher.lang.join("/"),j.textContent=e.level,k.textContent=e.teacher.intro,u(),_()})}function u(){document.querySelectorAll(".calendar-time").forEach(r=>{let o=r.getAttribute("data-num"),t=s(o),n="";t.length!==0&&(t[0].time.forEach(a=>{t[0].useTime.find(g=>a===g)?n+=`<li><a class="text-primary" href=''>${a}</a></li>`:n+=`<li><a href=''>${a}</a></li>`}),r.innerHTML=n)});function s(r){return e.teacher.openTime.filter(o=>o.date===r)}}P();C.addEventListener("click",()=>{u()});L.addEventListener("click",()=>{u()});const p=document.querySelector(".js-appointList");m(p);async function _(){try{const c=`https://project-code-json-k0ti.onrender.com/coupons?courseId=${d.toString()}`,r=(await l.get(c)).data,{price:o}=e,t=[{quantity:1,price:o,duration:e.duration},...r.filter(n=>n.discountCourseNum>1).map(n=>({quantity:n.discountCourseNum,price:parseInt(o)*parseFloat(n.discount),duration:e.duration}))];B(t)}catch(c){console.log("getDiscountedPrices",c)}}function B(c){const s=/\B(?=(?:\d{3})+(?!\d))/g;let r=c.map(t=>`<li
  class="py-4 d-flex justify-content-between align-items-center border-bottom border-gray-200"
>
  <div>
    <p class="fs-4 fw-bold">NT$ ${t.price.toString().replace(s,",")}</p>
    <p>${t.quantity} 堂 ${t.duration} 分鐘</p>
  </div>
  <a type="button" class="btn btn-text" 
      data-course="${d}" 
      ${t.quantity>1?`data-quantity="${t.quantity}"`:""} 
      data-bs-target="#loginModal"
      ${i?"":'data-bs-toggle="modal"'}
    >立即預約</a
  >
</li>`).join("");r+=`<li
  class="py-4 d-flex justify-content-between align-items-center"
>
  <div>
    <p class="fs-4 fw-bold">洽談報價</p>
    <p>客製化課程/專案製作</p>
  </div>
  <button
    type="button"
    class="btn btn-text"
    data-bs-toggle="offcanvas"
    data-bs-target="#message-mike"
    aria-controls="message-mike"
    aria-current="page"
    data-bs-target="#message-list"
    aria-controls="#message-list"
    data-bs-target="#loginModal"
    ${i?'data-bs-toggle="offcanvas"':'data-bs-toggle="modal"'}
  >
    立即洽談
  </button>
</li>`,p.innerHTML=r}const M=h.replace(/html.*/,"html");l.get("https://project-code-json-k0ti.onrender.com/courses?_expand=teacher").then(c=>{let o=c.data.filter(a=>a.badges.includes("熱門")).slice(0,7),t="";const n=document.querySelector(".recommend-swiper");o.forEach(a=>{t+=`<div class="card teacher-card swiper-slide">
    <div class="card-body d-flex justify-content-between">
      <div>
        <h5 class="card-title teacher-card-title truncate-lines-2">${a.name}
        </h5>
        <p class="teacher-card-name">${a.teacher.name}</p>
        <ul class="teacher-card-object">
          <li class="teacher-card-evaluate">${a.rate}</li>
          <li class="teacher-card-hours">50分鐘</li>
        </ul>
        <p class="teacher-card-price">NT$<span>${a.price}</span></p>
      </div>
      <div class="teacher-card-img">
        <img
          src="${a.teacher.avatar}"
          alt="老師"
          class="w-100px w-sm-120px"
        />
      </div>
    </div>
    <div>
      <p class="teacher-card-text">
      ${a.info}
      </p>
      <a
        type="button"
        class="btn btn-secondary2 w-100 mb-3"
        data-course="${a.id}"
        data-bs-target="#loginModal"
        ${i?"":'data-bs-toggle="modal"'}
      >
        立即上課
      </a>
      <a
        href="${M}?courseId=${a.id}"
        type="button"
        class="btn teacher-card-btn"
        >查看介紹</a
      >
    </div>
  </div>`}),n.innerHTML=t});m(document.querySelector(".recommend-swiper"));const D=document.querySelector("#redirectPopular");D.addEventListener("click",function(){localStorage.setItem("redirectToPopular",!0)});new Swiper(".recommendSwiper",{slidesPerView:1,spaceBetween:16,navigation:{nextEl:".recommendSwiper-button-next",prevEl:".recommendSwiper-button-prev"},pagination:{el:".recommendSwiper-pagination",clickable:!0,dynamicBullets:!0,dynamicMainBullets:5},breakpoints:{768:{slidesPerView:2,spaceBetween:20,pagination:{dynamicMainBullets:3}},992:{slidesPerView:3,spaceBetween:24,pagination:{dynamicMainBullets:3}}}});
