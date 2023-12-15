import{a as p,u as L,g as U,r as A}from"./backtotop-f8562c14.js";let r=[];const W=Swal.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:2e3}),v=document.querySelector("#coupon"),P=document.querySelector(".js-useCouponBtn");let h=[],y=[];const _={myCouponId:"",originPrice:"",courseId:"",type:"",title:"",discount:0,minSpending:"",discountCourseNum:"",discountPrice:0};function I(){r=Array.from({length:u.length+1},()=>_)}v.addEventListener("keydown",t=>{t.key==="Enter"&&(t.preventDefault(),q())});P.addEventListener("click",t=>{t.preventDefault(),q()});async function Q(){try{for(const t of r)if(t.myCouponId){const e=`https://project-code-json-k0ti.onrender.com/myCoupons/${t.myCouponId}`,n={canUse:!1};await p.patch(e,n,C)}}catch(t){console.log("patchMyCoupon",t)}}async function R(){try{const t=`https://project-code-json-k0ti.onrender.com/myCoupons?_expand=coupon&userId=${L}&_sort=couponId&_order=asc`,{data:e}=await p.get(t);h=e,V()}catch(t){console.log("getCoupon",t)}}async function V(){const t=[];h.forEach(e=>{let n=new Date().getTime();new Date(e.dueDate).getTime()<n&&(e.canUse=!1,t.push(e))}),t.length>0&&(await Promise.all(t.map(async e=>{try{await p.patch(`https://project-code-json-k0ti.onrender.com/myCoupons/${e.id}`,{canUse:!1},C)}catch(n){console.log("checkDueDate",n)}})),h=h.filter(e=>e.canUse===!0)),B()}function B(){y=[],h.forEach(t=>{if(t.coupon.type==="allCourse"){const{courseId:e,type:n,title:o,minSpending:s,discountCourseNum:c,discount:i}=t.coupon,a={myCouponId:t.id,originPrice:null,courseId:e,type:n,title:o,discount:i,minSpending:s,discountCourseNum:c};y.push(a)}}),u.forEach(t=>{h.forEach(e=>{if(e.coupon.type==="course"&&t.courseId==e.coupon.courseId){const{courseId:n,type:o,title:s,discount:c,minSpending:i,discountCourseNum:a}=e.coupon,l=t.course.price;if(n==t.courseId){const d={myCouponId:e.id,originPrice:l,courseId:n,type:o,title:s,discount:c,minSpending:i,discountCourseNum:a};y.push(d)}}})}),X()}function q(){const t=y.filter(e=>e.title===v.value)[0];if(t!==void 0){const e=document.querySelector("#OriginalPrice").textContent.replace(",",""),n=document.querySelectorAll("li[data-course]"),{minSpending:o,discountCourseNum:s,courseId:c}=t;if(W.fire({icon:"success",title:"已使用優惠券"}),o<=e)if(t.type==="course")n.forEach((i,a)=>{const l=i.dataset.course;if(c==l){const d=i.querySelector("input[name='count']");s===null||s<=d.value?r[a].myCouponId==""?(v.value="",T(a,t)):Swal.fire({icon:"error",title:"每個課程只能使用一張優惠券"}):Swal.fire({icon:"error",title:"未符合使用條件",text:`須購買指定課程達 ${s} 堂課`})}});else{const i=r.length-1;r[i].myCouponId==""?(v.value="",T(i,t)):Swal.fire({icon:"error",title:"每個課程只能使用一張優惠券"})}else Swal.fire({icon:"error",title:"未符合使用條件",text:`折價前的消費總額須達 NT$ ${o}`})}else Swal.fire({icon:"error",title:"沒有匹配的優惠券"})}function z(t){x(t),g()}function F(t,e){const n=document.querySelector("#OriginalPrice").textContent.replace(",","");r.forEach((o,s)=>{const{minSpending:c,discountCourseNum:i,courseId:a,myCouponId:l}=o;c<=n?a==t?i===null||i<=e?o.discountPrice=j(o):x(s):s==r.length-1&&l!==""?o.discountPrice=j(o):x(s):x(s)}),g()}function x(t){r[t].type="",r[t].originPrice=0,r[t].discountPrice=0,r[t].title="",r[t].myCouponId="",r[t].courseId="",r[t].discount="",r[t].minSpending=0,r[t].discountCourseNum=0}function T(t,e){r[t]={...e,discountPrice:j(e)},g()}function j(t){const{type:e,originPrice:n,discount:o,discountCourseNum:s}=t;if(e==="course")return Math.round(Number(n)*(1-Number(o))*Number(s));{const c=document.querySelector("#OriginalPrice").textContent.replace(",","");return Math.round(Number(c)*(1-Number(o)))}}function E(t){r=r.filter(e=>e.courseId!=t)}const O=document.querySelector(".js-cartList"),G=document.querySelector(".js-nextCartList");function N(){let t="";u.length?u.forEach((e,n)=>{var o,s,c,i,a,l,d,m;t+=`
          <li data-course="${e.courseId}">
            <div
              class="shadow rounded-2 p-4 pb-md-4 pt-md-6 px-md-8 mb-1 mb-md-2"
            >
              <h3 class="fs-5 fs-md-4 fw-bold mb-4 mb-md-6 text-secondary2">
                ${(o=e.course)==null?void 0:o.name}
              </h3>
              <div class="row justify-content-between">
                <!-- 老師區塊 -->
                <div
                  class="col-4 col-sm-3 d-flex flex-column align-items-start"
                >
                  <div class="text-center">
                    <div>
                      <img
                        class="img-fluid rounded-circle mb-2"
                        src="${(c=(s=e.course)==null?void 0:s.teacher)==null?void 0:c.avatar}"
                        alt="teacher"
                        width="90px"
                        height="90px"
                      />
                    </div>
                    <h5 class="fs-7 fs-md-6">
                      ${(a=(i=e.course)==null?void 0:i.teacher)==null?void 0:a.name}
                    </h5>
                  </div>
                </div>
  
                <div class="col-8 col-sm-9 order">
                  <!-- 堂數 -->
                  <form class="mb-3 mb-md-5" action="#">
                    <div
                      class="d-flex flex-wrap align-items-center column-gap-8 row-gap-3"
                    >
                      <label for="hour${n}"
                        >單堂時長 (分鐘)
                        <select
                          class="form-select border-primary fw-bold mt-2 py-1 py-sm-2 w-150px"
                          name="hour"
                          id="hour${n}"
                          disabled
                        >
                          <option value="${(l=e.course)==null?void 0:l.duration}" selected>
                            ${(d=e.course)==null?void 0:d.duration}
                          </option>
                        </select>
                      </label>
  
                      <label class="w-150px" for="count${n}"
                        >堂數 (堂)
                        <div class="input-group w-fit mt-2">
                          <button
                            type="button"
                            class="btn btn-outline-primary rounded-start-2 border-2 py-0 fw-bold fs-4 w-45px js-decrement"
                          >
                            -
                          </button>
                          <input
                            class="form-control border-primary fw-bold text-center py-1 py-sm-2"
                            type="text"
                            name="count"
                            id="count${n}"
                            value="${e.quantity}"
                            inputmode="numeric"
                          />
                          <button
                            type="button"
                            class="btn btn-outline-primary rounded-end-2 border-2 py-0 fw-bold fs-4 w-45px js-increment"
                          >
                            +
                          </button>
                        </div>
                      </label>
                    </div>
                  </form>
  
                  <!-- 價格 -->
                  <div class="d-flex justify-content-between mb-3">
                    <div class="d-flex gap-3">
                      <h4 class="fs-5 fs-md-4 fw-bold">
                        NT$
                        <span class="OriginalCoursePrice">
                        ${(m=e.course)==null?void 0:m.price.toString().replace(w,",")}
                        </span>
                      </h4>
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-end gap-4">
                  <p class="fs-sm fs-md-7">
                    預約截止日
                    <time datetime="${e.dueDate}">
                    ${e.dueDate}</time
                    >
                  </p>
                  <a
                    class="text-decoration-underline js-nextPurchaseBtn"
                    role="button"
                    href="#"
                    >下次再買</a
                  >
                  <a
                    class="text-decoration-underline delete-order"
                    role="button"
                    href="#"
                    >刪除</a
                  >
                </div>
              </div>
            </div>
          <div class="d-flex align-items-center js-usedCoupon"></div>
        </li>`}):t=`
      <div class="d-flex flex-column align-items-center text-center h-100 px-10 pt-10 mb-4">
        <p class="fs-4 mb-10">購物車內沒有商品</p>
        <a href="./course.html"
          class="btn btn-secondary2 rounded-2 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
        >
          繼續選購
        </a>
      </div>
      `,O.innerHTML=t,J()}function J(){const t=document.querySelector("#payWay");u.length?(t.querySelectorAll("button").forEach(e=>{e.disabled=!1}),P.disabled=!1):(t.querySelectorAll("button").forEach(e=>{e.disabled=!0}),P.disabled=!0)}function k(){let t="";f.length?f.forEach((e,n)=>{var o,s,c,i,a,l,d,m;t+=`
      <li data-course="${e.courseId}">
              <div
                class="shadow rounded-2 p-4 pb-md-4 pt-md-6 px-md-8 mb-1 mb-md-2"
              >
                <h3 class="fs-5 fs-md-4 fw-bold mb-4 mb-md-6 text-secondary2">
                  ${(o=e.course)==null?void 0:o.name}
                </h3>
                <div class="row justify-content-between">
                  <!-- 老師區塊 -->
                  <div
                    class="col-4 col-sm-3 d-flex flex-column align-items-start"
                  >
                    <div class="text-center">
                      <div>
                        <img
                          class="img-fluid rounded-circle mb-2"
                          src="${(c=(s=e.course)==null?void 0:s.teacher)==null?void 0:c.avatar}"
                          alt="teacher"
                          width="90px"
                          height="90px"
                        />
                      </div>
                      <h5 class="fs-7 fs-md-6">${(a=(i=e.course)==null?void 0:i.teacher)==null?void 0:a.name}</h5>
                    </div>
                  </div>
  
                  <div class="col-8 col-sm-9">
                    <!-- 堂數 -->
                    <form class="mb-3 mb-md-5" action="#">
                      <div
                        class="d-flex flex-wrap align-items-center column-gap-8 row-gap-3"
                      >
                        <label for="nextHour${n}"
                          >單堂時長 (分鐘)
                          <select
                            class="form-select border-primary fw-bold mt-2 py-1 py-sm-2 w-150px"
                            name="nextHour"
                            id="nextHour${n}"
                            disabled
                          >
                            <option value="${(l=e.course)==null?void 0:l.duration}" selected>${(d=e.course)==null?void 0:d.duration}</option>
                          </select>
                        </label>
  
                        <label class="w-150px" for="nextCount${n}"
                          >堂數 (堂)
                          <div class="w-fit mt-2">
                            <input
                              class="form-control border-primary fw-bold text-center py-1 py-sm-2"
                              type="text"
                              name="nextCount"
                              id="nextCount${n}"
                              value="${e.quantity}"
                              inputmode="numeric"
                              pattern="[0-9]"
                              disabled
                            />
                          </div>
                        </label>
                      </div>
                    </form>
  
                    <!-- 價格 -->
                    <div class="d-flex justify-content-between mb-3">
                      <div class="d-flex gap-3">
                        <h4 class="fs-5 fs-md-4 fw-bold">
                          NT$ <span class="OriginalCoursePrice">${(m=e.course)==null?void 0:m.price.toString().replace(w,",")}</span>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-end gap-4">
                    <p class="fs-sm fs-md-7">
                      預約截止日
                      <time datetime="${e.dueDate}">${e.dueDate}</time>
                    </p>
                    <a class="text-decoration-underline js-mainPurchaseBtn" role="button" href="#">移至購物車</a>
                    <a class="text-decoration-underline delete-order" role="button" href="#"
                      >刪除</a
                    >
                  </div>
                </div>
              </div>
            </li>`}):t+=`<div class="d-flex flex-column align-items-center text-center h-100 px-10 pt-10 mb-4">
      <p class="fs-4 mb-10">沒有商品</p>
    </div>`,G.innerHTML=t}function K(){const t=`
      <div class="d-flex justify-content-center py-10">
        <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>`;O.innerHTML=t}function X(){const t=document.querySelector("#couponOption");let e="";y.length&&y.forEach(n=>{e+=`<option value="${n.title}"></option>`}),t.innerHTML=e}function g(){Z(),Y(),ee()}function Y(){document.querySelector("#WebDiscount").innerHTML=r[r.length-1].discountPrice}function Z(){const t=r.reduce((e,n,o)=>o<r.length-1?e+n.discountPrice:e,0);document.querySelector("#CourseDiscount").innerHTML=t}function ee(){document.querySelectorAll(".js-usedCoupon").forEach((e,n)=>{r[n].myCouponId===""?e.innerHTML="":e.innerHTML=`<button type="button" class="btn btn-close fs-sm js-delCoupon" data-index="${n}"></button>
        <p>
          已套用 <span class="fw-bold text-secondary2">${r[n].title}</span
          ><i class="fa-solid fa-arrow-right mx-1"></i
          ><span class="fw-bold text-primary">折價 <span class="js-usedCouponDiscount">${r[n].discountPrice}</span> 元</span>
        </p>`})}function te(t){const e=t.getAttribute("data-bs-target"),n=document.querySelector(e),o=document.querySelector("#TotalPrice").innerText;let s=new Date;s.setDate(s.getDate()+5),s=s.toISOString(),n.querySelector(".js-paymentPrice").innerHTML=`NT$ ${o}`,n.querySelector(".js-dueDate").innerHTML=`${M.exec(s)[1]} 23:59:59`}const M=/^(\d{4}-\d{2}-\d{2}).*/,w=/\B(?=(?:\d{3})+(?!\d))/g,ne=document.querySelector("#purchaseTabContent");document.querySelector("#mainPurchase");const C={headers:{"Content-Type":"application/json"}};let u=[],f=[];oe();async function oe(){K(),await se(),N(),u.length&&(b(),I(),R()),k()}async function se(){try{const t=`https://project-code-json-k0ti.onrender.com/myCarts?userId=${L}&status=purchase&_expand=course`,{data:e}=await p.get(t);if(e!==void 0){const n=e.map(s=>`https://project-code-json-k0ti.onrender.com/courses/${s.courseId}?_expand=teacher`),o=await Promise.all(n.map(s=>p.get(s)));e.forEach((s,c)=>{s.course=o[c].data}),re(e)}}catch(t){console.log("getMyCart",t)}}function re(t){let e=new Date;e.setDate(e.getDate()+365),e.setHours(23,59,59,999),e=M.exec(e.toISOString())[1],t.forEach(n=>{n.dueDate=e}),u=t.filter(n=>!n.isNextPurchase),f=t.filter(n=>n.isNextPurchase)}document.addEventListener("DOMContentLoaded",()=>{ne.addEventListener("click",t=>{const e=t.target,n=e.closest("li");if(n){t.preventDefault();const o=n.dataset.course,s=n.querySelector("input[name='count']");if(e.classList.contains("delete-order"))ce(o);else if(e.classList.contains("js-nextPurchaseBtn"))ae(o);else if(e.classList.contains("js-mainPurchaseBtn"))le(o);else if(e.classList.contains("js-increment"))pe(o,s);else if(e.classList.contains("js-decrement"))fe(o,s);else if(e.classList.contains("js-delCoupon")){const c=e.dataset.index;z(c)}}})});function ce(t){Swal.fire({title:"確定要刪除嗎?",showDenyButton:!0,confirmButtonColor:"#115BC9",confirmButtonText:"確定刪除",denyButtonText:"我再想想"}).then(async e=>{e.isConfirmed&&(Swal.fire({position:"center",icon:"success",title:"已刪除課程",showConfirmButton:!1,timer:1500}),ie(t),E(t),I(),g(),b())})}async function ie(t){try{let e;u=u.filter(n=>(n.courseId==t&&(e=n.id),n.courseId!=t)),f=f.filter(n=>(n.courseId==t&&(e=n.id),n.courseId!=t)),S(),await p.delete(`https://project-code-json-k0ti.onrender.com/myCarts/${e}`)}catch{console.log("刪除會報錯，但購物車能正常刪除")}}async function ae(t){(await Swal.fire({title:"確定要下次再買該課程嗎?",showDenyButton:!0,confirmButtonColor:"#115BC9",confirmButtonText:"確定",denyButtonText:"我再想想"})).isConfirmed&&(Swal.fire({position:"center",icon:"success",title:"已移至下次再買",showConfirmButton:!1,timer:1500}),ue(t),E(t),I(),g(),b())}async function ue(t){try{let e;u=u.filter(n=>(n.courseId==t&&(e=n.id,f.push(n)),n.courseId!=t)),S(),await p.patch(`https://project-code-json-k0ti.onrender.com/myCarts/${e}`,{isNextPurchase:!0},C)}catch(e){console.log("toNextPurchase",e)}}function le(t){Swal.fire({title:"確定將該課程移至購物車嗎?",showDenyButton:!0,confirmButtonColor:"#115BC9",confirmButtonText:"確定",denyButtonText:"我再想想"}).then(e=>{e.isConfirmed&&(Swal.fire({position:"center",icon:"success",title:"已移置購買項目",showConfirmButton:!1,timer:1500}),de(t),I(),g(),b())})}async function de(t){try{let e;f=f.filter(n=>(n.courseId==t&&(e=n.id,u.push(n)),n.courseId!=t)),S(),await p.patch(`https://project-code-json-k0ti.onrender.com/myCarts/${e}`,{isNextPurchase:!1},C)}catch(e){console.log("toMainPurchase",e)}}async function S(){N(),u.length&&B(),k(),await U(),A()}function pe(t,e){$(e).val(function(n,o){return parseInt(o)+1}),D(t,e.value)}function fe(t,e){$(e).val(function(n,o){return parseInt(o)===1?1:parseInt(o)-1}),D(t,e.value)}document.addEventListener("change",t=>{t.target.name==="count"&&H(t.target)});document.addEventListener("keydown",t=>{t.target.name==="count"&&t.key==="Enter"&&(t.preventDefault(),H(t.target))});function H(t){const e=t.closest("[data-course]").dataset.course;t.value.match(/[^0-9]|^0$/g)&&(t.value=t.defaultValue),D(e,t.value)}function D(t,e){me(t,e),F(t,e),b()}function me(t,e){let n;u.forEach(o=>{o.courseId==t&&(n=o.id,o.quantity=e)}),he(n,e)}async function he(t,e){try{const n=`https://project-code-json-k0ti.onrender.com/myCarts/${t}`,o={quantity:e};await p.patch(n,o,C)}catch{}}function b(){const t=$(".order");let e=0;t.each(function(){const i=$(this),a=parseInt(i.find('[name="count"]').val()),l=i.find(".OriginalCoursePrice").text().replace(",",""),d=parseInt(l),m=a*d;e+=m}),$("#OriginalPrice").text(e.toString().replace(w,","));const o=parseInt($("#CourseDiscount").text().replace(",","")),s=parseInt($("#WebDiscount").text().replace(",","")),c=e-o-s;$("#TotalPrice").text(c.toString().replace(w,","))}const ye=document.querySelectorAll(".js-paymentInfoBtn"),ge=document.querySelectorAll(".js-payBtn");ye.forEach(t=>{t.addEventListener("click",e=>te(e.target))});ge.forEach(t=>{t.addEventListener("click",async e=>{e.preventDefault(),await Q(),await Ce(),location.href="cart2.html"})});async function Ce(){try{const t=u.map(e=>`https://project-code-json-k0ti.onrender.com/myCarts/${e.id}`);await Promise.all(t.map((e,n)=>{const o={status:"appointment",dueDate:u[n].dueDate};return p.patch(e,o,C)}))}catch(t){console.log("patchMyCarts",t)}}
