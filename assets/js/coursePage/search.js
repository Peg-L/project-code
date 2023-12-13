import { data, getCoursesData } from "./api.js";

/*** 取得 banner 搜尋框 ***/
const courseSearchInput = document.querySelector(".course-search-input");

/*** 首頁搜尋跳轉 ***/
const indexSearchInput = localStorage.getItem("indexSearchInput");

if (indexSearchInput) {
  courseSearchInput.value = indexSearchInput;
  data.q = indexSearchInput;
  getCoursesData(data);
  data.q = "";
}

const courseSearchButton = document.querySelector(".course-search-button");

courseSearchButton.addEventListener("click", function () {
  data.q = courseSearchInput.value;
  getCoursesData(data);
  localStorage.removeItem("indexSearchInput");
});

courseSearchInput.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    courseSearchButton.click();
  }
});

// 清除輸入框
const clearInputBtn = document.querySelector(".clear-input");

clearInputBtn.addEventListener("click", function () {
  courseSearchInput.value = "";
});
