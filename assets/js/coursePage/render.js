import { currentPageCourses, isLoading, data, lastPage } from "./api.js";
import { pagination } from "./pagination.js";

const courseList = document.querySelector("#courseList");
// 日期、數字三位一點規則
const dateReg = /^(\d{4}-\d{2}-\d{2}).*/;
const separatorReg = /\B(?=(?:\d{3})+(?!\d))/g;
// 目前網址
const currentURL = window.location.href;
const newURL = currentURL.replace("course", "course_intro");

function inputDisable() {
  const inputs = document.querySelectorAll("input");
  if (isLoading) {
    inputs.forEach((input) => {
      input.disabled = true;
    });
  } else {
    inputs.forEach((input) => {
      input.disabled = false;
    });
  }
}

// let followBtns;
/*** 渲染課程 ***/
function renderCourses() {
  toCoursesTop();
  getFollowList();

  let courseHtml = "";
  /* loading動畫 */
  isLoading
    ? (courseHtml += `
      <div class="d-flex justify-content-center mt-4">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      `)
    : currentPageCourses.length !== 0
    ? /* 卡片渲染 */
      currentPageCourses.forEach(async (item) => {
        if (followList.includes(item.id)) {
          courseHtml += `
          <li class="card flex-row flex-wrap flex-md-nowrap shadow">
            <div class="d-flex flex-grow-1 p-4 p-lg-8">
              <!--  老師區塊 -->
              <div
                class="d-flex flex-column align-items-center min-w-100px w-100px min-w-md-150px w-md-150px bg-white me-4"
              >
                <!-- 愛心 -->
                <button
                  type="button"
                  class="btn p-0 text-center align-self-start follow-btn following"
                >
                  <i
                    class="fa-regular fa-heart fs-3 text-primary hover-bold fw-bold" data-buttonId="${
                      item.id
                    }"
                  ></i>
                </button>
  
                <a href="#" class="text-center">
                  <!-- 圖 -->
                  <div class="mb-2 w-100px h-100px">
                    <img
                      class="img-fluid rounded-circle p-1 p-md-0"
                      src="${item.teacher.avatar}"
                      alt="teacher"
                    />
                  </div>
                  <!-- 姓名、職稱 -->
                  <h3 class="fs-7 fs-md-6 text-secondary2 fw-bold mb-1">
                    ${item.teacher.name}
                  </h3>
                </a>
                <p class="fs-sm fs-md-7 text-secondary2 text-center mb-2">
                  ${item.teacher.title}
                </p>
                <ul class="text-center text-gray-300 fs-sm fs-md-7 mb-2">
                  <li class="d-flex align-items-center">
                    <img src="../assets/images/star.svg" alt="star" />
                    <span class="fw-bold me-1"> ${item.teacher.rate} </span>
                    講師評等
                  </li>
                  <li>${item.teacher.total_students} 位學生</li>
                  <li>${item.teacher.total_courses} 門課程</li>
                </ul>
                <!-- link -->
                <ul class="d-flex justify-content-center mb-0">
                  <li class="me-1">
                    <a href="${
                      item.teacher.links_codepen
                    }" class="p-1" target="_blank">
                      <i class="fa-brands fa-github"></i
                    ></a>
                  </li>
                  <li class="me-1">
                    <a href="${
                      item.teacher.links_github
                    }" class="p-1" target="_blank">
                      <i class="fa-brands fa-linkedin-in"></i
                    ></a>
                  </li>
                  <li>
                    <a href="${
                      item.teacher.links_linkedin
                    }" class="p-1" target="_blank">
                      <i class="fa-brands fa-codepen"></i
                    ></a>
                  </li>
                </ul>
              </div>
              <!--  課程區塊 -->
              <div class="flex-grow-1">
                <!-- 課程名稱 -->
                <h3 class="card-title fs-6 fs-sm-4 ">
                  ${item.name}
                </h3>
                <!-- 優質標籤 -->
                ${
                  Array.isArray(item.badges) // 防止 item.badges 是空值而出錯
                    ? `<ul class="d-flex gap-2 mb-2">
                  ${item.badges
                    .map(
                      (badge) =>
                        `<li class="badge bg-primary fw-normal fs-sm fs-lg-7">${badge}</li>`
                    )
                    .join("")}</ul>`
                    : ""
                }
  
                <!-- 課程tag -->
                ${
                  Array.isArray(item.tags)
                    ? `<ul class="d-flex flex-wrap mb-1 mb-sm-2 column-gap-1">
                  ${item.tags
                    .map(
                      (tag) =>
                        `<li class="text-primary text-nowrap fs-sm fs-md-7">
                    #${tag}
                  </li>`
                    )
                    .join("")}
                </ul>`
                    : ""
                }
  
                <!-- 課程評價、難度 -->
                <div class="d-flex">
                  <a
                    href="#"
                    class="d-flex align-items-center mb-1 mb-sm-2 mb-md-4"
                  >
                    <img src="../assets/images/star.svg" alt="star" />
                    <span class="fw-bold fs-sm fs-md-7 ms-1">${item.rate}</span>
                    ・
                    <span class="fs-sm fs-md-7 me-2">${
                      item.commentNum
                    } 個評論</span>
                  </a>
                  <p class="text-gray-300">| ${item.level}</p>
                </div>
                <!-- 課程介紹 -->
                <p
                  class="fs-sm fs-sm-7 fs-md-6 text-justify truncate-lines-2 truncate-md-lines-4"
                >${item.info}
                </p>
                <hr />
                <!-- 課程篩選tag -->
                <div>
                  <h4
                    class="text-secondary2 fs-7 fs-sm-6 fs-md-5 mb-2 mb-sm-3"
                  >
                    你可以跟我學
                  </h4>
                  ${
                    Array.isArray(item.categories)
                      ? `
                    <ul class="d-flex flex-wrap gap-1 gap-md-2 mb-0">
                      ${item.categories
                        .map(
                          (category) => `
                          <li>
                            <span class="badge text-bg-secondary text-gray-300 fs-sm fs-md-6">
                              ${category}
                            </span>
                          </li>`
                        )
                        .join("")}
                    </ul>`
                      : ""
                  }
                </div>
                <hr />
                <!-- 收合內容 -->
                <div class="collapse" id="collapseCourse${item.id}">
                  <!-- 你將獲得 -->
                  <div>
                    <h4 class="text-secondary2 fs-7 fs-sm-5 mb-2 mb-sm-3">
                      你將獲得
                    </h4>
                    ${
                      Array.isArray(item.mainPoints)
                        ? `<ul>
                          ${item.mainPoints
                            .map(
                              (mainPoint) => `
                        <li class="list-check fs-sm fs-sm-7 fs-md-6">
                          ${mainPoint}
                        </li>`
                            )
                            .join("")}`
                        : ""
                    }
                    </ul>
  
                  </div>
                  <hr />
                  <!-- 評價 -->
                  <div>
                    <h4 class="text-secondary2 fs-7 fs-sm-5 mb-2 mb-sm-3">
                      精選評價
                    </h4>
                    <p
                      class="fs-sm fs-sm-7 fs-md-6 text-justify mb-1 mb-md-2"
                    >
                     ${item.comment?.content}
                    </p>
                    <div
                      class="d-flex justify-content-end align-items-center"
                    >
                      <img
                        class="me-2 d-none d-md-block w-40px h-40px"
                        src="${item.comment?.user?.avatar}"
                        alt="student"
                      />
                      <div class="d-flex flex-md-column fs-sm fs-md-7">
                        <p class="fw-bold me-2 me-md-0">${
                          item.comment?.user?.name
                        }</p>
                        <p>${dateReg.exec(item.comment?.date)[1]}</p>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
                <!-- 瀏覽更多 -->
                <button
                  class="btn btn-gray fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4 float-end readMore"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseCourse${item.id}"
                  aria-expanded="false"
                  aria-controls="collapseCourse${item.id}"
                ></button>
              </div>
            </div>
            <!--  按鈕區塊 -->
            <div
              class="card-footer card-md-horizontal min-w-lg-250px w-lg-250px min-w-md-200px w-md-200px gap-2 gap-sm-6 p-4 p-md-8"
            >
              <!-- 價格 -->
              <div
                class="d-flex justify-content-center flex-md-column flex-lg-row gap-2 gap-sm-4"
              >
                <p class="text-nowrap text-center fs-sm fs-sm-6">
                  <span class="fw-bold fs-7 fs-sm-5">
                    NT$ ${
                      item.price *
                      (0.5) //數字三位一撇
                        .toString()
                        .replace(separatorReg, ",")
                    }
                    </span><br />體驗價
                </p>
                <p class="text-nowrap text-center fs-sm fs-sm-6">
                  <span class="fw-bold fs-7 fs-sm-5">
                    NT$ ${item.price //數字三位一撇
                      .toString()
                      .replace(separatorReg, ",")}
                  </span>
                  <br />${item.duration}分鐘
                </p>
              </div>
              <!-- 購買按鈕 -->
              <button
                type="button"
                class="btn btn-secondary2 w-100 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
                data-course="${item.id}"
              >
                立即上課
              </button>
              <a
                href="${newURL}?courseId=${item.id}"
                type="button"
                class="btn btn-white w-100 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
              >
                查看介紹
              </a>
            </div>
          </li>
        `;
        } else {
          courseHtml += `
          <li class="card flex-row flex-wrap flex-md-nowrap shadow">
            <div class="d-flex flex-grow-1 p-4 p-lg-8">
              <!--  老師區塊 -->
              <div
                class="d-flex flex-column align-items-center min-w-100px w-100px min-w-md-150px w-md-150px bg-white me-4"
              >
                <!-- 愛心 -->
                <button
                  type="button"
                  class="btn p-0 text-center align-self-start follow-btn not-follow"
                >
                  <i
                    class="fa-regular fa-heart fs-3 text-primary hover-bold" data-buttonId="${
                      item.id
                    }"
                  ></i>
                </button>
  
                <a href="#" class="text-center">
                  <!-- 圖 -->
                  <div class="mb-2 w-100px h-100px">
                    <img
                      class="img-fluid rounded-circle p-1 p-md-0"
                      src="${item.teacher.avatar}"
                      alt="teacher"
                    />
                  </div>
                  <!-- 姓名、職稱 -->
                  <h3 class="fs-7 fs-md-6 text-secondary2 fw-bold mb-1">
                    ${item.teacher.name}
                  </h3>
                </a>
                <p class="fs-sm fs-md-7 text-secondary2 text-center mb-2">
                  ${item.teacher.title}
                </p>
                <ul class="text-center text-gray-300 fs-sm fs-md-7 mb-2">
                  <li class="d-flex align-items-center">
                    <img src="../assets/images/star.svg" alt="star" />
                    <span class="fw-bold me-1"> ${item.teacher.rate} </span>
                    講師評等
                  </li>
                  <li>${item.teacher.total_students} 位學生</li>
                  <li>${item.teacher.total_courses} 門課程</li>
                </ul>
                <!-- link -->
                <ul class="d-flex justify-content-center mb-0">
                  <li class="me-1">
                    <a href="${
                      item.teacher.links_codepen
                    }" class="p-1" target="_blank">
                      <i class="fa-brands fa-github"></i
                    ></a>
                  </li>
                  <li class="me-1">
                    <a href="${
                      item.teacher.links_github
                    }" class="p-1" target="_blank">
                      <i class="fa-brands fa-linkedin-in"></i
                    ></a>
                  </li>
                  <li>
                    <a href="${
                      item.teacher.links_linkedin
                    }" class="p-1" target="_blank">
                      <i class="fa-brands fa-codepen"></i
                    ></a>
                  </li>
                </ul>
              </div>
              <!--  課程區塊 -->
              <div class="flex-grow-1">
                <!-- 課程名稱 -->
                <h3 class="card-title fs-6 fs-sm-4 ">
                  ${item.name}
                </h3>
                <!-- 優質標籤 -->
                ${
                  Array.isArray(item.badges) // 防止 item.badges 是空值而出錯
                    ? `<ul class="d-flex gap-2 mb-2">
                  ${item.badges
                    .map(
                      (badge) =>
                        `<li class="badge bg-primary fw-normal fs-sm fs-lg-7">${badge}</li>`
                    )
                    .join("")}</ul>`
                    : ""
                }
  
                <!-- 課程tag -->
                ${
                  Array.isArray(item.tags)
                    ? `<ul class="d-flex flex-wrap mb-1 mb-sm-2 column-gap-1">
                  ${item.tags
                    .map(
                      (tag) =>
                        `<li class="text-primary text-nowrap fs-sm fs-md-7">
                    #${tag}
                  </li>`
                    )
                    .join("")}
                </ul>`
                    : ""
                }
  
                <!-- 課程評價、難度 -->
                <div class="d-flex">
                  <a
                    href="#"
                    class="d-flex align-items-center mb-1 mb-sm-2 mb-md-4"
                  >
                    <img src="../assets/images/star.svg" alt="star" />
                    <span class="fw-bold fs-sm fs-md-7 ms-1">${item.rate}</span>
                    ・
                    <span class="fs-sm fs-md-7 me-2">${
                      item.commentNum
                    } 個評論</span>
                  </a>
                  <p class="text-gray-300">| ${item.level}</p>
                </div>
                <!-- 課程介紹 -->
                <p
                  class="fs-sm fs-sm-7 fs-md-6 text-justify truncate-lines-2 truncate-md-lines-4"
                >${item.info}
                </p>
                <hr />
                <!-- 課程篩選tag -->
                <div>
                  <h4
                    class="text-secondary2 fs-7 fs-sm-6 fs-md-5 mb-2 mb-sm-3"
                  >
                    你可以跟我學
                  </h4>
                  ${
                    Array.isArray(item.categories)
                      ? `
                    <ul class="d-flex flex-wrap gap-1 gap-md-2 mb-0">
                      ${item.categories
                        .map(
                          (category) => `
                          <li>
                            <span class="badge text-bg-secondary text-gray-300 fs-sm fs-md-6">
                              ${category}
                            </span>
                          </li>`
                        )
                        .join("")}
                    </ul>`
                      : ""
                  }
                </div>
                <hr />
                <!-- 收合內容 -->
                <div class="collapse" id="collapseCourse${item.id}">
                  <!-- 你將獲得 -->
                  <div>
                    <h4 class="text-secondary2 fs-7 fs-sm-5 mb-2 mb-sm-3">
                      你將獲得
                    </h4>
                    ${
                      Array.isArray(item.mainPoints)
                        ? `<ul>
                          ${item.mainPoints
                            .map(
                              (mainPoint) => `
                        <li class="list-check fs-sm fs-sm-7 fs-md-6">
                          ${mainPoint}
                        </li>`
                            )
                            .join("")}`
                        : ""
                    }
                    </ul>
  
                  </div>
                  <hr />
                  <!-- 評價 -->
                  <div>
                    <h4 class="text-secondary2 fs-7 fs-sm-5 mb-2 mb-sm-3">
                      精選評價
                    </h4>
                    <p
                      class="fs-sm fs-sm-7 fs-md-6 text-justify mb-1 mb-md-2"
                    >
                     ${item.comment?.content}
                    </p>
                    <div
                      class="d-flex justify-content-end align-items-center"
                    >
                      <img
                        class="me-2 d-none d-md-block w-40px h-40px"
                        src="${item.comment?.user?.avatar}"
                        alt="student"
                      />
                      <div class="d-flex flex-md-column fs-sm fs-md-7">
                        <p class="fw-bold me-2 me-md-0">${
                          item.comment?.user?.name
                        }</p>
                        <p>${dateReg.exec(item.comment?.date)[1]}</p>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
                <!-- 瀏覽更多 -->
                <button
                  class="btn btn-gray fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4 float-end readMore"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseCourse${item.id}"
                  aria-expanded="false"
                  aria-controls="collapseCourse${item.id}"
                ></button>
              </div>
            </div>
            <!--  按鈕區塊 -->
            <div
              class="card-footer card-md-horizontal min-w-lg-250px w-lg-250px min-w-md-200px w-md-200px gap-2 gap-sm-6 p-4 p-md-8"
            >
              <!-- 價格 -->
              <div
                class="d-flex justify-content-center flex-md-column flex-lg-row gap-2 gap-sm-4"
              >
                <p class="text-nowrap text-center fs-sm fs-sm-6">
                  <span class="fw-bold fs-7 fs-sm-5">
                    NT$ ${
                      item.price *
                      (0.5) //數字三位一撇
                        .toString()
                        .replace(separatorReg, ",")
                    }
                    </span><br />體驗價
                </p>
                <p class="text-nowrap text-center fs-sm fs-sm-6">
                  <span class="fw-bold fs-7 fs-sm-5">
                    NT$ ${item.price //數字三位一撇
                      .toString()
                      .replace(separatorReg, ",")}
                  </span>
                  <br />${item.duration}分鐘
                </p>
              </div>
              <!-- 購買按鈕 -->
              <button
                type="button"
                class="btn btn-secondary2 w-100 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
                data-course="${item.id}"
              >
                立即上課
              </button>
              <a
                href="${newURL}?courseId=${item.id}"
                type="button"
                class="btn btn-white w-100 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
              >
                查看介紹
              </a>
            </div>
          </li>
        `;
        }
      })
    : (courseHtml += `
      <div class="d-flex flex-column justify-content-center text-center h-100 px-10">
        <p class="fs-3 mb-4">沒有符合條件的課程</p>
        <p class="fs-6">
          看起來目前沒有符合您需求的課程，請嘗試修改您的搜尋詞彙或篩選條件。
        </p>
      </div>`);
  courseList.innerHTML = courseHtml;

  let followBtns = document.querySelectorAll(".follow-btn");
  if (followBtns) {
    console.log("test");

    followBtns.forEach((followBtn) => {
      followBtn.addEventListener("click", function () {
        if (followBtn.classList.contains("following")) {
          toggleFollowCourse(followBtn, true);
        } else {
          toggleFollowCourse(followBtn, false);
        }
      });
    });
  }
}

