const queryParams = new URLSearchParams(window.location.search);
// let userId = queryParams.get("userId"); //抓取使用者的ID
// const _url = "http://localhost:3000"; // 修改處
let data = [];

//第一部分參數
const userName = document.querySelector("#userName");
const userRole = document.querySelector("#userRole");
const userImg = document.querySelector("#userImg");

//button
const left = document.querySelector("#PreviousWeek");
const right = document.querySelector("#NextWeek");

//modal資訊
const courseTeacherName = document.querySelector("#courseTeacherName");
const courseName = document.querySelector("#courseName");
const dateTime = document.querySelector("#dateTime");
//資料取得完畢並且初始化
function init() {
  axios
    .get(`${_url}/user_courses?_expand=user&userId=${userId.toString()}`)
    .then(function (response) {
      data = response.data[0]; //資料擷取篩選
      // userImg.setAttribute("src",data.user.Img); //頭貼
      userName.textContent = data.user.name; //姓名
      userRole.textContent = data.user.role; //職稱
      updateData();
    });
}

function updateData() { //課表生成
    const daysDate = document.querySelectorAll('.calendar-time');
    daysDate.forEach(item => {
        let dataNum = item.getAttribute('data-num'); //拿日期
        let matchData = findMatchData(dataNum); //日期比對
        let str = '';
        if (matchData.length !== 0) { //取得當前預約課程
            for(let i=0;i<matchData.length;i++){
                str += `<li class="c2"><a href=''
                data-bs-toggle="modal"
                data-bs-target="#calendarModal"
                data-course-id="${matchData[i].courseId}"
                id="viewCourse">
                ${matchData[i].time}
                </a></li>`
            }
            }
            item.innerHTML = str;
        }
    );
    const viewCourse = document.querySelectorAll('#viewCourse');    
    viewCourse.forEach(item => {
        let courseId = item.getAttribute('data-course-id');//取得課程ID
        item.addEventListener('click',() => {
            getCourse(courseId);
        })
    })
    function findMatchData(dataNum) {
        return data.attendTime.filter(item => item.date === dataNum);
    }
    function getCourse(id) {
        let courseData = [];
        axios.get(`${_url}/courses/${id.toString()}?_expand=teacher`)
        .then(function(response){
            courseData = response.data; //取得課程資訊
            courseTeacherName.textContent = courseData.teacher.name;
            courseName.textContent = courseData.name;
            dateTime.innerHTML = ``;
        })

    }
  };
  const viewCourse = document.querySelectorAll("#viewCourse");
  viewCourse.forEach((item) => {
    let courseId = item.getAttribute("data-course-id"); //取得課程ID
    item.addEventListener("click", () => {
      getCourse(courseId);
    });
  });

  function findMatchData(dataNum) {
    return data.attendTime.find((item) => item.date === dataNum);
  }
  function getCourse(id) {
    let courseData = [];
    axios
      .get(`${_url}/courses/${id.toString()}?_expand=teacher`)
      .then(function (response) {
        courseData = response.data; //取得課程資訊
        courseTeacherName.textContent = courseData.teacher.name;
        courseName.textContent = courseData.name;
        dateTime.innerHTML = ``;
      });
  }
left.addEventListener('click',()=>{
    updateData();
})
right.addEventListener('click',()=>{
    updateData();
})
// 預設載入初始化環境
init();









// // 新增待辦功能
// save.addEventListener('click',function(e){
//   if (txt.value=="") {
//     alert("請輸入內容");
//     return;
//   }
//   let obj = {};
//   obj.content = txt.value
//   axios.post(`${_url}/todos`,obj)
//   .then(function(res){
//     init();
//   })
// })
// // 刪除待辦功能
// list.addEventListener("click",function(e){
//   if(e.target.getAttribute("class")!=="delete"){
//     return;
//   }
//   let num = e.target.getAttribute("data-num");
//   axios.delete(`${_url}/todos/${num}`)
//   .then(function(res){
//     alert("刪除成功！");
//     init();
//   })
// })
