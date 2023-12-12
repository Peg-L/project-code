import axios from "axios";
import { handleClickStartCourseBtn } from "./coursePage/startCourse";

// // 圖片 src 修改
// import treasureImgUrl from "../images/category/treasure.png";
// document.getElementById("treasureImg1").src = treasureImgUrl;
// document.getElementById("treasureImg2").src = treasureImgUrl;

// import frontendImgUrl from "../images/category/frontend.svg";
// document.getElementById("frontendImg").src = frontendImgUrl;

// import backendUrl from "../images/category/backend.svg";
// document.getElementById("backendUrl").src = backendUrl;

// import databaseUrl from "../images/category/database.svg";
// document.getElementById("databaseUrl").src = databaseUrl;

// import securityUrl from "../images/category/security.svg";
// document.getElementById("securityUrl").src = securityUrl;

// import testingUrl from "../images/category/testing.svg";
// document.getElementById("testingUrl").src = testingUrl;

// import UIUXUrl from "../images/category/UI-UX.svg";
// document.getElementById("UIUXUrl").src = UIUXUrl;

// import devOpsUrl from "../images/category/DevOps.svg";
// document.getElementById("devOpsUrl").src = devOpsUrl;

// import mobileUrl from "../images/category/mobile.svg";
// document.getElementById("mobileUrl").src = mobileUrl;

// import AIUrl from "../images/category/AI.svg";
// document.getElementById("AIUrl").src = AIUrl;

// import gameUrl from "../images/category/game.svg";
// document.getElementById("gameUrl").src = gameUrl;

// import basicUrl from "../images/category/basic.svg";
// document.getElementById("basicUrl").src = basicUrl;

// import careerUrl from "../images/category/career.svg";
// document.getElementById("careerUrl").src = careerUrl;

let bannerSwiper = new Swiper(".bannerSwiper", {
  slidesPerView: 1,
  loop: true,
  // autoplay: {
  //   delay: 5000,
  //   pauseOnMouseEnter: true,
  //   disableOnInteraction: false,
  // },
  pagination: {
    el: ".bannerSwiper-pagination",
    clickable: true,
  },
});

let bannerInputValue;

// 取得 所有搜尋按鈕
const bannerSearchBtns = document.querySelectorAll(".banner-btn-search");

// 取得 所有搜尋框的值
const bannerInputs = document.querySelectorAll(".banner-input");

// 取得 搜尋內容
bannerInputs.forEach((bannerInput) => {
  bannerInput.addEventListener("input", () => {
    bannerInputValue = bannerInput.value;

    // 監聽搜尋按鈕
    bannerSearchBtns.forEach((bannerSearchBtn) => {
      bannerSearchBtn.addEventListener("click", () => {
        //- 點擊按鈕後將 搜尋內容 放入 localStorage
        localStorage.setItem("indexSearchInput", bannerInputValue);

        // 清空首頁搜尋框
        bannerInput.value = "";

        //- 跳轉 course.html
        location.href = "./course.html";
      });

      document.addEventListener("keyup", function (e) {
        if (e.key === "Enter") {
          bannerSearchBtn.click();
        }
      });
    });
  });
});

