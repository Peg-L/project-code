import{a as p,u as b,c as X,i as he}from"./backtotop-407cb22f.js";import"./openTime-482ad5b4.js";import{h as fe}from"./startCourse-732c2962.js";let M=[];const ge=document.querySelector("#userName"),be=document.querySelector("#userRole"),ve=document.querySelector("#userImg"),$e=document.querySelector("#PreviousWeek"),ye=document.querySelector("#NextWeek"),oe=document.querySelector("#courseTeacherName"),ae=document.querySelector("#courseName"),se=document.querySelector("#dateTime");function xe(){p.get(`https://project-code-json-k0ti.onrender.com/user_courses?_expand=user&userId=${b.toString()}`).then(function(e){M=e.data[0],ve.setAttribute("src",M.user.avatar),ge.textContent=M.user.name,be.textContent=M.user.role,V()})}function V(){document.querySelectorAll(".calendar-time").forEach(i=>{let o=i.getAttribute("data-num"),a=n(o),s="";if(a.length!==0)for(let c=0;c<a.length;c++)s+=`<li class="c2"><a href=''
                data-bs-toggle="modal"
                data-bs-target="#calendarModal"
                data-course-id="${a[c].courseId}"
                id="viewCourse">
                ${a[c].time}
                </a></li>`;i.innerHTML=s}),document.querySelectorAll("#viewCourse").forEach(i=>{let o=i.getAttribute("data-course-id");i.addEventListener("click",()=>{r(o)})});function n(i){return M.attendTime.filter(o=>o.date===i)}function r(i){let o=[];p.get(`https://project-code-json-k0ti.onrender.com/courses/${i.toString()}?_expand=teacher`).then(function(a){o=a.data,oe.textContent=o.teacher.name,ae.textContent=o.name,se.innerHTML=""})}}const we=document.querySelectorAll("#viewCourse");we.forEach(e=>{let t=e.getAttribute("data-course-id");e.addEventListener("click",()=>{ke(t)})});function ke(e){let t=[];p.get(`https://project-code-json-k0ti.onrender.com/courses/${e.toString()}?_expand=teacher`).then(function(n){t=n.data,oe.textContent=t.teacher.name,ae.textContent=t.name,se.innerHTML=""})}$e.addEventListener("click",()=>{V()});ye.addEventListener("click",()=>{V()});xe();const Te=document.querySelector(".days"),Se=document.querySelector(".current-date"),Le=document.querySelectorAll(".icons span");let O="",w=new Date().getFullYear(),f=new Date().getMonth(),E="";const je=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],ne=()=>{let t=new Date(w,f,1).getDay(),n=new Date(w,f+1,0).getDate(),r=new Date(w,f,n).getDay(),i=new Date(w,f,0).getDate(),o="";for(let c=t;c>0;c--)o+=`<li class="inactive">${i-c+1}</li>`;for(let c=1;c<=n;c++){let u=c===new Date().getDate()&&f===new Date().getMonth()&&w===new Date().getFullYear()?"active":"",d=`${w}/${f+1}/${String(c).padStart(2,"0")}`;o+=`<li class="${u}" data-day="${d}">${c}</li>`}for(let c=r;c<6;c++)o+=`<li class="inactive">${c-r+1}</li>`;Se.innerText=`${je[f]} ${w}`,Te.innerHTML=o;const a=document.querySelectorAll(".days li"),s=c=>{a.forEach(u=>u.classList.remove("active")),c.classList.add("active")};a.forEach(c=>{c.addEventListener("click",u=>{s(u.currentTarget),O=u.target.getAttribute("data-day"),E||(E=document.querySelector(".book-card").getAttribute("data-courseid")),W(E,O)})})};ne();Le.forEach(e=>{e.addEventListener("click",()=>{f=e.id==="prev"?f-1:f+1,(f<0||f>11)&&(w=e.id==="prev"?w-1:w+1,f=f<0?11:0),ne()})});const De=document.querySelector("#appointment_list"),Ae=document.querySelector("#course-management");let G={},J=[];function K(){p.get(`https://project-code-json-k0ti.onrender.com/user_courses?userId=${b.toString()}`).then(function(e){G=[...e.data[0].purchased],J=[...e.data[0].attendTime],J.forEach(r=>{r.day=r.date,delete r.date}),t(G),n(J);function t(r){let i="";p.get("https://project-code-json-k0ti.onrender.com/courses?_expand=teacher").then(function(o){const a=o.data;r.map(l=>{const m=a.find(v=>l.courseId===v.id);return m?{...l,...m}:l}).forEach(l=>{i+=`<li class="book-card" data-courseId="${l.id}">
                <img src="${l.teacher.avatar}" alt="" />
                <div class="d-flex flex-column">
                  <h4>${l.name}</h4>
                  <p>${l.teacher.name}</p>
                  <div class="d-flex gap-2">
                    <p>未預約: ${l.total-l.used}</p>
                  </div>
                </div>
              </li>`}),De.innerHTML=i;const c=document.querySelectorAll(".book-card"),u=document.querySelector(".book-card");var d=new Date;W(u.getAttribute("data-courseId"),`${d.getMonth()+1}/${d.getDate()}`),u.classList.add("active"),c.forEach(l=>{l.addEventListener("click",m=>{c.forEach(v=>{v.classList.remove("active")}),m.currentTarget.classList.add("active"),E=m.currentTarget.getAttribute("data-courseId"),W(E,O)})})}).catch(o=>{console.error(o)})}function n(r){let i="";p.get("https://project-code-json-k0ti.onrender.com/courses?_expand=teacher").then(function(o){const a=o.data,s=r.map(d=>{const l=a.find(m=>d.courseId===m.id);return l?{...d,...l}:d});s.forEach((d,l)=>{let m="";d.isCheck?m=`<button
                    type="button"
                    class="btn btn-secondary2 w-100 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
                    id="ready-${d.uid}"
                  >
                    即將上課
                  </button>`:m=`<button
                    type="button"
                    class="btn btn-secondary2 w-100 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
                    id="check-${d.uid}"
                    disabled
                  >
                    等待確認中
                  </button>`,i+=`<li class="course-card shadow w-100 w-xl-75">
                    <div class="d-flex flex-grow-1 p-3 p-sm-4 align-items-center">
                      <div class="course-card-header me-4">
                        <a href="#" class="text-center">
                          <div class="mb-2">
                            <img
                              class="avatar w-120px"
                              src="${d.teacher.avatar}"
                              alt="teacher"
                            />
                          </div>
                          <h3 class="fs-7 fs-md-6 text-secondary2 mb-1">${d.teacher.name}</h3>
                        </a>
                        <!-- link -->
                      </div>
                      <div class="flex-grow-1 px-4 px-lg-8">
                        <!-- 課程名稱 -->
                        <div
                          class="d-flex flex-md-row flex-column justify-content-md-between mb-md-0 mb-2"
                        >
                          <h2 class="fs-6 fs-sm-5 fs-md-4 line-ellipsis mb-2">
                          ${d.name}
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
                                class="form-control border-light cursor-pointer jq-appointmentDate${l} ${d.uid}"
                                type="text"
                                name="accountDate1-1"
                                placeholder="日期"
                                value="${d.day}"
                                autocomplete="off"
                                data-courseId="${d.id}"
                                data-uid="${d.uid}"
                                id="date"
                                disabled
                                required
                              />
                            </div>
                    
                            <div class="w-150px">
                              <select
                                class="form-select border border-light ${d.uid}"
                                id="time"
                                disabled
                              >
                                <option selected>${d.time}</option>
                              </select>
                            </div>
                            <button
                              type="button"
                              class="btn text-primary"
                              data-course="${d.uid}"
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
                      
                      ${m}
                      <a
                        href="#"
                        type="button"
                        class="btn btn-white w-100 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
                        data-course="${d.uid}"
                        data-courseId="${d.id}"
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
                    </li>`}),$.datepicker.setDefaults($.datepicker.regional["zh-TW"]),$(function(){$("[class*=jq-appointmentDate]").each(function(d){const l=this;$(l).attr("id","datepicker-"+d),$(l).datepicker({minDate:0,maxDate:"+1M +10D",formatDate:"yy-mm-dd",showButtonPanel:!0,onSelect:function(){console.log(l.getAttribute("data-uid"),l.getAttribute("data-courseId"));let m="";const v=document.querySelectorAll(`.${l.getAttribute("data-uid")}`)[1],h={...[...a][l.getAttribute("data-courseId")-1].teacher.openTime.find(g=>g.date===l.value)};if(console.log(h),Object.keys(h).length===0)return v.innerHTML="",0;h.time.filter(L=>!h.useTime.includes(L)).forEach(L=>{m+=`<option>${L}</option>`}),v.innerHTML=m}})})}),Ae.innerHTML=i,document.querySelectorAll("#change").forEach(d=>{d.addEventListener("click",l=>{let m=l.currentTarget.getAttribute("data-course"),v=`.${m}`;const y=document.querySelectorAll(v);y.forEach(g=>{g.toggleAttribute("disabled")}),l.currentTarget.classList.add("d-none");let h=document.querySelector(`#ready-${m}`);h||(h=document.querySelector(`#check-${m}`)),h.setAttribute("id",`save-${m}`),h.setAttribute("data-bs-toggle","modal"),h.setAttribute("data-bs-target","#checkModal"),h.removeAttribute("disabled"),h.textContent="儲存",console.log(y[0]),y[0].addEventListener("input",g=>{console.log(g.currentTarget.value)}),h.addEventListener("click",()=>{const g=s.find(S=>S.uid===m),L=document.querySelector("#checkImg"),T=document.querySelector("#checkTeacherName"),j=document.querySelector("#checkName"),q=document.querySelector("#checkDate"),D=document.querySelector("#checkSubmit");D.setAttribute("data-bs-dismiss","modal"),L.setAttribute("src",`${g.teacher.avatar}`),T.textContent=g.teacher.name,j.textContent=g.name,q.textContent=`${y[0].value} ${y[1].value}`,D.setAttribute("data-uid",`${m}`),D.addEventListener("click",S=>{if(S.preventDefault(),D.getAttribute("data-uid")!==m)return 0;p.get(`https://project-code-json-k0ti.onrender.com/user_courses/${b}`).then(P=>{const A=[...P.data.attendTime];let k=0;const N=A.find((H,pe)=>H.uid===m?(k=pe,!0):!1);A.splice(k,1),N.date=y[0].value,N.time=y[1].value,N.isCheck=!1,A.push(N),p.patch(`https://project-code-json-k0ti.onrender.com/user_courses/${b}`,{attendTime:[...A]}).then(H=>{console.log("add success"),Swal.fire({icon:"success",title:"預約成功",showConfirmButton:!1,timer:1500}),K()}).catch(H=>{console.error("Error adding post:",H)})})})})})}),document.querySelectorAll("#deleteCourse").forEach(d=>{d.addEventListener("click",l=>{l.preventDefault();const m=l.currentTarget.getAttribute("data-course");console.log(m);const v=l.currentTarget.getAttribute("data-courseId");p.get(`https://project-code-json-k0ti.onrender.com/user_courses/${b}`).then(y=>{const h=[...y.data.attendTime];let g=0;h.find((T,j)=>T.uid===m?(g=j,!0):!1)&&(h.splice(g,1),p.get(`https://project-code-json-k0ti.onrender.com/courses/${v}`).then(T=>{const j=T.data.teacherId,q=document.querySelectorAll(`.${m}`);console.log(q),p.get(`https://project-code-json-k0ti.onrender.com/teachers/${j}`).then(D=>{const S=[...D.data.openTime],P=S.findIndex(k=>k.date===q[0].value),A=S[P].useTime.filter(k=>k!==q[1].value);S[P].useTime=A,p.patch(`https://project-code-json-k0ti.onrender.com/teachers/${j}`,{opentime:[...S]}).then(k=>{console.log("update success")}).catch(k=>{console.error("Error adding post:",k)})})}),p.patch(`https://project-code-json-k0ti.onrender.com/user_courses/${b}`,{attendTime:[...h]}).then(T=>{console.log("delete success"),Swal.fire({icon:"success",title:"取消預約成功",showConfirmButton:!1,timer:1500}),K()}).catch(T=>{console.error("Error adding post:",T)}))})})})}).catch(o=>{console.error(o)})}}).catch(e=>{console.error(e)})}K();const Ee=document.querySelector("#morning"),qe=document.querySelector("#afternoon"),Ce=document.querySelector("#evening");let ce="",R="",U="",F="";const _e=document.querySelector("#attendSubmit");let ee=[];_e.addEventListener("click",e=>{Ie(E,O,b,ce)});function W(e=document.querySelector(".book-card").getAttribute("data-courseid"),t){if(e!==""&&t!==""&&b!=="")console.log(e,t),p.get(`https://project-code-json-k0ti.onrender.com/courses/${e}?_expand=teacher`).then(function(n){const r=n.data.teacher.openTime.filter(o=>o.date===t);if(console.log(r),r.length>0){let a=function(s){return r[0].useTime.find(c=>c===s)!==void 0};r[0].time.forEach(s=>{switch(Me(s)){case"上午":a(s)?R+=`<li class="btn-time  disable" data-time=${s}>${s}</li>`:R+=`<li class="btn-time" data-time=${s}>${s}</li>`;break;case"中午":a(s)?U+=`<li class="btn-time disable" data-time=${s}>${s}</li>`:U+=`<li class="btn-time" data-time=${s}>${s}</li>`;break;case"晚上":a(s)?F+=`<li class="btn-time disable" data-time=${s} >${s}</li>`:F+=`<li class="btn-time" data-time=${s}>${s}</li>`;break}})}Ee.innerHTML=R,R="",qe.innerHTML=U,U="",Ce.innerHTML=F,F="";const i=document.querySelectorAll(".btn-time");i.forEach(o=>{o.addEventListener("click",a=>{i.forEach(s=>{s.classList.remove("active")}),a.currentTarget.classList.add("active"),ce=a.target.getAttribute("data-time")})})});else return}function Ie(e,t,n,r){const i={uid:Be(4),courseId:Number(e),date:t,time:r,isCheck:!1};p.get(`https://project-code-json-k0ti.onrender.com/user_courses/${n}`).then(o=>{ee=[...o.data.attendTime],p.patch(`https://project-code-json-k0ti.onrender.com/user_courses/${n}`,{attendTime:[...ee,i]}).then(a=>{console.log("add success"),Swal.fire({icon:"success",title:"預約成功",showConfirmButton:!1,timer:1500})}).catch(a=>{console.error("Error adding post:",a)}),p.get(`https://project-code-json-k0ti.onrender.com/courses/${i.courseId}`).then(a=>{const s=a.data.teacherId;p.get(`https://project-code-json-k0ti.onrender.com/teachers/${s}`).then(c=>{const u=[...c.data.openTime],d=u.findIndex(l=>l.date===i.date);u[d].useTime.push(i.time),p.patch(`https://project-code-json-k0ti.onrender.com/teachers/${s}`,{openTime:[...u]}).then(l=>{console.log("更新老師資料成功"),W(e,t)}).catch(l=>{console.error("Error adding post:",l)})}).catch(c=>{console.error("Error adding post:",c)})}).catch(a=>{console.error("Error adding post:",a)})}).catch(o=>{console.error("Error adding post:",o)})}function Me(e){const n=new Date(`2000-01-01 ${e}`).getHours();return n>=0&&n<12?"上午":n>=12&&n<18?"中午":"晚上"}function Be(e){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";let n="";const r=Math.floor(Math.random()*(t.length-10));n+=t.charAt(r);for(let i=1;i<e;i++){const o=Math.floor(Math.random()*t.length);n+=t.charAt(o)}return n}const re=document.querySelectorAll("#change"),Pe=document.querySelectorAll("#saveBtn"),le=document.querySelectorAll("#btnBlock"),de=document.querySelectorAll("#date"),ie=document.querySelectorAll("#time");re.forEach((e,t)=>{e.addEventListener("click",n=>{de[t].toggleAttribute("disabled"),ie[t].toggleAttribute("disabled"),le[t].classList.toggle("hidden"),e.toggleAttribute("disabled")})});Pe.forEach((e,t)=>{e.addEventListener("click",n=>{de[t].toggleAttribute("disabled"),ie[t].toggleAttribute("disabled"),le[t].classList.toggle("hidden"),re[t].toggleAttribute("disabled")})});let x=1,C=[],_=0,I=[];const te=/\/[^/]+\.html/,Ne=te.test(X)?X.replace(te,"/course_intro.html"):X+"course_intro.html",Y=document.querySelector("#followList");Y&&fe(Y);document.addEventListener("DOMContentLoaded",async function(){async function e(){try{C=(await p.get(`https://project-code-json-k0ti.onrender.com/users/${b}`)).data.followList,_=Math.ceil(C.length/6);let a="";if(C.length!=0){let s=`https://project-code-json-k0ti.onrender.com/courses?_expand=teacher&_page=${x}&_limit=6`;C.forEach(u=>{s+=`&id=${u}`}),I=(await p.get(`${s}`)).data,console.log("收藏的課程資料",I),I.forEach(u=>{a+=`<div class="col"><div class="card teacher-card swiper-slide h-100"><button
        type="button"
        class="btn p-3 text-center align-self-start position-absolute top-0 end-0 following"
      >
        <i class="fa-regular fa-heart fs-4 text-primary fw-bold" data-buttonId="${u.id}"></i>
      </button>
    <div class="card-body d-flex justify-content-between">
      <div>
        <h5 class="card-title teacher-card-title truncate-lines-2">${u.name}
        </h5>
        <p class="teacher-card-name">${u.teacher.name}</p>
        <ul class="teacher-card-object">
          <li class="teacher-card-evaluate">${u.rate}</li>
          <li class="teacher-card-hours">50分鐘</li>
        </ul>
        <p class="teacher-card-price">NT$<span>${u.price}</span></p>
      </div>
      <div class="teacher-card-img">
        <img
          src="${u.teacher.avatar}"
          alt="老師"
          class="w-100px w-sm-120px"
        />
      </div>
    </div>
    <div>
      <p class="teacher-card-text">
      ${u.info}
      </p>
      <a
        type="button"
        class="btn btn-secondary2 w-100 mb-3"
        data-course="${u.id}"
        data-bs-target="#loginModal"
        ${he?"":'data-bs-toggle="modal"'}
      >
        立即上課
      </a>
      <a
        href="${Ne}?courseId=${u.id}"
        type="button"
        class="btn teacher-card-btn"
        >查看介紹</a
      >
    </div>
  </div></div>`}),Y.innerHTML=a,t(),n(),r()}else a='<p class="text-center fs-5">目前沒有收藏任何課程</p>',Y.innerHTML=a,t()}catch(o){console.log("錯誤",o)}}e();function t(){const o=document.querySelector(".followPagination");let a="";if(_){const s=`<li class="page-item prevButton ${x==1?"disabled":""}"><a class="page-link" href="#" aria-label="Previous"><i class="fa-solid fa-angle-left"></i></a></li>`;a+=s;for(let u=1;u<=_;u++){let d=`<li class="page-item ${u===x?"active":""} pageButton">
                          <a class="page-link" href="#">
                            ${u}
                          </a>
                        </li>`;a+=d}const c=`<li class="page-item nextButton ${x==_?"disabled":""}">
                      <a class="page-link" href="#" aria-label="Next">
                        <i class="fa-solid fa-angle-right"></i>
                      </a>
                    </li>`;a+=c}o.innerHTML=a}function n(){const o=document.querySelector(".prevButton"),a=document.querySelector(".nextButton");let s=document.querySelectorAll(".pageButton");o.addEventListener("click",function(){console.log("點擊上一頁成功"),x>1&&(x--,t(),e())}),a.addEventListener("click",function(){console.log("點擊下一頁成功"),_>x&&(x++,t(),e())}),s.forEach(c=>{c.addEventListener("click",()=>{x=Number(c.innerText),e(),t()})})}function r(){document.querySelectorAll(".following").forEach(a=>{a.addEventListener("click",s=>{i(s)})})}async function i(o){let a=o.target.dataset.buttonid;console.log("buttonId",a);let s=C.filter(c=>c!=a);Swal.fire({title:"確定要取消收藏?",showDenyButton:!0,confirmButtonColor:"#115BC9",confirmButtonText:"取消收藏",denyButtonText:"我再想想"}).then(c=>{c.isConfirmed&&(Swal.fire({position:"center",icon:"success",title:"已取消收藏",showConfirmButton:!1,timer:1500}),p.patch(`https://project-code-json-k0ti.onrender.com/users/${b}`,{followList:s}).then(async u=>{await e(),console.log(I),I.length==0&&(x--,e())}))})}});const ue=document.querySelectorAll(".js-couponPageArrow");let z=[],B=1,Q;Z();async function He(){let e=new Date().getTime();for(const t of z)if(new Date(t.dueDate).getTime()<e)try{await p.patch(`https://project-code-json-k0ti.onrender.com/myCoupons/${t.id}`,{canUse:!1},{headers:{"Content-Type":"application/json"}}),Z()}catch(n){console.log("checkDueDate",n)}else me(),Re()}async function Z(){try{const e=`https://project-code-json-k0ti.onrender.com/myCoupons?_expand=coupon&canUse=true&userId=${b}&_page=${B}&_limit=6_sort=dueDate&_order=asc`,t=await p.get(e);if(t.data.length){const n=t.data.map(o=>o.coupon.teacherId===null?`https://project-code-json-k0ti.onrender.com/coupons/${o.couponId}`:`https://project-code-json-k0ti.onrender.com/coupons/${o.couponId}?_expand=teacher`),r=await Promise.all(n.map(o=>p.get(o)));t.data.forEach((o,a)=>{o.coupon=r[a].data}),z=t.data;const i=parseInt(t.headers.get("X-Total-Count"));Q=Math.ceil(i/6),He()}else me()}catch(e){console.log("getCoupons",e)}}function me(){const e=/^(\d{4}-\d{2}-\d{2}).*/,t=document.querySelector(".js-couponGroup");let n="";z.length?z.forEach(r=>{n+=`
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
                      href="${r.coupon.type==="allCourse"?"course.html":`course_intro.html?courseId=${r.coupon.courseId}`}"
                      class="btn btn-secondary2 px-1 px-sm-4 w-100"
                      >${r.coupon.type==="allCourse"?"立即選購":"課程介紹"}</a
                    >
                  </div>
                </div>
              </div>
            </li>`}):n+='<p class="text-center fs-5">目前沒有優惠券<p>',t.innerHTML=n}function Re(){ue.forEach((e,t,n)=>{Q>1?(e.classList.remove("d-none"),B===1?n[0].classList.add("disabled"):n[0].classList.remove("disabled"),B===Q?n[1].classList.add("disabled"):n[1].classList.remove("disabled")):e.classList.add("d-none")})}ue.forEach((e,t)=>{e.addEventListener("click",n=>{n.preventDefault(),n.target.closest(".js-couponPageArrow").classList.contains("disabled")||(t===1?B++:Math.max(1,B--),Z())})});
