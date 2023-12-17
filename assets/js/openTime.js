
// 获取当前日期
let currentDate = new Date();
const PreviousWeek = document.querySelector('#PreviousWeek');
const NextWeek = document.querySelector('#NextWeek');

//事件綁定
PreviousWeek.addEventListener('click',function(){
   showPreviousWeek();
})
NextWeek.addEventListener('click',function(){
   showNextWeek();
})

// 初始化日历
showCurrentWeek();

// 显示当前周
function showCurrentWeek() {
  showWeek(getStartOfWeek(currentDate));
}

// 显示上一周
function showPreviousWeek() {
  currentDate.setDate(currentDate.getDate() - 7);
  showWeek(getStartOfWeek(currentDate));
}

// 显示下一周
function showNextWeek() {
  currentDate.setDate(currentDate.getDate() + 7);
  showWeek(getStartOfWeek(currentDate));
}

// 获取当前日期所在周的第一天（星期日）
function getStartOfWeek(date) {
  let startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - date.getDay());
  return startOfWeek;
}

// 显示一周的星期
function showWeek(startingDate) {
  let dateRangeDiv = document.getElementById("dateRange");
  dateRangeDiv.innerHTML = startingDate.toLocaleDateString("zh-TW", { year: 'numeric', month: '2-digit', day: '2-digit' }) +
    " ~ " + (new Date(startingDate.setDate(startingDate.getDate() + 6))).toLocaleDateString("zh-TW", { year: 'numeric', month: '2-digit', day: '2-digit' });

  let calendarDiv = document.getElementById("calendar");
  calendarDiv.innerHTML = ""; // 清空日历

  let weekdays = ["日", "一", "二", "三", "四", "五", "六"];
  let str = "";
  for (let i = 0; i < 7; i++) {
    let dayOfWeek = '<li class="calendar-list" ><p class="text-center">'+weekdays[i]+'</p><ul class="calendar-time" data-num=""></ul></li>';
    str += dayOfWeek;
  }
  calendarDiv.innerHTML = str;

 let daysOfWeek = calendarDiv.querySelectorAll('.calendar-time');
 startingDate.setDate(startingDate.getDate() - startingDate.getDay()); // 回到星期日
 for (let i = 0; i < 7; i++) {
   daysOfWeek[i].setAttribute('data-num',startingDate.toLocaleDateString("zh-TW", {year: 'numeric', month: '2-digit', day: '2-digit' })); //標上日期
   startingDate.setDate(startingDate.getDate() + 1);
 }
}
//  <li class="calendar-list">
//                 <p class="text-center">日</p>
//                 <ul class="calendar-time">
//                   <li class="ready-booking">
//                     <a href="" class="text-primary">08:00</a>
//                   </li>
//                   <li><a href="">08:30</a></li>
//                   <li><a href="">09:00</a></li>
//                   <li><a href="">09:30</a></li>
//                   <li><a href="">10:00</a></li>
//                 </ul>
//  </li>