// 熱門教師 API
axios.get(`${_url}/courses?_expand=teacher`).then((res) => {
  let courses = res.data;

  // 篩選出是熱門課程
  let popularCourses = courses.filter((course) =>
    course.badges.includes("熱門")
  );

  // 取出前 6 項
  let popularCourses6th = popularCourses.slice(0, 7);

  // 渲染至畫面
  let coursesCard = "";
  const swiperWrapper = document.querySelector(".recommend-swiper");

  // 點擊 開始上課 -> 加入購物車、優惠券
  handleClickStartCourseBtn(swiperWrapper);

  // 目前網址
  const currentURL = window.location.href;
  const newURL = currentURL.replace("index", "course_intro");

  popularCourses6th.forEach((popularCourse) => {
    coursesCard += `<div class="card teacher-card swiper-slide">
    <div class="card-body d-flex justify-content-between">
      <div>
        <h5 class="card-title teacher-card-title truncate-lines-2">${popularCourse.name}
        </h5>
        <p class="teacher-card-name">${popularCourse.teacher.name}</p>
        <ul class="teacher-card-object">
          <li class="teacher-card-evaluate">${popularCourse.rate}</li>
          <li class="teacher-card-hours">50分鐘</li>
        </ul>
        <p class="teacher-card-price">NT$<span>${popularCourse.price}</span></p>
      </div>
      <div class="teacher-card-img">
        <img
          src="${popularCourse.teacher.avatar}"
          alt="老師"
          class="w-100px w-sm-120px"
        />
      </div>
    </div>
    <div>
      <p class="teacher-card-text">
      ${popularCourse.info}
      </p>
      <a
        type="button"
        class="btn btn-secondary2 w-100 mb-3"
        data-course="${popularCourse.id}"
      >
        立即上課
      </a>
      <a
        href="${newURL}?courseId=${popularCourse.id}"
        type="button"
        class="btn teacher-card-btn"
        >查看介紹</a
      >
    </div>
  </div>`;
  });
  swiperWrapper.innerHTML = coursesCard;
});

// 熱門推薦 查看更多按鈕
const redirectPopularBtn = document.querySelector("#redirectPopular");
redirectPopularBtn.addEventListener("click", function () {
  localStorage.setItem("redirectToPopular", true);
});

let recommendSwiper = new Swiper(".recommendSwiper", {
  slidesPerView: 1,
  spaceBetween: 16,
  // loop: true,
  navigation: {
    nextEl: ".recommendSwiper-button-next",
    prevEl: ".recommendSwiper-button-prev",
  },
  pagination: {
    el: ".recommendSwiper-pagination",
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 5,
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
      pagination: {
        dynamicMainBullets: 3,
      },
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 24,
      pagination: {
        dynamicMainBullets: 3,
      },
    },
  },
});

// 課程分類
sessionStorage.removeItem("cateItemName");

const cateItems = document.querySelectorAll(".cate-item");
cateItems.forEach((cateItem) => {
  cateItem.addEventListener("click", function () {
    let cateItemName = cateItem.getAttribute("name");

    sessionStorage.setItem("cateItemName", cateItemName);

    location.href = "./course.html";
  });
});

// 學生好評卡片資料
// 隨機取得 4 個 5星好評
function get4Random(arr) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, 4);
}

// render 卡片
axios.get(`${_url}/comments?_expand=user`).then((res) => {
  const reviewsSwiper = document.querySelector(".reviews-swiper");

  let commentsCard = "";
  res.data = get4Random(res.data.filter((item) => item.rate == 5));

  res.data.forEach((comment) => {
    commentsCard += `<div class="swiper-slide">
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
          ${comment.content}
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
          ${comment.user.name}<span class="ms-1 fs-tiny"
              >${comment.user.role}</span
            >
          </p>
        </div>
        <img
          class="object-fit-cover rounded-circle w-60px h-60px"
          src="${comment.user.avatar}"
          alt="${comment.user.name}"
        />
      </div>
    </div>
  </div>`;
  });

  reviewsSwiper.innerHTML = commentsCard;
});

// 學生好評 輪播設定
let reviewsSwiper = new Swiper(".reviewsSwiper", {
  slidesPerView: 1,
  spaceBetween: 16,
  pagination: {
    el: ".reviewsSwiper-pagination-custom",
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 5,
  },
  breakpoints: {
    992: {
      slidesPerView: 2,
      spaceBetween: 24,
      navigation: {
        nextEl: ".reviewsSwiper-button-next-custom",
        prevEl: ".reviewsSwiper-button-prev-custom",
      },
      pagination: {
        dynamicMainBullets: 3,
      },
    },
  },
});
