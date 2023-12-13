import{c as f,a as d,i as l}from"./backtotop-7745fe90.js";import"./openTime-482ad5b4.js";import{h as p}from"./startCourse-d2005fda.js";const y=new URLSearchParams(window.location.search),u=y.get("courseId");let t=[];const b=document.querySelector("#teacherImg"),v=document.querySelector("#teacher_name"),w=document.querySelector("#course_title"),S=document.querySelector("#courseClass"),x=document.querySelector("#course_info"),$=document.querySelector("#teacher_degree"),q=document.querySelector("#teacher_experience"),D=document.querySelector("#language"),j=document.querySelector("#level"),k=document.querySelector("#intro"),L=document.querySelector("#PreviousWeek"),C=document.querySelector("#NextWeek");function P(){d.get(`https://project-code-json-k0ti.onrender.com/courses/${u.toString()}?_expand=teacher`).then(function(r){t=r.data,b.setAttribute("src",t.teacher.avatar),v.textContent=t.teacher.name,w.textContent=t.name,S.textContent=t.topics,x.textContent=t.info,$.textContent=t.teacher.education,q.textContent=t.teacher.experience,D.textContent=t.teacher.lang.join("/"),j.textContent=t.level,k.textContent=t.teacher.intro,m(),_()})}function m(){document.querySelectorAll(".calendar-time").forEach(c=>{let e=c.getAttribute("data-num"),n=o(e),a="";n.length!==0&&(n[0].time.forEach(i=>{n[0].useTime.find(h=>i===h)?a+=`<li><a class="text-primary deleteDefault" href=''>${i}</a></li>`:a+=`<li><a href=''  class="deleteDefault">${i}</a></li>`}),c.innerHTML=a)}),document.querySelectorAll(".deleteDefault").forEach(c=>{c.addEventListener("click",e=>{e.preventDefault()})});function o(c){return t.teacher.openTime.filter(e=>e.date===c)}}P();L.addEventListener("click",()=>{m()});C.addEventListener("click",()=>{m()});const g=document.querySelector(".js-appointList");p(g);async function _(){try{const r=`https://project-code-json-k0ti.onrender.com/coupons?courseId=${u.toString()}`,o=(await d.get(r)).data,{price:c}=t,e=[{quantity:1,price:c,duration:t.duration},...o.filter(n=>n.discountCourseNum>1).map(n=>({quantity:n.discountCourseNum,price:parseInt(c)*parseFloat(n.discount),duration:t.duration}))];B(e)}catch(r){console.log("getDiscountedPrices",r)}}function B(r){const s=/\B(?=(?:\d{3})+(?!\d))/g;let o=r.map(e=>`<li
  class="py-4 d-flex justify-content-between align-items-center border-bottom border-gray-200"
>
  <div>
    <p class="fs-4 fw-bold">NT$ ${e.price.toString().replace(s,",")}</p>
    <p>${e.quantity} 堂 ${e.duration} 分鐘</p>
  </div>
  <a type="button" class="btn btn-text" 
      data-course="${u}" 
      ${e.quantity>1?`data-quantity="${e.quantity}"`:""} 
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
</li>`,g.innerHTML=o}const E=f.replace(/html.*/,"html");d.get("https://project-code-json-k0ti.onrender.com/courses?_expand=teacher").then(r=>{let c=r.data.filter(a=>a.badges.includes("熱門")).slice(0,7),e="";const n=document.querySelector(".recommend-swiper");c.forEach(a=>{e+=`<div class="card teacher-card swiper-slide">
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
        href="${E}?courseId=${a.id}"
        type="button"
        class="btn teacher-card-btn"
        >查看介紹</a
      >
    </div>
  </div>`}),n.innerHTML=e});p(document.querySelector(".recommend-swiper"));const M=document.querySelector("#redirectPopular");M.addEventListener("click",function(){localStorage.setItem("redirectToPopular",!0)});new Swiper(".recommendSwiper",{slidesPerView:1,spaceBetween:16,navigation:{nextEl:".recommendSwiper-button-next",prevEl:".recommendSwiper-button-prev"},pagination:{el:".recommendSwiper-pagination",clickable:!0,dynamicBullets:!0,dynamicMainBullets:5},breakpoints:{768:{slidesPerView:2,spaceBetween:20,pagination:{dynamicMainBullets:3}},992:{slidesPerView:3,spaceBetween:24,pagination:{dynamicMainBullets:3}}}});
