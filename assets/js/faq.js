// 資料 渲染 分開
const faqSearchButton = document.querySelector(".faq-search-btn");
const faqSearchInput = document.querySelector(".faq-search-input");
let faqSearchValue = "";

faqSearchButton.addEventListener("click", searchQuestion);

function searchQuestion() {
  faqSearchValue = faqSearchInput.value;
  if (faqSearchValue) {
    const faqTeams = document.querySelectorAll(".faq-team");
    faqTeams.forEach((faqTeam) => {
      const faqQ = faqTeam.querySelector(".faq-question");

      if (faqQ) {
        const faqQText = faqQ.textContent;

        if (!faqQText.includes(faqSearchValue)) {
          faqTeam.classList.add("d-none");
        } else {
          faqTeam.classList.remove("d-none");
        }
      }
    });
  } else {
    const faqTeams = document.querySelectorAll(".faq-team");

    faqTeams.forEach((faqTeam) => {
      faqTeam.classList.remove("d-none");
    });
  }
}

document.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    faqSearchButton.click();
  }
});

// 清除輸入框
const clearInput = document.querySelector(".clear-input");
clearInput.addEventListener("click", function () {
  faqSearchInput.value = "";
});

// 跳轉 老師問答
const teacherTab = document.querySelector("#teacher-tab");
const studentTab = document.querySelector("#student-tab");

const faq = sessionStorage.getItem("faq");
if (faq == "teacherFaq") {
  teacherTab.click();
} else if (faq == "studentFaq") {
  studentTab.click();
}
