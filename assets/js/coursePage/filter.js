import {
  minPriceDefault,
  maxPriceDefault,
  data,
  getCoursesData,
} from "./api.js";

//選取 控制篩選收合按鈕的數字 (collapse、offcanvas各一)
const selectedFiltersNumHtml = document.querySelectorAll(
  ".js-selectedFiltersNum"
);
let selectedFiltersNum = 0;
//選取 input
const filterRatings = document.querySelectorAll('input[name="filterStar"]');
const minPrice = document.querySelector("input[name='minPrice']");
const maxPrice = document.querySelector("input[name='maxPrice']");
//選取 整個篩選課程分類(checkbox)的父層
let accordionFilter = document.querySelector("#accordionFilter");
//選取 篩選課程分類小項
const categories = document.querySelectorAll(".js-category");
//選取 清除篩選按鈕
const delFilterBtn = document.querySelector(".js-delFilterBtn");
//選取 確認篩選按鈕
// const filterBtn = document.querySelector(".js-filterBtn");

/*** 課程評等篩選功能 ***/
filterRatings.forEach((rate) => {
  /* 找到選取的評等 */
  rate.addEventListener("change", (e) => {
    handleRatingFilter(e.target.id);
  });
});
/* 執行課程評等篩選 */
function handleRatingFilter(rate) {
  // data.rate_gte 賦予 物件中和rate相同的屬性的值
  data.rate_gte = {
    allStar: 0,
    filterStar5: 5,
    filterStar4: 4,
    filterStar3: 3,
    filterStar2: 2,
    filterStar1: 1,
  }[rate];

  //回到第一頁
  data.page = 1;
  //呼叫 api
  getCoursesData(data);
  // 計算篩選幾項
  countSelectedFilters();
}

/*** 價格 篩選功能 ***/
/* 最低價格 */
minPrice.addEventListener("blur", () => {
  const priceInputValue = parseInt(minPrice.value.trim());

  // 把 input 的值清空時
  if (isNaN(priceInputValue)) {
    // data.price_gte 不是初始值時才呼叫api
    if (data.price_gte !== minPriceDefault) {
      data.price_gte = minPriceDefault;

      //回到第一頁
      data.page = 1;
      //呼叫 api
      getCoursesData(data);
      // 計算篩選幾項
      countSelectedFilters();
    }
  }
  // input 輸入數值時
  else {
    // 輸入的數值不是上次輸入的值時
    if (priceInputValue !== data.price_gte) {
      data.price_gte = priceInputValue;

      //回到第一頁
      data.page = 1;
      //呼叫 api
      getCoursesData(data);
      // 計算篩選幾項
      countSelectedFilters();
    }
  }
});

/* 最高價格 */
maxPrice.addEventListener("blur", () => {
  const priceInputValue = parseInt(maxPrice.value.trim());

  // 把 input 的值清空時
  if (isNaN(priceInputValue)) {
    // data.price_lte 不是初始值時才呼叫api
    if (data.price_lte !== maxPriceDefault) {
      data.price_lte = maxPriceDefault;

      //回到第一頁
      data.page = 1;
      //呼叫 api
      getCoursesData(data);
      // 計算篩選幾項
      countSelectedFilters();
    }
  }
  // input 輸入數值時
  else {
    // 輸入的數值不是上次輸入的值時
    if (priceInputValue !== data.price_lte) {
      data.price_lte = priceInputValue;

      //回到第一頁
      data.page = 1;
      //呼叫 api
      getCoursesData(data);
      // 計算篩選幾項
      countSelectedFilters();
    }
  }
});

/***課程分類篩選功能***/

/* 判斷點擊的 checkbox 是大項還是小項 */
// accordionFilter為全部課程主題篩選的父元素，當作事件代理。當有change事件時，事件會冒泡到父元素。這避免每個全選checkbox都要綁監聽事件，耗性能且較難維護
let cateItemName = sessionStorage.getItem("cateItemName");
console.log(cateItemName);

document.addEventListener("DOMContentLoaded", cate);

