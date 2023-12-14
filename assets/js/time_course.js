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
attendSubmit.addEventListener('click',(e) => {
    //console.log(clickCourse,clickDay,userId,clickTime);
    postAttendCourse(clickCourse,clickDay,userId,clickTime);
});
//顯示教師當日開放時間


function viewTimeCourse(clickCourse = document.querySelector('.book-card').getAttribute('data-courseid'),clickDay){
    if (clickCourse!==""&&clickDay!==""&&userId!==""){
        // console.log(clickCourse,clickDay);
        axios.get(`${_url}/courses/${clickCourse}?_expand=teacher`)
        .then(function(response){
                const filteredTimeCourse = response.data.teacher.openTime.filter(item=>item.date === clickDay);
                //console.log(filteredTimeCourse);
                if(filteredTimeCourse.length>0){
                    const viewTime = filteredTimeCourse[0].time;
                    function isUseDate(time){
                        if(filteredTimeCourse[0].useTime.find(el => el === time) === undefined){
                            return false;    
                        }else{
                            return true;
                        }
                    }
                    viewTime.forEach(item => {
                        switch (classifyTime(item)) {
                            case '上午':
                                if(isUseDate(item)){
                                    morning_str += `<li class="btn-time  disable" data-time=${item}>${item}</li>`
                                }else{
                                    morning_str += `<li class="btn-time" data-time=${item}>${item}</li>`
                                }
                                break;
                            case '中午':
                                if(isUseDate(item)){
                                    afternoon_str += `<li class="btn-time disable" data-time=${item}>${item}</li>`
                                }else{
                                    afternoon_str += `<li class="btn-time" data-time=${item}>${item}</li>`
                                }
                                break;
                            case '晚上':
                                if(isUseDate(item)){
                                    evening_str += `<li class="btn-time disable" data-time=${item} >${item}</li>`
                                }else{
                                    evening_str += `<li class="btn-time" data-time=${item}>${item}</li>`
                                }
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
    // const _url = 'http://localhost:3000';
    const data = {
        uid:generateRandomCode(4),
        courseId : Number(clickCourse),
        date : clickDay,
        time : clickTime,
        isCheck :false
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
            Swal.fire({
                icon: "success",
                title: "預約成功",
                showConfirmButton: false,
                timer: 1500
            });
            updateTeacherList();
        })
        .catch(error => {
            console.error('Error adding post:', error);
        });
        //add to teacher's useTime
        axios.get(`${_url}/courses/${data.courseId}`)
        .then(response=>{
            //取得老師資料
            const teacherId = response.data.teacherId;
            axios.get(`${_url}/teachers/${teacherId}`)
            .then(response => {
                const oldTeacherData = [...response.data.openTime];
                const dateIdx = oldTeacherData.findIndex(item=>item.date === data.date);
                oldTeacherData[dateIdx].useTime.push(data.time);
                //更新老師裡的openTime
                axios.patch(`${_url}/teachers/${teacherId}`,{
                    openTime : [...oldTeacherData]
                })
                .then(response => {
                    console.log('更新老師資料成功');
                    viewTimeCourse(clickCourse,clickDay);
                })
                .catch(error => {
                    console.error('Error adding post:', error);
                });
            })
            .catch(error => {
                console.error('Error adding post:', error);
            });
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
function generateRandomCode(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    // 第一個字是英文字母
    const firstCharIndex = Math.floor(Math.random() * (characters.length - 10));
    result += characters.charAt(firstCharIndex);

    for (let i = 1; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
}