import{a as h,u as b,c as X,i as pe}from"./backtotop-61d0d527.js";import"./openTime-f6403d24.js";import{h as fe}from"./startCourse-a0e3af17.js";let I=[];const ge=document.querySelector("#userName"),be=document.querySelector("#userRole"),$e=document.querySelector("#userImg"),ve=document.querySelector("#PreviousWeek"),ye=document.querySelector("#NextWeek"),ae=document.querySelector("#courseTeacherName"),oe=document.querySelector("#courseName"),ne=document.querySelector("#dateTime");function xe(){h.get(`https://project-code-json-k0ti.onrender.com/user_courses?_expand=user&userId=${b.toString()}`).then(function(e){I=e.data[0],$e.setAttribute("src",I.user.avatar),ge.textContent=I.user.name,be.textContent=I.user.role,V()})}function V(){document.querySelectorAll(".calendar-time").forEach(d=>{let a=d.getAttribute("data-num"),o=c(a),n="";if(o.length!==0)for(let s=0;s<o.length;s++)n+=`<li class="c2"><a href=''
                data-bs-toggle="modal"
                data-bs-target="#calendarModal"
                data-course-id="${o[s].courseId}"
                id="viewCourse">
                ${o[s].time}
                </a></li>`;d.innerHTML=n}),document.querySelectorAll("#viewCourse").forEach(d=>{let a=d.getAttribute("data-course-id");d.addEventListener("click",()=>{r(a)})});function c(d){return I.attendTime.filter(a=>a.date===d)}function r(d){let a=[];h.get(`https://project-code-json-k0ti.onrender.com/courses/${d.toString()}?_expand=teacher`).then(function(o){a=o.data,ae.textContent=a.teacher.name,oe.textContent=a.name,ne.innerHTML=""})}}const we=document.querySelectorAll("#viewCourse");we.forEach(e=>{let t=e.getAttribute("data-course-id");e.addEventListener("click",()=>{ke(t)})});function ke(e){let t=[];h.get(`https://project-code-json-k0ti.onrender.com/courses/${e.toString()}?_expand=teacher`).then(function(c){t=c.data,ae.textContent=t.teacher.name,oe.textContent=t.name,ne.innerHTML=""})}ve.addEventListener("click",()=>{V()});ye.addEventListener("click",()=>{V()});xe();const Te=document.querySelector(".days"),Se=document.querySelector(".current-date"),Le=document.querySelectorAll(".icons span");let F="",x=new Date().getFullYear(),f=new Date().getMonth(),q="";const je=["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],ce=()=>{let t=new Date(x,f,1).getDay(),c=new Date(x,f+1,0).getDate(),r=new Date(x,f,c).getDay(),d=new Date(x,f,0).getDate(),a="";for(let s=t;s>0;s--)a+=`<li class="inactive">${d-s+1}</li>`;for(let s=1;s<=c;s++){let u=s===new Date().getDate()&&f===new Date().getMonth()&&x===new Date().getFullYear()?"active":"",l=`${x}/${f+1}/${String(s).padStart(2,"0")}`;a+=`<li class="${u}" data-day="${l}">${s}</li>`}for(let s=r;s<6;s++)a+=`<li class="inactive">${s-r+1}</li>`;Se.innerText=`${je[f]} ${x}`,Te.innerHTML=a;const o=document.querySelectorAll(".days li"),n=s=>{o.forEach(u=>u.classList.remove("active")),s.classList.add("active")};o.forEach(s=>{s.addEventListener("click",u=>{n(u.currentTarget),F=u.target.getAttribute("data-day"),q||(q=document.querySelector(".book-card").getAttribute("data-courseid")),O(q,F)})})};ce();Le.forEach(e=>{e.addEventListener("click",()=>{f=e.id==="prev"?f-1:f+1,(f<0||f>11)&&(x=e.id==="prev"?x-1:x+1,f=f<0?11:0),ce()})});const De=document.querySelector("#appointment_list"),Ae=document.querySelector("#course-management");let G={},J=[];function K(){h.get(`https://project-code-json-k0ti.onrender.com/user_courses?userId=${b.toString()}`).then(function(e){G=[...e.data[0].purchased],J=[...e.data[0].attendTime],J.forEach(r=>{r.day=r.date,delete r.date}),t(G),c(J);function t(r){let d="";h.get("https://project-code-json-k0ti.onrender.com/courses?_expand=teacher").then(function(a){const o=a.data;r.map(i=>{const m=o.find(v=>i.courseId===v.id);return m?{...i,...m}:i}).forEach(i=>{d+=`<li class="book-card" data-courseId="${i.id}">
                <img src="${i.teacher.avatar}" alt="" />
                <div class="d-flex flex-column">
                  <h4>${i.name}</h4>
                  <p>${i.teacher.name}</p>
                  <div class="d-flex gap-2">
                    <p>未預約: ${i.total-i.used}</p>
                  </div>
                </div>
              </li>`}),De.innerHTML=d;const s=document.querySelectorAll(".book-card"),u=document.querySelector(".book-card");var l=new Date;O(u.getAttribute("data-courseId"),`${l.getFullYear()}/${l.getMonth()+1}/${l.getDate()}`),u.classList.add("active"),s.forEach(i=>{i.addEventListener("click",m=>{s.forEach(v=>{v.classList.remove("active")}),m.currentTarget.classList.add("active"),q=m.currentTarget.getAttribute("data-courseId"),O(q,F)})})}).catch(a=>{console.error(a)})}function c(r){let d="";h.get("https://project-code-json-k0ti.onrender.com/courses?_expand=teacher").then(function(a){const o=a.data,n=r.map(l=>{const i=o.find(m=>l.courseId===m.id);return i?{...l,...i}:l});n.forEach((l,i)=>{if(l.teacher===void 0)return;let m="";l.isCheck?m=`<button
                    type="button"
                    class="btn btn-secondary2 w-100 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
                    id="ready-${l.uid}"
                  >
                    即將上課
                  </button>`:m=`<button
                    type="button"
                    class="btn btn-secondary2 w-100 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
                    id="check-${l.uid}"
                    disabled
                  >
                    等待確認中
                  </button>`,d+=`<li class="course-card shadow w-100 w-xl-75">
                    <div class="d-flex flex-grow-1 p-3 p-sm-4 align-items-center">
                      <div class="course-card-header me-4">
                        <a href="#" class="text-center">
                          <div class="mb-2">
                            <img
                              class="avatar w-120px"
                              src="${l.teacher.avatar}"
                              alt="teacher"
                            />
                          </div>
                          <h3 class="fs-7 fs-md-6 text-secondary2 mb-1">${l.teacher.name}</h3>
                        </a>
                        <!-- link -->
                      </div>
                      <div class="flex-grow-1 px-4 px-lg-8">
                        <!-- 課程名稱 -->
                        <div
                          class="d-flex flex-md-row flex-column justify-content-md-between mb-md-0 mb-2"
                        >
                          <h2 class="fs-6 fs-sm-5 fs-md-4 line-ellipsis mb-2">
                          ${l.name}
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
                                class="form-control border-light cursor-pointer jq-appointmentDate${i} ${l.uid}"
                                type="text"
                                name="accountDate1-1"
                                placeholder="日期"
                                value="${l.day}"
                                autocomplete="off"
                                data-courseId="${l.id}"
                                data-uid="${l.uid}"
                                id="date"
                                disabled
                                required
                              />
                            </div>
                    
                            <div class="w-150px">
                              <select
                                class="form-select border border-light ${l.uid}"
                                id="time"
                                disabled
                              >
                                <option selected>${l.time}</option>
                              </select>
                            </div>
                            <button
                              type="button"
                              class="btn text-primary"
                              data-course="${l.uid}"
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
                        data-course="${l.uid}"
                        data-courseId="${l.id}"
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
                    </li>`}),$.datepicker.setDefaults($.datepicker.regional["zh-TW"]),$(function(){$("[class*=jq-appointmentDate]").each(function(l){const i=this;$(i).attr("id","datepicker-"+l),$(i).datepicker({minDate:0,maxDate:"+1M +10D",formatDate:"yy-mm-dd",showButtonPanel:!0,onSelect:function(){let m="";const v=document.querySelectorAll(`.${i.getAttribute("data-uid")}`)[1],p={...[...o][i.getAttribute("data-courseId")-1].teacher.openTime.find(g=>g.date===i.value)};if(console.log(p),Object.keys(p).length===0)return v.innerHTML="",0;p.time.filter(L=>!p.useTime.includes(L)).forEach(L=>{m+=`<option>${L}</option>`}),v.innerHTML=m}})})}),Ae.innerHTML=d,document.querySelectorAll("#change").forEach(l=>{l.addEventListener("click",i=>{let m=i.currentTarget.getAttribute("data-course"),v=`.${m}`;const w=document.querySelectorAll(v);w.forEach(g=>{g.toggleAttribute("disabled")}),i.currentTarget.classList.add("d-none");let p=document.querySelector(`#ready-${m}`);p||(p=document.querySelector(`#check-${m}`)),p.setAttribute("id",`save-${m}`),p.setAttribute("data-bs-toggle","modal"),p.setAttribute("data-bs-target","#checkModal"),p.removeAttribute("disabled"),p.textContent="儲存",w[0].addEventListener("input",g=>{}),p.addEventListener("click",()=>{const g=n.find(k=>k.uid===m),L=document.querySelector("#checkImg"),S=document.querySelector("#checkTeacherName"),j=document.querySelector("#checkName"),B=document.querySelector("#checkDate"),D=document.querySelector("#checkSubmit");D.setAttribute("data-bs-dismiss","modal"),L.setAttribute("src",`${g.teacher.avatar}`),S.textContent=g.teacher.name,j.textContent=g.name,B.textContent=`${w[0].value} ${w[1].value}`,D.setAttribute("data-uid",`${m}`),D.addEventListener("click",k=>{if(k.preventDefault(),D.getAttribute("data-uid")!==m)return 0;h.get(`https://project-code-json-k0ti.onrender.com/user_courses/${b}`).then(P=>{const A=[...P.data.attendTime];let T=0;const N=A.find((z,he)=>z.uid===m?(T=he,!0):!1);A.splice(T,1),N.date=w[0].value,N.time=w[1].value,N.isCheck=!1,A.push(N),h.patch(`https://project-code-json-k0ti.onrender.com/user_courses/${b}`,{attendTime:[...A]}).then(z=>{Swal.fire({icon:"success",title:"預約成功",showConfirmButton:!1,timer:1500}),K()}).catch(z=>{})})})})})}),document.querySelectorAll("#deleteCourse").forEach(l=>{l.addEventListener("click",i=>{i.preventDefault();const m=i.currentTarget.getAttribute("data-course"),v=i.currentTarget.getAttribute("data-courseId");h.get(`https://project-code-json-k0ti.onrender.com/user_courses/${b}`).then(w=>{const p=[...w.data.attendTime];let g=0;p.find((S,j)=>S.uid===m?(g=j,!0):!1)&&(p.splice(g,1),h.get(`https://project-code-json-k0ti.onrender.com/courses/${v}`).then(S=>{const j=S.data.teacherId,B=document.querySelectorAll(`.${m}`);h.get(`https://project-code-json-k0ti.onrender.com/teachers/${j}`).then(D=>{const k=[...D.data.openTime],P=k.findIndex(T=>T.date===B[0].value),A=k[P].useTime.filter(T=>T!==B[1].value);k[P].useTime=A,h.patch(`https://project-code-json-k0ti.onrender.com/teachers/${j}`,{opentime:[...k]}).then(T=>{}).catch(T=>{})})}),h.patch(`https://project-code-json-k0ti.onrender.com/user_courses/${b}`,{attendTime:[...p]}).then(S=>{Swal.fire({icon:"success",title:"取消預約成功",showConfirmButton:!1,timer:1500}),K()}).catch(S=>{}))})})})}).catch(a=>{})}}).catch(e=>{})}K();const qe=document.querySelector("#morning"),Ee=document.querySelector("#afternoon"),Ce=document.querySelector("#evening");let se="",H="",R="",U="";const _e=document.querySelector("#attendSubmit");let ee=[];_e.addEventListener("click",e=>{Ie(q,F,b,se)});function O(e=document.querySelector(".book-card").getAttribute("data-courseid"),t){if(e!==""&&t!==""&&b!=="")console.log(e,t),h.get(`https://project-code-json-k0ti.onrender.com/courses/${e}?_expand=teacher`).then(function(c){const r=c.data.teacher.openTime.filter(a=>a.date===t);if(r.length>0){let o=function(n){return r[0].useTime.find(s=>s===n)!==void 0};r[0].time.forEach(n=>{switch(Me(n)){case"上午":o(n)?H+=`<li class="btn-time  disable" data-time=${n}>${n}</li>`:H+=`<li class="btn-time" data-time=${n}>${n}</li>`;break;case"中午":o(n)?R+=`<li class="btn-time disable" data-time=${n}>${n}</li>`:R+=`<li class="btn-time" data-time=${n}>${n}</li>`;break;case"晚上":o(n)?U+=`<li class="btn-time disable" data-time=${n} >${n}</li>`:U+=`<li class="btn-time" data-time=${n}>${n}</li>`;break}})}qe.innerHTML=H,H="",Ee.innerHTML=R,R="",Ce.innerHTML=U,U="";const d=document.querySelectorAll(".btn-time");d.forEach(a=>{a.addEventListener("click",o=>{d.forEach(n=>{n.classList.remove("active")}),o.currentTarget.classList.add("active"),se=o.target.getAttribute("data-time")})})});else return}function Ie(e,t,c,r){const d={uid:Be(4),courseId:Number(e),date:t,time:r,isCheck:!1};h.get(`https://project-code-json-k0ti.onrender.com/user_courses/${c}`).then(a=>{ee=[...a.data.attendTime],h.patch(`https://project-code-json-k0ti.onrender.com/user_courses/${c}`,{attendTime:[...ee,d]}).then(o=>{Swal.fire({icon:"success",title:"預約成功",showConfirmButton:!1,timer:1500})}).catch(o=>{}),h.get(`https://project-code-json-k0ti.onrender.com/courses/${d.courseId}`).then(o=>{const n=o.data.teacherId;h.get(`https://project-code-json-k0ti.onrender.com/teachers/${n}`).then(s=>{const u=[...s.data.openTime],l=u.findIndex(i=>i.date===d.date);u[l].useTime.push(d.time),h.patch(`https://project-code-json-k0ti.onrender.com/teachers/${n}`,{openTime:[...u]}).then(i=>{O(e,t)}).catch(i=>{})}).catch(s=>{})}).catch(o=>{})}).catch(a=>{})}function Me(e){const c=new Date(`2000-01-01 ${e}`).getHours();return c>=0&&c<12?"上午":c>=12&&c<18?"中午":"晚上"}function Be(e){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";let c="";const r=Math.floor(Math.random()*(t.length-10));c+=t.charAt(r);for(let d=1;d<e;d++){const a=Math.floor(Math.random()*t.length);c+=t.charAt(a)}return c}const re=document.querySelectorAll("#change"),Pe=document.querySelectorAll("#saveBtn"),le=document.querySelectorAll("#btnBlock"),ie=document.querySelectorAll("#date"),de=document.querySelectorAll("#time");re.forEach((e,t)=>{e.addEventListener("click",c=>{ie[t].toggleAttribute("disabled"),de[t].toggleAttribute("disabled"),le[t].classList.toggle("hidden"),e.toggleAttribute("disabled")})});Pe.forEach((e,t)=>{e.addEventListener("click",c=>{ie[t].toggleAttribute("disabled"),de[t].toggleAttribute("disabled"),le[t].classList.toggle("hidden"),re[t].toggleAttribute("disabled")})});let y=1,E=[],C=0,_=[];const te=/\/[^/]+\.html/,Ne=te.test(X)?X.replace(te,"/course_intro.html"):X+"course_intro.html",W=document.querySelector("#followList");W&&fe(W);document.addEventListener("DOMContentLoaded",async function(){async function e(){try{E=(await h.get(`https://project-code-json-k0ti.onrender.com/users/${b}`)).data.followList,C=Math.ceil(E.length/6);let o="";if(E.length!=0){let n=`https://project-code-json-k0ti.onrender.com/courses?_expand=teacher&_page=${y}&_limit=6`;E.forEach(u=>{n+=`&id=${u}`}),_=(await h.get(`${n}`)).data,console.log("收藏的課程資料",_),_.forEach(u=>{o+=`<div class="col"><div class="card teacher-card swiper-slide h-100"><button
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
        ${pe?"":'data-bs-toggle="modal"'}
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
  </div></div>`}),W.innerHTML=o,t(),c(),r()}else o='<p class="text-center fs-5">目前沒有收藏任何課程</p>',W.innerHTML=o,t()}catch(a){console.log("錯誤",a)}}e();function t(){const a=document.querySelector(".followPagination");let o="";if(C){const n=`<li class="page-item prevButton ${y==1?"disabled":""}"><a class="page-link" href="#" aria-label="Previous"><i class="fa-solid fa-angle-left"></i></a></li>`;o+=n;for(let u=1;u<=C;u++){let l=`<li class="page-item ${u===y?"active":""} pageButton">
                          <a class="page-link" href="#">
                            ${u}
                          </a>
                        </li>`;o+=l}const s=`<li class="page-item nextButton ${y==C?"disabled":""}">
                      <a class="page-link" href="#" aria-label="Next">
                        <i class="fa-solid fa-angle-right"></i>
                      </a>
                    </li>`;o+=s}a.innerHTML=o}function c(){const a=document.querySelector(".prevButton"),o=document.querySelector(".nextButton");let n=document.querySelectorAll(".pageButton");a.addEventListener("click",function(){console.log("點擊上一頁成功"),y>1&&(y--,t(),e())}),o.addEventListener("click",function(){console.log("點擊下一頁成功"),C>y&&(y++,t(),e())}),n.forEach(s=>{s.addEventListener("click",()=>{y=Number(s.innerText),e(),t()})})}function r(){document.querySelectorAll(".following").forEach(o=>{o.addEventListener("click",n=>{d(n)})})}async function d(a){let o=a.target.dataset.buttonid;console.log("buttonId",o);let n=E.filter(s=>s!=o);Swal.fire({title:"確定要取消收藏?",showDenyButton:!0,confirmButtonColor:"#115BC9",confirmButtonText:"取消收藏",denyButtonText:"我再想想"}).then(s=>{s.isConfirmed&&(Swal.fire({position:"center",icon:"success",title:"已取消收藏",showConfirmButton:!1,timer:1500}),h.patch(`https://project-code-json-k0ti.onrender.com/users/${b}`,{followList:n}).then(async u=>{await e(),console.log(_),_.length==0&&(y--,e())}))})}});const ue=document.querySelectorAll(".js-couponPageArrow");let Y=[],M=1,Q;Z();async function He(){let e=new Date().getTime();for(const t of Y)if(new Date(t.dueDate).getTime()<e)try{await h.patch(`https://project-code-json-k0ti.onrender.com/myCoupons/${t.id}`,{canUse:!1},{headers:{"Content-Type":"application/json"}}),Z()}catch(c){console.log("checkDueDate",c)}else me(),Re()}async function Z(){try{const e=`https://project-code-json-k0ti.onrender.com/myCoupons?_expand=coupon&canUse=true&userId=${b}&_page=${M}&_limit=6_sort=dueDate&_order=asc`,t=await h.get(e);if(t.data.length){const c=t.data.map(a=>a.coupon.teacherId===null?`https://project-code-json-k0ti.onrender.com/coupons/${a.couponId}`:`https://project-code-json-k0ti.onrender.com/coupons/${a.couponId}?_expand=teacher`),r=await Promise.all(c.map(a=>h.get(a)));t.data.forEach((a,o)=>{a.coupon=r[o].data}),Y=t.data;const d=parseInt(t.headers.get("X-Total-Count"));Q=Math.ceil(d/6),He()}else me()}catch(e){console.log("getCoupons",e)}}function me(){const e=/^(\d{4}-\d{2}-\d{2}).*/,t=document.querySelector(".js-couponGroup");let c="";Y.length?Y.forEach(r=>{c+=`
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
            </li>`}):c+='<p class="text-center fs-5">目前沒有優惠券<p>',t.innerHTML=c}function Re(){ue.forEach((e,t,c)=>{Q>1?(e.classList.remove("d-none"),M===1?c[0].classList.add("disabled"):c[0].classList.remove("disabled"),M===Q?c[1].classList.add("disabled"):c[1].classList.remove("disabled")):e.classList.add("d-none")})}ue.forEach((e,t)=>{e.addEventListener("click",c=>{c.preventDefault(),c.target.closest(".js-couponPageArrow").classList.contains("disabled")||(t===1?M++:Math.max(1,M--),Z())})});
