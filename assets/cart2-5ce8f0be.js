import{u as N,a as m}from"./backtotop-9d7c375e.js";let a=[];const h=document.querySelector(".js-cartList"),q=document.querySelector(".js-confirmBtn"),g={headers:{"Content-Type":"application/json"}};let p,u,r,f=[],d=[],v;C();async function C(){try{await Promise.all([I(),T()]),S(),j()}catch(e){console.log(e)}}async function I(){try{const e=`https://project-code-json-k0ti.onrender.com/myCarts?userId=${N}&status=appointment&_expand=course`,{data:t}=await m.get(e);if(t!==void 0){const n=t.map(s=>`https://project-code-json-k0ti.onrender.com/courses/${s.courseId}?_expand=teacher`),o=await Promise.all(n.map(s=>m.get(s)));t.forEach((s,i)=>{s.course=o[i].data}),D(t)}}catch(e){console.log("getPurchasedCart",e)}}async function T(){try{const t="https://project-code-json-k0ti.onrender.com/user_courses?userId=1",{data:n}=await m.get(t);f=n[0].attendTime,d=n[0].purchased,v=n[0].id,console.log(n)}catch(e){console.log(e)}}function D(e){a=e.map(t=>{var i,c,l,y;console.log(d);const n=d.find(w=>w.courseId==t.courseId),o=n?n.total-n.used:0;return{courseId:t.courseId,courseName:t.course.name,teacherName:(c=(i=t.course)==null?void 0:i.teacher)==null?void 0:c.name,teacherImg:(y=(l=t.course)==null?void 0:l.teacher)==null?void 0:y.avatar,quantity:t.quantity,myCartId:t.id,appointmentNum:1,appointment:[],dueDate:t.dueDate,notAppointedNum:o}}),console.log(a)}function S(){let e="";a.forEach((t,n)=>{e+=`
    <li class="shadow rounded-2 p-4 pb-md-4 pt-md-6 px-md-8 mb-1 mb-md-2" data-cart="${n}">
    <h3 class="fs-5 fs-md-4 fw-bold mb-4 mb-md-6 text-secondary2">
    ${t.courseName}
    </h3>
    <div class="row justify-content-between">
      <!-- 左 -->
      <div class="col-4 col-sm-3 d-flex flex-column align-items-start">
        <div class="text-center">
          <div>
            <div>
              <img
                class="img-fluid rounded-circle mb-2"
                src="${t.teacherImg}"
                alt="teacher"
                width="90px"
                height="90px"
              />
            </div>
            <h5 class="fs-7 fs-md-6 mb-2">${t.teacherName}</h5>
          </div>
          <ul>
            <li class="fs-sm fs-sm-7" title="已購買但尚未預約">
              先前未預約：<span class="text-secondary2">${t.notAppointedNum}</span> 堂
            </li>
          </ul>
        </div>
      </div>
      <!-- 右 -->
      <div class="col-8 col-sm-9">
        <p class="fs-7 fs-md-6 text-primary fw-bold mb-2">
          預約時間：
        </p>
        <div class="mb-2">
          <button type="button" class="btn btn-primary text-white btn-sm me-1 btn-addAppointment" ${t.quantity==1?"disabled":""}>增加預約</button>
          <button type="button" class="btn btn-primary text-white btn-sm btn-reduceAppointment" disabled>減少預約</button>
        </div>
        <ul class="js-appointmentList">
          <li class="d-flex flex-wrap align-items-center column-gap-3 row-gap-2 mb-3 mb-md-5">
              <p class="fw-bold w-150px">第 1 堂 (50 分鐘)</p>
              <div class="d-flex gap-2 w-300px">
                  <input
                  class="form-control border-primary cursor-pointer fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-md-4 js-appointment"
                  type="text"
                  name="appointmentDate"
                  placeholder="日期"
                  value=""
                  autocomplete="off"
                  required
                  />
                  <select
                  class="form-select border-primary fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-md-4 js-appointment"
                  name="appointmentTime"
                  required
                  >
                  <option value="" disabled selected hidden>時間</option>
                  </select>
              </div>
              <p class="fs-sm fs-md-7"
                  ><span class="text-danger">請至少預約一堂</span>，剩餘堂數可在會員中心預約
              </p>
          </li>
        </ul>
        <div class="d-flex justify-content-end align-items-center gap-4 mt-auto">
          <p class="fs-sm fs-md-7 js-remainNum">剩餘 ${t.quantity-t.appointmentNum} 堂</p>
          <p class="fs-sm fs-md-7">
          預約截止日 <time datetime="${t.dueDate}">${t.dueDate}</time>
          </p>
        </div>
      </div>
    </div>
  </li>`}),h.innerHTML=e}h.addEventListener("click",e=>{p=e.target.closest("[data-cart]"),p&&(u=p.querySelector(".js-appointmentList"),r=p.dataset.cart),e.target.classList.contains("btn-reduceAppointment")?(a[r].appointmentNum--,b(),x(),B()):e.target.classList.contains("btn-addAppointment")&&(a[r].appointmentNum++,b(),x(),A(),j())});function b(){const e=p.querySelector(".btn-addAppointment"),t=p.querySelector(".btn-reduceAppointment");e.disabled=!1,t.disabled=!1,a[r].appointmentNum==a[r].quantity&&(e.disabled=!0),a[r].appointmentNum==1&&(t.disabled=!0)}function A(){const t=`
    <li class="d-flex flex-wrap align-items-center column-gap-3 row-gap-2 mb-3 mb-md-5">
        <p class="fw-bold w-150px">第 ${a[r].appointmentNum} 堂 (50 分鐘)</p>
        <div class="d-flex gap-2 w-300px">
        <input
            class="form-control border-primary cursor-pointer fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-md-4 js-appointment"
            type="text"
            name="appointmentDate"
            value=""
            placeholder="日期"
            autocomplete="off"
            required
        />
        <select
            class="form-select border-primary fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-md-4 js-appointment"
            name="appointmentTime" required"
        >
            <option value="" disabled selected hidden>時間</option>
        </select>
        </div>
    </li>`;u.insertAdjacentHTML("beforeend",t)}function B(){const e=u.querySelectorAll("li"),t=e.length;e[t-1].remove()}function x(){const e=u.nextElementSibling.querySelector(".js-remainNum");e.innerText=`剩餘 ${a[r].quantity-a[r].appointmentNum} 堂`}function j(){$.datepicker.setDefaults($.datepicker.regional["zh-TW"]),$(function(){$("[name='appointmentDate']").datepicker({minDate:0,maxDate:"+1M +10D",formatDate:"yy-mm-dd",onSelect:async function(e){this.setAttribute("value",e);const t=this.closest("[data-cart]").dataset.cart,{courseId:n}=a[t],o=await L(n,e),s=this.nextElementSibling;k(s,o)}})})}async function L(e,t){try{const n=`https://project-code-json-k0ti.onrender.com/courses/${e}?_expand=teacher`,{data:o}=await m.get(n),s=o.teacher.openTime.find(c=>c.date===t.slice(-5));return s.time.filter(c=>!s.useTime.includes(c))}catch{}}function k(e,t){let n=`
  <option value="" disabled="" selected="" hidden="">${t!==void 0?"時間":"無預約時間"}</option>`;t!==void 0&&(n+=t.map(o=>`<option value="${o}">${o}</option>`).join("")),e.innerHTML=n}q.addEventListener("click",async()=>{try{if((await Swal.fire({title:"確定完成預約嗎?",text:"之後可至會員中心修改預約時間或預約剩餘堂數",showDenyButton:!0,confirmButtonColor:"#115BC9",confirmButtonText:"確認",denyButtonText:"我再想想"})).isConfirmed){const t=h.querySelectorAll(".js-appointment");let n=!1;t.forEach(o=>{o.value===""&&(n=!0)}),n?Swal.fire({title:"預約欄位請勿空白",text:"請至少預約一堂，沒有要預約的堂數可先刪除",confirmButtonColor:"#115BC9",confirmButtonText:"確認"}):(console.log(a),E(),M(),await Swal.fire({icon:"success",title:"預約成功！",text:"已發送預約給教師，需等待教師進行確認，如教師拒絕或是未在24小時內確認，系統將系統將自動歸還自動歸還課堂數給您。",showConfirmButton:!0,confirmButtonColor:"#115BC9",confirmButtonText:"確認"}),location.href="cart3.html")}}catch{}});async function E(){try{const e=a.map(n=>`https://project-code-json-k0ti.onrender.com/myCarts/${n.myCartId}`),t={status:"finish"};await Promise.all(e.map(n=>m.patch(n,t,g)))}catch{}}function M(){document.querySelectorAll(".js-appointmentList").forEach((t,n)=>{t.querySelectorAll("li").forEach(s=>{const i=s.querySelector("[name='appointmentDate']"),c=s.querySelector("[name='appointmentTime']"),l={date:i.value,time:c.value};a[n].appointment.push(l)})}),sessionStorage.setItem("appointment",JSON.stringify(a)),P()}async function P(){try{a.forEach(n=>{n.appointment.forEach(s=>{const i={uid:H(4),courseId:Number(n.courseId),date:s.date,time:s.time,isCheck:!1};f.push(i)});const o=d.find(s=>s.courseId==n.courseId);o?(o.total+=Number(n.quantity),o.used+=Number(n.appointmentNum)):d.push({courseId:Number(n.courseId),total:Number(n.quantity),used:Number(n.appointmentNum)})});const e=`https://project-code-json-k0ti.onrender.com/user_courses/${v}`,t={purchased:d,attendTime:f};await m.patch(e,t,g)}catch{}}function H(e){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";let n="";const o=Math.floor(Math.random()*(t.length-10));n+=t.charAt(o);for(let s=1;s<e;s++){const i=Math.floor(Math.random()*t.length);n+=t.charAt(i)}return n}
