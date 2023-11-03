const appointment_list = document.querySelector('#appointment_list'); //get ul
let appointment_data = {};
//生成預約教師列表
function updateTeacherList(){
    axios.get(`${_url}/user_courses?userId=${userId.toString()}`)
    .then(function(response){
        //console.log(response.data[0]);
        // 使用 reduce 來計算 courseId 的數量
        const courseIdCounts = response.data[0].attendTime.reduce((counts, attendTime) => {
            const courseId = attendTime.courseId;
            counts[courseId] = (counts[courseId] || 0) + 1;
            return counts;
        }, {});
        //資料結合
        appointment_data = {...courseIdCounts};
        mergeData(appointment_data);
        //console.log(courseIdCounts); //{1: 4, 2: 3, 3: 3}
        function mergeData(data){
            let str = '';
            axios.get(`${_url}/courses?_expand=teacher`)
            .then(function(response){
                const objects = response.data;
                objectsWithCounts = objects.map(obj => ({ ...obj, count: data[obj.id] }));
                const arr = objectsWithCounts.filter(item => item.count !== undefined);
                //console.log(arr);
                arr.forEach(item => {
                    str += `<li class="book-card" data-courseId="${item.id}">
                <img src="${item.teacher.avatar}" alt="" />
                <div class="d-flex flex-column">
                  <h4>${item.name}</h4>
                  <p>${item.teacher.name}</p>
                  <div class="d-flex gap-2">
                    <p>未預約: ${item.count}</p>
                    <p>請求中: ${item.count}</p>
                  </div>
                </div>
              </li>`;
                });
                appointment_list.innerHTML = str;
                const teacher_list = document.querySelectorAll('.book-card'); //列表生成後抓取列表
                teacher_list.forEach(btn => {
                    btn.addEventListener('click',e=>{
                        teacher_list.forEach(btn => {
                            btn.classList.remove('active');
                        })
                        e.currentTarget.classList.add('active');
                        const clickTeacher = e.currentTarget.getAttribute('data-courseId'); //偵測是否選擇
                    })
                })
            })
            .catch(err => {
                console.error(err); 
            })
        }
    })
    .catch(err => {
        console.error(err); 
    })
}


updateTeacherList();