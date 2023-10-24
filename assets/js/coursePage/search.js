import { data, getCoursesData } from "./api.js";

/*** 首頁搜尋跳轉 ***/
const indexSearchInput = localStorage.getItem("indexSearchInput");
if (indexSearchInput) {
  data.q = indexSearchInput;
  getCoursesData(data);
  localStorage.setItem("indexSearchInput", "");
}

/*** 取得 banner 搜尋框的值 ***/
const courseSearchInput = document.querySelector(".course-search-input");

let courseSearchInputValue;

courseSearchInput.addEventListener("input", function () {
  courseSearchInputValue = courseSearchInput.value;
});

const courseSearchButton = document.querySelector(".course-search-button");

courseSearchButton.addEventListener("click", function (data) {
  courseSearchInput.value = "";
  data.q = courseSearchInputValue;
  getCoursesData(data);
  data.q = "";
});
