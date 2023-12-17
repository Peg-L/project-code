import{c,a as o,i as p}from"./backtotop-61d0d527.js";import{h as m}from"./startCourse-a0e3af17.js";window.addEventListener("load",d);new Swiper(".bannerSwiper",{slidesPerView:1,loop:!0,pagination:{el:".bannerSwiper-pagination",clickable:!0}});let r;const w=document.querySelectorAll(".banner-btn-search"),f=document.querySelectorAll(".banner-input");f.forEach(e=>{e.addEventListener("input",()=>{r=e.value,document.querySelectorAll(".clear-input").forEach(i=>{i.addEventListener("click",function(){e.value="",r=e.value})})})});w.forEach(e=>{e.addEventListener("click",()=>{r&&(localStorage.setItem("indexSearchInput",r),location.href="./course.html")}),document.addEventListener("keyup",function(t){t.key==="Enter"&&e.click()})});const l=/\/[^/]+\.html/,h=l.test(c)?c.replace(l,"/course_intro.html"):c+"course_intro.html";o.get("https://project-code-json-k0ti.onrender.com/courses?_expand=teacher").then(e=>{let s=e.data.filter(a=>a.badges.includes("熱門")).slice(0,7),n="";const u=document.querySelector(".recommend-swiper");s.forEach(a=>{n+=`<div class="card teacher-card swiper-slide">
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
        ${p?"":'data-bs-toggle="modal"'}
      >
        立即上課
      </a>
      <a
        href="${h}?courseId=${a.id}"
        type="button"
        class="btn teacher-card-btn"
        >查看介紹</a
      >
    </div>
  </div>`}),u.innerHTML=n,d()});function d(){const e=document.querySelector("body"),t=document.querySelector(".bg-loading");e.classList.toggle("overflow-hidden"),t.classList.toggle("d-none")}m(document.querySelector(".recommend-swiper"));const g=document.querySelector("#redirectPopular");g.addEventListener("click",function(){localStorage.setItem("redirectToPopular",!0)});new Swiper(".recommendSwiper",{slidesPerView:1,spaceBetween:16,navigation:{nextEl:".recommendSwiper-button-next",prevEl:".recommendSwiper-button-prev"},pagination:{el:".recommendSwiper-pagination",clickable:!0,dynamicBullets:!0,dynamicMainBullets:5},breakpoints:{768:{slidesPerView:2,spaceBetween:20,pagination:{dynamicMainBullets:3}},992:{slidesPerView:3,spaceBetween:24,pagination:{dynamicMainBullets:3}}}});sessionStorage.removeItem("cateItemName");const v=document.querySelectorAll(".cate-item");v.forEach(e=>{e.addEventListener("click",function(){let t=e.getAttribute("name");sessionStorage.setItem("cateItemName",t),location.href="./course.html"})});function b(e){return[...e].sort(()=>.5-Math.random()).slice(0,4)}o.get("https://project-code-json-k0ti.onrender.com/comments?_expand=user").then(e=>{const t=document.querySelector(".reviews-swiper");let i="";e.data=b(e.data.filter(s=>s.rate==5)),e.data.forEach(s=>{i+=`<div class="swiper-slide">
    <div
      class="teacher-card d-flex flex-column justify-content-between gap-10 h-100"
    >
      <div class="d-flex justify-content-between flex-column gap-4">
        <img
          class="w-40px h-40px"
          src="https://raw.githubusercontent.com/Peg-L/project-code/main/assets/images/comma.png"
          alt="逗號"
        />
        <p>
          ${s.content}
        </p>
      </div>
      <div class="d-flex">
        <div class="d-flex flex-column gap-1 me-3 ms-auto">
          <ul class="d-flex gap-1 text-primary mb-0">
            <li><i class="fa-solid fa-star"></i></li>
            <li><i class="fa-solid fa-star"></i></li>
            <li><i class="fa-solid fa-star"></i></li>
            <li><i class="fa-solid fa-star"></i></li>
            <li><i class="fa-solid fa-star"></i></li>
          </ul>
          <p class="fs-6">
          ${s.user.name}<span class="ms-1 fs-tiny"
              >${s.user.role}</span
            >
          </p>
        </div>
        <img
          class="object-fit-cover rounded-circle w-60px h-60px"
          src="${s.user.avatar}"
          alt="${s.user.name}"
        />
      </div>
    </div>
  </div>`}),t.innerHTML=i});new Swiper(".reviewsSwiper",{slidesPerView:1,spaceBetween:16,pagination:{el:".reviewsSwiper-pagination-custom",clickable:!0,dynamicBullets:!0,dynamicMainBullets:5},breakpoints:{992:{slidesPerView:2,spaceBetween:24,navigation:{nextEl:".reviewsSwiper-button-next-custom",prevEl:".reviewsSwiper-button-prev-custom"},pagination:{dynamicMainBullets:3}}}});
