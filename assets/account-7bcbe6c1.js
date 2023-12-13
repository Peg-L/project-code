import{a as p,u as b,c as X,i as he}from"./backtotop-7745fe90.js";import"./openTime-482ad5b4.js";import{h as fe}from"./startCourse-d2005fda.js";let F=[];const ge=document.querySelector("#userName"),be=document.querySelector("#userRole");document.querySelector("#userImg");const ve=document.querySelector("#PreviousWeek"),$e=document.querySelector("#NextWeek"),te=document.querySelector("#courseTeacherName"),oe=document.querySelector("#courseName"),ae=document.querySelector("#dateTime");function ye(){p.get(`https://project-code-json-k0ti.onrender.com/user_courses?_expand=user&userId=${b.toString()}`).then(function(e){F=e.data[0],ge.textContent=F.user.name,be.textContent=F.user.role,Q()})}function Q(){document.querySelectorAll(".calendar-time").forEach(i=>{let a=i.getAttribute("data-num"),o=n(a),s="";if(o.length!==0)for(let c=0;c<o.length;c++)s+=`<li class="c2"><a href=''
                data-bs-toggle="modal"
                data-bs-target="#calendarModal"
                data-course-id="${o[c].courseId}"
                id="viewCourse">
                ${o[c].time}
                </a></li>`;i.innerHTML=s}),document.querySelectorAll("#viewCourse").forEach(i=>{let a=i.getAttribute("data-course-id");i.addEventListener("click",()=>{r(a)})});function n(i){return F.attendTime.filter(a=>a.date===i)}function r(i){let a=[];p.get(`https://project-code-json-k0ti.onrender.com/courses/${i.toString()}?_expand=teacher`).then(function(o){a=o.data,te.textContent=a.teacher.name,oe.textContent=a.name,ae.innerHTML=""})}}const xe=document.querySelectorAll("#viewCourse");xe.forEach(e=>{let t=e.getAttribute("data-course-id");e.addEventListener("click",()=>{we(t)})});function we(e){let t=[];p.get(`https://project-code-json-k0ti.onrender.com/courses/${e.toString()}?_expand=teacher`).then(function(n){t=n.data,te.textContent=t.teacher.name,oe.textContent=t.name,ae.innerHTML=""})}ve.addEventListener("click",()=>{Q()});$e.addEventListener("click",()=>{Q()});ye();const ke=document.querySelector(".days"),Te=document.querySelector(".current-date"),Le=document.querySelectorAll(".icons span");let O="",k=new Date().getFullYear(),f=new Date().getMonth(),E="";const Se=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],se=()=>{let t=new Date(k,f,1).getDay(),n=new Date(k,f+1,0).getDate(),r=new Date(k,f,n).getDay(),i=new Date(k,f,0).getDate(),a="";for(let c=t;c>0;c--)a+=`<li class="inactive">${i-c+1}</li>`;for(let c=1;c<=n;c++){let u=c===new Date().getDate()&&f===new Date().getMonth()&&k===new Date().getFullYear()?"active":"",d=`${f+1}/${String(c).padStart(2,"0")}`;a+=`<li class="${u}" data-day="${d}">${c}</li>`}for(let c=r;c<6;c++)a+=`<li class="inactive">${c-r+1}</li>`;Te.innerText=`${Se[f]} ${k}`,ke.innerHTML=a;const o=document.querySelectorAll(".days li"),s=c=>{o.forEach(u=>u.classList.remove("active")),c.classList.add("active")};o.forEach(c=>{c.addEventListener("click",u=>{s(u.currentTarget),O=u.target.getAttribute("data-day"),E||(E=document.querySelector(".book-card").getAttribute("data-courseid")),W(E,O)})})};se();Le.forEach(e=>{e.addEventListener("click",()=>{f=e.id==="prev"?f-1:f+1,(f<0||f>11)&&(k=e.id==="prev"?k-1:k+1,f=f<0?11:0),se()})});const De=document.querySelector("#appointment_list"),je=document.querySelector("#course-management");let Z={},J=[];function ne(){p.get(`https://project-code-json-k0ti.onrender.com/user_courses?userId=${b.toString()}`).then(function(e){Z=[...e.data[0].purchased],J=[...e.data[0].attendTime],J.forEach(r=>{r.day=r.date,delete r.date}),t(Z),n(J);function t(r){let i="";p.get("https://project-code-json-k0ti.onrender.com/courses?_expand=teacher").then(function(a){const o=a.data;r.map(l=>{const m=o.find(v=>l.courseId===v.id);return m?{...l,...m}:l}).forEach(l=>{i+=`<li class="book-card" data-courseId="${l.id}">
                <img src="${l.teacher.avatar}" alt="" />
                <div class="d-flex flex-column">
                  <h4>${l.name}</h4>
                  <p>${l.teacher.name}</p>
                  <div class="d-flex gap-2">
                    <p>未預約: ${l.total-l.used}</p>
                  </div>
                </div>
              </li>`}),De.innerHTML=i;const c=document.querySelectorAll(".book-card"),u=document.querySelector(".book-card");var d=new Date;W(u.getAttribute("data-courseId"),`${d.getMonth()+1}/${d.getDate()}`),u.classList.add("active"),c.forEach(l=>{l.addEventListener("click",m=>{c.forEach(v=>{v.classList.remove("active")}),m.currentTarget.classList.add("active"),E=m.currentTarget.getAttribute("data-courseId"),W(E,O)})})}).catch(a=>{console.error(a)})}function n(r){let i="";p.get("https://project-code-json-k0ti.onrender.com/courses?_expand=teacher").then(function(a){const o=a.data,s=r.map(d=>{const l=o.find(m=>d.courseId===m.id);return l?{...d,...l}:d});s.forEach((d,l)=>{let m="";d.isCheck?m=`<button
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
                              class="avatar"
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
                                value="2023/${d.day}"
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
                    </li>`}),$.datepicker.setDefaults($.datepicker.regional["zh-TW"]),$(function(){$("[class*=jq-appointmentDate]").each(function(d){const l=this;$(l).attr("id","datepicker-"+d),$(l).datepicker({minDate:0,maxDate:"+1M +10D",formatDate:"yy-mm-dd",showButtonPanel:!0,onSelect:function(){console.log(l.getAttribute("data-uid"),l.getAttribute("data-courseId"));let m="";const v=document.querySelectorAll(`.${l.getAttribute("data-uid")}`)[1],h={...[...o][l.getAttribute("data-courseId")-1].teacher.openTime.find(g=>g.date===l.value.slice(5))};if(console.log(h),Object.keys(h).length===0)return v.innerHTML="",0;h.time.filter(S=>!h.useTime.includes(S)).forEach(S=>{m+=`<option>${S}</option>`}),v.innerHTML=m}})})}),je.innerHTML=i,document.querySelectorAll("#change").forEach(d=>{d.addEventListener("click",l=>{let m=l.currentTarget.getAttribute("data-course"),v=`.${m}`;const y=document.querySelectorAll(v);y.forEach(g=>{g.toggleAttribute("disabled")}),l.currentTarget.classList.add("d-none");let h=document.querySelector(`#ready-${m}`);h||(h=document.querySelector(`#check-${m}`)),h.setAttribute("id",`save-${m}`),h.setAttribute("data-bs-toggle","modal"),h.setAttribute("data-bs-target","#checkModal"),h.removeAttribute("disabled"),h.textContent="儲存",console.log(y[0]),y[0].addEventListener("input",g=>{console.log(g.currentTarget.value)}),h.addEventListener("click",()=>{const g=s.find(L=>L.uid===m),S=document.querySelector("#checkImg"),T=document.querySelector("#checkTeacherName"),D=document.querySelector("#checkName"),q=document.querySelector("#checkDate"),j=document.querySelector("#checkSubmit");j.setAttribute("data-bs-dismiss","modal"),S.setAttribute("src",`${g.teacher.avatar}`),T.textContent=g.teacher.name,D.textContent=g.name,q.textContent=`${y[0].value} ${y[1].value}`,j.setAttribute("data-uid",`${m}`),j.addEventListener("click",L=>{if(L.preventDefault(),j.getAttribute("data-uid")!==m)return 0;p.get(`https://project-code-json-k0ti.onrender.com/user_courses/${b}`).then(B=>{const A=[...B.data.attendTime];let w=0;const N=A.find((P,pe)=>P.uid===m?(w=pe,!0):!1);A.splice(w,1),N.date=y[0].value.slice(5),N.time=y[1].value,N.isCheck=!1,A.push(N),p.patch(`https://project-code-json-k0ti.onrender.com/user_courses/${b}`,{attendTime:[...A]}).then(P=>{console.log("add success"),Swal.fire({icon:"success",title:"預約成功",showConfirmButton:!1,timer:1500}),ne()}).catch(P=>{console.error("Error adding post:",P)})})})})})}),document.querySelectorAll("#deleteCourse").forEach(d=>{d.addEventListener("click",l=>{l.preventDefault();const m=l.currentTarget.getAttribute("data-course");console.log(m);const v=l.currentTarget.getAttribute("data-courseId");p.get(`https://project-code-json-k0ti.onrender.com/user_courses/${b}`).then(y=>{const h=[...y.data.attendTime];let g=0;h.find((T,D)=>T.uid===m?(g=D,!0):!1)&&(h.splice(g,1),p.get(`https://project-code-json-k0ti.onrender.com/courses/${v}`).then(T=>{const D=T.data.teacherId,q=document.querySelectorAll(`.${m}`);console.log(q),p.get(`https://project-code-json-k0ti.onrender.com/teachers/${D}`).then(j=>{const L=[...j.data.openTime],B=L.findIndex(w=>w.date===q[0].value.slice(5)),A=L[B].useTime.filter(w=>w!==q[1].value);L[B].useTime=A,p.patch(`https://project-code-json-k0ti.onrender.com/teachers/${D}`,{opentime:[...L]}).then(w=>{console.log("update success")}).catch(w=>{console.error("Error adding post:",w)})})}),p.patch(`https://project-code-json-k0ti.onrender.com/user_courses/${b}`,{attendTime:[...h]}).then(T=>{console.log("delete success"),location.reload()}).catch(T=>{console.error("Error adding post:",T)}))})})})}).catch(a=>{console.error(a)})}}).catch(e=>{console.error(e)})}ne();const Ae=document.querySelector("#morning"),Ee=document.querySelector("#afternoon"),qe=document.querySelector("#evening");let ce="",H="",R="",U="";const Ce=document.querySelector("#attendSubmit");let G=[];Ce.addEventListener("click",e=>{_e(E,O,b,ce)});function W(e=document.querySelector(".book-card").getAttribute("data-courseid"),t){if(e!==""&&t!==""&&b!=="")console.log(e,t),p.get(`https://project-code-json-k0ti.onrender.com/courses/${e}?_expand=teacher`).then(function(n){const r=n.data.teacher.openTime.filter(a=>a.date===t);if(console.log(r),r.length>0){let o=function(s){return r[0].useTime.find(c=>c===s)!==void 0};r[0].time.forEach(s=>{switch(Ie(s)){case"上午":o(s)?H+=`<li class="btn-time  disable" data-time=${s}>${s}</li>`:H+=`<li class="btn-time" data-time=${s}>${s}</li>`;break;case"中午":o(s)?R+=`<li class="btn-time disable" data-time=${s}>${s}</li>`:R+=`<li class="btn-time" data-time=${s}>${s}</li>`;break;case"晚上":o(s)?U+=`<li class="btn-time disable" data-time=${s} >${s}</li>`:U+=`<li class="btn-time" data-time=${s}>${s}</li>`;break}})}Ae.innerHTML=H,H="",Ee.innerHTML=R,R="",qe.innerHTML=U,U="";const i=document.querySelectorAll(".btn-time");i.forEach(a=>{a.addEventListener("click",o=>{i.forEach(s=>{s.classList.remove("active")}),o.currentTarget.classList.add("active"),ce=o.target.getAttribute("data-time")})})});else return}function _e(e,t,n,r){const i={uid:Me(4),courseId:Number(e),date:t,time:r,isCheck:!1};p.get(`https://project-code-json-k0ti.onrender.com/user_courses/${n}`).then(a=>{G=[...a.data.attendTime],p.patch(`https://project-code-json-k0ti.onrender.com/user_courses/${n}`,{attendTime:[...G,i]}).then(o=>{console.log("add success"),Swal.fire({icon:"success",title:"預約成功",showConfirmButton:!1,timer:1500})}).catch(o=>{console.error("Error adding post:",o)}),p.get(`https://project-code-json-k0ti.onrender.com/courses/${i.courseId}`).then(o=>{const s=o.data.teacherId;p.get(`https://project-code-json-k0ti.onrender.com/teachers/${s}`).then(c=>{const u=[...c.data.openTime],d=u.findIndex(l=>l.date===i.date);u[d].useTime.push(i.time),p.patch(`https://project-code-json-k0ti.onrender.com/teachers/${s}`,{openTime:[...u]}).then(l=>{console.log("更新老師資料成功"),W(e,t)}).catch(l=>{console.error("Error adding post:",l)})}).catch(c=>{console.error("Error adding post:",c)})}).catch(o=>{console.error("Error adding post:",o)})}).catch(a=>{console.error("Error adding post:",a)})}function Ie(e){const n=new Date(`2000-01-01 ${e}`).getHours();return n>=0&&n<12?"上午":n>=12&&n<18?"中午":"晚上"}function Me(e){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";let n="";const r=Math.floor(Math.random()*(t.length-10));n+=t.charAt(r);for(let i=1;i<e;i++){const a=Math.floor(Math.random()*t.length);n+=t.charAt(a)}return n}const re=document.querySelectorAll("#change"),Be=document.querySelectorAll("#saveBtn"),le=document.querySelectorAll("#btnBlock"),de=document.querySelectorAll("#date"),ie=document.querySelectorAll("#time");re.forEach((e,t)=>{e.addEventListener("click",n=>{de[t].toggleAttribute("disabled"),ie[t].toggleAttribute("disabled"),le[t].classList.toggle("hidden"),e.toggleAttribute("disabled")})});Be.forEach((e,t)=>{e.addEventListener("click",n=>{de[t].toggleAttribute("disabled"),ie[t].toggleAttribute("disabled"),le[t].classList.toggle("hidden"),re[t].toggleAttribute("disabled")})});let x=1,C=[],_=0,I=[];const ee=/\/[^/]+\.html/,Ne=ee.test(X)?X.replace(ee,"/course_intro.html"):X+"course_intro.html",Y=document.querySelector("#followList");Y&&fe(Y);document.addEventListener("DOMContentLoaded",async function(){async function e(){try{C=(await p.get(`https://project-code-json-k0ti.onrender.com/users/${b}`)).data.followList,_=Math.ceil(C.length/6);let o="";if(C.length!=0){let s=`https://project-code-json-k0ti.onrender.com/courses?_expand=teacher&_page=${x}&_limit=6`;C.forEach(u=>{s+=`&id=${u}`}),I=(await p.get(`${s}`)).data,console.log("追蹤的課程資料",I),I.forEach(u=>{o+=`<div class="col"><div class="card teacher-card swiper-slide h-100"><button
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
  </div></div>`}),Y.innerHTML=o,t(),n(),r()}else o='<p class="text-center fs-5">目前沒有追蹤任何課程</p>',Y.innerHTML=o,t()}catch(a){console.log("錯誤",a)}}e();function t(){const a=document.querySelector(".followPagination");let o="";if(_){const s=`<li class="page-item prevButton ${x==1?"disabled":""}"><a class="page-link" href="#" aria-label="Previous"><i class="fa-solid fa-angle-left"></i></a></li>`;o+=s;for(let u=1;u<=_;u++){let d=`<li class="page-item ${u===x?"active":""} pageButton">
                          <a class="page-link" href="#">
                            ${u}
                          </a>
                        </li>`;o+=d}const c=`<li class="page-item nextButton ${x==_?"disabled":""}">
                      <a class="page-link" href="#" aria-label="Next">
                        <i class="fa-solid fa-angle-right"></i>
                      </a>
                    </li>`;o+=c}a.innerHTML=o}function n(){const a=document.querySelector(".prevButton"),o=document.querySelector(".nextButton");let s=document.querySelectorAll(".pageButton");a.addEventListener("click",function(){console.log("點擊上一頁成功"),x>1&&(x--,t(),e())}),o.addEventListener("click",function(){console.log("點擊下一頁成功"),_>x&&(x++,t(),e())}),s.forEach(c=>{c.addEventListener("click",()=>{x=Number(c.innerText),e(),t()})})}function r(){document.querySelectorAll(".following").forEach(o=>{o.addEventListener("click",s=>{i(s)})})}async function i(a){let o=a.target.dataset.buttonid;console.log("buttonId",o);let s=C.filter(c=>c!=o);Swal.fire({title:"確定要取消追蹤?",showDenyButton:!0,confirmButtonColor:"#115BC9",confirmButtonText:"取消追蹤",denyButtonText:"我再想想"}).then(c=>{c.isConfirmed&&(Swal.fire({position:"center",icon:"success",title:"已取消追蹤",showConfirmButton:!1,timer:1500}),p.patch(`https://project-code-json-k0ti.onrender.com/users/${b}`,{followList:s}).then(async u=>{await e(),console.log(I),I.length==0&&(x--,e())}))})}});const ue=document.querySelectorAll(".js-couponPageArrow");let z=[],M=1,K;V();async function Pe(){let e=new Date().getTime();for(const t of z)if(new Date(t.dueDate).getTime()<e)try{await p.patch(`https://project-code-json-k0ti.onrender.com/myCoupons/${t.id}`,{canUse:!1},{headers:{"Content-Type":"application/json"}}),V()}catch(n){console.log("checkDueDate",n)}else me(),He()}async function V(){try{const e=`https://project-code-json-k0ti.onrender.com/myCoupons?_expand=coupon&canUse=true&userId=${b}&_page=${M}&_limit=6_sort=dueDate&_order=asc`,t=await p.get(e);let n=parseInt(t.headers.get("X-Total-Count"));for(let r of t.data){const{data:i}=await p.get(`https://project-code-json-k0ti.onrender.com/coupons/${r.couponId}?_expand=teacher`);r.coupon=i}t.data.length?(z=t.data,K=Math.ceil(n/6),Pe()):me()}catch(e){console.log("getCoupons",e)}}function me(){const e=/^(\d{4}-\d{2}-\d{2}).*/,t=document.querySelector(".js-couponGroup");let n="";z.length?z.forEach(r=>{n+=`
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
            </li>`}):n+='<p class="text-center fs-5">目前沒有優惠券<p>',t.innerHTML=n}function He(){ue.forEach((e,t,n)=>{K>1?(e.classList.remove("d-none"),M===1?n[0].classList.add("disabled"):n[0].classList.remove("disabled"),M===K?n[1].classList.add("disabled"):n[1].classList.remove("disabled")):e.classList.add("d-none")})}ue.forEach((e,t)=>{e.addEventListener("click",n=>{n.preventDefault(),n.target.closest(".js-couponPageArrow").classList.contains("disabled")||(t===1?M++:Math.max(1,M--),V())})});
