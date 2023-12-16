import{c as f,a as d,i as l}from"./backtotop-407cb22f.js";import"./openTime-482ad5b4.js";import{h as p}from"./startCourse-732c2962.js";const y=new URLSearchParams(window.location.search),u=y.get("courseId");let e=[];const b=document.querySelector("#teacherImg"),v=document.querySelector("#teacher_name"),S=document.querySelector("#course_title"),w=document.querySelector("#courseClass"),$=document.querySelector("#course_info"),q=document.querySelector("#teacher_degree"),x=document.querySelector("#teacher_experience"),D=document.querySelector("#language"),L=document.querySelector("#level"),j=document.querySelector("#intro"),k=document.querySelector("#youCanGet"),C=document.querySelector("#PreviousWeek"),P=document.querySelector("#NextWeek");function M(){d.get(`https://project-code-json-k0ti.onrender.com/courses/${u.toString()}?_expand=teacher`).then(function(c){let s="";e=c.data,b.setAttribute("src",e.teacher.avatar),v.textContent=e.teacher.name,S.textContent=e.name,w.textContent=e.topics,$.textContent=e.info,q.textContent=e.teacher.education,x.textContent=e.teacher.experience,D.textContent=e.teacher.lang.join("/"),L.textContent=e.level,j.innerHTML=e.teacher.intro.replace(/\r\n\r\n/g,"<br><br>"),console.log(e.teacher.intro),e.mainPoints.forEach(o=>{s+=`<li class="list-decorate ps-4 position-relative">
          ${o}
        </li>`}),k.innerHTML=s,m(),_()})}function m(){document.querySelectorAll(".calendar-time").forEach(r=>{let t=r.getAttribute("data-num"),n=o(t),a="";n.length!==0&&(n[0].time.forEach(i=>{n[0].useTime.find(h=>i===h)?a+=`<li><a class="text-primary deleteDefault" href=''>${i}</a></li>`:a+=`<li><a href=''  class="deleteDefault">${i}</a></li>`}),r.innerHTML=a)}),document.querySelectorAll(".deleteDefault").forEach(r=>{r.addEventListener("click",t=>{t.preventDefault()})});function o(r){return e.teacher.openTime.filter(t=>t.date===r)}}M();C.addEventListener("click",()=>{m()});P.addEventListener("click",()=>{m()});const g=document.querySelector(".js-appointList");p(g);async function _(){try{const c=`https://project-code-json-k0ti.onrender.com/coupons?courseId=${u.toString()}`,o=(await d.get(c)).data,{price:r}=e,t=[{quantity:1,price:r,duration:e.duration},...o.filter(n=>n.discountCourseNum>1).map(n=>({quantity:n.discountCourseNum,price:parseInt(r)*parseFloat(n.discount),duration:e.duration}))];E(t)}catch(c){console.log("getDiscountedPrices",c)}}function E(c){const s=/\B(?=(?:\d{3})+(?!\d))/g;let o=c.map(t=>`<li
  class="py-4 d-flex justify-content-between align-items-center border-bottom border-gray-200"
>
  <div>
    <p class="fs-4 fw-bold">NT$ ${t.price.toString().replace(s,",")}</p>
    <p>${t.quantity} 堂 ${t.duration} 分鐘</p>
  </div>
  <a type="button" class="btn btn-text" 
      data-course="${u}" 
      ${t.quantity>1?`data-quantity="${t.quantity}"`:""} 
      data-bs-target="#loginModal"
      ${l?"":'data-bs-toggle="modal"'}
    >立即預約</a
  >
</li>`).join("");o+=`<li
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
    ${l?'data-bs-toggle="offcanvas"':'data-bs-toggle="modal"'}
  >
    立即洽談
  </button>
</li>`,g.innerHTML=o}const B=f.replace(/html.*/,"html");d.get("https://project-code-json-k0ti.onrender.com/courses?_expand=teacher").then(c=>{let r=c.data.filter(a=>a.badges.includes("熱門")).slice(0,7),t="";const n=document.querySelector(".recommend-swiper");r.forEach(a=>{t+=`<div class="card teacher-card swiper-slide">
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
        ${l?"":'data-bs-toggle="modal"'}
      >
        立即上課
      </a>
      <a
        href="${B}?courseId=${a.id}"
        type="button"
        class="btn teacher-card-btn"
        >查看介紹</a
      >
    </div>
  </div>`}),n.innerHTML=t});p(document.querySelector(".recommend-swiper"));const T=document.querySelector("#redirectPopular");T.addEventListener("click",function(){localStorage.setItem("redirectToPopular",!0)});new Swiper(".recommendSwiper",{slidesPerView:1,spaceBetween:16,navigation:{nextEl:".recommendSwiper-button-next",prevEl:".recommendSwiper-button-prev"},pagination:{el:".recommendSwiper-pagination",clickable:!0,dynamicBullets:!0,dynamicMainBullets:5},breakpoints:{768:{slidesPerView:2,spaceBetween:20,pagination:{dynamicMainBullets:3}},992:{slidesPerView:3,spaceBetween:24,pagination:{dynamicMainBullets:3}}}});