/*** 渲染 Pagination ***/
function renderPagination() {
  /* 頁數 */
  const pageNum = [...Array(lastPage)].map((_, index) => {
    return `<li class="page-item ${
      data.page === index + 1 ? "active" : ""
    }" aria-current="page">
  <a class="page-link" href="#" data-page="${index + 1}">${index + 1}</a>
</li>`;
  });

  /* 上一頁 */
  const pagePrev = `<li class="page-item ${data.page === 1 ? "disabled" : ""} ">
  <a
    class="page-link"
    href="#"
    aria-label="Previous" data-page="prev"
  >
    <i class="fa-solid fa-angle-left" ></i>
  </a>
</li>`;

  /* 下一頁 */
  const pageNext = `<li class="page-item ${
    data.page === lastPage ? "disabled" : ""
  }">
<a class="page-link" href="#" aria-label="Next" data-page="next">
  <i class="fa-solid fa-angle-right"></i>
</a>
</li>`;

  pagination.innerHTML = pagePrev + pageNum.join("") + pageNext;
}

function toCoursesTop() {
  window.scrollTo({
    top: 350,
    left: 0,
    behavior: "smooth",
  });
}

// 追蹤
const _url = "http://localhost:3000";
const userId = 1;
let followList;

async function getFollowList() {
  let res = await axios.get(`${_url}/users/${userId}`);
  followList = res.data.followList;
}

