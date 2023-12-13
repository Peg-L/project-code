import{a as m,u as y}from"./backtotop-9d7c375e.js";import"./openTime-482ad5b4.js";let P=[];const ae=document.querySelector("#userName"),oe=document.querySelector("#userRole");document.querySelector("#userImg");const ce=document.querySelector("#PreviousWeek"),ne=document.querySelector("#NextWeek"),Y=document.querySelector("#courseTeacherName"),z=document.querySelector("#courseName"),X=document.querySelector("#dateTime");function se(){m.get(`https://project-code-json-k0ti.onrender.com/user_courses?_expand=user&userId=${y.toString()}`).then(function(e){P=e.data[0],ae.textContent=P.user.name,oe.textContent=P.user.role,F()})}function F(){document.querySelectorAll(".calendar-time").forEach(d=>{let o=d.getAttribute("data-num"),s=n(o),p="";if(s.length!==0)for(let c=0;c<s.length;c++)p+=`<li><a href=''
                data-bs-toggle="modal"
                data-bs-target="#calendarModal"
                data-course-id="${s[c].courseId}"
                id="viewCourse">
                ${s[c].time}
                </a></li>`;d.innerHTML=p}),document.querySelectorAll("#viewCourse").forEach(d=>{let o=d.getAttribute("data-course-id");d.addEventListener("click",()=>{r(o)})});function n(d){return P.attendTime.filter(o=>o.date===d)}function r(d){let o=[];m.get(`https://project-code-json-k0ti.onrender.com/courses/${d.toString()}?_expand=teacher`).then(function(s){o=s.data,Y.textContent=o.teacher.name,z.textContent=o.name,X.innerHTML=""})}}const re=document.querySelectorAll("#viewCourse");re.forEach(e=>{let t=e.getAttribute("data-course-id");e.addEventListener("click",()=>{le(t)})});function le(e){let t=[];m.get(`https://project-code-json-k0ti.onrender.com/courses/${e.toString()}?_expand=teacher`).then(function(n){t=n.data,Y.textContent=t.teacher.name,z.textContent=t.name,X.innerHTML=""})}ce.addEventListener("click",()=>{F()});ne.addEventListener("click",()=>{F()});se();const de=document.querySelector(".days"),ie=document.querySelector(".current-date"),ue=document.querySelectorAll(".icons span");let k=new Date().getFullYear(),f=new Date().getMonth();const me=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],J=()=>{let t=new Date(k,f,1).getDay(),n=new Date(k,f+1,0).getDate(),r=new Date(k,f,n).getDay(),d=new Date(k,f,0).getDate(),o="";for(let c=t;c>0;c--)o+=`<li class="inactive">${d-c+1}</li>`;for(let c=1;c<=n;c++){let l=c===new Date().getDate()&&f===new Date().getMonth()&&k===new Date().getFullYear()?"active":"",a=`${f+1}/${String(c).padStart(2,"0")}`;o+=`<li class="${l}" data-day="${a}">${c}</li>`}for(let c=r;c<6;c++)o+=`<li class="inactive">${c-r+1}</li>`;ie.innerText=`${me[f]} ${k}`,de.innerHTML=o;const s=document.querySelectorAll(".days li"),p=c=>{s.forEach(l=>l.classList.remove("active")),c.classList.add("active")};s.forEach(c=>{c.addEventListener("click",l=>{p(l.currentTarget),l.target.getAttribute("data-day"),viewTimeCourse()})})};J();ue.forEach(e=>{e.addEventListener("click",()=>{f=e.id==="prev"?f-1:f+1,(f<0||f>11)&&(k=e.id==="prev"?k-1:k+1,f=f<0?11:0),J()})});const pe=document.querySelector("#appointment_list"),he=document.querySelector("#course-management");let W={};function fe(){m.get(`https://project-code-json-k0ti.onrender.com/user_courses?userId=${y.toString()}`).then(function(e){W=[...e.data[0].purchased],manager_data=[...e.data[0].attendTime],manager_data.forEach(r=>{r.day=r.date,delete r.date}),t(W),n(manager_data);function t(r){let d="";m.get("https://project-code-json-k0ti.onrender.com/courses?_expand=teacher").then(function(o){const s=o.data;r.map(l=>{const a=s.find(i=>l.courseId===i.id);return a?{...l,...a}:l}).forEach(l=>{d+=`<li class="book-card" data-courseId="${l.id}">
                <img src="${l.teacher.avatar}" alt="" />
                <div class="d-flex flex-column">
                  <h4>${l.name}</h4>
                  <p>${l.teacher.name}</p>
                  <div class="d-flex gap-2">
                    <p>未預約: ${l.total-l.used}</p>
                  </div>
                </div>
              </li>`}),pe.innerHTML=d;const c=document.querySelectorAll(".book-card");c.forEach(l=>{l.addEventListener("click",a=>{c.forEach(i=>{i.classList.remove("active")}),a.currentTarget.classList.add("active"),clickCourse=a.currentTarget.getAttribute("data-courseId"),viewTimeCourse()})})}).catch(o=>{console.error(o)})}function n(r){let d="";m.get("https://project-code-json-k0ti.onrender.com/courses?_expand=teacher").then(function(o){const s=o.data,p=r.map(a=>{const i=s.find(u=>a.courseId===u.id);return i?{...a,...i}:a});p.forEach((a,i)=>{let u="";a.isCheck?u=`<button
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
                    </li>`}),$.datepicker.setDefaults($.datepicker.regional["zh-TW"]),$(function(){$("[class*=jq-appointmentDate]").each(function(a){const i=this;$(i).attr("id","datepicker-"+a),$(i).datepicker({minDate:0,maxDate:"+1M +10D",formatDate:"yy-mm-dd",showButtonPanel:!0,onSelect:function(){console.log(i.getAttribute("data-uid"),i.getAttribute("data-courseId"));let u="";const S=document.querySelectorAll(`.${i.getAttribute("data-uid")}`)[1],h={...[...s][i.getAttribute("data-courseId")-1].teacher.openTime.find(g=>g.date===i.value.slice(5))};if(console.log(h),Object.keys(h).length===0)return S.innerHTML="",0;h.time.filter(T=>!h.useTime.includes(T)).forEach(T=>{u+=`<option>${T}</option>`}),S.innerHTML=u}})})}),he.innerHTML=d,document.querySelectorAll("#change").forEach(a=>{a.addEventListener("click",i=>{let u=i.currentTarget.getAttribute("data-course"),S=`.${u}`;const b=document.querySelectorAll(S);b.forEach(g=>{g.toggleAttribute("disabled")}),i.currentTarget.classList.add("d-none");let h=document.querySelector(`#ready-${u}`);h||(h=document.querySelector(`#check-${u}`)),h.setAttribute("id",`save-${u}`),h.setAttribute("data-bs-toggle","modal"),h.setAttribute("data-bs-target","#checkModal"),h.removeAttribute("disabled"),h.textContent="儲存",console.log(b[0]),b[0].addEventListener("input",g=>{console.log(g.currentTarget.value)}),h.addEventListener("click",()=>{const g=p.find(D=>D.uid===u),T=document.querySelector("#checkImg"),w=document.querySelector("#checkTeacherName"),j=document.querySelector("#checkName"),A=document.querySelector("#checkDate"),C=document.querySelector("#checkSubmit");T.setAttribute("src",`${g.teacher.avatar}`),w.textContent=g.teacher.name,j.textContent=g.name,A.textContent=`${b[0].value} ${b[1].value}`,C.setAttribute("data-uid",`${u}`),C.addEventListener("click",D=>{if(D.preventDefault(),C.getAttribute("data-uid")!==u)return 0;m.get(`https://project-code-json-k0ti.onrender.com/user_courses/${y}`).then(M=>{const L=[...M.data.attendTime];let x=0;const B=L.find((N,te)=>N.uid===u?(x=te,!0):!1);L.splice(x,1),B.date=b[0].value.slice(5),B.time=b[1].value,B.isCheck=!1,L.push(B),m.patch(`https://project-code-json-k0ti.onrender.com/user_courses/${y}`,{attendTime:[...L]}).then(N=>{console.log("add success"),location.reload()}).catch(N=>{console.error("Error adding post:",N)})})})})})}),document.querySelectorAll("#deleteCourse").forEach(a=>{a.addEventListener("click",i=>{i.preventDefault();const u=i.currentTarget.getAttribute("data-course");console.log(u);const S=i.currentTarget.getAttribute("data-courseId");m.get(`https://project-code-json-k0ti.onrender.com/user_courses/${y}`).then(b=>{const h=[...b.data.attendTime];let g=0;h.find((w,j)=>w.uid===u?(g=j,!0):!1)&&(h.splice(g,1),m.get(`https://project-code-json-k0ti.onrender.com/courses/${S}`).then(w=>{const j=w.data.teacherId,A=document.querySelectorAll(`.${u}`);console.log(A),m.get(`https://project-code-json-k0ti.onrender.com/teachers/${j}`).then(C=>{const D=[...C.data.openTime],M=D.findIndex(x=>x.date===A[0].value.slice(5)),L=D[M].useTime.filter(x=>x!==A[1].value);D[M].useTime=L,m.patch(`https://project-code-json-k0ti.onrender.com/teachers/${j}`,{opentime:[...D]}).then(x=>{console.log("update success")}).catch(x=>{console.error("Error adding post:",x)})})}),m.patch(`https://project-code-json-k0ti.onrender.com/user_courses/${y}`,{attendTime:[...h]}).then(w=>{console.log("delete success"),location.reload()}).catch(w=>{console.error("Error adding post:",w)}))})})})}).catch(o=>{console.error(o)})}}).catch(e=>{console.error(e)})}fe();document.querySelector("#morning");document.querySelector("#afternoon");document.querySelector("#evening");let ge="";const be=document.querySelector("#attendSubmit");let U=[];be.addEventListener("click",()=>{ve(clickCourse,clickDay,y,ge)});function ve(e,t,n,r){const d={uid:ye(4),courseId:Number(e),date:t,time:r,isCheck:!1};m.get(`https://project-code-json-k0ti.onrender.com/user_courses/${n}`).then(o=>{U=[...o.data.attendTime],m.patch(`https://project-code-json-k0ti.onrender.com/user_courses/${n}`,{attendTime:[...U,d]}).then(s=>{console.log("add success")}).catch(s=>{console.error("Error adding post:",s)})}).catch(o=>{console.error("Error adding post:",o)})}function ye(e){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";let n="";const r=Math.floor(Math.random()*(t.length-10));n+=t.charAt(r);for(let d=1;d<e;d++){const o=Math.floor(Math.random()*t.length);n+=t.charAt(o)}return n}const K=document.querySelectorAll("#change"),$e=document.querySelectorAll("#saveBtn"),Q=document.querySelectorAll("#btnBlock"),V=document.querySelectorAll("#date"),Z=document.querySelectorAll("#time");K.forEach((e,t)=>{e.addEventListener("click",n=>{V[t].toggleAttribute("disabled"),Z[t].toggleAttribute("disabled"),Q[t].classList.toggle("hidden"),e.toggleAttribute("disabled")})});$e.forEach((e,t)=>{e.addEventListener("click",n=>{V[t].toggleAttribute("disabled"),Z[t].toggleAttribute("disabled"),Q[t].classList.toggle("hidden"),K[t].toggleAttribute("disabled")})});let v=1,E=[],q=0,_=[];document.addEventListener("DOMContentLoaded",async function(){async function e(){try{E=(await m.get(`https://project-code-json-k0ti.onrender.com/users/${y}`)).data.followList,q=Math.ceil(E.length/6);let s="";if(E.length!=0){let p=`https://project-code-json-k0ti.onrender.com/courses?_expand=teacher&_page=${v}&_limit=6`;E.forEach(a=>{p+=`&id=${a}`}),_=(await m.get(`${p}`)).data,console.log("追蹤的課程資料",_);const l=document.querySelector("#followList");_.forEach(a=>{s+=`<div class="col"><div class="card teacher-card swiper-slide h-100"><button
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
  </div></div>`}),l.innerHTML=s,t(),n(),r()}else s='<p class="text-center fs-5">目前沒有追蹤任何課程</p>'}catch(o){console.log("錯誤",o)}}e();function t(){const o=document.querySelector(".followPagination");let s="";if(q){const p=`<li class="page-item prevButton ${v==1?"disabled":""}"><a class="page-link" href="#" aria-label="Previous"><i class="fa-solid fa-angle-left"></i></a></li>`;s+=p;for(let l=1;l<=q;l++){let a=`<li class="page-item ${l===v?"active":""} pageButton">
                          <a class="page-link" href="#">
                            ${l}
                          </a>
                        </li>`;s+=a}const c=`<li class="page-item nextButton ${v==q?"disabled":""}">
                      <a class="page-link" href="#" aria-label="Next">
                        <i class="fa-solid fa-angle-right"></i>
                      </a>
                    </li>`;s+=c}o.innerHTML=s}function n(){const o=document.querySelector(".prevButton"),s=document.querySelector(".nextButton");let p=document.querySelectorAll(".pageButton");o.addEventListener("click",function(){v>1&&(v--,t(),e())}),s.addEventListener("click",function(){q>v&&(v++,t(),e())}),p.forEach(c=>{c.addEventListener("click",()=>{v=Number(c.innerText),e(),t()})})}function r(){document.querySelectorAll(".following").forEach(s=>{s.addEventListener("click",p=>{d(p)})})}async function d(o){let s=o.target.dataset.buttonid,p=E.filter(c=>c!=s);Swal.fire({title:"確定要取消追蹤?",showDenyButton:!0,confirmButtonColor:"#115BC9",confirmButtonText:"取消追蹤",denyButtonText:"我再想想"}).then(c=>{c.isConfirmed&&(Swal.fire({position:"center",icon:"success",title:"已取消追蹤",showConfirmButton:!1,timer:1500}),m.patch(`https://project-code-json-k0ti.onrender.com/users/${y}`,{followList:p}).then(async l=>{await e(),console.log(_),_.length==0&&(v--,e()),t()}))})}});const G=document.querySelectorAll(".js-couponPageArrow");let H=[],I=1,R;O();async function xe(){let e=new Date().getTime();for(const t of H)if(new Date(t.dueDate).getTime()<e)try{await m.patch(`https://project-code-json-k0ti.onrender.com/myCoupons/${t.id}`,{canUse:!1},{headers:{"Content-Type":"application/json"}}),O()}catch(n){console.log("checkDueDate",n)}else ee(),ke()}async function O(){try{const e=`https://project-code-json-k0ti.onrender.com/myCoupons?_expand=coupon&canUse=true&userId=${y}&_page=${I}&_limit=6_sort=dueDate&_order=asc`,t=await m.get(e);let n=parseInt(t.headers.get("X-Total-Count"));for(let r of t.data){const{data:d}=await m.get(`https://project-code-json-k0ti.onrender.com/coupons/${r.couponId}?_expand=teacher`);r.coupon=d}t.data.length?(H=t.data,R=Math.ceil(n/6),xe()):ee()}catch(e){console.log("getCoupons",e)}}function ee(){const e=/^(\d{4}-\d{2}-\d{2}).*/,t=document.querySelector(".js-couponGroup");let n="";H.length?H.forEach(r=>{n+=`
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
            </li>`}):n+='<p class="text-center fs-5">目前沒有優惠券<p>',t.innerHTML=n}function ke(){G.forEach((e,t,n)=>{R>1?(e.classList.remove("d-none"),I===1?n[0].classList.add("disabled"):n[0].classList.remove("disabled"),I===R?n[1].classList.add("disabled"):n[1].classList.remove("disabled")):e.classList.add("d-none")})}G.forEach((e,t)=>{e.addEventListener("click",n=>{n.preventDefault(),n.target.closest(".js-couponPageArrow").classList.contains("disabled")||(t===1?I++:Math.max(1,I--),O())})});
