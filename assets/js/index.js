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


// 取得 搜尋內容
bannerInputs.forEach((bannerInput) => {
  bannerInput.addEventListener("input", ()=> {
    bannerInputValue = bannerInput.value;

    // 監聽搜尋按鈕
    bannerSearchBtns.forEach((bannerSearchBtn)=>{
      bannerSearchBtn.addEventListener("click", () => {
        //- 點擊按鈕後將 搜尋內容 放入 localStorage
        localStorage.setItem("indexSearchInput", bannerInputValue) 

        // 清空首頁搜尋框
        bannerInput.value = "";

        //- 跳轉 course.html
        location.href = "./course.html";
      })
    })
  })
  }
)



// 熱門教師 API
axios.get(`${_url}/courses?_expand=teacher`).then(res=>{
  let popularNum = 0;
  let courses = res.data;
  
  // 篩選出是熱門課程
  let popularCourses = courses.filter(course=> course.badges.includes("熱門"));
  
  // 取出前 6 項
  let popularCourses6th = popularCourses.slice(0, 7);
  
  // 渲染至畫面
  let coursesCard = "";
  const swiperWrapper = document.querySelector(".recommend-swiper");

  popularCourses6th.forEach(popularCourse => {
    coursesCard += `<div class="swiper-slide">
    <div class="teacher-card">
      <div class="teacher-card-profile">
        <div class="teacher-card-content">
          <h3 class="teacher-card-title">${popularCourse.name}</h3>
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
      <p class="teacher-card-text">
      ${popularCourse.info}
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
  </div>`
  }) 
    
  swiperWrapper.innerHTML = coursesCard;
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