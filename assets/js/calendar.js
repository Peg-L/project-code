const daysTag = document.querySelector(".days");
const current_Date = document.querySelector(".current-date");
const prevNextIcon = document.querySelectorAll(".icons span");

let currYear = new Date().getFullYear();
let currMonth = new Date().getMonth();

const months = [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月",
];

const renderCalendar = () => {
        const date = new Date(currYear, currMonth, 1);
        let firstDayofMonth = date.getDay();
        let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
        let lastDayofMonth = new Date(
          currYear,
          currMonth,
          lastDateofMonth
        ).getDay();
        let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();

        let liTag = "";

        for (let i = firstDayofMonth; i > 0; i--) {
          liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
        }

        for (let i = 1; i <= lastDateofMonth; i++) {
          let isToday =
            i === new Date().getDate() &&
            currMonth === new Date().getMonth() &&
            currYear === new Date().getFullYear()
              ? "active"
              : "";
              let dateAttribute = `${currMonth + 1}/${String(i).padStart(2, '0')}`;
              liTag += `<li class="${isToday}" data-day="${dateAttribute}">${i}</li>`;
        }

        for (let i = lastDayofMonth; i < 6; i++) {
          liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
        }

        current_Date.innerText = `${months[currMonth]} ${currYear}`;
        daysTag.innerHTML = liTag;
        
        //day click
        const allDateElements = document.querySelectorAll('.days li');
        const handleDateClick = (element) => {
          allDateElements.forEach((el) => el.classList.remove('active'));
          element.classList.add('active');
        };
        allDateElements.forEach(btn => {
          btn.addEventListener('click',e=>{
            handleDateClick(e.currentTarget);
            const clickDay = e.target.getAttribute('data-day');//偵測是否選擇

          });
        })
        
      };

renderCalendar();

prevNextIcon.forEach((icon) => {
        icon.addEventListener("click", () => {
          currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

          if (currMonth < 0 || currMonth > 11) {
            currYear = icon.id === "prev" ? currYear - 1 : currYear + 1;
            currMonth = currMonth < 0 ? 11 : 0;
          }

          renderCalendar();
        });
});