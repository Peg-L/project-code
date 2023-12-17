import{c as b,a as l,i as m}from"./backtotop-61d0d527.js";import"./openTime-f6403d24.js";import{h}from"./startCourse-a0e3af17.js";const v=new URLSearchParams(window.location.search),d=v.get("courseId");let c=[];const S=document.querySelector("#teacherImg"),x=document.querySelector("#teacher_name"),$=document.querySelector("#course_title"),w=document.querySelector("#courseClass"),q=document.querySelector("#course_info"),C=document.querySelector("#teacher_degree"),j=document.querySelector("#teacher_experience"),L=document.querySelector("#language"),k=document.querySelector("#level"),M=document.querySelector("#intro"),D=document.querySelector("#youCanGet"),T=document.querySelector("#PreviousWeek"),P=document.querySelector("#NextWeek");function E(){l.get(`https://project-code-json-k0ti.onrender.com/courses/${d.toString()}?_expand=teacher`).then(function(t){let a="";c=t.data,S.setAttribute("src",c.teacher.avatar),x.textContent=c.teacher.name,$.textContent=c.name,w.textContent=c.topics,q.textContent=c.info,C.textContent=c.teacher.education,j.textContent=c.teacher.experience,L.textContent=c.teacher.lang.join("/"),k.textContent=c.level,M.innerHTML=c.teacher.intro.replace(/\r\n\r\n/g,"<br><br>"),console.log(c.teacher.intro),c.mainPoints.forEach(n=>{a+=`<li class="list-decorate ps-4 position-relative">
          ${n}
        </li>`}),D.innerHTML=a,p(),N(),_()})}function p(){document.querySelectorAll(".calendar-time").forEach(e=>{let r=e.getAttribute("data-num"),s=n(r),o="";s.length!==0&&(s[0].time.forEach(u=>{s[0].useTime.find(y=>u===y)?o+=`<li><a class="text-primary deleteDefault" href=''>${u}</a></li>`:o+=`<li><a href=''  class="deleteDefault">${u}</a></li>`}),e.innerHTML=o)}),document.querySelectorAll(".deleteDefault").forEach(e=>{e.addEventListener("click",r=>{r.preventDefault()})});function n(e){return c.teacher.openTime.filter(r=>r.date===e)}}E();T.addEventListener("click",()=>{p()});P.addEventListener("click",()=>{p()});let i=[];async function _(){try{const t=`https://project-code-json-k0ti.onrender.com/comments?courseId=${d.toString()}&_expand=user`,{data:a}=await l.get(t);i=a;const n=a.length;if(B(),n){const e=H(a);g(e.slice(0,2).join("")),I(e.join(""))}else g('<p class="text-center fs-5">目前沒有評論</p>')}catch(t){console.log("getComment",t)}}function B(){const t=(i.reduce((e,r)=>e+=r.rate,0)/i.length).toFixed(1),a=document.querySelector(".js-ratingScore");let n="";for(let e=1;e<=t;e++)n+='<li class="star"><span class="material-symbols-outlined"> star </span></li>';n+=`<li class="star"><span>${t}</span>/5</li>`,a.innerHTML=n}function g(t){const a=document.querySelector(".js-comment");a.innerHTML=t;const n=document.querySelector('button[data-bs-target="#courseTalk"]');i.length?n.textContent+=`(${i.length})`:n.classList.add("d-none")}function I(t){const a=document.querySelector("#courseTalk .modal-body");a.innerHTML=t}function H(t){return t.map(a=>{let n="";for(let e=1;e<=a.rate;e++)n+='<img src="https://raw.githubusercontent.com/Peg-L/project-code/89a637dfbea6e49a34b11aacf46dc07a001b4a90/assets/images/star.svg" alt="star" />';return`<ul class="card-evaluate">
    <li class="card-evaluate-content mb-lg-5">
      ${a.content}
    </li>
    <li class="card-evaluate-person flex-lg-row flex-row-reverse">
      <img
        class="w-60px h-60px"
        src="${a.user.avatar}"
        alt=""
      />
      <div class="d-flex flex-column">
        <div class="text-primary d-flex align-items-center">
         ${n}
        </div>
        <div class="align-bottom">
          <p class="card-evaluate-name">
          ${a.user.name}<span class="ms-1 card-evaluate-title">${a.user.title}</span>
          </p>
        </div>
      </div>
    </li>
  </ul>`})}const f=document.querySelector(".js-appointList");h(f);async function N(){try{const t=`https://project-code-json-k0ti.onrender.com/coupons?courseId=${d.toString()}`,n=(await l.get(t)).data,{price:e}=c,r=[{quantity:1,price:e,duration:c.duration},...n.filter(s=>s.discountCourseNum>1).map(s=>({quantity:s.discountCourseNum,price:parseInt(e)*parseFloat(s.discount),duration:c.duration}))];R(r)}catch(t){console.log("getDiscountedPrices",t)}}function R(t){const a=/\B(?=(?:\d{3})+(?!\d))/g;let n=t.map(r=>`<li
  class="py-4 d-flex justify-content-between align-items-center border-bottom border-gray-200"
>
  <div>
    <p class="fs-4 fw-bold">NT$ ${r.price.toString().replace(a,",")}</p>
    <p>${r.quantity} 堂 ${r.duration} 分鐘</p>
  </div>
  <a type="button" class="btn btn-text" 
      data-course="${d}" 
      ${r.quantity>1?`data-quantity="${r.quantity}"`:""} 
      data-bs-target="#loginModal"
      ${m?"":'data-bs-toggle="modal"'}
    >立即預約</a
  >
</li>`).join("");n+=`<li
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
    ${m?'data-bs-toggle="offcanvas"':'data-bs-toggle="modal"'}
  >
    立即洽談
  </button>
</li>`,f.innerHTML=n}const A=b.replace(/html.*/,"html");l.get("https://project-code-json-k0ti.onrender.com/courses?_expand=teacher").then(t=>{let e=t.data.filter(o=>o.badges.includes("熱門")).slice(0,7),r="";const s=document.querySelector(".recommend-swiper");e.forEach(o=>{r+=`<div class="card teacher-card swiper-slide">
    <div class="card-body d-flex justify-content-between">
      <div>
        <h5 class="card-title teacher-card-title truncate-lines-2">${o.name}
        </h5>
        <p class="teacher-card-name">${o.teacher.name}</p>
        <ul class="teacher-card-object">
          <li class="teacher-card-evaluate">${o.rate}</li>
          <li class="teacher-card-hours">50分鐘</li>
        </ul>
        <p class="teacher-card-price">NT$<span>${o.price}</span></p>
      </div>
      <div class="teacher-card-img">
        <img
          src="${o.teacher.avatar}"
          alt="老師"
          class="w-100px w-sm-120px"
        />
      </div>
    </div>
    <div>
      <p class="teacher-card-text">
      ${o.info}
      </p>
      <a
        type="button"
        class="btn btn-secondary2 w-100 mb-3"
        data-course="${o.id}"
        data-bs-target="#loginModal"
        ${m?"":'data-bs-toggle="modal"'}
      >
        立即上課
      </a>
      <a
        href="${A}?courseId=${o.id}"
        type="button"
        class="btn teacher-card-btn"
        >查看介紹</a
      >
    </div>
  </div>`}),s.innerHTML=r});h(document.querySelector(".recommend-swiper"));const U=document.querySelector("#redirectPopular");U.addEventListener("click",function(){localStorage.setItem("redirectToPopular",!0)});new Swiper(".recommendSwiper",{slidesPerView:1,spaceBetween:16,navigation:{nextEl:".recommendSwiper-button-next",prevEl:".recommendSwiper-button-prev"},pagination:{el:".recommendSwiper-pagination",clickable:!0,dynamicBullets:!0,dynamicMainBullets:5},breakpoints:{768:{slidesPerView:2,spaceBetween:20,pagination:{dynamicMainBullets:3}},992:{slidesPerView:3,spaceBetween:24,pagination:{dynamicMainBullets:3}}}});
