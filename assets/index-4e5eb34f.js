import{a as n}from"./backtotop-e931ed7f.js";new Swiper(".bannerSwiper",{slidesPerView:1,loop:!0,pagination:{el:".bannerSwiper-pagination",clickable:!0}});let c;const o=document.querySelectorAll(".banner-btn-search"),d=document.querySelectorAll(".banner-input");d.forEach(e=>{e.addEventListener("input",()=>{c=e.value,o.forEach(a=>{a.addEventListener("click",()=>{localStorage.setItem("indexSearchInput",c),e.value="",location.href="./course.html"}),document.addEventListener("keyup",function(i){i.key==="Enter"&&a.click()})})})});n.get("http://localhost:3000/courses?_expand=teacher").then(e=>{let t=e.data.filter(s=>s.badges.includes("熱門")).slice(0,7),r="";const l=document.querySelector(".recommend-swiper");t.forEach(s=>{r+=`<div class="card teacher-card swiper-slide">
    <div class="card-body d-flex justify-content-between">
      <div>
        <h5 class="card-title teacher-card-title truncate-lines-2">${s.name}
        </h5>
        <p class="teacher-card-name">${s.teacher.name}</p>
        <ul class="teacher-card-object">
          <li class="teacher-card-evaluate">${s.rate}</li>
          <li class="teacher-card-hours">50分鐘</li>
        </ul>
        <p class="teacher-card-price">NT$<span>${s.price}</span></p>
      </div>
      <div class="teacher-card-img">
        <img
          src="${s.teacher.avatar}"
          alt="老師"
          class="w-100px w-sm-120px"
        />
      </div>
    </div>
    <div>
      <p class="teacher-card-text">
      ${s.info}
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
  </div>`}),l.innerHTML=r});const p=document.querySelector("#redirectPopular");p.addEventListener("click",function(){localStorage.setItem("redirectToPopular",!0)});new Swiper(".recommendSwiper",{slidesPerView:1,spaceBetween:16,navigation:{nextEl:".recommendSwiper-button-next",prevEl:".recommendSwiper-button-prev"},pagination:{el:".recommendSwiper-pagination",clickable:!0,dynamicBullets:!0,dynamicMainBullets:5},breakpoints:{768:{slidesPerView:2,spaceBetween:20,pagination:{dynamicMainBullets:3}},992:{slidesPerView:3,spaceBetween:24,pagination:{dynamicMainBullets:3}}}});sessionStorage.removeItem("cateItemName");const u=document.querySelectorAll(".cate-item");u.forEach(e=>{e.addEventListener("click",function(){let a=e.getAttribute("name");sessionStorage.setItem("cateItemName",a),location.href="./course.html"})});function m(e){return[...e].sort(()=>.5-Math.random()).slice(0,4)}n.get("http://localhost:3000/comments?_expand=user").then(e=>{const a=document.querySelector(".reviews-swiper");let i="";e.data=m(e.data.filter(t=>t.rate==5)),e.data.forEach(t=>{i+=`<div class="swiper-slide">
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
          ${t.content}
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
          ${t.user.name}<span class="ms-1 fs-tiny"
              >${t.user.role}</span
            >
          </p>
        </div>
        <img
          class="object-fit-cover rounded-circle w-60px h-60px"
          src="${t.user.avatar}"
          alt="${t.user.name}"
        />
      </div>
    </div>
  </div>`}),a.innerHTML=i});new Swiper(".reviewsSwiper",{slidesPerView:1,spaceBetween:16,pagination:{el:".reviewsSwiper-pagination-custom",clickable:!0,dynamicBullets:!0,dynamicMainBullets:5},breakpoints:{992:{slidesPerView:2,spaceBetween:24,navigation:{nextEl:".reviewsSwiper-button-next-custom",prevEl:".reviewsSwiper-button-prev-custom"},pagination:{dynamicMainBullets:3}}}});