// 追蹤/取消追蹤
async function toggleFollowCourse(followBtn, following) {
  await getFollowList();

  let heartEl = followBtn.querySelector("i.fa-regular.fa-heart");
  let buttonId = Number(heartEl.dataset.buttonid);

  Swal.fire({
    title: following ? "確定要取消追蹤課程?" : "確定要追蹤課程?",
    showDenyButton: true,
    confirmButtonColor: "#115BC9",
    confirmButtonText: following ? "取消追蹤" : "確認",
    denyButtonText: following ? "我再想想" : "取消",
  })
    .then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: following ? "已取消追蹤" : "成功追蹤",
          showConfirmButton: false,
          timer: 1500,
        });

        followBtn.classList.toggle("not-follow");
        followBtn.classList.toggle("following");
        heartEl.classList.toggle("fw-bold");

        if (following) {
          let editfollowList = followList.filter((item) => item != buttonId);
          axios
            .patch(`${_url}/users/${userId}`, {
              followList: editfollowList,
            })
            .then((res) => {
              console.log("5. res.data.followList", res.data.followList);
            })
            .catch((err) => {
              console.error(err);
            });
        } else {
          // 確定追蹤
          followList.push(buttonId);

          await axios
            .patch(`${_url}/users/${userId}`, { followList })
            .then((res) => {
              console.log("4. res.data.followList", res.data.followList);
            });
        }
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

export { inputDisable, renderCourses, renderPagination };
