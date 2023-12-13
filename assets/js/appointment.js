import { userId } from "./config";
import axios from "axios";

const daysTag = document.querySelector(".days");
const current_Date = document.querySelector(".current-date");
const prevNextIcon = document.querySelectorAll(".icons span");
let clickDay = "";
let currYear = new Date().getFullYear();
let currMonth = new Date().getMonth();
let clickCourse = '';
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
            clickDay = e.target.getAttribute('data-day');//偵測是否選擇
            if (!clickCourse){
              clickCourse = document.querySelector('.book-card').getAttribute('data-courseid');
            }
            viewTimeCourse(clickCourse,clickDay);
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

const appointment_list = document.querySelector("#appointment_list"); //get ul
const course_management = document.querySelector("#course-management");
let appointment_data = {};
let manager_data = [];
//生成預約教師列表
function updateTeacherList() {
  axios
    .get(`${_url}/user_courses?userId=${userId.toString()}`)
    .then(function (response) {
      appointment_data = [...response.data[0].purchased]; //取得學生所購買的課程
      manager_data = [...response.data[0].attendTime]; //取得學生已預約的課程
      manager_data.forEach((item) => {
        item.day = item.date;
        delete item.date;
      });
      // console.log(manager_data);
      mergeData(appointment_data);
      mergeManageData(manager_data);
      function mergeData(data) {
        //處裡預約課程
        let str = "";
        axios
          .get(`${_url}/courses?_expand=teacher`)
          .then(function (response) {
            const objects = response.data; //課程關聯教師資料
            const arr = data.map((item1) => {
              const matchingItem = objects.find(
                (item2) => item1.courseId === item2.id
              );
              if (matchingItem) {
                // 合併兩個物件
                return { ...item1, ...matchingItem };
              } else {
                // 如果找不到相符的物件，返回原始的 item1
                return item1;
              }
            });
            // console.log(arr);
            arr.forEach((item) => {
              str += `<li class="book-card" data-courseId="${item.id}">
                <img src="${item.teacher.avatar}" alt="" />
                <div class="d-flex flex-column">
                  <h4>${item.name}</h4>
                  <p>${item.teacher.name}</p>
                  <div class="d-flex gap-2">
                    <p>未預約: ${item.total - item.used}</p>
                  </div>
                </div>
              </li>`;
            });
                appointment_list.innerHTML = str;
                const teacher_list = document.querySelectorAll('.book-card'); //列表生成後抓取列表
                const first_teacher_list = document.querySelector('.book-card');
                var Today=new Date();
                viewTimeCourse(first_teacher_list.getAttribute('data-courseId'),`${(Today.getMonth()+1)}/${Today.getDate()}`);
                first_teacher_list.classList.add('active');
                teacher_list.forEach(btn => {
                    btn.addEventListener('click',e=>{
                        teacher_list.forEach(btn => {
                            btn.classList.remove('active');
                        })
                        e.currentTarget.classList.add('active');
                        clickCourse = e.currentTarget.getAttribute('data-courseId'); //偵測是否選擇
                        viewTimeCourse(clickCourse,clickDay);
                    })
                })
            })
            .catch(err => {
                console.error(err); 
            })
        }
        function mergeManageData(data){ //處裡課程管理
            let str = '';
            axios.get(`${_url}/courses?_expand=teacher`)
            .then(function(response){
                const objects = response.data; //課程關聯教師資料
                const arr = data.map(item1 => {
                    const matchingItem = objects.find(item2 => item1.courseId === item2.id);
                    if (matchingItem) {
                        // 合併兩個物件
                        return { ...item1, ...matchingItem };
                    } else {
                        // 如果找不到相符的物件，返回原始的 item1
                        return item1;
                    }
                });
                // console.log(arr);
                arr.forEach((item,idx) => {//課程管理列表
                  let ischeck_str ='';
                  if(item.isCheck){
                    ischeck_str = 
                    `<button
                    type="button"
                    class="btn btn-secondary2 w-100 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
                    id="ready-${item.uid}"
                  >
                    即將上課
                  </button>`;
              } else {
                ischeck_str = `<button
                    type="button"
                    class="btn btn-secondary2 w-100 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
                    id="check-${item.uid}"
                    disabled
                  >
                    等待確認中
                  </button>`;
              }
              str += `<li class="course-card shadow w-100 w-xl-75">
                    <div class="d-flex flex-grow-1 p-3 p-sm-4 align-items-center">
                      <div class="course-card-header me-4">
                        <a href="#" class="text-center">
                          <div class="mb-2">
                            <img
                              class="avatar"
                              src="${item.teacher.avatar}"
                              alt="teacher"
                            />
                          </div>
                          <h3 class="fs-7 fs-md-6 text-secondary2 mb-1">${item.teacher.name}</h3>
                        </a>
                        <!-- link -->
                      </div>
                      <div class="flex-grow-1 px-4 px-lg-8">
                        <!-- 課程名稱 -->
                        <div
                          class="d-flex flex-md-row flex-column justify-content-md-between mb-md-0 mb-2"
                        >
                          <h2 class="fs-6 fs-sm-5 fs-md-4 line-ellipsis mb-2">
                          ${item.name}
                          </h2>
                        </div>
                        <!-- 課程介紹 -->
                        <div
                          class="d-flex flex-md-row flex-column justify-content-md-between mb-2 mb-md-4"
                        >
                          <p class="fs-sm fs-sm-7 fs-md-6 text-justify mb-md-0 mb-4">
                            50分鐘 x <span class="text-primary">1堂</span>
                          </p>
                          <div class="d-flex flex-md-row flex-column gap-2">
                            <div class="w-150px">
                              <input
                                class="form-control border-light cursor-pointer jq-appointmentDate${idx} ${item.uid}"
                                type="text"
                                name="accountDate1-1"
                                placeholder="日期"
                                value="2023/${item.day}"
                                autocomplete="off"
                                data-courseId="${item.id}"
                                data-uid="${item.uid}"
                                id="date"
                                disabled
                                required
                              />
                            </div>
                    
                            <div class="w-150px">
                              <select
                                class="form-select border border-light ${item.uid}"
                                id="time"
                                disabled
                              >
                                <option selected>${item.time}</option>
                              </select>
                            </div>
                            <button
                              type="button"
                              class="btn text-primary"
                              data-course="${item.uid}"
                              id="change"
                            >
                              修改
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!--  按鈕區塊 -->
                    <div
                      class="course-card-footer d-flex flex-lg-row justify-content-center gap-2 gap-sm-6 p-4 bg-secondary"
                      id="btnBlock"
                    >
                      <!-- 購買按鈕 -->
                      
                      ${ischeck_str}
                      <a
                        href="#"
                        type="button"
                        class="btn btn-white w-100 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
                        data-course="${item.uid}"
                        data-courseId="${item.id}"
                        id="deleteCourse"
                      >
                        取消預約
                      </a>
                    </div>
                    <div
                      class="collapse course-card-footer p-4 bg-secondary"
                      id="save0"
                    >
                      <a
                        href="#"
                        type="button"
                        class="btn btn-white w-100 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
                        data-bs-toggle="collapse"
                        data-bs-target="#save0"
                        aria-expanded="false"
                        aria-controls="save0"
                        id="saveBtn"
                      >
                        儲存
                      </a>
                    </div>
                    </li>`;
            });
            $.datepicker.setDefaults($.datepicker.regional["zh-TW"]);
            $(function () {
              $("[class*=jq-appointmentDate]").each(function (index) {
                const vm = this;
                $(vm).attr("id", "datepicker-" + index); // 加入唯一的 id
                $(vm).datepicker({
                  minDate: 0,
                  maxDate: "+1M +10D",
                  formatDate: "yy-mm-dd",
                  showButtonPanel: true,
                  onSelect: function () {
                    console.log(
                      vm.getAttribute("data-uid"),
                      vm.getAttribute("data-courseId")
                    );
                    let str = "";
                    const getSelect = document.querySelectorAll(
                      `.${vm.getAttribute("data-uid")}`
                    )[1];
                    //console.log(getSelect);
                    const selectCourse = [...objects][
                      vm.getAttribute("data-courseId") - 1
                    ];
                    // console.log(selectCourse.teacher);
                    // console.log(selectCourse.teacher.openTime);
                    // console.log(vm.value.slice(5));
                    // console.log(selectCourse.teacher.openTime.find(day=>day.date === vm.value.slice(5)));
                    const courseDay = {
                      ...selectCourse.teacher.openTime.find(
                        (day) => day.date === vm.value.slice(5)
                      ),
                    };
                    console.log(courseDay);
                    if (Object.keys(courseDay).length === 0) {
                      getSelect.innerHTML = ``;
                      return 0;
                    } else {
                      const filterTime = courseDay.time.filter(
                        (time) => !courseDay.useTime.includes(time)
                      );
                      //console.log(filterTime);
                      filterTime.forEach((item) => {
                        str += `<option>${item}</option>`;
                      });
                      getSelect.innerHTML = str;
                    }
                  },
                });
              });
            });
            course_management.innerHTML = str;
            const change_btn = document.querySelectorAll("#change");
            // console.log(change_btn);
            change_btn.forEach((btn) => {
              //按下修改時，當前日期以及時間可變為更改狀態。
              btn.addEventListener("click", (e) => {
                // console.log(e.currentTarget.getAttribute('data-course'));
                let click_change = e.currentTarget.getAttribute("data-course");
                let str = `.${click_change}`;
                const get2 = document.querySelectorAll(str);
                // console.log(get2[0].value);
                // console.log(get2[1].value);
                get2.forEach((item) => {
                  item.toggleAttribute("disabled");
                });
                e.currentTarget.classList.add("d-none");
                let btn = document.querySelector(`#ready-${click_change}`);
                if (!btn) {
                  btn = document.querySelector(`#check-${click_change}`);
                }
                // console.log(btn);

                //變更為儲存
                btn.setAttribute("id", `save-${click_change}`);
                btn.setAttribute("data-bs-toggle", "modal");
                btn.setAttribute("data-bs-target", "#checkModal");
                btn.removeAttribute("disabled");
                btn.textContent = "儲存";
                //
                console.log(get2[0]);
                get2[0].addEventListener("input", (e) => {
                  console.log(e.currentTarget.value);
                });
                //1.click儲存時，儲存現有資料。
                //2.並且改變確認鍵上的資料。
                btn.addEventListener("click", () => {
                  const getClassData = arr.find(
                    (item) => item.uid === click_change
                  );
                  //抓取modal上的標籤
                  const checkImg = document.querySelector("#checkImg");
                  const checkTeacherName =
                    document.querySelector("#checkTeacherName");
                  const checkName = document.querySelector("#checkName");
                  const checkDate = document.querySelector("#checkDate");
                  const checkSubmit = document.querySelector("#checkSubmit");
                  checkSubmit.setAttribute('data-bs-dismiss','modal');
                  //設定標籤上的變數
                  checkImg.setAttribute(
                    "src",
                    `${getClassData.teacher.avatar}`
                  );
                  checkTeacherName.textContent = getClassData.teacher.name;
                  checkName.textContent = getClassData.name;
                  checkDate.textContent = `${get2[0].value} ${get2[1].value}`;
                  checkSubmit.setAttribute("data-uid", `${click_change}`);
                  checkSubmit.addEventListener("click", (e) => {
                    e.preventDefault();
                    if (checkSubmit.getAttribute("data-uid") !== click_change) {
                      return 0;
                    } else {
                      axios
                        .get(`${_url}/user_courses/${userId}`)
                        .then((res) => {
                          const oldData = [...res.data.attendTime];
                          // console.log(oldData);
                          let findIndex = 0;
                          const getCurrentData = oldData.find((item, idx) => {
                            if (item.uid === click_change) {
                              findIndex = idx;
                              return true;
                            }
                            return false;
                          });
                          // console.log(getCurrentData,findIndex);
                          oldData.splice(findIndex, 1);
                          getCurrentData.date = get2[0].value.slice(5);
                          getCurrentData.time = get2[1].value;
                          getCurrentData.isCheck = false;
                          // console.log(getCurrentData);
                          oldData.push(getCurrentData);
                          axios
                            .patch(`${_url}/user_courses/${userId}`, {
                              attendTime: [...oldData],
                            })
                            .then((response) => {
                              console.log("add success");
                              Swal.fire({
                                icon: "success",
                                title: "預約成功",
                                showConfirmButton: false,
                                timer: 1500
                              });
                              updateTeacherList()
                            })
                            .catch((error) => {
                              console.error("Error adding post:", error);
                            });
                        });
                    }
                  });
                });
              });
            });
            //取消預約功能
            const delete_btn = document.querySelectorAll("#deleteCourse");
            delete_btn.forEach((btn) => {
              btn.addEventListener("click", (e) => {
                e.preventDefault();
                const delete_courseId =
                  e.currentTarget.getAttribute("data-course");
                console.log(delete_courseId);
                const courseId = e.currentTarget.getAttribute("data-courseId");
                axios.get(`${_url}/user_courses/${userId}`).then((res) => {
                  const oldData = [...res.data.attendTime];
                  // console.log(oldData);
                  let findIndex = 0;
                  //確認是否有此資料
                  const getCurrentData = oldData.find((item, idx) => {
                    if (item.uid === delete_courseId) {
                      findIndex = idx;
                      return true;
                    }
                    return false;
                  });
                  //找到此筆資料並且刪除
                  if (getCurrentData) {
                    //刪除此資料
                    oldData.splice(findIndex, 1);
                    //老師資料中的useTime也一併刪除
                    axios.get(`${_url}/courses/${courseId}`).then((res) => {
                      //找到此課程的教師
                      const teacherId = res.data.teacherId;
                      //再選擇取消使用的時段
                      const get2 = document.querySelectorAll(
                        `.${delete_courseId}`
                      );
                      console.log(get2);
                      //get2[0]日期
                      //get2[1]時間
                      axios.get(`${_url}/teachers/${teacherId}`).then((res) => {
                        const oldOpenTime = [...res.data.openTime];
                        const findDataIdx = oldOpenTime.findIndex(
                          (time) => time.date === get2[0].value.slice(5)
                        );
                        const newOpenTime = oldOpenTime[
                          findDataIdx
                        ].useTime.filter((item) => item !== get2[1].value);
                        oldOpenTime[findDataIdx].useTime = newOpenTime;
                        axios
                          .patch(`${_url}/teachers/${teacherId}`, {
                            opentime: [...oldOpenTime],
                          })
                          .then((response) => {
                            console.log("update success");
                          })
                          .catch((error) => {
                            console.error("Error adding post:", error);
                          });
                      });
                    });
                    axios
                      .patch(`${_url}/user_courses/${userId}`, {
                        attendTime: [...oldData],
                      })
                      .then((response) => {
                        console.log("delete success");
                        location.reload();
                      })
                      .catch((error) => {
                        console.error("Error adding post:", error);
                      });
                  }
                });
              });
            });
          })
          .catch((err) => {
            console.error(err);
          });
      }
    })
    .catch((err) => {
      console.error(err);
    });
}
updateTeacherList();
//判斷早中晚之參數
const morning = document.querySelector("#morning");
const afternoon = document.querySelector("#afternoon");
const evening = document.querySelector("#evening");
let clickTime = "";
let morning_str = "";
let afternoon_str = "";
let evening_str = "";

