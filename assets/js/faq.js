// 資料 渲染 分開
const faqSearchButton = document.querySelector(".faq-search-btn");
const faqSearchInput = document.querySelector(".faq-search-input");
let faqSearchValue = "";
console.log(faqSearchValue);

faqSearchButton.addEventListener("click", searchQuestion);

function searchQuestion() {
  faqSearchValue = faqSearchInput.value;
  if (faqSearchValue) {
    console.log("faqSearchValue 有值");

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
    console.log("faqSearchValue 沒有值");
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
