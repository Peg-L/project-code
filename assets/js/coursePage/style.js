//filter-bar 在 sticky 時添加陰影，且加上margin
let filterBar = document.querySelector("#js-filter-bar");
let stickyMargin = document.querySelector("#js-sticky-mt");
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  let scrollThreshold;

  if (window.innerWidth < 375) {
    // 手機板時
    scrollThreshold = 120;
  } else if (window.innerWidth < 768) {
    // 平板時
    scrollThreshold = 300;
  } else {
    // 桌機以上時
    scrollThreshold = 418;
  }

  if (window.scrollY < scrollThreshold) {
    filterBar.style.boxShadow = "";
    stickyMargin.style.marginTop = "";
    navbar.style.display = "block";
  } else {
    filterBar.style.boxShadow = "0 10px 6px -6px rgba(0, 0, 0, 0.15)";
    stickyMargin.style.marginTop = "78px";
    navbar.style.display = "none";
  }
});

// 為#collapseFilter元素在螢幕寬度小於992px添加.show
window.addEventListener("resize", function () {
  // 取得當前螢幕寬度
  const screenWidth = window.innerWidth || document.documentElement.clientWidth;

  if (screenWidth < 1200) {
    document.getElementById("collapseFilter").classList.add("show");
  }
});
