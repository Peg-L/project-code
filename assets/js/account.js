import axios from "axios";

//抓取按鈕
const changeBtn = document.querySelectorAll("#change");
const saveBtn = document.querySelectorAll("#saveBtn");
//抓取區塊
const btnBlock = document.querySelectorAll("#btnBlock");
//抓取時間欄
const date = document.querySelectorAll("#date");
const time = document.querySelectorAll("#time");

console.log(changeBtn);

//click觸發修改事件
changeBtn.forEach((item, index) => {
  item.addEventListener("click", (e) => {
    date[index].toggleAttribute("disabled");
    time[index].toggleAttribute("disabled");
    btnBlock[index].classList.toggle("hidden");
    item.toggleAttribute("disabled");
  });
});
saveBtn.forEach((item, index) => {
  item.addEventListener("click", (e) => {
    date[index].toggleAttribute("disabled");
    time[index].toggleAttribute("disabled");
    btnBlock[index].classList.toggle("hidden");
    changeBtn[index].toggleAttribute("disabled");
  });
});

// ----------------
// 我的關注
const apiUrl = "http://localhost:3000";
userId = 2;
let pageId = 1;

document.addEventListener("DOMContentLoaded", async function () {
  // 取得追蹤列表 + 課程資料
  async function fetchData(pageId) {
    try {
      // 取得追蹤列表
      let usersResponse = await axios.get(`${apiUrl}/users`);
      let followArray = usersResponse.data[userId - 1].followList;
      console.log("追蹤列表", followArray);

      // 取得課程資料
      let apiString = `${apiUrl}/courses?_expand=teacher&_page=${pageId}&_limit=6`;
      followArray.forEach((item) => {
        // console.log(item);
        apiString += `&id=${item}`;
      });
      console.log(apiString);

      let coursesResponse = await axios.get(`${apiString}`);
      let courseData = coursesResponse.data;
      console.log("追蹤的課程資料", courseData);

      const followList = document.querySelector("#followList");
      let courseCards = "";

      courseData.forEach((courseItem) => {
        courseCards += `<div class="col"><div class="card teacher-card swiper-slide h-100"><button
        type="button"
        class="btn p-3 text-center align-self-start position-absolute top-0 end-0 follow-btn"
      >
        <i class="fa-regular fa-heart fs-4 text-primary fw-bold" data-buttonId="${courseItem.id}"></i>
      </button>
    <div class="card-body d-flex justify-content-between">
      <div>
        <h5 class="card-title teacher-card-title truncate-lines-2">${courseItem.name}
        </h5>
        <p class="teacher-card-name">${courseItem.teacher.name}</p>
        <ul class="teacher-card-object">
          <li class="teacher-card-evaluate">${courseItem.rate}</li>
          <li class="teacher-card-hours">50分鐘</li>
        </ul>
        <p class="teacher-card-price">NT$<span>${courseItem.price}</span></p>
      </div>
      <div class="teacher-card-img">
        <img
          src="${courseItem.teacher.avatar}"
          alt="老師"
          class="w-100px w-sm-120px"
        />
      </div>
    </div>
    <div>
      <p class="teacher-card-text">
      ${courseItem.info}
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
  </div></div>`;
      });

      followList.innerHTML = courseCards;
      setButtonListeners(pageId);

      // 總頁數
      let followTotalPages = Math.ceil(followArray.length / 6);
      console.log("followTotalPages", followTotalPages);

      return {
        followTotalPages,
        followArray,
        courseData,
      };
    } catch (error) {
      console.log("錯誤", error);
    }
  }
  // fetchData();

  let { followArray, followTotalPages, courseData } = await fetchData(pageId);

  // 渲染分頁按鈕
  function renderFollowPagination(followArray, pageId, followTotalPages) {
    console.log("pageId 3", pageId);

    // render 分頁按鈕
    // 取得 ul
    const followPaginationWrapper = document.querySelector(".followPagination");

    let followPagination = "";

    // 上一頁按鈕
    const prevPage = `<li class="page-item prevButton ${
      pageId == 1 ? "disabled" : ""
    }"><a class="page-link" href="#" aria-label="Previous"><i class="fa-solid fa-angle-left"></i></a></li>`;
    followPagination += prevPage;

    // 頁數按鈕
    for (let i = 1; i <= followTotalPages; i++) {
      let pageItem = `<li class="page-item ${
        i === pageId ? "active" : ""
      } pageButton">
                        <a class="page-link" href="#">
                          ${i}
                        </a>
                      </li>`;
      followPagination += pageItem;
    }

    // 下一頁按鈕
    const nextPage = `<li class="page-item nextButton ${
      pageId == followTotalPages ? "disabled" : ""
    }">
                    <a class="page-link" href="#" aria-label="Next">
                      <i class="fa-solid fa-angle-right"></i>
                    </a>
                  </li>`;
    followPagination += nextPage;

    // console.log(followPagination);

    followPaginationWrapper.innerHTML = followPagination;
    switchPage(followTotalPages, pageId, courseData);
  }
  renderFollowPagination(followArray, pageId, followTotalPages);

  // 切換頁數
  function switchPage(followTotalPages, pageId, courseData) {
    const prevButton = document.querySelector(".prevButton");
    const nextButton = document.querySelector(".nextButton");
    let pageButtons = document.querySelectorAll(".pageButton");

    prevButton.addEventListener("click", function () {
      if (pageId > 1) {
        pageId--;

        renderFollowPagination(followArray, pageId, followTotalPages);

        fetchData(pageId);
      }
    });

    nextButton.addEventListener("click", function () {
      if (followTotalPages > pageId) {
        pageId++;
        console.log("pageId 頁數切換", pageId);

        renderFollowPagination(followArray, pageId, followTotalPages);

        fetchData(pageId);
      }
    });

    pageButtons.forEach((pageButton) => {
      pageButton.addEventListener("click", () => {
        pageId = Number(pageButton.innerText);

        fetchData(pageId);
        renderFollowPagination(followArray, pageId, followTotalPages);
      });
    });
  }
  switchPage(followTotalPages, pageId, courseData);

  // 監聽 follow 愛心按鈕
  function setButtonListeners(pageId) {
    let followButtons = document.querySelectorAll(".follow-btn");

    followButtons.forEach((followBtn) => {
      followBtn.addEventListener("click", (e) => {
        console.log("點擊到了");

        cancelFollow(e, pageId);
      });
    });
  }

  // 取消追蹤
  async function cancelFollow(e, pageId) {
    let buttonId = e.target.dataset.buttonid;
    console.log("buttonId", buttonId);

    let editfollowList = followArray.filter((item) => item != buttonId);
    // console.log("pageId 44", pageId);

    Swal.fire({
      title: "確定要取消追蹤?",
      showDenyButton: true,
      confirmButtonColor: "#115BC9",
      confirmButtonText: "取消追蹤",
      denyButtonText: `我再想想`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("已取消追蹤", "", "success");

        axios
          .patch(`${apiUrl}/users/${userId}`, {
            followList: editfollowList,
          })
          .then(async (res) => {
            console.log(res);
            // 重新取得數據
            const newData = await fetchData(pageId);

            followArray = newData.followArray;

            if (newData.followTotalPages == 1) {
              pageId = 1;
              fetchData(pageId);
            } else {
              fetchData(pageId);
            }

            renderFollowPagination(
              followArray,
              pageId,
              newData.followTotalPages
            );
          });
      }
    });
  }
});
