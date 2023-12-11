import{u as v}from"./backtotop-5c0a417f.js";import"./openTime-482ad5b4.js";let j=[];const te=document.querySelector("#userName"),ae=document.querySelector("#userRole");document.querySelector("#userImg");const oe=document.querySelector("#PreviousWeek"),se=document.querySelector("#NextWeek"),U=document.querySelector("#courseTeacherName"),Y=document.querySelector("#courseName"),z=document.querySelector("#dateTime");function ce(){axios.get(`http://localhost:3000/user_courses?_expand=user&userId=${v.toString()}`).then(function(e){j=e.data[0],te.textContent=j.user.name,ae.textContent=j.user.role,R()})}function R(){document.querySelectorAll(".calendar-time").forEach(i=>{let o=i.getAttribute("data-num"),n=c(o),h="";if(n.length!==0)for(let s=0;s<n.length;s++)h+=`<li><a href=''
                data-bs-toggle="modal"
                data-bs-target="#calendarModal"
                data-course-id="${n[s].courseId}"
                id="viewCourse">
                ${n[s].time}
                </a></li>`;i.innerHTML=h}),document.querySelectorAll("#viewCourse").forEach(i=>{let o=i.getAttribute("data-course-id");i.addEventListener("click",()=>{r(o)})});function c(i){return j.attendTime.filter(o=>o.date===i)}function r(i){let o=[];axios.get(`http://localhost:3000/courses/${i.toString()}?_expand=teacher`).then(function(n){o=n.data,U.textContent=o.teacher.name,Y.textContent=o.name,z.innerHTML=""})}}const ne=document.querySelectorAll("#viewCourse");ne.forEach(e=>{let t=e.getAttribute("data-course-id");e.addEventListener("click",()=>{re(t)})});function re(e){let t=[];axios.get(`http://localhost:3000/courses/${e.toString()}?_expand=teacher`).then(function(c){t=c.data,U.textContent=t.teacher.name,Y.textContent=t.name,z.innerHTML=""})}oe.addEventListener("click",()=>{R()});se.addEventListener("click",()=>{R()});ce();const le=document.querySelector(".days"),ie=document.querySelector(".current-date"),de=document.querySelectorAll(".icons span");let x=new Date().getFullYear(),f=new Date().getMonth();const ue=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],X=()=>{let t=new Date(x,f,1).getDay(),c=new Date(x,f+1,0).getDate(),r=new Date(x,f,c).getDay(),i=new Date(x,f,0).getDate(),o="";for(let s=t;s>0;s--)o+=`<li class="inactive">${i-s+1}</li>`;for(let s=1;s<=c;s++){let l=s===new Date().getDate()&&f===new Date().getMonth()&&x===new Date().getFullYear()?"active":"",a=`${f+1}/${String(s).padStart(2,"0")}`;o+=`<li class="${l}" data-day="${a}">${s}</li>`}for(let s=r;s<6;s++)o+=`<li class="inactive">${s-r+1}</li>`;ie.innerText=`${ue[f]} ${x}`,le.innerHTML=o;const n=document.querySelectorAll(".days li"),h=s=>{n.forEach(l=>l.classList.remove("active")),s.classList.add("active")};n.forEach(s=>{s.addEventListener("click",l=>{h(l.currentTarget),l.target.getAttribute("data-day"),viewTimeCourse()})})};X();de.forEach(e=>{e.addEventListener("click",()=>{f=e.id==="prev"?f-1:f+1,(f<0||f>11)&&(x=e.id==="prev"?x-1:x+1,f=f<0?11:0),X()})});const he=document.querySelector("#appointment_list"),me=document.querySelector("#course-management");let O={};function fe(){axios.get(`http://localhost:3000/user_courses?userId=${v.toString()}`).then(function(e){O=[...e.data[0].purchased],manager_data=[...e.data[0].attendTime],manager_data.forEach(r=>{r.day=r.date,delete r.date}),t(O),c(manager_data);function t(r){let i="";axios.get("http://localhost:3000/courses?_expand=teacher").then(function(o){const n=o.data;r.map(l=>{const a=n.find(d=>l.courseId===d.id);return a?{...l,...a}:l}).forEach(l=>{i+=`<li class="book-card" data-courseId="${l.id}">
                <img src="${l.teacher.avatar}" alt="" />
                <div class="d-flex flex-column">
                  <h4>${l.name}</h4>
                  <p>${l.teacher.name}</p>
                  <div class="d-flex gap-2">
                    <p>未預約: ${l.total-l.used}</p>
                  </div>
                </div>
              </li>`}),he.innerHTML=i;const s=document.querySelectorAll(".book-card");s.forEach(l=>{l.addEventListener("click",a=>{s.forEach(d=>{d.classList.remove("active")}),a.currentTarget.classList.add("active"),clickCourse=a.currentTarget.getAttribute("data-courseId"),viewTimeCourse()})})}).catch(o=>{console.error(o)})}function c(r){let i="";axios.get("http://localhost:3000/courses?_expand=teacher").then(function(o){const n=o.data,h=r.map(a=>{const d=n.find(u=>a.courseId===u.id);return d?{...a,...d}:a});h.forEach((a,d)=>{let u="";a.isCheck?u=`<button
                    type="button"
                    class="btn btn-secondary2 w-100 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
                    id="ready-${a.uid}"
                  >
                    即將上課
                  </button>`:u=`<button
                    type="button"
                    class="btn btn-secondary2 w-100 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
                    id="check-${a.uid}"
                    disabled
                  >
                    等待確認中
                  </button>`,i+=`<li class="course-card shadow w-100 w-xl-75">
                    <div class="d-flex flex-grow-1 p-3 p-sm-4 align-items-center">
                      <div class="course-card-header me-4">
                        <a href="#" class="text-center">
                          <div class="mb-2">
                            <img
                              class="avatar"
                              src="${a.teacher.avatar}"
                              alt="teacher"
                            />
                          </div>
                          <h3 class="fs-7 fs-md-6 text-secondary2 mb-1">${a.teacher.name}</h3>
                        </a>
                        <!-- link -->
                      </div>
                      <div class="flex-grow-1 px-4 px-lg-8">
                        <!-- 課程名稱 -->
                        <div
                          class="d-flex flex-md-row flex-column justify-content-md-between mb-md-0 mb-2"
                        >
                          <h2 class="fs-6 fs-sm-5 fs-md-4 line-ellipsis mb-2">
                          ${a.name}
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
                                class="form-control border-light cursor-pointer jq-appointmentDate${d} ${a.uid}"
                                type="text"
                                name="accountDate1-1"
                                placeholder="日期"
                                value="2023/${a.day}"
                                autocomplete="off"
                                data-courseId="${a.id}"
                                data-uid="${a.uid}"
                                id="date"
                                disabled
                                required
                              />
                            </div>
                    
                            <div class="w-150px">
                              <select
                                class="form-select border border-light ${a.uid}"
                                id="time"
                                disabled
                              >
                                <option selected>${a.time}</option>
                              </select>
                            </div>
                            <button
                              type="button"
                              class="btn text-primary"
                              data-course="${a.uid}"
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
                      
                      ${u}
                      <a
                        href="#"
                        type="button"
                        class="btn btn-white w-100 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
                        data-course="${a.uid}"
                        data-courseId="${a.id}"
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
                    </li>`}),$.datepicker.setDefaults($.datepicker.regional["zh-TW"]),$(function(){$("[class*=jq-appointmentDate]").each(function(a){const d=this;$(d).attr("id","datepicker-"+a),$(d).datepicker({minDate:0,maxDate:"+1M +10D",formatDate:"yy-mm-dd",showButtonPanel:!0,onSelect:function(){console.log(d.getAttribute("data-uid"),d.getAttribute("data-courseId"));let u="";const S=document.querySelectorAll(`.${d.getAttribute("data-uid")}`)[1],m={...[...n][d.getAttribute("data-courseId")-1].teacher.openTime.find(p=>p.date===d.value.slice(5))};if(console.log(m),Object.keys(m).length===0)return S.innerHTML="",0;m.time.filter(T=>!m.useTime.includes(T)).forEach(T=>{u+=`<option>${T}</option>`}),S.innerHTML=u}})})}),me.innerHTML=i,document.querySelectorAll("#change").forEach(a=>{a.addEventListener("click",d=>{let u=d.currentTarget.getAttribute("data-course"),S=`.${u}`;const g=document.querySelectorAll(S);g.forEach(p=>{p.toggleAttribute("disabled")}),d.currentTarget.classList.add("d-none");let m=document.querySelector(`#ready-${u}`);m||(m=document.querySelector(`#check-${u}`)),m.setAttribute("id",`save-${u}`),m.setAttribute("data-bs-toggle","modal"),m.setAttribute("data-bs-target","#checkModal"),m.removeAttribute("disabled"),m.textContent="儲存",console.log(g[0]),g[0].addEventListener("input",p=>{console.log(p.currentTarget.value)}),m.addEventListener("click",()=>{const p=h.find(D=>D.uid===u),T=document.querySelector("#checkImg"),w=document.querySelector("#checkTeacherName"),k=document.querySelector("#checkName"),C=document.querySelector("#checkDate"),E=document.querySelector("#checkSubmit");T.setAttribute("src",`${p.teacher.avatar}`),w.textContent=p.teacher.name,k.textContent=p.name,C.textContent=`${g[0].value} ${g[1].value}`,E.setAttribute("data-uid",`${u}`),E.addEventListener("click",D=>{if(D.preventDefault(),E.getAttribute("data-uid")!==u)return 0;axios.get(`http://localhost:3000/user_courses/${v}`).then(B=>{const L=[...B.data.attendTime];let y=0;const N=L.find((P,ee)=>P.uid===u?(y=ee,!0):!1);L.splice(y,1),N.date=g[0].value.slice(5),N.time=g[1].value,N.isCheck=!1,L.push(N),axios.patch(`http://localhost:3000/user_courses/${v}`,{attendTime:[...L]}).then(P=>{console.log("add success"),location.reload()}).catch(P=>{console.error("Error adding post:",P)})})})})})}),document.querySelectorAll("#deleteCourse").forEach(a=>{a.addEventListener("click",d=>{d.preventDefault();const u=d.currentTarget.getAttribute("data-course");console.log(u);const S=d.currentTarget.getAttribute("data-courseId");axios.get(`http://localhost:3000/user_courses/${v}`).then(g=>{const m=[...g.data.attendTime];let p=0;m.find((w,k)=>w.uid===u?(p=k,!0):!1)&&(m.splice(p,1),axios.get(`http://localhost:3000/courses/${S}`).then(w=>{const k=w.data.teacherId,C=document.querySelectorAll(`.${u}`);console.log(C),axios.get(`http://localhost:3000/teachers/${k}`).then(E=>{const D=[...E.data.openTime],B=D.findIndex(y=>y.date===C[0].value.slice(5)),L=D[B].useTime.filter(y=>y!==C[1].value);D[B].useTime=L,axios.patch(`http://localhost:3000/teachers/${k}`,{opentime:[...D]}).then(y=>{console.log("update success")}).catch(y=>{console.error("Error adding post:",y)})})}),axios.patch(`http://localhost:3000/user_courses/${v}`,{attendTime:[...m]}).then(w=>{console.log("delete success"),location.reload()}).catch(w=>{console.error("Error adding post:",w)}))})})})}).catch(o=>{console.error(o)})}}).catch(e=>{console.error(e)})}fe();document.querySelector("#morning");document.querySelector("#afternoon");document.querySelector("#evening");let pe="";const ge=document.querySelector("#attendSubmit");let W=[];ge.addEventListener("click",()=>{be(clickCourse,clickDay,v,pe)});function be(e,t,c,r){const i={uid:ve(4),courseId:Number(e),date:t,time:r,isCheck:!1};axios.get(`http://localhost:3000/user_courses/${c}`).then(o=>{W=[...o.data.attendTime],axios.patch(`http://localhost:3000/user_courses/${c}`,{attendTime:[...W,i]}).then(n=>{console.log("add success")}).catch(n=>{console.error("Error adding post:",n)})}).catch(o=>{console.error("Error adding post:",o)})}function ve(e){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";let c="";const r=Math.floor(Math.random()*(t.length-10));c+=t.charAt(r);for(let i=1;i<e;i++){const o=Math.floor(Math.random()*t.length);c+=t.charAt(o)}return c}const J=document.querySelectorAll("#change"),ye=document.querySelectorAll("#saveBtn"),K=document.querySelectorAll("#btnBlock"),Q=document.querySelectorAll("#date"),V=document.querySelectorAll("#time");J.forEach((e,t)=>{e.addEventListener("click",c=>{Q[t].toggleAttribute("disabled"),V[t].toggleAttribute("disabled"),K[t].classList.toggle("hidden"),e.toggleAttribute("disabled")})});ye.forEach((e,t)=>{e.addEventListener("click",c=>{Q[t].toggleAttribute("disabled"),V[t].toggleAttribute("disabled"),K[t].classList.toggle("hidden"),J[t].toggleAttribute("disabled")})});let b=1,q=[],_=0,I=[];document.addEventListener("DOMContentLoaded",async function(){async function e(){try{q=(await axios.get(`http://localhost:3000/users/${v}`)).data.followList,_=Math.ceil(q.length/6);let n="";if(q.length!=0){let h=`http://localhost:3000/courses?_expand=teacher&_page=${b}&_limit=6`;q.forEach(a=>{h+=`&id=${a}`}),I=(await axios.get(`${h}`)).data,console.log("追蹤的課程資料",I);const l=document.querySelector("#followList");I.forEach(a=>{n+=`<div class="col"><div class="card teacher-card swiper-slide h-100"><button
        type="button"
        class="btn p-3 text-center align-self-start position-absolute top-0 end-0 following"
      >
        <i class="fa-regular fa-heart fs-4 text-primary fw-bold" data-buttonId="${a.id}"></i>
      </button>
    <div class="card-body d-flex justify-content-between">
      <div>
        <h5 class="card-title teacher-card-title truncate-lines-2">${a.name}
        </h5>
        <p class="teacher-card-name">${a.teacher.name}</p>
        <ul class="teacher-card-object">
          <li class="teacher-card-evaluate">${a.rate}</li>
          <li class="teacher-card-hours">50分鐘</li>
        </ul>
        <p class="teacher-card-price">NT$<span>${a.price}</span></p>
      </div>
      <div class="teacher-card-img">
        <img
          src="${a.teacher.avatar}"
          alt="老師"
          class="w-100px w-sm-120px"
        />
      </div>
    </div>
    <div>
      <p class="teacher-card-text">
      ${a.info}
      </p>
      <a
        href="./cart.html"
        type="button"
        class="btn btn-secondary2 w-100 mb-3"
      >
        立即上課
      </a>
      <a
        href="./course_intro.html"
        type="button"
        class="btn teacher-card-btn"
        >查看介紹</a
      >
    </div>
  </div></div>`}),l.innerHTML=n,t(),c(),r()}else n='<p class="text-center fs-5">目前沒有追蹤任何課程</p>'}catch(o){console.log("錯誤",o)}}e();function t(){const o=document.querySelector(".followPagination");let n="";if(_){const h=`<li class="page-item prevButton ${b==1?"disabled":""}"><a class="page-link" href="#" aria-label="Previous"><i class="fa-solid fa-angle-left"></i></a></li>`;n+=h;for(let l=1;l<=_;l++){let a=`<li class="page-item ${l===b?"active":""} pageButton">
                          <a class="page-link" href="#">
                            ${l}
                          </a>
                        </li>`;n+=a}const s=`<li class="page-item nextButton ${b==_?"disabled":""}">
                      <a class="page-link" href="#" aria-label="Next">
                        <i class="fa-solid fa-angle-right"></i>
                      </a>
                    </li>`;n+=s}o.innerHTML=n}function c(){const o=document.querySelector(".prevButton"),n=document.querySelector(".nextButton");let h=document.querySelectorAll(".pageButton");o.addEventListener("click",function(){b>1&&(b--,t(),e())}),n.addEventListener("click",function(){_>b&&(b++,t(),e())}),h.forEach(s=>{s.addEventListener("click",()=>{b=Number(s.innerText),e(),t()})})}function r(){document.querySelectorAll(".following").forEach(n=>{n.addEventListener("click",h=>{i(h)})})}async function i(o){let n=o.target.dataset.buttonid,h=q.filter(s=>s!=n);Swal.fire({title:"確定要取消追蹤?",showDenyButton:!0,confirmButtonColor:"#115BC9",confirmButtonText:"取消追蹤",denyButtonText:"我再想想"}).then(s=>{s.isConfirmed&&(Swal.fire({position:"center",icon:"success",title:"已取消追蹤",showConfirmButton:!1,timer:1500}),axios.patch(`http://localhost:3000/users/${v}`,{followList:h}).then(async l=>{await e(),console.log(I),I.length==0&&(b--,e()),t()}))})}});const Z=document.querySelectorAll(".js-couponPageArrow");let A=[],M=1,H;F();async function xe(){let e=new Date().getTime();for(const t of A)if(new Date(t.dueDate).getTime()<e)try{await axios.patch(`http://localhost:3000/myCoupons/${t.id}`,{canUse:!1},{headers:{"Content-Type":"application/json"}}),console.log("過期",t),F()}catch(c){console.log("checkDueDate",c)}else console.log("沒過期"),G(),$e()}async function F(){try{const e=`http://localhost:3000/myCoupons?_expand=coupon&canUse=true&userId=${v}&_page=${M}&_limit=6_sort=dueDate&_order=asc`,t=await axios.get(e);let c=parseInt(t.headers.get("X-Total-Count"));for(let r of t.data){const{data:i}=await axios.get(`http://localhost:3000/coupons/${r.couponId}?_expand=teacher`);r.coupon=i}t.data.length?(A=t.data,H=Math.ceil(c/6),xe()):G()}catch(e){console.log("getCoupons",e)}}function G(){console.log("123",A),console.log("456",A.length);const e=/^(\d{4}-\d{2}-\d{2}).*/,t=document.querySelector(".js-couponGroup");let c="";A.length?A.forEach(r=>{c+=`
            <li class="col drop-shadow">
              <div class="card border-x-wave h-100">
                <div class="row g-0 h-100">
                  <div class="col-3 d-flex align-items-center p-4 ${r.coupon.type==="allCourse"?"bg-primary":"bg-gray-300"}">
                  <img
                    class="img-fluid w-100 rounded-circle img-thumbnail border-0"
                    src="${r.coupon.type==="allCourse"?"../assets/images/logo-img.svg":r.coupon.teacher.avatar}"
                    alt="teacher"
                  />
                  </div>
                  <div class="col-6">
                    <div class="card-body h-100 d-flex flex-column">
                      <h5 class="card-title fs-7 fs-sm-5 mb-2 mb-sm-4 truncate-lines-2">
                        ${r.coupon.title}
                      </h5>
                      <p class="card-text fs-sm fs-sm-7 mb-3 flex-grow-1">
                        ${r.coupon.info}
                      </p>
                      <p class="card-text">
                        <small
                          class="text-body-secondary d-flex align-items-center gap-1">
                          <span class="material-symbols-outlined">
                            update </span>
                          <time datetime="${e.exec(r.dueDate)[1]}">${e.exec(r.dueDate)[1]}</time>
                          失效
                        </small>
                      </p>
                    </div>
                  </div>
                  <div class="col-3 d-flex align-items-center pe-4">
                    <a
                      href="course.html"
                      class="btn btn-secondary2 px-1 px-sm-4 w-100"
                      >馬上使用</a
                    >
                  </div>
                </div>
              </div>
            </li>`}):c+='<p class="text-center fs-5">目前沒有優惠券<p>',t.innerHTML=c}function $e(){Z.forEach((e,t,c)=>{H>1?(e.classList.remove("d-none"),M===1?c[0].classList.add("disabled"):c[0].classList.remove("disabled"),M===H?c[1].classList.add("disabled"):c[1].classList.remove("disabled")):e.classList.add("d-none")})}Z.forEach((e,t)=>{e.addEventListener("click",c=>{c.preventDefault(),c.target.closest(".js-couponPageArrow").classList.contains("disabled")||(t===1?M++:Math.max(1,M--),F())})});