//add data to db
const attendSubmit = document.querySelector("#attendSubmit");
let oldAttendTime = [];
attendSubmit.addEventListener('click',(e) => {
    //console.log(clickCourse,clickDay,userId,clickTime);
    postAttendCourse(clickCourse,clickDay,userId,clickTime);
});
//顯示教師當日開放時間
function viewTimeCourse(clickCourse = document.querySelector('.book-card').getAttribute('data-courseid'),clickDay){
    if (clickCourse!==""&&clickDay!==""&&userId!==""){
        console.log(clickCourse,clickDay);
        axios.get(`${_url}/courses/${clickCourse}?_expand=teacher`)
        .then(function(response){
                const filteredTimeCourse = response.data.teacher.openTime.filter(item=>item.date === clickDay);
                console.log(filteredTimeCourse);
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
        morning_str = "";
        afternoon.innerHTML = afternoon_str;
        afternoon_str = "";
        evening.innerHTML = evening_str;
        evening_str = "";
        const btn_times = document.querySelectorAll(".btn-time");
        btn_times.forEach((btn) => {
          btn.addEventListener("click", (e) => {
            btn_times.forEach((btn) => {
              btn.classList.remove("active");
            });
            e.currentTarget.classList.add("active");
            clickTime = e.target.getAttribute("data-time");
          });
        });
      });
  } else {
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
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  // 第一個字是英文字母
  const firstCharIndex = Math.floor(Math.random() * (characters.length - 10));
  result += characters.charAt(firstCharIndex);

  for (let i = 1; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}