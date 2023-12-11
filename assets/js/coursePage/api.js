import { inputDisable, renderCourses, renderPagination } from "./render.js";
import { handleFilterNum } from "./filter.js";
import axios from "axios";

// const _url = "https://project-code-json-k0ti.onrender.com";
let totalSearchNum = document.querySelector(".js-totalSearchNum");
let currentPageCourses = [];
let allCoursesNum;
let lastPage;
const minPriceDefault = 0;
const maxPriceDefault = 9999;
let data = {
  page: 1,
  limit: 10,
  sort: "",
  order: 0,
  q: "",
  rate_gte: 0,
  rate_lte: 5,
  price_gte: minPriceDefault,
  price_lte: maxPriceDefault,
  filters: "",
  sort: "",
  order: "desc",
};
let isLoading = false;

init();
function init() {
  const indexSearchInput = localStorage.getItem("indexSearchInput");
  const cateItemName = sessionStorage.getItem("cateItemName");

  if (!indexSearchInput && !cateItemName) {
    getCoursesData(data);
    getAllData(data);
  }
}

/*** api-取得卡片內容 ***/
async function getCoursesData({
  page,
  limit,
  q,
  rate_gte,
  rate_lte,
  price_gte,
  price_lte,
  filters,
  sort,
  order,
}) {
  try {
    const apiUrl = `${_url}/courses?_expand=teacher&_page=${page}&_limit=${limit}&q=${q}&rate_gte=${rate_gte}&rate_lte=${rate_lte}&price_gte=${price_gte}&price_lte=${price_lte}${filters}&_sort=${sort}&_order=${order}`;

    isLoading = true;
    renderCourses();
    inputDisable();

    const res = await axios.get(apiUrl);
    currentPageCourses = res.data;
    allCoursesNum = parseInt(res.headers.get("X-Total-Count"));
    totalSearchNum.innerHTML = `共 ${allCoursesNum} 個結果`;
    /** 課程卡片評論api **/
    const commentUrls = currentPageCourses.map((item) => {
      return `${_url}/comments/${item.commentId}?_expand=user`;
    });

    const responses = await Promise.all(
      commentUrls.map((commentUrl) => axios.get(commentUrl))
    );
    currentPageCourses.forEach((item, index) => {
      item.comment = responses[index].data;
    });
    // console.log("currentPageCourses", currentPageCourses);

    isLoading = false;
    renderCourses();
    inputDisable();

    //計算一共有幾頁
    lastPage = Math.ceil(parseInt(allCoursesNum) / parseInt(data.limit));
    renderPagination();
  } catch (error) {
    console.log("courseError", error);
  }
}

/*** api-取得卡片數量 ***/
// 取得全部課程以計算篩選項目數量
async function getAllData({
  q,
  rate_gte,
  rate_lte,
  price_gte,
  price_lte,
  filters,
}) {
  try {
    const apiUrl = `${_url}/courses?&q=${q}&rate_gte=${rate_gte}&rate_lte=${rate_lte}&price_gte=${price_gte}&price_lte=${price_lte}${filters}`;

    const res = await axios.get(apiUrl);
    handleFilterNum(res.data);
  } catch (error) {
    console.log("getAllData", error);
  }
}

export {
  currentPageCourses,
  lastPage,
  minPriceDefault,
  maxPriceDefault,
  data,
  isLoading,
  getCoursesData,
  getAllData,
};
