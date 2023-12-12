import { data, getCoursesData } from "./api.js";

// 選取 排列依據按鈕
const sortByBtn = document.querySelector(".js-sortBy .dropdown-toggle");
// 選取 排列依據選項父元素
const sortByList = document.querySelector(".js-sortBy .dropdown-menu");

// 首頁熱門推薦: 查看更多按鈕
const redirectToPopular = localStorage.getItem("redirectToPopular");

async function redirectToPopularFn() {
  if (redirectToPopular) {
    const order = "commentNum";

    // 確保和上次選的不同
    if (data.sort !== order) {
      data.sort = order;
      sortByBtn.innerHTML = `排序依據：最熱門`;

      //回到第一頁
      data.page = 1;
      //呼叫 api
      await getCoursesData(data);
      localStorage.removeItem("redirectToPopular");
    }
  }
}
redirectToPopularFn();

// 課程分類: 排序按鈕
sortByList.addEventListener("click", (e) => {
  const { order } = e.target.dataset;

  //選到有 data-order 屬性的 html 才會執行
  if (order) {
    // 確保和上次選的不同
    if (data.sort !== order) {
      data.sort = order;
      sortByBtn.innerHTML = `排序依據：${e.target.textContent}`;

      //回到第一頁
      data.page = 1;
      //呼叫 api
      getCoursesData(data);
    }
  }
});

/*** 清除排序 ***/
function initSortBy() {
  data.sort = "";
  sortByBtn.innerHTML = `排序依據`;
  getCoursesData(data);
}
