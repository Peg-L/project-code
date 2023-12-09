const backtotopBtn = document.querySelector(".backtotopBtn");

// 偵測往下滾動才顯示
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backtotopBtn.style.display = "block";
  } else {
    backtotopBtn.style.display = "none";
  }
}

const backtotopBtns = document.querySelectorAll(".backtotopBtn");

// 點擊後跳轉到最上面
backtotopBtns.forEach((backtotopBtn) => {
  backtotopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });
});
