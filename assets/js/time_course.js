const morning = document.querySelector('#morning');
const afternoon = document.querySelector('#afternoon');
const evening = document.querySelector('#evening');

let morning_str = '';
let afternoon_str = '';
let evening_str = '';

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
                                morning_str += `<li class="btn-time">${item}</li>`;
                                break;
                            case '中午':
                                afternoon_str+=`<li class="btn-time">${item}</li>`;
                                break;
                            case '晚上':
                                evening_str+=`<li class="btn-time">${item}</li>`;
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
        })
    }else{
        return;
    }
}
    

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