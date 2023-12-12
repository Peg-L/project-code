import{a as h,u as y}from"./backtotop-e931ed7f.js";import"./openTime-482ad5b4.js";let j=[];const ae=document.querySelector("#userName"),oe=document.querySelector("#userRole");document.querySelector("#userImg");const ce=document.querySelector("#PreviousWeek"),se=document.querySelector("#NextWeek"),Y=document.querySelector("#courseTeacherName"),z=document.querySelector("#courseName"),X=document.querySelector("#dateTime");function ne(){h.get(`http://localhost:3000/user_courses?_expand=user&userId=${y.toString()}`).then(function(e){j=e.data[0],ae.textContent=j.user.name,oe.textContent=j.user.role,F()})}function F(){document.querySelectorAll(".calendar-time").forEach(d=>{let o=d.getAttribute("data-num"),n=s(o),f="";if(n.length!==0)for(let c=0;c<n.length;c++)f+=`<li><a href=''
                data-bs-toggle="modal"
                data-bs-target="#calendarModal"
                data-course-id="${n[c].courseId}"
                id="viewCourse">
                ${n[c].time}
                </a></li>`;d.innerHTML=f}),document.querySelectorAll("#viewCourse").forEach(d=>{let o=d.getAttribute("data-course-id");d.addEventListener("click",()=>{r(o)})});function s(d){return j.attendTime.filter(o=>o.date===d)}function r(d){let o=[];h.get(`http://localhost:3000/courses/${d.toString()}?_expand=teacher`).then(function(n){o=n.data,Y.textContent=o.teacher.name,z.textContent=o.name,X.innerHTML=""})}}const re=document.querySelectorAll("#viewCourse");re.forEach(e=>{let t=e.getAttribute("data-course-id");e.addEventListener("click",()=>{le(t)})});function le(e){let t=[];h.get(`http://localhost:3000/courses/${e.toString()}?_expand=teacher`).then(function(s){t=s.data,Y.textContent=t.teacher.name,z.textContent=t.name,X.innerHTML=""})}ce.addEventListener("click",()=>{F()});se.addEventListener("click",()=>{F()});ne();const de=document.querySelector(".days"),ie=document.querySelector(".current-date"),ue=document.querySelectorAll(".icons span");let w=new Date().getFullYear(),p=new Date().getMonth();const he=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],J=()=>{let t=new Date(w,p,1).getDay(),s=new Date(w,p+1,0).getDate(),r=new Date(w,p,s).getDay(),d=new Date(w,p,0).getDate(),o="";for(let c=t;c>0;c--)o+=`<li class="inactive">${d-c+1}</li>`;for(let c=1;c<=s;c++){let l=c===new Date().getDate()&&p===new Date().getMonth()&&w===new Date().getFullYear()?"active":"",a=`${p+1}/${String(c).padStart(2,"0")}`;o+=`<li class="${l}" data-day="${a}">${c}</li>`}for(let c=r;c<6;c++)o+=`<li class="inactive">${c-r+1}</li>`;ie.innerText=`${he[p]} ${w}`,de.innerHTML=o;const n=document.querySelectorAll(".days li"),f=c=>{n.forEach(l=>l.classList.remove("active")),c.classList.add("active")};n.forEach(c=>{c.addEventListener("click",l=>{f(l.currentTarget),l.target.getAttribute("data-day"),viewTimeCourse()})})};J();ue.forEach(e=>{e.addEventListener("click",()=>{p=e.id==="prev"?p-1:p+1,(p<0||p>11)&&(w=e.id==="prev"?w-1:w+1,p=p<0?11:0),J()})});const fe=document.querySelector("#appointment_list"),me=document.querySelector("#course-management");let W={};function pe(){h.get(`http://localhost:3000/user_courses?userId=${y.toString()}`).then(function(e){W=[...e.data[0].purchased],manager_data=[...e.data[0].attendTime],manager_data.forEach(r=>{r.day=r.date,delete r.date}),t(W),s(manager_data);function t(r){let d="";h.get("http://localhost:3000/courses?_expand=teacher").then(function(o){const n=o.data;r.map(l=>{const a=n.find(i=>l.courseId===i.id);return a?{...l,...a}:l}).forEach(l=>{d+=`<li class="book-card" data-courseId="${l.id}">
                <img src="${l.teacher.avatar}" alt="" />
                <div class="d-flex flex-column">
                  <h4>${l.name}</h4>
                  <p>${l.teacher.name}</p>
                  <div class="d-flex gap-2">
                    <p>未預約: ${l.total-l.used}</p>
                  </div>
                </div>
              </li>`}),fe.innerHTML=d;const c=document.querySelectorAll(".book-card");c.forEach(l=>{l.addEventListener("click",a=>{c.forEach(i=>{i.classList.remove("active")}),a.currentTarget.classList.add("active"),clickCourse=a.currentTarget.getAttribute("data-courseId"),viewTimeCourse()})})}).catch(o=>{console.error(o)})}function s(r){let d="";h.get("http://localhost:3000/courses?_expand=teacher").then(function(o){const n=o.data,f=r.map(a=>{const i=n.find(u=>a.courseId===u.id);return i?{...a,...i}:a});f.forEach((a,i)=>{let u="";a.isCheck?u=`<button
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
                  </button>`,d+=`<li class="course-card shadow w-100 w-xl-75">
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
                                class="form-control border-light cursor-pointer jq-appointmentDate${i} ${a.uid}"
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
                    </li>`}),$.datepicker.setDefaults($.datepicker.regional["zh-TW"]),$(function(){$("[class*=jq-appointmentDate]").each(function(a){const i=this;$(i).attr("id","datepicker-"+a),$(i).datepicker({minDate:0,maxDate:"+1M +10D",formatDate:"yy-mm-dd",showButtonPanel:!0,onSelect:function(){console.log(i.getAttribute("data-uid"),i.getAttribute("data-courseId"));let u="";const T=document.querySelectorAll(`.${i.getAttribute("data-uid")}`)[1],m={...[...n][i.getAttribute("data-courseId")-1].teacher.openTime.find(g=>g.date===i.value.slice(5))};if(console.log(m),Object.keys(m).length===0)return T.innerHTML="",0;m.time.filter(k=>!m.useTime.includes(k)).forEach(k=>{u+=`<option>${k}</option>`}),T.innerHTML=u}})})}),me.innerHTML=d,document.querySelectorAll("#change").forEach(a=>{a.addEventListener("click",i=>{let u=i.currentTarget.getAttribute("data-course"),T=`.${u}`;const b=document.querySelectorAll(T);b.forEach(g=>{g.toggleAttribute("disabled")}),i.currentTarget.classList.add("d-none");let m=document.querySelector(`#ready-${u}`);m||(m=document.querySelector(`#check-${u}`)),m.setAttribute("id",`save-${u}`),m.setAttribute("data-bs-toggle","modal"),m.setAttribute("data-bs-target","#checkModal"),m.removeAttribute("disabled"),m.textContent="儲存",console.log(b[0]),b[0].addEventListener("input",g=>{console.log(g.currentTarget.value)}),m.addEventListener("click",()=>{const g=f.find(S=>S.uid===u),k=document.querySelector("#checkImg"),D=document.querySelector("#checkTeacherName"),L=document.querySelector("#checkName"),C=document.querySelector("#checkDate"),E=document.querySelector("#checkSubmit");k.setAttribute("src",`${g.teacher.avatar}`),D.textContent=g.teacher.name,L.textContent=g.name,C.textContent=`${b[0].value} ${b[1].value}`,E.setAttribute("data-uid",`${u}`),E.addEventListener("click",S=>{if(S.preventDefault(),E.getAttribute("data-uid")!==u)return 0;h.get(`http://localhost:3000/user_courses/${y}`).then(B=>{const A=[...B.data.attendTime];let x=0;const N=A.find((P,te)=>P.uid===u?(x=te,!0):!1);A.splice(x,1),N.date=b[0].value.slice(5),N.time=b[1].value,N.isCheck=!1,A.push(N),h.patch(`http://localhost:3000/user_courses/${y}`,{attendTime:[...A]}).then(P=>{console.log("add success"),location.reload()}).catch(P=>{console.error("Error adding post:",P)})})})})})}),document.querySelectorAll("#deleteCourse").forEach(a=>{a.addEventListener("click",i=>{i.preventDefault();const u=i.currentTarget.getAttribute("data-course");console.log(u);const T=i.currentTarget.getAttribute("data-courseId");h.get(`http://localhost:3000/user_courses/${y}`).then(b=>{const m=[...b.data.attendTime];let g=0;m.find((D,L)=>D.uid===u?(g=L,!0):!1)&&(m.splice(g,1),h.get(`http://localhost:3000/courses/${T}`).then(D=>{const L=D.data.teacherId,C=document.querySelectorAll(`.${u}`);console.log(C),h.get(`http://localhost:3000/teachers/${L}`).then(E=>{const S=[...E.data.openTime],B=S.findIndex(x=>x.date===C[0].value.slice(5)),A=S[B].useTime.filter(x=>x!==C[1].value);S[B].useTime=A,h.patch(`http://localhost:3000/teachers/${L}`,{opentime:[...S]}).then(x=>{console.log("update success")}).catch(x=>{console.error("Error adding post:",x)})})}),h.patch(`http://localhost:3000/user_courses/${y}`,{attendTime:[...m]}).then(D=>{console.log("delete success"),location.reload()}).catch(D=>{console.error("Error adding post:",D)}))})})})}).catch(o=>{console.error(o)})}}).catch(e=>{console.error(e)})}pe();document.querySelector("#morning");document.querySelector("#afternoon");document.querySelector("#evening");let ge="";const be=document.querySelector("#attendSubmit");let U=[];be.addEventListener("click",()=>{ve(clickCourse,clickDay,y,ge)});function ve(e,t,s,r){const d={uid:ye(4),courseId:Number(e),date:t,time:r,isCheck:!1};h.get(`http://localhost:3000/user_courses/${s}`).then(o=>{U=[...o.data.attendTime],h.patch(`http://localhost:3000/user_courses/${s}`,{attendTime:[...U,d]}).then(n=>{console.log("add success")}).catch(n=>{console.error("Error adding post:",n)})}).catch(o=>{console.error("Error adding post:",o)})}function ye(e){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";let s="";const r=Math.floor(Math.random()*(t.length-10));s+=t.charAt(r);for(let d=1;d<e;d++){const o=Math.floor(Math.random()*t.length);s+=t.charAt(o)}return s}const K=document.querySelectorAll("#change"),$e=document.querySelectorAll("#saveBtn"),Q=document.querySelectorAll("#btnBlock"),V=document.querySelectorAll("#date"),Z=document.querySelectorAll("#time");K.forEach((e,t)=>{e.addEventListener("click",s=>{V[t].toggleAttribute("disabled"),Z[t].toggleAttribute("disabled"),Q[t].classList.toggle("hidden"),e.toggleAttribute("disabled")})});$e.forEach((e,t)=>{e.addEventListener("click",s=>{V[t].toggleAttribute("disabled"),Z[t].toggleAttribute("disabled"),Q[t].classList.toggle("hidden"),K[t].toggleAttribute("disabled")})});let v=1,q=[],_=0,I=[];document.addEventListener("DOMContentLoaded",async function(){async function e(){try{q=(await h.get(`http://localhost:3000/users/${y}`)).data.followList,_=Math.ceil(q.length/6);let n="";if(q.length!=0){let f=`http://localhost:3000/courses?_expand=teacher&_page=${v}&_limit=6`;q.forEach(a=>{f+=`&id=${a}`}),I=(await h.get(`${f}`)).data,console.log("追蹤的課程資料",I);const l=document.querySelector("#followList");I.forEach(a=>{n+=`<div class="col"><div class="card teacher-card swiper-slide h-100"><button
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
  </div></div>`}),l.innerHTML=n,t(),s(),r()}else n='<p class="text-center fs-5">目前沒有追蹤任何課程</p>'}catch(o){console.log("錯誤",o)}}e();function t(){const o=document.querySelector(".followPagination");let n="";if(_){const f=`<li class="page-item prevButton ${v==1?"disabled":""}"><a class="page-link" href="#" aria-label="Previous"><i class="fa-solid fa-angle-left"></i></a></li>`;n+=f;for(let l=1;l<=_;l++){let a=`<li class="page-item ${l===v?"active":""} pageButton">
                          <a class="page-link" href="#">
                            ${l}
                          </a>
                        </li>`;n+=a}const c=`<li class="page-item nextButton ${v==_?"disabled":""}">
                      <a class="page-link" href="#" aria-label="Next">
                        <i class="fa-solid fa-angle-right"></i>
                      </a>
                    </li>`;n+=c}o.innerHTML=n}function s(){const o=document.querySelector(".prevButton"),n=document.querySelector(".nextButton");let f=document.querySelectorAll(".pageButton");o.addEventListener("click",function(){v>1&&(v--,t(),e())}),n.addEventListener("click",function(){_>v&&(v++,t(),e())}),f.forEach(c=>{c.addEventListener("click",()=>{v=Number(c.innerText),e(),t()})})}function r(){document.querySelectorAll(".following").forEach(n=>{n.addEventListener("click",f=>{d(f)})})}async function d(o){let n=o.target.dataset.buttonid,f=q.filter(c=>c!=n);Swal.fire({title:"確定要取消追蹤?",showDenyButton:!0,confirmButtonColor:"#115BC9",confirmButtonText:"取消追蹤",denyButtonText:"我再想想"}).then(c=>{c.isConfirmed&&(Swal.fire({position:"center",icon:"success",title:"已取消追蹤",showConfirmButton:!1,timer:1500}),h.patch(`http://localhost:3000/users/${y}`,{followList:f}).then(async l=>{await e(),console.log(I),I.length==0&&(v--,e()),t()}))})}});const G=document.querySelectorAll(".js-couponPageArrow");let H=[],M=1,R;O();async function xe(){let e=new Date().getTime();for(const t of H)if(new Date(t.dueDate).getTime()<e)try{await h.patch(`http://localhost:3000/myCoupons/${t.id}`,{canUse:!1},{headers:{"Content-Type":"application/json"}}),O()}catch(s){console.log("checkDueDate",s)}else ee(),we()}async function O(){try{const e=`http://localhost:3000/myCoupons?_expand=coupon&canUse=true&userId=${y}&_page=${M}&_limit=6_sort=dueDate&_order=asc`,t=await h.get(e);let s=parseInt(t.headers.get("X-Total-Count"));for(let r of t.data){const{data:d}=await h.get(`http://localhost:3000/coupons/${r.couponId}?_expand=teacher`);r.coupon=d}t.data.length?(H=t.data,R=Math.ceil(s/6),xe()):ee()}catch(e){console.log("getCoupons",e)}}function ee(){const e=/^(\d{4}-\d{2}-\d{2}).*/,t=document.querySelector(".js-couponGroup");let s="";H.length?H.forEach(r=>{s+=`
            <li class="col drop-shadow">
              <div class="card border-x-wave h-100">
                <div class="row g-0 h-100">
                  <div class="col-3 d-flex align-items-center p-4 ${r.coupon.type==="allCourse"?"bg-primary":"bg-gray-300"}">
                  <img
                    class="img-fluid w-100 rounded-circle img-thumbnail border-0"
                    src="${r.coupon.type==="allCourse"?"https://raw.githubusercontent.com/Peg-L/project-code/89a637dfbea6e49a34b11aacf46dc07a001b4a90/assets/images/logo-img.svg":r.coupon.teacher.avatar}"
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
            </li>`}):s+='<p class="text-center fs-5">目前沒有優惠券<p>',t.innerHTML=s}function we(){G.forEach((e,t,s)=>{R>1?(e.classList.remove("d-none"),M===1?s[0].classList.add("disabled"):s[0].classList.remove("disabled"),M===R?s[1].classList.add("disabled"):s[1].classList.remove("disabled")):e.classList.add("d-none")})}G.forEach((e,t)=>{e.addEventListener("click",s=>{s.preventDefault(),s.target.closest(".js-couponPageArrow").classList.contains("disabled")||(t===1?M++:Math.max(1,M--),O())})});
