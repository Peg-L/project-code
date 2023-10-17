import axios from "axios";

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
const bannerSearchBtns = document.querySelectorAll(".banner-btn-search")

// 取得 所有搜尋框的值
const bannerInputs = document.querySelectorAll(".banner-input")

// 監聽搜尋按鈕
bannerSearchBtns.forEach((bannerSearchBtn)=>{
  bannerSearchBtn.addEventListener("click", () => {
    //- 點擊後將 搜尋內容 放入 localStorage
    localStorage.setItem("indexSearchInput", bannerInputValue)  

    //- 跳轉 course.html
    location.href = "./course.html";
  })
})

// 取得 搜尋內容
bannerInputs.forEach((bannerInput) => {
  bannerInput.addEventListener("input", ()=> {
    bannerInputValue = bannerInput.value
  })
  }
)

let recommendSwiper = new Swiper(".recommendSwiper", {
  slidesPerView: 1,
  spaceBetween: 16,
  loop: true,
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

let reviewsSwiper = new Swiper(".reviewsSwiper", {
  slidesPerView: 1,
  spaceBetween: 16,
  loop: true,
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