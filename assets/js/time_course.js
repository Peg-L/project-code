//判斷早中晚之參數
const morning = document.querySelector('#morning');
const afternoon = document.querySelector('#afternoon');
const evening = document.querySelector('#evening');
let clickTime = '';
let morning_str = '';
let afternoon_str = '';
let evening_str = '';

//add data to db
const attendSubmit = document.querySelector('#attendSubmit');
let oldAttendTime = [];
attendSubmit.addEventListener('click',() => {
    //console.log(clickCourse,clickDay,userId,clickTime);
    postAttendCourse(clickCourse,clickDay,userId,clickTime);
});



//顯示教師當日開放時間
function viewTimeCourse(){
    if (clickCourse!==""&&clickDay!==""&&userId!==""){
        console.log('gooooood');
        axios.get(`${_url}/courses/${clickCourse}?_expand=teacher`)
        .then(function(response){
                const filteredTimeCourse = response.data.teacher.openTime.filter(item=>item.date === clickDay);
                if(filteredTimeCourse.length>0){
                    const viewTime = filteredTimeCourse[0].time;
                    viewTime.forEach(item => {
                        switch (classifyTime(item)) {
                            case '上午':
                                morning_str += `<li class="btn-time" data-time=${item}>${item}</li>`;
                                break;
                            case '中午':
                                afternoon_str+=`<li class="btn-time" data-time=${item}>${item}</li>`;
                                break;
                            case '晚上':
                                evening_str+=`<li class="btn-time" data-time=${item}>${item}</li>`;
                                break;
                        }
                    });
                }
                morning.innerHTML = morning_str;
                morning_str = '';
                afternoon.innerHTML = afternoon_str;
                afternoon_str = '';
                evening.innerHTML = evening_str;
                evening_str = '';
                const btn_times = document.querySelectorAll('.btn-time');
                btn_times.forEach(btn=>{
                    btn.addEventListener('click',e=>{
                        btn_times.forEach(btn=>{
                            btn.classList.remove('active');
                        })
                        e.currentTarget.classList.add('active');
                        clickTime = e.target.getAttribute('data-time');
                    })
                })
        })
    }else{
        return;
    }
}
//將資料加入到db
function postAttendCourse(clickCourse,clickDay,userId,clickTime){
    const _url = 'http://localhost:3000';
    const data = {
        courseId : clickCourse,
        date : clickDay,
        time : clickTime
    }
    axios.get(`${_url}/user_courses/${userId}`)
  .then(response => {
    oldAttendTime = [...response.data.attendTime];
    //console.log(oldAttendTime);
    //update data to db
    axios.patch(`${_url}/user_courses/${userId}`,{
        attendTime : [...oldAttendTime , data]
    })
    .then(response => {
        console.log('add success');
    })
    .catch(error => {
        console.error('Error adding post:', error);
    });
  })
  .catch(error => {
    console.error('Error adding post:', error);
  });
}
//判斷時間為早、中、晚
function classifyTime(timeString) {
    const time = new Date(`2000-01-01 ${timeString}`);
    const hours = time.getHours();

    if (hours >= 0 && hours < 12) {
        return "上午";
    } else if (hours >= 12 && hours < 18) {
        return "中午";
    } else {
        return "晚上";
    }
}