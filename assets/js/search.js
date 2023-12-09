import { data, getCoursesData } from "./api.js";

/*** 首頁搜尋跳轉 ***/
const indexSearchInput = localStorage.getItem("indexSearchInput");

if (indexSearchInput) {
  data.q = indexSearchInput;
  getCoursesData(data);
  data.q = "";
  localStorage.removeItem("indexSearchInput");
}

/*** 取得 banner 搜尋框的值 ***/
const courseSearchInput = document.querySelector(".course-search-input");

let courseSearchInputValue = "";

courseSearchInput.addEventListener("input", function () {
  courseSearchInputValue = courseSearchInput.value;
});

const courseSearchButton = document.querySelector(".course-search-button");

courseSearchButton.addEventListener("click", function () {
  data.q = courseSearchInputValue;
  getCoursesData(data);
  courseSearchInput.value = "";
  courseSearchInputValue = "";
});

courseSearchInput.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    courseSearchButton.click();
  }
});
