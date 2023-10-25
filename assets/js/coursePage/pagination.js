import { data, getCoursesData, lastPage } from "./api.js";

const pagination = document.querySelector(".pagination");

pagination.addEventListener("click", (e) => {
  // closest（selectors） 方法用於檢索該元素的父節點，或者元素的父級與選擇器匹配。如果未找到祖先，則該方法返回 null 。
  const targetElement = e.target.closest("[data-page]");

  if (targetElement) {
    e.preventDefault();
    const { page } = targetElement.dataset;

    switch (page) {
      case "prev":
        console.log("prev");
        data.page -= 1;
        break;
      case "next":
        console.log("next");
        data.page += 1;
        break;
      default:
        data.page = Number(page);
    }

    getCoursesData(data);
  }
});
export { pagination };
