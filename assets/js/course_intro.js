const queryParams = new URLSearchParams(window.location.search);
const courseId = queryParams.get('course_id'); //抓取課程ID
const _url = "http://localhost:3000"; // 修改處
let data = [];



//第一部分參數
const teacherImg = document.querySelector('#teacherImg');
const teacherName = document.querySelector('#teacher_name');
const course_title = document.querySelector('#course_title');
const courseClass = document.querySelector('#courseClass');
const course_info = document.querySelector('#course_info');
//第二部分參數
const teacher_degree = document.querySelector('#teacher_degree');
const teacher_experience = document.querySelector('#teacher_experience');
const language = document.querySelector('#language');
const level = document.querySelector('#level');
const intro = document.querySelector('#intro');
//第三部分參數 
//第四部分參數

const left = document.querySelector('#PreviousWeek');
const right = document.querySelector('#NextWeek');


//資料取得完畢並且初始化
function init(){
    axios.get(`${_url}/courses/${courseId.toString()}?_expand=teacher`)
    .then(function(response){
        data=response.data;
        //sections1(course profile)
        teacherImg.setAttribute("src",data.teacher.avatar);
        teacherName.textContent = data.teacher.name;
        course_title.textContent = data.name;
        courseClass.textContent = data.topics;
        course_info.textContent = data.info;
        //section2(teacher profile)
        teacher_degree.textContent = data.teacher.education;
        teacher_experience.textContent = data.teacher.experience;
        language.textContent = data.teacher.lang.join("/");
        level.textContent = data.level;
        intro.textContent = data.teacher.intro;
        //section3
        //section4(calendar)
        updateData();
    })
}
function updateData() {
    const daysDate = document.querySelectorAll('.calendar-time');
    daysDate.forEach(item => {
        let dataNum = item.getAttribute('data-num');
        let matchData = findMatchData(dataNum);
        let str = '';
        if (matchData.length !== 0) {
            matchData[0].time.forEach(date => {
                if(!matchData[0].useTime.find(item => date === item)){
                    str += `<li><a href=''>${date}</a></li>`
                }else{
                    str += `<li><a class="text-primary" href=''>${date}</a></li>`
                }
            })
            item.innerHTML = str;
        }
    });

    function findMatchData(dataNum) {
        return data.teacher.openTime.filter(item => item.date === dataNum);
    }
}

// 預設載入初始化環境
init();

left.addEventListener('click',()=>{
    updateData();
})
right.addEventListener('click',()=>{
    updateData();
})






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
