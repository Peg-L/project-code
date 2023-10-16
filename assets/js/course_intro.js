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


const list = document.querySelector('.list');
const queryParams = new URLSearchParams(window.location.search);
const courseId = queryParams.get('course_id'); //抓取課程ID
const _url = "http://localhost:3000"; // 修改處
let data = [];
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
        //section4


    })
}
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
