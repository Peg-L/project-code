import"./backtotop-5c0a417f.js";import{a as l}from"./axios-28bc18a3.js";const i="/project-code/assets/treasure-418b7d15.png",d="/project-code/assets/frontend-4134f215.svg",m="/project-code/assets/backend-6df6e72c.svg",u="/project-code/assets/database-18cac984.svg",p="/project-code/assets/security-9e7e4b0b.svg",g="/project-code/assets/testing-94ffe118.svg",v="/project-code/assets/UI-UX-b15c7273.svg",f="/project-code/assets/DevOps-adceebe7.svg",b="/project-code/assets/mobile-6d6099f3.svg",w="/project-code/assets/AI-f960d585.svg",h="/project-code/assets/game-6cf1b467.svg",y="/project-code/assets/basic-a112429a.svg",I="/project-code/assets/career-94d9ad84.svg";document.getElementById("treasureImg1").src=i;document.getElementById("treasureImg2").src=i;document.getElementById("frontendImg").src=d;document.getElementById("backendUrl").src=m;document.getElementById("databaseUrl").src=u;document.getElementById("securityUrl").src=p;document.getElementById("testingUrl").src=g;document.getElementById("UIUXUrl").src=v;document.getElementById("devOpsUrl").src=f;document.getElementById("mobileUrl").src=b;document.getElementById("AIUrl").src=w;document.getElementById("gameUrl").src=h;document.getElementById("basicUrl").src=y;document.getElementById("careerUrl").src=I;new Swiper(".bannerSwiper",{slidesPerView:1,loop:!0,pagination:{el:".bannerSwiper-pagination",clickable:!0}});let n;const U=document.querySelectorAll(".banner-btn-search"),E=document.querySelectorAll(".banner-input");E.forEach(e=>{e.addEventListener("input",()=>{n=e.value,U.forEach(s=>{s.addEventListener("click",()=>{localStorage.setItem("indexSearchInput",n),e.value="",location.href="./course.html"}),document.addEventListener("keyup",function(c){c.key==="Enter"&&s.click()})})})});l.get("http://localhost:3000/courses?_expand=teacher").then(e=>{let t=e.data.filter(a=>a.badges.includes("熱門")).slice(0,7),r="";const o=document.querySelector(".recommend-swiper");t.forEach(a=>{r+=`<div class="card teacher-card swiper-slide">
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
  </div>`}),o.innerHTML=r});const B=document.querySelector("#redirectPopular");B.addEventListener("click",function(){localStorage.setItem("redirectToPopular",!0)});new Swiper(".recommendSwiper",{slidesPerView:1,spaceBetween:16,navigation:{nextEl:".recommendSwiper-button-next",prevEl:".recommendSwiper-button-prev"},pagination:{el:".recommendSwiper-pagination",clickable:!0,dynamicBullets:!0,dynamicMainBullets:5},breakpoints:{768:{slidesPerView:2,spaceBetween:20,pagination:{dynamicMainBullets:3}},992:{slidesPerView:3,spaceBetween:24,pagination:{dynamicMainBullets:3}}}});sessionStorage.removeItem("cateItemName");const x=document.querySelectorAll(".cate-item");x.forEach(e=>{e.addEventListener("click",function(){let s=e.getAttribute("name");sessionStorage.setItem("cateItemName",s),location.href="./course.html"})});function S(e){return[...e].sort(()=>.5-Math.random()).slice(0,4)}l.get("http://localhost:3000/comments?_expand=user").then(e=>{const s=document.querySelector(".reviews-swiper");let c="";e.data=S(e.data.filter(t=>t.rate==5)),e.data.forEach(t=>{c+=`<div class="swiper-slide">
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
  </div>`}),s.innerHTML=c});new Swiper(".reviewsSwiper",{slidesPerView:1,spaceBetween:16,pagination:{el:".reviewsSwiper-pagination-custom",clickable:!0,dynamicBullets:!0,dynamicMainBullets:5},breakpoints:{992:{slidesPerView:2,spaceBetween:24,navigation:{nextEl:".reviewsSwiper-button-next-custom",prevEl:".reviewsSwiper-button-prev-custom"},pagination:{dynamicMainBullets:3}}}});
