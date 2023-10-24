import { inputDisable, renderCourses, renderPagination } from "./render.js";
import { handleFilterNum } from "./filter.js";

let totalSearchNum = document.querySelector(".js-totalSearchNum");
let currentPageCourses = [];
let allCoursesNum;
let lastPage;
const api = "https://project-code-json-k0ti.onrender.com";
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

/*** api-取得卡片內容 ***/
const getCoursesData = async ({
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
}) => {
  const apiUrl = `${api}/courses?_expand=teacher&_page=${page}&_limit=${limit}&q=${q}&rate_gte=${rate_gte}&rate_lte=${rate_lte}&price_gte=${price_gte}&price_lte=${price_lte}${filters}&_sort=${sort}&_order=${order}`;
  console.log(apiUrl);

  isLoading = true;
  renderCourses();
  inputDisable();

  try {
    const res = await axios.get(apiUrl);
    currentPageCourses = res.data;
    allCoursesNum = parseInt(res.headers.get("X-Total-Count"));
    totalSearchNum.innerHTML = `共 ${allCoursesNum} 個結果`;
    /** 課程卡片評論api **/
    for (const item of currentPageCourses) {
      const commentRes = await axios.get(
        `${api}/comments/${item.commentId}?_expand=user`
      );
      item.comment = commentRes.data;
    }
    // 上面用 forEach 時，currentPageCourses[0]的comment有user，但currentPageCourses[0].comment卻沒有user
    // 可能因為 forEach 是同步的，不會等待就繼續下一個迴圈，導致出錯? for...of 在處理迴圈時每個迴圈都會等待完成再進入下一個
    console.log("currentPageCourses", currentPageCourses);

    isLoading = false;
    renderCourses();
    inputDisable();
    getAllData(data);

    //計算一共有幾頁
    lastPage = Math.ceil(parseInt(allCoursesNum) / parseInt(data.limit));
    renderPagination();
  } catch (error) {
    console.log("courseError", error);
  }
};
getCoursesData(data);
/*** api-取得卡片數量 ***/
// 取得全部課程以計算篩選項目數量
const getAllData = async ({
  q,
  rate_gte,
  rate_lte,
  price_gte,
  price_lte,
  filters,
}) => {
  const apiUrl = `${api}/courses?&q=${q}&rate_gte=${rate_gte}&rate_lte=${rate_lte}&price_gte=${price_gte}&price_lte=${price_lte}${filters}`;
  try {
    const res = await axios.get(apiUrl);
    handleFilterNum(res.data);
  } catch (error) {
    console.log("getAllData", error);
  }
};

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
