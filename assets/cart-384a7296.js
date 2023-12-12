import{a as p,u as L,g as k,r as A}from"./backtotop-e931ed7f.js";let r=[];const _=Swal.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:2e3}),b=document.querySelector("#coupon"),I=document.querySelector(".js-useCouponBtn");let h=[],y=[];const W={myCouponId:"",originPrice:"",courseId:"",type:"",title:"",discount:0,minSpending:"",discountCourseNum:"",discountPrice:0};function w(){r=Array.from({length:l.length+1},()=>W)}b.addEventListener("keydown",t=>{t.key==="Enter"&&(t.preventDefault(),q())});I.addEventListener("click",t=>{t.preventDefault(),q()});async function Q(){try{for(const t of r)if(t.myCouponId){const e=`http://localhost:3000/myCoupons/${t.myCouponId}`,n={canUse:!1};await p.patch(e,n,headers)}}catch(t){console.log("patchMyCoupon",t)}}async function R(){try{const t=`http://localhost:3000/myCoupons?_expand=coupon&userId=${L}&_sort=couponId&_order=asc`,{data:e}=await p.get(t);if(e.length){const n=e.map(s=>`http://localhost:3000/coupons/${s.couponId}?_expand=teacher&_expand=course`),o=await Promise.all(n.map(s=>p.get(s)));e.forEach((s,c)=>{s.coupon=o[c].data})}h=e,V()}catch(t){console.log("getCoupon",t)}}async function V(){const t=[];h.forEach(e=>{let n=new Date().getTime();new Date(e.dueDate).getTime()<n&&(e.canUse=!1,t.push(e))}),t.length>0&&(await Promise.all(t.map(async e=>{try{await p.patch(`http://localhost:3000/myCoupons/${e.id}`,{canUse:!1},headers)}catch(n){console.log("checkDueDate",n)}})),h=h.filter(e=>e.canUse===!0)),B()}function B(){y=[],h.forEach(t=>{if(t.coupon.type==="allCourse"){const{courseId:e,type:n,title:o,minSpending:s,discountCourseNum:c,discount:a}=t.coupon,i={myCouponId:t.id,originPrice:null,courseId:e,type:n,title:o,discount:a,minSpending:s,discountCourseNum:c};y.push(i)}}),l.forEach(t=>{h.forEach(e=>{if(e.coupon.type==="course"){const{courseId:n,type:o,title:s,discount:c,minSpending:a,discountCourseNum:i}=e.coupon,{price:u}=e.coupon.course;if(n==t.courseId){const d={myCouponId:e.id,originPrice:u,courseId:n,type:o,title:s,discount:c,minSpending:a,discountCourseNum:i};y.push(d)}}})}),X()}function q(){const t=y.filter(e=>e.title===b.value)[0];if(t!==void 0){const e=document.querySelector("#OriginalPrice").textContent.replace(",",""),n=document.querySelectorAll("li[data-course]"),{minSpending:o,discountCourseNum:s,courseId:c}=t;if(_.fire({icon:"success",title:"已使用優惠券"}),o<=e)if(t.type==="course")n.forEach((a,i)=>{const u=a.dataset.course;if(c==u){const d=a.querySelector("input[name='count']");s===""||s<=d.value?r[i].myCouponId==""?(b.value="",j(i,t)):Swal.fire({icon:"error",title:"每個課程只能使用一張優惠券"}):Swal.fire({icon:"error",title:"未符合使用條件",text:`須購買指定課程達 ${s} 堂課`})}});else{const a=r.length-1;r[a].myCouponId==""?(b.value="",j(a,t)):Swal.fire({icon:"error",title:"每個課程只能使用一張優惠券"})}else Swal.fire({icon:"error",title:"未符合使用條件",text:`折價前的消費總額須達 NT$ ${o}`})}else Swal.fire({icon:"error",title:"沒有匹配的優惠券"})}function z(t){v(t),C()}function F(t,e){const n=document.querySelector("#OriginalPrice").textContent.replace(",","");r.forEach((o,s)=>{const{minSpending:c,discountCourseNum:a,courseId:i,myCouponId:u}=o;c<=n?i==t?a===""||a<=e?o.discountPrice=S(o):v(s):s==r.length-1&&u!==""?o.discountPrice=S(o):v(s):v(s)}),C()}function v(t){r[t].type="",r[t].originPrice=0,r[t].discountPrice=0,r[t].title="",r[t].myCouponId="",r[t].courseId="",r[t].discount="",r[t].minSpending=0,r[t].discountCourseNum=0}function j(t,e){r[t]={...e,discountPrice:S(e)},C()}function S(t){const{type:e,originPrice:n,discount:o,discountCourseNum:s}=t;if(e==="course")return Math.round(Number(n)*(1-Number(o))*Number(s));{const c=document.querySelector("#OriginalPrice").textContent.replace(",","");return Math.round(Number(c)*(1-Number(o)))}}function E(t){r=r.filter(e=>e.courseId!=t)}const O=document.querySelector(".js-cartList"),G=document.querySelector(".js-nextCartList");function N(){let t="";l.length?l.forEach((e,n)=>{var o,s,c,a,i,u,d,m;t+=`
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
                      ${(i=(a=e.course)==null?void 0:a.teacher)==null?void 0:i.name}
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
                          <option value="${(u=e.course)==null?void 0:u.duration}" selected>
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
      `,O.innerHTML=t,J()}function J(){const t=document.querySelector("#payWay");l.length?(t.querySelectorAll("button").forEach(e=>{e.disabled=!1}),I.disabled=!1):(t.querySelectorAll("button").forEach(e=>{e.disabled=!0}),I.disabled=!0)}function M(){let t="";f.length?f.forEach((e,n)=>{var o,s,c,a,i,u,d,m;t+=`
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
                      <h5 class="fs-7 fs-md-6">${(i=(a=e.course)==null?void 0:a.teacher)==null?void 0:i.name}</h5>
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
                            <option value="${(u=e.course)==null?void 0:u.duration}" selected>${(d=e.course)==null?void 0:d.duration}</option>
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
    </div>`,G.innerHTML=t}function K(){const t=`
      <div class="d-flex justify-content-center py-10">
        <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>`;O.innerHTML=t}function X(){const t=document.querySelector("#couponOption");let e="";y.length&&y.forEach(n=>{e+=`<option value="${n.title}"></option>`}),t.innerHTML=e}function C(){Z(),Y(),ee()}function Y(){document.querySelector("#WebDiscount").innerHTML=r[r.length-1].discountPrice}function Z(){const t=r.reduce((e,n,o)=>o<r.length-1?e+n.discountPrice:e,0);document.querySelector("#CourseDiscount").innerHTML=t}function ee(){document.querySelectorAll(".js-usedCoupon").forEach((e,n)=>{console.log(r,n),r[n].myCouponId===""?e.innerHTML="":e.innerHTML=`<button type="button" class="btn btn-close fs-sm js-delCoupon" data-index="${n}"></button>
        <p>
          已套用 <span class="fw-bold text-secondary2">${r[n].title}</span
          ><i class="fa-solid fa-arrow-right mx-1"></i
          ><span class="fw-bold text-primary">折價 <span class="js-usedCouponDiscount">${r[n].discountPrice}</span> 元</span>
        </p>`})}function te(t){const e=t.getAttribute("data-bs-target"),n=document.querySelector(e),o=document.querySelector("#TotalPrice").innerText;let s=new Date;s.setDate(s.getDate()+5),s=s.toISOString(),n.querySelector(".js-paymentPrice").innerHTML=`NT$ ${o}`,n.querySelector(".js-dueDate").innerHTML=`${H.exec(s)[1]} 23:59:59`}const H=/^(\d{4}-\d{2}-\d{2}).*/,x=/\B(?=(?:\d{3})+(?!\d))/g,ne=document.querySelector("#purchaseTabContent"),oe=document.querySelector("#mainPurchase"),P={headers:{"Content-Type":"application/json"}};let l=[],f=[];se();async function se(){oe.innerHTML,K(),await re(),N(),l.length&&(g(),w(),R()),M()}async function re(){try{const t=`http://localhost:3000/myCarts?userId=${L}&status=purchase&_expand=course`,{data:e}=await p.get(t);if(e!==void 0){const n=e.map(s=>`http://localhost:3000/courses/${s.courseId}?_expand=teacher`),o=await Promise.all(n.map(s=>p.get(s)));e.forEach((s,c)=>{s.course=o[c].data}),ce(e)}}catch(t){console.log("getMyCart",t)}}function ce(t){let e=new Date;e.setDate(e.getDate()+365),e.setHours(23,59,59,999),e=H.exec(e.toISOString())[1],t.forEach(n=>{n.dueDate=e}),l=t.filter(n=>!n.isNextPurchase),f=t.filter(n=>n.isNextPurchase)}document.addEventListener("DOMContentLoaded",()=>{ne.addEventListener("click",t=>{const e=t.target,n=e.closest("li");if(n){t.preventDefault();const o=n.dataset.course,s=n.querySelector("input[name='count']");if(e.classList.contains("delete-order"))ae(o);else if(e.classList.contains("js-nextPurchaseBtn"))le(o);else if(e.classList.contains("js-mainPurchaseBtn"))de(o);else if(e.classList.contains("js-increment"))fe(o,s);else if(e.classList.contains("js-decrement"))me(o,s);else if(e.classList.contains("js-delCoupon")){const c=e.dataset.index;z(c)}}})});function ae(t){Swal.fire({title:"確定要刪除嗎?",showDenyButton:!0,confirmButtonColor:"#115BC9",confirmButtonText:"確定刪除",denyButtonText:"我再想想"}).then(async e=>{e.isConfirmed&&(Swal.fire({position:"center",icon:"success",title:"已刪除課程",showConfirmButton:!1,timer:1500}),ie(t),E(t),w(),C(),g())})}async function ie(t){try{let e;l=l.filter(n=>(n.courseId==t&&(e=n.id),n.courseId!=t)),f=f.filter(n=>(n.courseId==t&&(e=n.id),n.courseId!=t)),D(),await p.patch(`http://localhost:3000/myCarts/${e}`,{userId:"",courseId:"",quantity:""},P)}catch(e){console.log("deleteCart",e)}}async function le(t){(await Swal.fire({title:"確定要下次再買該課程嗎?",showDenyButton:!0,confirmButtonColor:"#115BC9",confirmButtonText:"確定",denyButtonText:"我再想想"})).isConfirmed&&(Swal.fire({position:"center",icon:"success",title:"已移至下次再買",showConfirmButton:!1,timer:1500}),ue(t),E(t),w(),C(),g())}async function ue(t){try{let e;l=l.filter(n=>(n.courseId==t&&(e=n.id,f.push(n)),n.courseId!=t)),D(),await p.patch(`http://localhost:3000/myCarts/${e}`,{isNextPurchase:!0},P)}catch(e){console.log("toNextPurchase",e)}}function de(t){Swal.fire({title:"確定將該課程移至購物車嗎?",showDenyButton:!0,confirmButtonColor:"#115BC9",confirmButtonText:"確定",denyButtonText:"我再想想"}).then(e=>{e.isConfirmed&&(Swal.fire({position:"center",icon:"success",title:"已移置購買項目",showConfirmButton:!1,timer:1500}),pe(t),w(),C(),g())})}async function pe(t){try{let e;f=f.filter(n=>(n.courseId==t&&(e=n.id,l.push(n)),n.courseId!=t)),D(),await p.patch(`http://localhost:3000/myCarts/${e}`,{isNextPurchase:!1},P)}catch(e){console.log("toMainPurchase",e)}}async function D(){N(),l.length&&B(),M(),await k(),A()}function fe(t,e){$(e).val(function(n,o){return parseInt(o)+1}),T(t,e.value)}function me(t,e){$(e).val(function(n,o){return parseInt(o)-1}),T(t,e.value)}document.addEventListener("change",t=>{t.target.name==="count"&&U(t.target)});document.addEventListener("keydown",t=>{t.target.name==="count"&&t.key==="Enter"&&(t.preventDefault(),U(t.target))});function U(t){const e=t.closest("[data-course]").dataset.course;t.value.match(/[^0-9]|^0$/g)&&(t.value=t.defaultValue),T(e,t.value)}function T(t,e){he(t,e),F(t,e),g()}function he(t,e){let n;l.forEach(o=>{o.courseId==t&&(n=o.id,o.quantity=e)}),ye(n,e)}async function ye(t,e){try{const n=`http://localhost:3000/myCarts/${t}`,o={quantity:e};await p.patch(n,o,P)}catch{}}function g(){const t=$(".order");let e=0;t.each(function(){const a=$(this),i=parseInt(a.find('[name="count"]').val()),u=a.find(".OriginalCoursePrice").text().replace(",",""),d=parseInt(u),m=i*d;e+=m,console.log("小計",i,d)}),console.log(e),$("#OriginalPrice").text(e.toString().replace(x,","));const o=parseInt($("#CourseDiscount").text().replace(",","")),s=parseInt($("#WebDiscount").text().replace(",","")),c=e-o-s;console.log(c,e,o,s),$("#TotalPrice").text(c.toString().replace(x,","))}const Ce=document.querySelectorAll(".js-paymentInfoBtn"),ge=document.querySelectorAll(".js-payBtn");Ce.forEach(t=>{t.addEventListener("click",e=>te(e.target))});ge.forEach(t=>{t.addEventListener("click",async e=>{e.preventDefault(),await Q(),await be(),location.href="cart2.html"})});async function be(){try{const t=myCarts.map(e=>`http://localhost:3000/myCarts/${e.id}`);await Promise.all(t.map((e,n)=>{const o={status:"appointment",dueDate:myCarts[n].dueDate};return axios.patch(e,o,headers)}))}catch{}}
