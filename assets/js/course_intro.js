const queryParams = new URLSearchParams(window.location.search);
const courseId = queryParams.get("courseId"); //抓取課程ID
import axios from "axios";
import { userId, isLogin, currentURL } from "./config";
import { handleClickStartCourseBtn } from "./coursePage/startCourse";

let data = [];

//第一部分參數
const teacherImg = document.querySelector("#teacherImg");
const teacherName = document.querySelector("#teacher_name");
const course_title = document.querySelector("#course_title");
const courseClass = document.querySelector("#courseClass");
const course_info = document.querySelector("#course_info");
//第二部分參數
const teacher_degree = document.querySelector("#teacher_degree");
const teacher_experience = document.querySelector("#teacher_experience");
const language = document.querySelector("#language");
const level = document.querySelector("#level");
const intro = document.querySelector("#intro");
//第三部分參數
const youCanGet = document.querySelector("#youCanGet");

//第四部分參數

const left = document.querySelector("#PreviousWeek");
const right = document.querySelector("#NextWeek");

//資料取得完畢並且初始化
function init() {
  axios
    .get(`${_url}/courses/${courseId.toString()}?_expand=teacher`)
    .then(function (response) {
      let str = ``;
      data = response.data;
      //sections1(course profile)
      teacherImg.setAttribute("src", data.teacher.avatar);
      teacherName.textContent = data.teacher.name;
      course_title.textContent = data.name;
      courseClass.textContent = data.topics;
      course_info.textContent = data.info;
      //section2(teacher profile)
      teacher_degree.textContent = data.teacher.education;
      teacher_experience.textContent = data.teacher.experience;
      language.textContent = data.teacher.lang.join("/");
      level.textContent = data.level;
      intro.innerHTML = data.teacher.intro.replace(/\r\n\r\n/g, "<br><br>");
      console.log(data.teacher.intro);
      //section3
      data.mainPoints.forEach((point) => {
        str += `<li class="list-decorate ps-4 position-relative">
          ${point}
        </li>`;
      });
      youCanGet.innerHTML = str;
      //section4(calendar)
      updateData();
      // 取得多堂預約價格
      getDiscountedPrices();
      // 取得評價
      getComment();
    });
}
function updateData() {
  const daysDate = document.querySelectorAll(".calendar-time");
  daysDate.forEach((item) => {
    let dataNum = item.getAttribute("data-num");
    let matchData = findMatchData(dataNum);
    let str = "";
    if (matchData.length !== 0) {
      matchData[0].time.forEach((date) => {
        if (!matchData[0].useTime.find((item) => date === item)) {
          str += `<li><a href=''  class="deleteDefault">${date}</a></li>`;
        } else {
          str += `<li><a class="text-primary deleteDefault" href=''>${date}</a></li>`;
        }
      });
      item.innerHTML = str;
    }
  });
  const deleteDefault = document.querySelectorAll(".deleteDefault");
  deleteDefault.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
    });
  });
  function findMatchData(dataNum) {
    return data.teacher.openTime.filter(
      (item) => item.date === dataNum
    );
  }
}

// 預設載入初始化環境
init();

left.addEventListener("click", () => {
  updateData();
});
right.addEventListener("click", () => {
  updateData();
});

// // 新增待辦功能
// save.addEventListener('click',function(e){
//   if (txt.value=="") {
//     alert("請輸入內容");
//     return;
//   }
//   let obj = {};
//   obj.content = txt.value
//   axios.post(`${_url}/todos`,obj)
//   .then(function(res){
//     init();
//   })
// })
// // 刪除待辦功能
// list.addEventListener("click",function(e){
//   if(e.target.getAttribute("class")!=="delete"){
//     return;
//   }
//   let num = e.target.getAttribute("data-num");
//   axios.delete(`${_url}/todos/${num}`)
//   .then(function(res){
//     alert("刪除成功！");
//     init();
//   })
// })

let commentData = [];
/*** 評價 ***/
async function getComment() {
  try {
    const api = `${_url}/comments?courseId=${courseId.toString()}&_expand=user`;
    const { data } = await axios.get(api);
    commentData = data;
    const length = data.length;
    // 平均分數
    handleRatingScore();

    // 若有評論
    if (length) {
      // 評論 html (array)
      const renderContent = makeCommentCard(data);
      // 渲染評論區
      renderCommentSection(renderContent.slice(0, 2).join(""));
      // 渲染評論 modal
      renderCommentModal(renderContent.join(""));
    }
    // 若無評論
    else {
      const renderEmpty = '<p class="text-center fs-5">目前沒有評論</p>';
      renderCommentSection(renderEmpty);
    }
  } catch (error) {
    console.log("getComment", error);
  }
}

