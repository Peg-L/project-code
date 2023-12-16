import{a as p,u as q,g as W,r as _}from"./backtotop-407cb22f.js";let r=[];const V=Swal.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:1500}),v=document.querySelector("#coupon"),I=document.querySelector(".js-useCouponBtn");let h=[],y=[];const Q={myCouponId:"",originPrice:"",courseId:"",type:"",title:"",discount:0,minSpending:"",discountCourseNum:"",discountPrice:0};function w(){r=Array.from({length:u.length+1},()=>Q)}v.addEventListener("keydown",t=>{t.key==="Enter"&&(t.preventDefault(),E())});I.addEventListener("click",t=>{t.preventDefault(),E()});async function T(){try{for(const t of r)if(t.myCouponId){const e=`https://project-code-json-k0ti.onrender.com/myCoupons/${t.myCouponId}`,n={canUse:!1};await p.patch(e,n,b)}}catch(t){console.log("patchMyCoupon",t)}}async function R(){try{const t=`https://project-code-json-k0ti.onrender.com/myCoupons?_expand=coupon&userId=${q}&_sort=couponId&_order=asc`,{data:e}=await p.get(t);h=e,z()}catch(t){console.log("getCoupon",t)}}async function z(){const t=[];h.forEach(e=>{let n=new Date().getTime();new Date(e.dueDate).getTime()<n&&(e.canUse=!1,t.push(e))}),t.length>0&&(await Promise.all(t.map(async e=>{try{await p.patch(`https://project-code-json-k0ti.onrender.com/myCoupons/${e.id}`,{canUse:!1},b)}catch(n){console.log("checkDueDate",n)}})),h=h.filter(e=>e.canUse===!0)),N()}function N(){y=[],h.forEach(t=>{if(t.coupon.type==="allCourse"){const{courseId:e,type:n,title:o,minSpending:s,discountCourseNum:c,discount:i}=t.coupon,a={myCouponId:t.id,originPrice:null,courseId:e,type:n,title:o,discount:i,minSpending:s,discountCourseNum:c};y.push(a)}}),u.forEach(t=>{h.forEach(e=>{if(e.coupon.type==="course"&&t.courseId==e.coupon.courseId){const{courseId:n,type:o,title:s,discount:c,minSpending:i,discountCourseNum:a}=e.coupon,l=t.course.price;if(n==t.courseId){const d={myCouponId:e.id,originPrice:l,courseId:n,type:o,title:s,discount:c,minSpending:i,discountCourseNum:a};y.push(d)}}})}),Y()}function E(){const t=y.filter(e=>e.title===v.value)[0];if(t!==void 0){const e=document.querySelector("#OriginalPrice").textContent.replace(",",""),n=document.querySelectorAll("li[data-course]"),{minSpending:o,discountCourseNum:s,courseId:c}=t;if(V.fire({icon:"success",title:"已使用優惠券"}),o<=e)if(t.type==="course")n.forEach((i,a)=>{const l=i.dataset.course;if(c==l){const d=i.querySelector("input[name='count']");s===null||Number(s)<=Number(d.value)?r[a].myCouponId==""?(v.value="",B(a,t)):Swal.fire({icon:"error",title:"每個課程只能使用一張優惠券"}):Swal.fire({icon:"error",title:"未符合使用條件",text:`須購買指定課程達 ${s} 堂課`})}});else{const i=r.length-1;r[i].myCouponId==""?(v.value="",B(i,t)):Swal.fire({icon:"error",title:"每個課程只能使用一張優惠券"})}else Swal.fire({icon:"error",title:"未符合使用條件",text:`折價前的消費總額須達 NT$ ${o}`})}else Swal.fire({icon:"error",title:"沒有匹配的優惠券"});console.log(r)}function F(t){P(t),g()}function G(t,e){const n=document.querySelector("#OriginalPrice").textContent.replace(",","");r.forEach((o,s)=>{const{minSpending:c,discountCourseNum:i,courseId:a,myCouponId:l}=o;c<=n?a==t?i===null||i<=e?o.discountPrice=j(o):P(s):s==r.length-1&&l!==""&&(o.discountPrice=j(o)):P(s)}),g()}function P(t){r[t].myCouponId="",r[t].originPrice=0,r[t].courseId="",r[t].type="",r[t].title="",r[t].discount="",r[t].minSpending=0,r[t].discountCourseNum=0,r[t].discountPrice=0}function B(t,e){r[t]={...e,discountPrice:j(e)},g()}function j(t){const{type:e,originPrice:n,discount:o,discountCourseNum:s}=t;if(e==="course")return Math.round(Number(n)*(1-Number(o))*Number(s));{const c=document.querySelector("#OriginalPrice").textContent.replace(",","");return Math.round(Number(c)*(1-Number(o)))}}function O(t){r=r.filter(e=>e.courseId!=t)}const k=document.querySelector(".js-cartList"),J=document.querySelector(".js-nextCartList");function M(){let t="";u.length?u.forEach((e,n)=>{var o,s,c,i,a,l,d,m;t+=`
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
                        ${(m=e.course)==null?void 0:m.price.toString().replace(x,",")}
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
      `,k.innerHTML=t,K()}function K(){const t=document.querySelector("#payWay");u.length?(t.querySelectorAll("button").forEach(e=>{e.disabled=!1}),I.disabled=!1):(t.querySelectorAll("button").forEach(e=>{e.disabled=!0}),I.disabled=!0)}function H(){let t="";f.length?f.forEach((e,n)=>{var o,s,c,i,a,l,d,m;t+=`
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
                          NT$ <span class="OriginalCoursePrice">${(m=e.course)==null?void 0:m.price.toString().replace(x,",")}</span>
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
    </div>`,J.innerHTML=t}function X(){const t=`
      <div class="d-flex justify-content-center py-10">
        <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>`;k.innerHTML=t}function Y(){const t=document.querySelector("#couponOption");let e="";y.length&&y.forEach(n=>{e+=`<option value="${n.title}"></option>`}),t.innerHTML=e}function g(){ee(),Z(),te()}function Z(){document.querySelector("#WebDiscount").innerHTML=r[r.length-1].discountPrice}function ee(){const t=r.reduce((e,n,o)=>o<r.length-1?e+n.discountPrice:e,0);document.querySelector("#CourseDiscount").innerHTML=t}function te(){document.querySelectorAll(".js-usedCoupon").forEach((e,n)=>{r[n].myCouponId===""?e.innerHTML="":e.innerHTML=`<button type="button" class="btn btn-close fs-sm js-delCoupon" data-index="${n}"></button>
        <p>
          已套用 <span class="fw-bold text-secondary2">${r[n].title}</span
          ><i class="fa-solid fa-arrow-right mx-1"></i
          ><span class="fw-bold text-primary">折價 <span class="js-usedCouponDiscount">${r[n].discountPrice}</span> 元</span>
        </p>`})}function ne(t){const e=t.getAttribute("data-bs-target"),n=document.querySelector(e),o=document.querySelector("#TotalPrice").innerText;let s=new Date;s.setDate(s.getDate()+5),s=s.toISOString(),n.querySelector(".js-paymentPrice").innerHTML=`NT$ ${o}`,n.querySelector(".js-dueDate").innerHTML=`${U.exec(s)[1]} 23:59:59`}const U=/^(\d{4}-\d{2}-\d{2}).*/,x=/\B(?=(?:\d{3})+(?!\d))/g,oe=document.querySelector("#purchaseTabContent");document.querySelector("#mainPurchase");const b={headers:{"Content-Type":"application/json"}};let u=[],f=[];se();async function se(){X(),await re(),M(),u.length&&(C(),w(),R()),H()}async function re(){try{const t=`https://project-code-json-k0ti.onrender.com/myCarts?userId=${q}&status=purchase&_expand=course`,{data:e}=await p.get(t);if(e!==void 0){const n=e.map(s=>`https://project-code-json-k0ti.onrender.com/courses/${s.courseId}?_expand=teacher`),o=await Promise.all(n.map(s=>p.get(s)));e.forEach((s,c)=>{s.course=o[c].data}),ce(e)}}catch(t){console.log("getMyCart",t)}}function ce(t){let e=new Date;e.setDate(e.getDate()+365),e.setHours(23,59,59,999),e=U.exec(e.toISOString())[1],t.forEach(n=>{n.dueDate=e}),u=t.filter(n=>!n.isNextPurchase),f=t.filter(n=>n.isNextPurchase)}oe.addEventListener("click",t=>{const e=t.target,n=e.closest("li");if(n){t.preventDefault();const o=n.dataset.course,s=n.querySelector("input[name='count']");if(e.classList.contains("delete-order"))ie(o);else if(e.classList.contains("js-nextPurchaseBtn"))ue(o);else if(e.classList.contains("js-mainPurchaseBtn"))de(o);else if(e.classList.contains("js-increment"))fe(o,s);else if(e.classList.contains("js-decrement"))me(o,s);else if(e.classList.contains("js-delCoupon")){const c=e.dataset.index;F(c)}}});function ie(t){Swal.fire({title:"確定要刪除嗎?",showDenyButton:!0,confirmButtonColor:"#115BC9",confirmButtonText:"確定刪除",denyButtonText:"我再想想"}).then(async e=>{e.isConfirmed&&(Swal.fire({position:"center",icon:"success",title:"已刪除課程",showConfirmButton:!1,timer:1500}),ae(t),O(t),w(),g(),C())})}async function ae(t){try{let e;u=u.filter(n=>(n.courseId==t&&(e=n.id),n.courseId!=t)),f=f.filter(n=>(n.courseId==t&&(e=n.id),n.courseId!=t)),S(),await p.delete(`https://project-code-json-k0ti.onrender.com/myCarts/${e}`)}catch{console.log("刪除會報錯，但購物車能正常刪除")}}async function ue(t){(await Swal.fire({title:"確定要下次再買該課程嗎?",showDenyButton:!0,confirmButtonColor:"#115BC9",confirmButtonText:"確定",denyButtonText:"我再想想"})).isConfirmed&&(Swal.fire({position:"center",icon:"success",title:"已移至下次再買",showConfirmButton:!1,timer:1500}),le(t),O(t),w(),g(),C())}async function le(t){try{let e;u=u.filter(n=>(n.courseId==t&&(e=n.id,f.push(n)),n.courseId!=t)),S(),await p.patch(`https://project-code-json-k0ti.onrender.com/myCarts/${e}`,{isNextPurchase:!0},b)}catch(e){console.log("toNextPurchase",e)}}function de(t){Swal.fire({title:"確定將該課程移至購物車嗎?",showDenyButton:!0,confirmButtonColor:"#115BC9",confirmButtonText:"確定",denyButtonText:"我再想想"}).then(e=>{e.isConfirmed&&(Swal.fire({position:"center",icon:"success",title:"已移置購買項目",showConfirmButton:!1,timer:1500}),pe(t),w(),g(),C())})}async function pe(t){try{let e;f=f.filter(n=>(n.courseId==t&&(e=n.id,u.push(n)),n.courseId!=t)),S(),await p.patch(`https://project-code-json-k0ti.onrender.com/myCarts/${e}`,{isNextPurchase:!1},b)}catch(e){console.log("toMainPurchase",e)}}async function S(){M(),u.length&&N(),H(),await W(),_()}function fe(t,e){$(e).val(function(n,o){return parseInt(o)+1}),D(t,e.value)}function me(t,e){$(e).val(function(n,o){return parseInt(o)===1?1:parseInt(o)-1}),D(t,e.value)}document.addEventListener("change",t=>{t.target.name==="count"&&A(t.target)});document.addEventListener("keydown",t=>{t.target.name==="count"&&t.key==="Enter"&&(t.preventDefault(),A(t.target))});function A(t){const e=t.closest("[data-course]").dataset.course;t.value.match(/[^0-9]|^0$/g)&&(t.value=t.defaultValue),D(e,t.value)}function D(t,e){he(t,e),G(t,e),C()}function he(t,e){let n;u.forEach(o=>{o.courseId==t&&(n=o.id,o.quantity=e)}),ye(n,e)}async function ye(t,e){try{const n=`https://project-code-json-k0ti.onrender.com/myCarts/${t}`,o={quantity:e};await p.patch(n,o,b)}catch{}}function C(){const t=$(".order");let e=0;t.each(function(){const i=$(this),a=parseInt(i.find('[name="count"]').val()),l=i.find(".OriginalCoursePrice").text().replace(",",""),d=parseInt(l),m=a*d;e+=m}),$("#OriginalPrice").text(e.toString().replace(x,","));const o=parseInt($("#CourseDiscount").text().replace(",","")),s=parseInt($("#WebDiscount").text().replace(",","")),c=e-o-s;$("#TotalPrice").text(c.toString().replace(x,","))}const ge=document.querySelectorAll(".js-paymentInfoBtn"),be=document.querySelectorAll(".js-payBtn");ge.forEach(t=>{t.addEventListener("click",e=>ne(e.target))});be.forEach(t=>{t.addEventListener("click",async e=>{if(e.preventDefault(),e.target.type==="submit"){const n=e.target.closest("form");n.checkValidity()?(await T(),await L(),n.submit()):n.reportValidity()}else await T(),await L(),location.href="cart2.html"})});async function L(){try{const t=u.map(e=>`https://project-code-json-k0ti.onrender.com/myCarts/${e.id}`);await Promise.all(t.map((e,n)=>{const o={status:"appointment",dueDate:u[n].dueDate};return p.patch(e,o,b)}))}catch(t){console.log("patchMyCarts",t)}}