function cate() {
  const target = document.querySelector(`#${cateItemName}`);

  /* 當target是課程主題大項checkbox */
  if (target.classList.contains("js-selectAll")) {
    target.checked = true;

    // 選取 大項內所有的小項
    const relatedCheckboxes = document.querySelectorAll(
      `input[id^="${target.name}"]:not([id="${target.name}"])`
    );
    // 確保大項內有小項
    if (relatedCheckboxes.length) {
      // 把 小項都打勾 並 執行篩選功能
      relatedCheckboxes.forEach((checkbox) => {
        checkbox.checked = true;
        handleCategoryFilters(checkbox);
      });

      // 回到第一頁
      data.page = 1;

      //呼叫 api
      getCoursesData(data);
      // 計算篩選幾項
      countSelectedFilters();
    } else {
      console.log(`${target.name}內沒有checkbox`);
    }
    /* 當target是課程分類小項checkbox */
  } else if ((target.type = "checkbox")) {
    // 更新父層 checkbox 狀態
    const parentCheckbox = target
      .closest(".accordion-item")
      .querySelector(".js-selectAll");
    const relatedCheckboxes = target
      .closest(".accordion-body")
      .querySelectorAll(".js-category");
    updateParentCheckbox(parentCheckbox, relatedCheckboxes);

    // 執行篩選
    handleCategoryFilters(target);

    //回到第一頁
    data.page = 1;
    //呼叫 api
    getCoursesData(data);
    // 計算篩選幾項
    countSelectedFilters();
  }

  sessionStorage.removeItem("cateItemName");
}

accordionFilter.addEventListener("change", (e) => {
  const target = e.target;

  /* 當target是課程主題大項checkbox */
  if (target.classList.contains("js-selectAll")) {
    const isCheck = target.checked;
    // 選取 大項內所有的小項
    const relatedCheckboxes = document.querySelectorAll(
      `input[id^="${target.name}"]:not([id="${target.name}"])`
    );
    // 確保大項內有小項
    if (relatedCheckboxes.length) {
      // 把 小項都打勾 並 執行篩選功能
      relatedCheckboxes.forEach((checkbox) => {
        checkbox.checked = isCheck;
        handleCategoryFilters(checkbox);
      });

      // 回到第一頁
      data.page = 1;
      //呼叫 api
      getCoursesData(data);
      // 計算篩選幾項
      countSelectedFilters();
    } else {
      console.log(`${target.name}內沒有checkbox`);
    }
    /* 當target是課程分類小項checkbox */
  } else if ((target.type = "checkbox")) {
    // 更新父層 checkbox 狀態
    const parentCheckbox = target
      .closest(".accordion-item")
      .querySelector(".js-selectAll");
    const relatedCheckboxes = target
      .closest(".accordion-body")
      .querySelectorAll(".js-category");
    updateParentCheckbox(parentCheckbox, relatedCheckboxes);

    // 執行篩選
    handleCategoryFilters(target);

    //回到第一頁
    data.page = 1;
    //呼叫 api
    getCoursesData(data);
    // 計算篩選幾項
    countSelectedFilters();
  }
});

/* 課程分類篩選功能 */
function handleCategoryFilters({ checked, value }) {
  let apiFilter; //課程分類
  let apiLevel = `&level_like=${value}`; //課程程度
  //檢查是否是英文
  const isEnglish = (value) => {
    return /[a-zA-Z]/.test(value);
  };
  isEnglish(value)
    ? (apiFilter = `&categories_like=\\b${value}\\b`) //BUG：目前C會找到C#
    : (apiFilter = `&categories_like=${value}`); //value是中文時，加正則表達式會找不到

  // 打勾情況
  if (checked) {
    //避免按全選時重複選取
    if (!data.filters.includes(value)) {
      if (value === "入門" || value === "進階") {
        data.filters += apiLevel;
      } else {
        data.filters += apiFilter;
      }
    }
    // 取消打勾情況
  } else {
    data.filters = data.filters
      .split(/(?=&)/)
      .filter((item) => item !== apiFilter && item !== apiLevel)
      .join("");
  }
}