// 平均分數
function handleRatingScore() {
  const score = (
    commentData.reduce((acc, cur) => (acc += cur.rate), 0) / commentData.length
  ).toFixed(1);
  const ratingScore = document.querySelector(".js-ratingScore");

  let ratingScoreHtml = "";
  for (let i = 1; i <= score; i++) {
    ratingScoreHtml +=
      '<li class="star"><span class="material-symbols-outlined"> star </span></li>';
  }
  ratingScoreHtml += `<li class="star"><span>${score}</span>/5</li>`;
  ratingScore.innerHTML = ratingScoreHtml;
}

// 渲染評論區
function renderCommentSection(str) {
  // 評論區渲染
  const commentSection = document.querySelector(".js-comment");
  commentSection.innerHTML = str;

  // 查看所有評論按鈕
  const allComment = document.querySelector(
    'button[data-bs-target="#courseTalk"]'
  );
  if (commentData.length) {
    // 若有評論
    allComment.textContent += `(${commentData.length})`;
  } else {
    // 若無評論就不顯示
    allComment.classList.add("d-none");
  }
}

// 渲染評論 modal
function renderCommentModal(str) {
  const commentModal = document.querySelector("#courseTalk .modal-body");
  commentModal.innerHTML = str;
}

// 產卡片html
function makeCommentCard(data) {
  return data.map((item) => {
    let star = "";
    for (let i = 1; i <= item.rate; i++) {
      star +=
        '<img src="https://raw.githubusercontent.com/Peg-L/project-code/89a637dfbea6e49a34b11aacf46dc07a001b4a90/assets/images/star.svg" alt="star" />';
    }
    return `<ul class="card-evaluate">
    <li class="card-evaluate-content mb-lg-5">
      ${item.content}
    </li>
    <li class="card-evaluate-person flex-lg-row flex-row-reverse">
      <img
        class="w-60px h-60px"
        src="${item.user.avatar}"
        alt=""
      />
      <div class="d-flex flex-column">
        <div class="text-primary d-flex align-items-center">
         ${star}
        </div>
        <div class="align-bottom">
          <p class="card-evaluate-name">
          ${item.user.name}<span class="ms-1 card-evaluate-title">${item.user.title}</span>
          </p>
        </div>
      </div>
    </li>
  </ul>`;
  });
}

/*** 多堂預約 ***/

const appointList = document.querySelector(".js-appointList");
handleClickStartCourseBtn(appointList);
async function getDiscountedPrices() {
  try {
    // 取得優惠券
    const api = `${_url}/coupons?courseId=${courseId.toString()}`;
    const res = await axios.get(api);
    const coupons = res.data;
    // 原始價格
    const { price } = data;
    // 製作陣列：每堂課的價格及折價堂數
    const priceData = [
      {
        quantity: 1,
        price,
        duration: data.duration,
      },
      ...coupons
        .filter((coupon) => coupon.discountCourseNum > 1)
        .map((coupon) => ({
          quantity: coupon.discountCourseNum,
          price: parseInt(price) * parseFloat(coupon.discount),
          duration: data.duration,
        })),
    ];
    renderDiscountedPrices(priceData);
  } catch (error) {
    console.log("getDiscountedPrices", error);
  }
}

function renderDiscountedPrices(priceData) {
  const separatorReg = /\B(?=(?:\d{3})+(?!\d))/g;
  let priceItem = priceData
    .map(
      (item) => `<li
  class="py-4 d-flex justify-content-between align-items-center border-bottom border-gray-200"
>
  <div>
    <p class="fs-4 fw-bold">NT$ ${item.price
      .toString()
      .replace(separatorReg, ",")}</p>
    <p>${item.quantity} 堂 ${item.duration} 分鐘</p>
  </div>
  <a type="button" class="btn btn-text" 
      data-course="${courseId}" 
      ${item.quantity > 1 ? `data-quantity="${item.quantity}"` : ""} 
      data-bs-target="#loginModal"
      ${isLogin ? "" : 'data-bs-toggle="modal"'}
    >立即預約</a
  >
</li>`
    )
    .join("");
  const custom = `<li
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
    ${isLogin ? 'data-bs-toggle="offcanvas"' : 'data-bs-toggle="modal"'}
  >
    立即洽談
  </button>
</li>`;
  priceItem += custom;
  appointList.innerHTML = priceItem;
}

/*** 熱門教師 ***/

// 目前網址
// 刪掉 html 後面的字串
const newURL = currentURL.replace(/html.*/, "html");

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

  popularCourses6th.forEach((popularCourse) => {
    coursesCard += `<div class="card teacher-card swiper-slide">
    <div class="card-body d-flex justify-content-between">
      <div>
        <h5 class="card-title teacher-card-title truncate-lines-2">${
          popularCourse.name
        }
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
        data-bs-target="#loginModal"
        ${isLogin ? "" : 'data-bs-toggle="modal"'}
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

// 點擊 開始上課 -> 加入購物車、優惠券
handleClickStartCourseBtn(document.querySelector(".recommend-swiper"));

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
