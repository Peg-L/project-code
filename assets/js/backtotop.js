console.log("backtotop");

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

// 點擊後跳轉到最上面
$(".backtotopBtn").on("click", function () {
  $("html").animate({ scrollTop: 0 }, 1000);
});