/* 更新父層 checkbox 狀態 function */
function updateParentCheckbox(parentCheckbox, relatedCheckboxes) {
  // 要先把 NodeList 轉成 array 才能用 every()
  const relatedCheckboxesArray = [...relatedCheckboxes];
  // 父層 checkbox 打勾狀態 用 是否全部小項都有打勾 決定
  parentCheckbox.checked = relatedCheckboxesArray.every(
    (checkbox) => checkbox.checked
  );
}

/*** 計算使用幾個篩選項目 ***/
function countSelectedFilters() {
  /* 計算評等 */
  if (!filterRatings[0].checked) {
    selectedFiltersNum++;
  }

  /* 計算價格 */
  if (minPrice.value || maxPrice.value) {
    selectedFiltersNum++;
  }

  /* 計算課程分類 */
  categories.forEach((checkbox) => {
    if (checkbox.checked) {
      selectedFiltersNum++;
    }
  });

  /* 渲染篩選項目數量 */
  selectedFiltersNumHtml.forEach(
    (item) => (item.innerHTML = selectedFiltersNum)
  );
  selectedFiltersNum = 0;
}

/*** 篩選項目筆數 ***/
function handleFilterNum(allCourses) {
  // 選取 評等的比數
  const filterRatingNum = document.querySelectorAll(".js-filterRatingNum");
  // 選取課程分類小項的筆數
  const categoriesNum = document.querySelectorAll("[data-category]");

  const ratingLength = filterRatingNum.length;
  const categoryLength = categoriesNum.length;

  // 建立 評等:筆數 對照物件
  const ratingNumData = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };
  // 建立 課程分類小項:筆數 對照物件
  const categoryNumData = {};
  for (let i = 0; i < categoriesNum.length; i++) {
    let dataCategory = categoriesNum[i].dataset.category;
    categoryNumData[dataCategory] = 0;
    if (categoryNumData[dataCategory] === NaN) {
      console.log("篩選項目有打錯，出現NaN");
    }
  }

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

  /* 將各評等筆數寫入HTML */
  for (let i = 0; i < ratingLength; i++) {
    filterRatingNum[i].innerHTML = `(${ratingNumData[ratingLength - i]} 筆)`;
  }

  /* 將各分類筆數寫入HTML */
  for (let i = 0; i < categoryLength; i++) {
    let dataCategory = categoriesNum[i].dataset.category;
    categoriesNum[i].innerHTML = `(${categoryNumData[dataCategory]})`;
  }
}

/*** 清除篩選 ***/
delFilterBtn.addEventListener("click", initFilters);
function initFilters() {
  //清空價格篩選
  minPrice.value = "";
  maxPrice.value = "";

  // 評等恢復到篩選全部
  filterRatings[0].checked = true;

  // 取消課程類別checkbox勾選
  const checkboxes = document.querySelectorAll(".js-selectAll, .js-category");
  checkboxes.forEach((checkbox) => (checkbox.checked = false));

  // data 中和篩選相關設定恢復預設
  data.rate_gte = 0;
  data.rate_lte = 5;
  data.price_gte = minPriceDefault;
  data.price_lte = maxPriceDefault;
  data.filters = "";

  zeroSelectedFilters();
  getCoursesData(data);
}

// 篩選個數歸零
function zeroSelectedFilters() {
  selectedFiltersNum = 0;
  selectedFiltersNumHtml.forEach(
    (item) => (item.innerHTML = selectedFiltersNum)
  );
}

/*** 確定篩選 ***/
// filterBtn.addEventListener("click", () => {
//   if (minPrice.value) {
//     data.price_gte = minPrice.value;
//   }
//   if (maxPrice.value) {
//     data.price_lte = maxPrice.value;
//   }
// //回到第一頁
// data.page = 1;
// //呼叫 api
// getCoursesData(data);
// // 計算篩選幾項
// countSelectedFilters();
// });

export { handleFilterNum };
