// 資料 渲染 分開
const faqSearchButton = document.querySelector(".faq-search-btn");



faqSearchButton.addEventListener("click", ()=>{
  const faqSearchInput = document.querySelector(".faq-search-input");

  let faqSearchValue = faqSearchInput.value;
  console.log("搜尋關鍵字",faqSearchValue);
  faqSearchInput.value = "";
  
  const faqTeams = document.querySelectorAll(".faq-team");
  faqTeams.forEach((faqTeam)=>{
    const faqQ = faqTeam.querySelector(".faq-question");

    if (faqQ) {
      const faqQText = faqQ.textContent;

      if (!faqQText.includes(faqSearchValue)) {
        faqTeam.classList.add("d-none");
      }
    }
  })
})
