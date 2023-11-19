import"./backtotop-e6f982ee.js";import{a as n}from"./axios-21b846bc.js";const l="https://project-code-json-k0ti.onrender.com";new Swiper(".bannerSwiper",{slidesPerView:1,loop:!0,pagination:{el:".bannerSwiper-pagination",clickable:!0}});let r;const d=document.querySelectorAll(".banner-btn-search"),p=document.querySelectorAll(".banner-input");p.forEach(e=>{e.addEventListener("input",()=>{r=e.value,d.forEach(t=>{t.addEventListener("click",()=>{localStorage.setItem("indexSearchInput",r),e.value="",location.href="./course.html"}),document.addEventListener("keyup",function(s){s.key==="Enter"&&t.click()})})})});n.get(`${l}/courses?_expand=teacher`).then(e=>{let s=e.data.filter(a=>a.badges.includes("熱門"));console.log(s);let i=s.slice(0,7),c="";const o=document.querySelector(".recommend-swiper");i.forEach(a=>{c+=`<div class="swiper-slide">
    <div class="teacher-card">
      <div class="teacher-card-profile">
        <div class="teacher-card-content">
          <h3 class="teacher-card-title">${a.name}</h3>
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
      <p class="teacher-card-text">
      ${a.info}
      </p>
      <a
        href="./cart.html"
        type="button"
        class="btn btn-secondary2 w-100 mb-3"
      >
        立即上課
      </a>
      <a
        href="./course_intro.html"
        type="button"
        class="btn teacher-card-btn"
        >查看介紹</a
      >
    </div>
  </div>`}),o.innerHTML=c});new Swiper(".recommendSwiper",{slidesPerView:1,spaceBetween:16,navigation:{nextEl:".recommendSwiper-button-next",prevEl:".recommendSwiper-button-prev"},pagination:{el:".recommendSwiper-pagination",clickable:!0,dynamicBullets:!0,dynamicMainBullets:5},breakpoints:{768:{slidesPerView:2,spaceBetween:20,pagination:{dynamicMainBullets:3}},992:{slidesPerView:3,spaceBetween:24,pagination:{dynamicMainBullets:3}}}});sessionStorage.removeItem("cateItemName");const m=document.querySelectorAll(".cate-item");m.forEach(e=>{e.addEventListener("click",function(){let t=e.getAttribute("name");sessionStorage.setItem("cateItemName",t),location.href="./course.html"})});new Swiper(".reviewsSwiper",{slidesPerView:1,spaceBetween:16,pagination:{el:".reviewsSwiper-pagination-custom",clickable:!0,dynamicBullets:!0,dynamicMainBullets:5},breakpoints:{992:{slidesPerView:2,spaceBetween:24,navigation:{nextEl:".reviewsSwiper-button-next-custom",prevEl:".reviewsSwiper-button-prev-custom"},pagination:{dynamicMainBullets:3}}}});n.get(`${l}/comments?_expand=user`).then(e=>{console.log("Comments",e.data);const t=document.querySelector(".reviews-swiper");let s="";e.data.forEach(i=>{s+=`<div class="swiper-slide">
    <div
      class="teacher-card d-flex flex-column justify-content-between gap-10 h-100"
    >
      <div class="d-flex justify-content-between flex-column gap-4">
        <img
          class="w-40px h-40px"
          src="../assets/images/comma.png"
          alt="逗號"
        />
        <p>
          ${i.content}
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
            Cookie<span class="ms-1 fs-tiny text-gray-300"
              >${i.user.role}</span
            >
          </p>
        </div>
        <img
          class="object-fit-cover rounded-circle w-60px h-60px"
          src="${i.user.avatar}"
          alt="${i.user.name}"
        />
      </div>
    </div>
  </div>`}),t.innerHTML=s});
