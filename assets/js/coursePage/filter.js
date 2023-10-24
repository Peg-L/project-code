import {
  minPriceDefault,
  maxPriceDefault,
  data,
  getCoursesData,
} from "./api.js";

//選取 控制篩選收合按鈕的數字
const selectedFiltersNumHtml = document.querySelectorAll(
  ".js-selectedFiltersNum"
);
let selectedFiltersNum = 0;
//選取 input
const filterRatings = document.querySelectorAll('input[name="filterStar"]');
const minPrice = document.querySelector("input[name='minPrice']");
const maxPrice = document.querySelector("input[name='maxPrice']");
//選取 整個篩選課程分類(checkbox)的父層
let categories = document.querySelector("#accordionFilter");
//選取 確認篩選按鈕
const filterBtn = document.querySelector(".js-filterBtn");
//選取 清除篩選按鈕
const delFilterBtn = document.querySelector(".js-delFilterBtn");

/*** 計算使用幾個篩選項目 ***/
const countSelectedFilters = () => {
  /* 計算評等 */
  if (!filterRatings[0].checked) {
    selectedFiltersNum++;
  }

  /* 計算價格 */
  if (minPrice.value || maxPrice.value) {
    selectedFiltersNum++;
  }

  /* 計算課程分類 */
  const checkboxes = document.querySelectorAll(".js-category");
  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      selectedFiltersNum++;
    }
  });

  /* 渲染篩選項目數量 */
  selectedFiltersNumHtml.forEach(
    (item) => (item.innerHTML = selectedFiltersNum)
  );
  selectedFiltersNum = 0;
};
const zeroSelectedFilters = () => {
  selectedFiltersNum = 0;
  selectedFiltersNumHtml.forEach(
    (item) => (item.innerHTML = selectedFiltersNum)
  );
};

/*** 篩選項目筆數 ***/
const handleFilterNum = (allCourses) => {
  const filterRatingNum = document.querySelectorAll(".js-filterRatingNum");
  const categoriesNum = document.querySelectorAll("[data-category]");
  const ratingLength = filterRatingNum.length;
  const categoryLength = categoriesNum.length;
  const ratingNumData = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  const categoryNumData = {};
  for (let i = 0; i < categoriesNum.length; i++) {
    let dataCategory = categoriesNum[i].dataset.category;
    categoryNumData[dataCategory] = 0;
    if (categoryNumData[dataCategory] === NaN) {
      console.log("篩選項目有打錯，出現NaN");
    }
  }
  console.log(categoryNumData);
  allCourses.forEach((course) => {
    /* 計算各評等筆數 */
    const rate = Math.floor(parseFloat(course.rate));
    if (rate >= 1) {
      for (let i = 1; i <= rate; i++) {
        ratingNumData[i]++;
      }
    }

    /* 計算各分類筆數 */
    course.categories.forEach((category) => {
      categoryNumData[category]++;
    });

    categoryNumData[course.level]++;
  });
  console.log(categoryNumData);

  /* 將各評等筆數寫入HTML */
  for (let i = 0; i < ratingLength; i++) {
    filterRatingNum[i].innerHTML = `(${ratingNumData[ratingLength - i]} 筆)`;
  }

  /* 將各分類筆數寫入HTML */
  for (let i = 0; i < categoryLength; i++) {
    let dataCategory = categoriesNum[i].dataset.category;
    categoriesNum[i].innerHTML = `(${categoryNumData[dataCategory]})`;
  }
};

/*** 課程評等篩選功能 ***/
filterRatings.forEach((rate) => {
  rate.addEventListener("change", (e) => {
    handleRatingFilter(e.target.id);
  });
});
const handleRatingFilter = (rate) => {
  data.rate_gte = {
    allStar: 0,
    filterStar5: 5,
    filterStar4: 4,
    filterStar3: 3,
    filterStar2: 2,
    filterStar1: 1,
  }[rate];
};

/***課程分類篩選功能***/

const selectAllFilter = (target) => {};

/* 課程分類 checkbox 點擊監聽 */
// categories為全部課程主題篩選的父元素，當作事件代理。當有change事件時，事件會冒泡到父元素。這避免每個全選checkbox都要綁監聽事件，耗性能且較難維護
categories.addEventListener("change", (e) => {
  const target = e.target;

  /* 當target是課程主題大項checkbox */
  if (target.classList.contains("js-selectAll")) {
    const isCheck = target.checked;
    const relatedCheckboxes = document.querySelectorAll(
      `input[id^="${target.name}"]:not([id="${target.name}"])`
    );
    if (relatedCheckboxes.length) {
      relatedCheckboxes.forEach((checkbox) => {
        checkbox.checked = isCheck;
        handleCategoryFilters(checkbox);
      });
    } else {
      console.log(`${target.name}內沒有checkbox`);
    }
    // 當target是課程分類小項checkbox
  } else if ((target.type = "checkbox")) {
    handleCategoryFilters(target);
  }
});

const isEnglish = (value) => {
  return /[a-zA-Z]/.test(value);
};

/* 課程分類篩選功能 */
const handleCategoryFilters = ({ checked, value }) => {
  let apiFilter;
  let apiLevel = `&level_like=${value}`;
  isEnglish(value)
    ? (apiFilter = `&categories_like=\\b${value}\\b`) //BUG：目前C會找到C#
    : (apiFilter = `&categories_like=${value}`); //value是中文時，加正則表達式會找不到

  if (checked) {
    //避免按全選時重複選取
    if (!data.filters.includes(value)) {
      if (value === "入門" || value === "進階") {
        data.filters += apiLevel;
      } else {
        data.filters += apiFilter;
      }
    }
  } else {
    data.filters = data.filters
      .split(/(?=&)/)
      .filter((item) => item !== apiFilter && item !== apiLevel)
      .join("");
  }
};

/*** 確定篩選 ***/
filterBtn.addEventListener("click", () => {
  if (minPrice.value) {
    data.price_gte = minPrice.value;
  }
  if (maxPrice.value) {
    data.price_lte = maxPrice.value;
  }
  getCoursesData(data);
  countSelectedFilters();
});

/*** 清除篩選 ***/
delFilterBtn.addEventListener("click", () => {
  minPrice.value = "";
  maxPrice.value = "";
  filterRatings[0].checked = true;
  const checkboxes = document.querySelectorAll(".js-selectAll, .js-category");
  checkboxes.forEach((checkbox) => (checkbox.checked = false));
  data = {
    ...data,
    rate_gte: 0,
    rate_lte: 5,
    price_gte: minPriceDefault,
    price_lte: maxPriceDefault,
    filters: "",
  };
  zeroSelectedFilters();
  getCoursesData(data);
});

export { selectAllFilter, handleFilterNum };
