// 資料 渲染 分開
const faqSearchButton = document.querySelector(".faq-search-btn");

faqSearchButton.addEventListener("click", searchQuestion);

function searchQuestion() {
  const faqSearchInput = document.querySelector(".faq-search-input");
  let faqSearchValue = faqSearchInput.value;

  if (faqSearchValue) {
    faqSearchInput.value = "";

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
  }
}

document.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    faqSearchButton.click();
  }
});
