import { data, getCoursesData, lastPage } from "./api.js";

const pagination = document.querySelector(".pagination");

pagination.addEventListener(
  "click",
  (e) => {
    const { page } = e.target.dataset;
    console.log(e.target);
    if (page) {
      e.preventDefault();
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
  },
  true // 事件捕捉 - 外往內，預設是 false (內往外)
);
export { pagination };
