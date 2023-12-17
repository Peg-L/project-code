import{a as p,u as q,g as W,r as _}from"./backtotop-61d0d527.js";let r=[];const V=Swal.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:1500}),v=document.querySelector("#coupon"),I=document.querySelector(".js-useCouponBtn");let h=[],y=[];const Q={myCouponId:"",originPrice:"",courseId:"",type:"",title:"",discount:0,minSpending:"",discountCourseNum:"",discountPrice:0};function w(){r=Array.from({length:u.length+1},()=>Q)}v.addEventListener("keydown",e=>{e.key==="Enter"&&(e.preventDefault(),E())});I.addEventListener("click",e=>{e.preventDefault(),E()});async function T(){try{for(const e of r)if(e.myCouponId){const t=`https://project-code-json-k0ti.onrender.com/myCoupons/${e.myCouponId}`,n={canUse:!1};await p.patch(t,n,b)}}catch(e){console.log("patchMyCoupon",e)}}async function R(){try{const e=`https://project-code-json-k0ti.onrender.com/myCoupons?_expand=coupon&userId=${q}&_sort=couponId&_order=asc`,{data:t}=await p.get(e);h=t,z()}catch(e){console.log("getCoupon",e)}}async function z(){const e=[];h.forEach(t=>{let n=new Date().getTime();new Date(t.dueDate).getTime()<n&&(t.canUse=!1,e.push(t))}),e.length>0&&(await Promise.all(e.map(async t=>{try{await p.patch(`https://project-code-json-k0ti.onrender.com/myCoupons/${t.id}`,{canUse:!1},b)}catch(n){console.log("checkDueDate",n)}})),h=h.filter(t=>t.canUse===!0)),N()}function N(){y=[],h.forEach(e=>{if(e.coupon.type==="allCourse"){const{courseId:t,type:n,title:o,minSpending:s,discountCourseNum:c,discount:a}=e.coupon,i={myCouponId:e.id,originPrice:null,courseId:t,type:n,title:o,discount:a,minSpending:s,discountCourseNum:c};y.push(i)}}),u.forEach(e=>{h.forEach(t=>{if(t.coupon.type==="course"&&e.courseId==t.coupon.courseId){const{courseId:n,type:o,title:s,discount:c,minSpending:a,discountCourseNum:i}=t.coupon,l=e.course.price;if(n==e.courseId){const d={myCouponId:t.id,originPrice:l,courseId:n,type:o,title:s,discount:c,minSpending:a,discountCourseNum:i};y.push(d)}}})}),Y()}function E(){const e=y.filter(t=>t.title===v.value)[0];if(e!==void 0){const t=document.querySelector("#OriginalPrice").textContent.replace(",",""),n=document.querySelectorAll("li[data-course]"),{minSpending:o,discountCourseNum:s,courseId:c}=e;if(V.fire({icon:"success",title:"已使用優惠券"}),o<=t)if(e.type==="course")n.forEach((a,i)=>{const l=a.dataset.course;if(c==l){const d=a.querySelector("input[name='count']");s===null||Number(s)<=Number(d.value)?r[i].myCouponId==""?(v.value="",B(i,e)):Swal.fire({icon:"error",title:"每個課程只能使用一張優惠券"}):Swal.fire({icon:"error",title:"未符合使用條件",text:`須購買指定課程達 ${s} 堂課`})}});else{const a=r.length-1;r[a].myCouponId==""?(v.value="",B(a,e)):Swal.fire({icon:"error",title:"每個課程只能使用一張優惠券"})}else Swal.fire({icon:"error",title:"未符合使用條件",text:`折價前的消費總額須達 NT$ ${o}`})}else Swal.fire({icon:"error",title:"沒有匹配的優惠券"});console.log(r)}function F(e){P(e),g()}function G(e,t){const n=document.querySelector("#OriginalPrice").textContent.replace(",","");r.forEach((o,s)=>{const{minSpending:c,discountCourseNum:a,courseId:i,myCouponId:l}=o;c<=n?i==e?a===null||a<=t?o.discountPrice=D(o):P(s):s==r.length-1&&l!==""&&(o.discountPrice=D(o)):P(s)}),g()}function P(e){r[e].myCouponId="",r[e].originPrice=0,r[e].courseId="",r[e].type="",r[e].title="",r[e].discount="",r[e].minSpending=0,r[e].discountCourseNum=0,r[e].discountPrice=0}function B(e,t){r[e]={...t,discountPrice:D(t)},g()}function D(e){const{type:t,originPrice:n,discount:o,discountCourseNum:s}=e;if(t==="course")return Math.round(Number(n)*(1-Number(o))*Number(s));{const c=document.querySelector("#OriginalPrice").textContent.replace(",","");return Math.round(Number(c)*(1-Number(o)))}}function O(e){r=r.filter(t=>t.courseId!=e)}const k=document.querySelector(".js-cartList"),J=document.querySelector(".js-nextCartList");function M(){let e="";u.length?u.forEach((t,n)=>{var o,s,c,a,i,l,d,m;e+=`
          <li data-course="${t.courseId}">
            <div
              class="shadow rounded-2 p-4 pb-md-4 pt-md-6 px-md-8 mb-1 mb-md-2"
            >
              <h3 class="fs-5 fs-md-4 fw-bold mb-4 mb-md-6 text-secondary2">
                ${(o=t.course)==null?void 0:o.name}
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
                        src="${(c=(s=t.course)==null?void 0:s.teacher)==null?void 0:c.avatar}"
                        alt="teacher"
                        width="90px"
                        height="90px"
                      />
                    </div>
                    <h5 class="fs-7 fs-md-6">
                      ${(i=(a=t.course)==null?void 0:a.teacher)==null?void 0:i.name}
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
                          <option value="${(l=t.course)==null?void 0:l.duration}" selected>
                            ${(d=t.course)==null?void 0:d.duration}
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
                            value="${t.quantity}"
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
                        ${(m=t.course)==null?void 0:m.price.toString().replace(x,",")}
                        </span>
                      </h4>
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-end gap-4">
                  <p class="fs-sm fs-md-7">
                    預約截止日
                    <time datetime="${t.dueDate}">
                    ${t.dueDate}</time
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
        </li>`}):e=`
      <div class="d-flex flex-column align-items-center text-center h-100 px-10 pt-10 mb-4">
        <p class="fs-4 mb-10">購物車內沒有商品</p>
        <a href="./course.html"
          class="btn btn-secondary2 rounded-2 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
        >
          繼續選購
        </a>
      </div>
      `,k.innerHTML=e,K()}function K(){const e=document.querySelector("#payWay");u.length?(e.querySelectorAll("button").forEach(t=>{t.disabled=!1}),I.disabled=!1):(e.querySelectorAll("button").forEach(t=>{t.disabled=!0}),I.disabled=!0)}function H(){let e="";f.length?f.forEach((t,n)=>{var o,s,c,a,i,l,d,m;e+=`
      <li data-course="${t.courseId}">
              <div
                class="shadow rounded-2 p-4 pb-md-4 pt-md-6 px-md-8 mb-1 mb-md-2"
              >
                <h3 class="fs-5 fs-md-4 fw-bold mb-4 mb-md-6 text-secondary2">
                  ${(o=t.course)==null?void 0:o.name}
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
                          src="${(c=(s=t.course)==null?void 0:s.teacher)==null?void 0:c.avatar}"
                          alt="teacher"
                          width="90px"
                          height="90px"
                        />
                      </div>
                      <h5 class="fs-7 fs-md-6">${(i=(a=t.course)==null?void 0:a.teacher)==null?void 0:i.name}</h5>
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
                            <option value="${(l=t.course)==null?void 0:l.duration}" selected>${(d=t.course)==null?void 0:d.duration}</option>
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
                              value="${t.quantity}"
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
                          NT$ <span class="OriginalCoursePrice">${(m=t.course)==null?void 0:m.price.toString().replace(x,",")}</span>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-end gap-4">
                    <p class="fs-sm fs-md-7">
                      預約截止日
                      <time datetime="${t.dueDate}">${t.dueDate}</time>
                    </p>
                    <a class="text-decoration-underline js-mainPurchaseBtn" role="button" href="#">移至購物車</a>
                    <a class="text-decoration-underline delete-order" role="button" href="#"
                      >刪除</a
                    >
                  </div>
                </div>
              </div>
            </li>`}):e+=`<div class="d-flex flex-column align-items-center text-center h-100 px-10 pt-10 mb-4">
      <p class="fs-4 mb-10">沒有商品</p>
    </div>`,J.innerHTML=e}function X(){const e=`
      <div class="d-flex justify-content-center py-10">
        <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>`;k.innerHTML=e}function Y(){const e=document.querySelector("#couponOption");let t="";y.length&&y.forEach(n=>{t+=`<option value="${n.title}"></option>`}),e.innerHTML=t}function g(){ee(),Z(),te()}function Z(){document.querySelector("#WebDiscount").innerHTML=r[r.length-1].discountPrice}function ee(){const e=r.reduce((t,n,o)=>o<r.length-1?t+n.discountPrice:t,0);document.querySelector("#CourseDiscount").innerHTML=e}function te(){document.querySelectorAll(".js-usedCoupon").forEach((t,n)=>{r[n].myCouponId===""?t.innerHTML="":t.innerHTML=`<button type="button" class="btn btn-close fs-sm js-delCoupon" data-index="${n}"></button>
        <p>
          已套用 <span class="fw-bold text-secondary2">${r[n].title}</span
          ><i class="fa-solid fa-arrow-right mx-1"></i
          ><span class="fw-bold text-primary">折價 <span class="js-usedCouponDiscount">${r[n].discountPrice}</span> 元</span>
        </p>`})}function ne(e){const t=e.getAttribute("data-bs-target"),n=document.querySelector(t),o=document.querySelector("#TotalPrice").innerText;let s=new Date;s.setDate(s.getDate()+5),s=s.toISOString(),n.querySelector(".js-paymentPrice").innerHTML=`NT$ ${o}`,n.querySelector(".js-dueDate").innerHTML=`${U.exec(s)[1]} 23:59:59`}const U=/^(\d{4}-\d{2}-\d{2}).*/,x=/\B(?=(?:\d{3})+(?!\d))/g,oe=document.querySelector("#purchaseTabContent");document.querySelector("#mainPurchase");const b={headers:{"Content-Type":"application/json"}};let u=[],f=[];se();async function se(){X(),await re(),M(),u.length&&(C(),w(),R()),H()}async function re(){try{const e=`https://project-code-json-k0ti.onrender.com/myCarts?userId=${q}&status=purchase&_expand=course`,{data:t}=await p.get(e);if(t!==void 0){const n=t.map(s=>`https://project-code-json-k0ti.onrender.com/courses/${s.courseId}?_expand=teacher`),o=await Promise.all(n.map(s=>p.get(s)));t.forEach((s,c)=>{s.course=o[c].data}),ce(t)}}catch(e){console.log("getMyCart",e)}}function ce(e){let t=new Date;t.setDate(t.getDate()+365),t.setHours(23,59,59,999),t=U.exec(t.toISOString())[1],e.forEach(n=>{n.dueDate=t}),u=e.filter(n=>!n.isNextPurchase),f=e.filter(n=>n.isNextPurchase)}oe.addEventListener("click",e=>{const t=e.target,n=t.closest("li");if(n){const o=n.dataset.course,s=n.querySelector("input[name='count']");if(t.classList.contains("delete-order"))e.preventDefault(),ae(o);else if(t.classList.contains("js-nextPurchaseBtn"))e.preventDefault(),ue(o);else if(t.classList.contains("js-mainPurchaseBtn"))e.preventDefault(),de(o);else if(t.classList.contains("js-increment"))e.preventDefault(),fe(o,s);else if(t.classList.contains("js-decrement"))e.preventDefault(),me(o,s);else if(t.classList.contains("js-delCoupon")){e.preventDefault();const c=t.dataset.index;F(c)}}});function ae(e){Swal.fire({title:"確定要刪除嗎?",showDenyButton:!0,confirmButtonColor:"#115BC9",confirmButtonText:"確定刪除",denyButtonText:"我再想想"}).then(async t=>{t.isConfirmed&&(Swal.fire({position:"center",icon:"success",title:"已刪除課程",showConfirmButton:!1,timer:1500}),ie(e),O(e),w(),g(),C())})}async function ie(e){try{let t;u=u.filter(n=>(n.courseId==e&&(t=n.id),n.courseId!=e)),f=f.filter(n=>(n.courseId==e&&(t=n.id),n.courseId!=e)),j(),await p.delete(`https://project-code-json-k0ti.onrender.com/myCarts/${t}`)}catch{console.log("刪除會報錯，但購物車能正常刪除")}}async function ue(e){(await Swal.fire({title:"確定要下次再買該課程嗎?",showDenyButton:!0,confirmButtonColor:"#115BC9",confirmButtonText:"確定",denyButtonText:"我再想想"})).isConfirmed&&(Swal.fire({position:"center",icon:"success",title:"已移至下次再買",showConfirmButton:!1,timer:1500}),le(e),O(e),w(),g(),C())}async function le(e){try{let t;u=u.filter(n=>(n.courseId==e&&(t=n.id,f.push(n)),n.courseId!=e)),j(),await p.patch(`https://project-code-json-k0ti.onrender.com/myCarts/${t}`,{isNextPurchase:!0},b)}catch(t){console.log("toNextPurchase",t)}}function de(e){Swal.fire({title:"確定將該課程移至購物車嗎?",showDenyButton:!0,confirmButtonColor:"#115BC9",confirmButtonText:"確定",denyButtonText:"我再想想"}).then(t=>{t.isConfirmed&&(Swal.fire({position:"center",icon:"success",title:"已移置購買項目",showConfirmButton:!1,timer:1500}),pe(e),w(),g(),C())})}async function pe(e){try{let t;f=f.filter(n=>(n.courseId==e&&(t=n.id,u.push(n)),n.courseId!=e)),j(),await p.patch(`https://project-code-json-k0ti.onrender.com/myCarts/${t}`,{isNextPurchase:!1},b)}catch(t){console.log("toMainPurchase",t)}}async function j(){M(),u.length&&N(),H(),await W(),_()}function fe(e,t){$(t).val(function(n,o){return parseInt(o)+1}),S(e,t.value)}function me(e,t){$(t).val(function(n,o){return parseInt(o)===1?1:parseInt(o)-1}),S(e,t.value)}document.addEventListener("change",e=>{e.target.name==="count"&&A(e.target)});document.addEventListener("keydown",e=>{e.target.name==="count"&&e.key==="Enter"&&(e.preventDefault(),A(e.target))});function A(e){const t=e.closest("[data-course]").dataset.course;e.value.match(/[^0-9]|^0$/g)&&(e.value=e.defaultValue),S(t,e.value)}function S(e,t){he(e,t),G(e,t),C()}function he(e,t){let n;u.forEach(o=>{o.courseId==e&&(n=o.id,o.quantity=t)}),ye(n,t)}async function ye(e,t){try{const n=`https://project-code-json-k0ti.onrender.com/myCarts/${e}`,o={quantity:t};await p.patch(n,o,b)}catch{}}function C(){const e=$(".order");let t=0;e.each(function(){const a=$(this),i=parseInt(a.find('[name="count"]').val()),l=a.find(".OriginalCoursePrice").text().replace(",",""),d=parseInt(l),m=i*d;t+=m}),$("#OriginalPrice").text(t.toString().replace(x,","));const o=parseInt($("#CourseDiscount").text().replace(",","")),s=parseInt($("#WebDiscount").text().replace(",","")),c=t-o-s;$("#TotalPrice").text(c.toString().replace(x,","))}const ge=document.querySelectorAll(".js-paymentInfoBtn"),be=document.querySelectorAll(".js-payBtn");ge.forEach(e=>{e.addEventListener("click",t=>ne(t.target))});be.forEach(e=>{e.addEventListener("click",async t=>{if(t.preventDefault(),t.target.type==="submit"){const n=t.target.closest("form");n.checkValidity()?(await T(),await L(),location.href="cart2.html"):n.reportValidity()}else await T(),await L(),location.href="cart2.html"})});async function L(){try{const e=u.map(t=>`https://project-code-json-k0ti.onrender.com/myCarts/${t.id}`);await Promise.all(e.map((t,n)=>{const o={status:"appointment",dueDate:u[n].dueDate};return p.patch(t,o,b)}))}catch(e){console.log("patchMyCarts",e)}}
