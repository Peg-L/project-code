import{u as D,g as M,r as H}from"./backtotop-46b93ac6.js";let a=[];const U=Swal.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:2e3,didOpen:t=>{t.addEventListener("mouseenter",Swal.stopTimer),t.addEventListener("mouseleave",Swal.resumeTimer)}});document.querySelectorAll(".js-delCoupon");const I=document.querySelector("#coupon"),k=document.querySelector(".js-useCouponBtn");document.querySelectorAll(".OriginalCoursePrice");let m=[],h=[];const A={myCouponId:"",originPrice:"",courseId:"",type:"",title:"",discount:0,minSpending:"",discountCourseNum:"",discountPrice:0};function w(){a=Array.from({length:u.length+1},()=>A)}k.addEventListener("click",t=>{t.preventDefault(),V()});async function _(){try{for(const t of a)if(t.myCouponId){const e=`http://localhost:3000/myCoupons/${t.myCouponId}`;await axios.patch(e,{canUse:!1},headers)}}catch(t){console.log("confirmToUseCoupon",t)}}async function R(){try{const t=`http://localhost:3000/myCoupons?_expand=coupon&userId=${D}&_sort=couponId&_order=asc`,{data:e}=await axios.get(t);if(e.length){const o=e.map(n=>`http://localhost:3000/coupons/${n.couponId}?_expand=teacher&_expand=course`),s=await Promise.all(o.map(n=>axios.get(n)));e.forEach((n,c)=>{n.coupon=s[c].data})}m=e,G()}catch(t){console.log("getCoupon",t)}}async function G(){const t=[];m.forEach(e=>{let o=new Date().getTime();new Date(e.dueDate).getTime()<o&&(e.canUse=!1,t.push(e))}),t.length>0&&(await Promise.all(t.map(async e=>{try{await axios.patch(`http://localhost:3000/myCoupons/${e.id}`,{canUse:!1},headers)}catch(o){console.log("checkDueDate",o)}})),m=m.filter(e=>e.canUse===!0)),B()}function B(){h=[],m.forEach(t=>{if(t.coupon.type==="allCourse"){const{courseId:e,type:o,title:s,minSpending:n,discountCourseNum:c,discount:r}=t.coupon,i={myCouponId:t.id,originPrice:null,courseId:e,type:o,title:s,discount:r,minSpending:n,discountCourseNum:c};h.push(i)}}),u.forEach(t=>{m.forEach(e=>{if(e.coupon.type==="course"){const{courseId:o,type:s,title:n,discount:c,minSpending:r,discountCourseNum:i}=e.coupon,{price:l}=e.coupon.course;if(o==t.courseId){const d={myCouponId:e.id,originPrice:l,courseId:o,type:s,title:n,discount:c,minSpending:r,discountCourseNum:i};h.push(d)}}})}),Q()}function V(){const t=h.filter(e=>e.title===I.value)[0];if(t!==void 0){const e=document.querySelector("#OriginalPrice").textContent.replace(",",""),o=document.querySelectorAll("li[data-course]"),{minSpending:s,discountCourseNum:n,courseId:c}=t;if(U.fire({icon:"success",title:"已使用優惠券"}),s<=e)if(t.type==="course")o.forEach((r,i)=>{const l=r.dataset.course;if(c==l){const d=r.querySelector("input[name='count']");n===""||n<=d.value?a[i].myCouponId==""?(I.value="",T(i,t)):Swal.fire({icon:"error",title:"每個課程只能使用一張優惠券"}):Swal.fire({icon:"error",title:"未符合使用條件",text:`須購買指定課程達 ${n} 堂課`})}});else{const r=a.length-1;a[r].myCouponId==""?(I.value="",T(r,t)):Swal.fire({icon:"error",title:"每個課程只能使用一張優惠券"})}else Swal.fire({icon:"error",title:"未符合使用條件",text:`折價前的消費總額須達 NT$ ${s}`})}else Swal.fire({icon:"error",title:"沒有匹配的優惠券"})}function T(t,e){a[t]={...e,discountPrice:W(e)},v()}function W(t){const{type:e,originPrice:o,discount:s,discountCourseNum:n}=t;if(e==="course")return Math.round(Number(o)*(1-Number(s))*Number(n));{const c=document.querySelector("#OriginalPrice").textContent.replace(",","");return Math.round(Number(c)*(1-Number(s)))}}function j(t){a=a.filter(e=>e.courseId!=t)}function Q(){const t=document.querySelector("#couponOption");let e="";h.length&&h.forEach(o=>{e+=`<option value="${o.title}"></option>`}),t.innerHTML=e}function v(){F(),z(),J()}function z(){document.querySelector("#WebDiscount").innerHTML=a[a.length-1].discountPrice}function F(){const t=a.reduce((e,o,s)=>s<a.length-1?e+o.discountPrice:e,0);document.querySelector("#CourseDiscount").innerHTML=t}function J(){document.querySelectorAll(".js-usedCoupon").forEach((e,o)=>{a[o].myCouponId===""?e.innerHTML="":e.innerHTML=`<button type="button" class="btn btn-close fs-sm js-delCoupon" onclick="handleCouponDelBtn(${o})"></button>
      <p>
        已套用 <span class="fw-bold text-secondary2">${a[o].title}</span
        ><i class="fa-solid fa-arrow-right mx-1"></i
        ><span class="fw-bold text-primary">折價 <span class="js-usedCouponDiscount">${a[o].discountPrice}</span> 元</span>
      </p>`})}const b=/^(\d{4}-\d{2}-\d{2}).*/,C=/\B(?=(?:\d{3})+(?!\d))/g,P=document.querySelector(".js-cartGroup"),q=document.querySelector(".js-nextCartGroup"),K=document.querySelector("#purchaseTabContent"),X=document.querySelector("#mainPurchase"),Y=document.querySelectorAll(".js-paymentInfoBtn"),Z=document.querySelectorAll(".js-payBtn");document.querySelector("#purchaseTab");const ee=window.location.href;ee.replace("cart","course_intro");const g={headers:{"Content-Type":"application/json"}};let u,p;te();async function te(){le(),await oe(),u.length?(L(),x(),w(),R()):E(),N()}async function oe(){try{const{data:t}=await axios.get(`http://localhost:3000/myCarts?userId=${D}&isPurchased=${!1}&_expand=course`);if(t!==void 0){for(let e of t){const o=await axios.get(`http://localhost:3000/courses/${e.courseId}?_expand=teacher`);e.course=o.data}u=t.filter(e=>!e.isNextPurchase),p=t.filter(e=>e.isNextPurchase)}}catch(t){console.log("getMyCart",t)}}function x(){const t=$(".order");let e=0,o=0;t.each(function(){const r=$(this),i=parseInt(r.find('[name="count"]').val());r.find(".CoursePrice").text().replace(",","");const l=r.find(".OriginalCoursePrice").text().replace(",",""),d=parseInt(l),f=i*d;e+=f}),$("#OriginalPrice").text(e.toString().replace(C,",")),o=parseInt($("#CourseDiscount").text().replace(",",""));const n=parseInt($("#WebDiscount").text().replace(",","")),c=e-o-n;$("#TotalPrice").text(c.toString().replace(C,","))}async function S(){u.length?(L(),B()):E(),N(),await M(),H()}K.addEventListener("click",t=>{const e=t.target,o=e.closest("li");o&&(t.preventDefault(),e.classList.contains("delete-order")?ne(o):e.classList.contains("js-nextPurchaseBtn")?re(o):e.classList.contains("js-mainPurchaseBtn")&&ae(o))});function ne(t){Swal.fire({title:"確定要刪除嗎?",showDenyButton:!0,confirmButtonColor:"#115BC9",confirmButtonText:"確定刪除",denyButtonText:"我再想想"}).then(async e=>{if(e.isConfirmed){Swal.fire({position:"center",icon:"success",title:"已刪除課程",showConfirmButton:!1,timer:1500});const o=t.dataset.course;se(o),j(o),w(),v(),x()}})}async function se(t){try{let e;u=u.filter(o=>(o.courseId==t&&(e=o.id),o.courseId!=t)),p=p.filter(o=>(o.courseId==t&&(e=o.id),o.courseId!=t)),S(),await axios.patch(`http://localhost:3000/myCarts/${e}`,{userId:"",courseId:"",quantity:""},g)}catch(e){console.log("deleteCart",e)}}async function re(t){if((await Swal.fire({title:"確定要下次再買該課程嗎?",showDenyButton:!0,confirmButtonColor:"#115BC9",confirmButtonText:"確定",denyButtonText:"我再想想"})).isConfirmed){Swal.fire({position:"center",icon:"success",title:"已移至下次再買",showConfirmButton:!1,timer:1500});const o=t.dataset.course;ce(o),j(o),w(),v(),x()}}async function ce(t){try{let e;u=u.filter(o=>(o.courseId==t&&(e=o.id,p.push(o)),o.courseId!=t)),S(),await axios.patch(`http://localhost:3000/myCarts/${e}`,{isNextPurchase:!0},g)}catch(e){console.log("toNextPurchase",e)}}function ae(t){Swal.fire({title:"確定將該課程移至購物車嗎?",showDenyButton:!0,confirmButtonColor:"#115BC9",confirmButtonText:"確定",denyButtonText:"我再想想"}).then(e=>{if(e.isConfirmed){Swal.fire({position:"center",icon:"success",title:"已移置購買項目",showConfirmButton:!1,timer:1500});const o=t.dataset.course;ie(o),w(),v(),x()}})}async function ie(t){try{let e;p=p.filter(o=>(o.courseId==t&&(e=o.id,u.push(o)),o.courseId!=t)),S(),await axios.patch(`http://localhost:3000/myCarts/${e}`,{isNextPurchase:!1},g)}catch(e){console.log("toMainPurchase",e)}}async function O(t){try{const o=t.closest("li").dataset.course;let s;u.forEach(n=>{n.courseId==o&&(s=n.id,n.quantity=t.value)}),await axios.patch(`http://localhost:3000/myCarts/${s}`,{quantity:t.value},g)}catch(e){console.log("updateQuantity",e)}}P.addEventListener("change",t=>{(t.target.name="count")&&(O(t.target),reCheckCoupon(listItem),x())});q.addEventListener("change",t=>{(t.target.name="count")&&O(t.target)});Y.forEach(t=>{t.addEventListener("click",e=>de(e.target))});Z.forEach(t=>{t.addEventListener("click",async e=>{e.preventDefault(),await _(),await ue(),location.href="cart2.html"})});async function ue(){try{for(const t of u){const e=`http://localhost:3000/myCarts/${t.id}`;await axios.patch(e,{isPurchased:!0},g)}}catch(t){console.log("confirmToBuy",t)}}function L(){let t="",e=new Date;e.setDate(e.getDate()+365),e.setHours(23,59,59,999),e=e.toISOString(),u.length&&u.forEach((o,s)=>{var n,c,r,i,l,d,f,y;t+=`
        <li data-course="${o.courseId}">
          <div
            class="shadow rounded-2 p-4 pb-md-4 pt-md-6 px-md-8 mb-1 mb-md-2"
          >
            <h3 class="fs-5 fs-md-4 fw-bold mb-4 mb-md-6 text-secondary2">
              ${(n=o.course)==null?void 0:n.name}
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
                      src="${(r=(c=o.course)==null?void 0:c.teacher)==null?void 0:r.avatar}"
                      alt="teacher"
                      width="90px"
                      height="90px"
                    />
                  </div>
                  <h5 class="fs-7 fs-md-6">
                    ${(l=(i=o.course)==null?void 0:i.teacher)==null?void 0:l.name}
                  </h5>
                </div>
              </div>

              <div class="col-8 col-sm-9 order">
                <!-- 堂數 -->
                <form class="mb-3 mb-md-5" action="#">
                  <div
                    class="d-flex flex-wrap align-items-center column-gap-8 row-gap-3"
                  >
                    <label for="hour2"
                      >單堂時長 (分鐘)
                      <select
                        class="form-select border-primary fw-bold mt-2 py-1 py-sm-2 w-150px"
                        name="hour2"
                        id="hour2"
                        disabled
                      >
                        <option value="${(d=o.course)==null?void 0:d.duration}" selected>
                          ${(f=o.course)==null?void 0:f.duration}
                        </option>
                      </select>
                    </label>

                    <label class="w-150px" for="count2"
                      >堂數 (堂)
                      <div class="input-group w-fit mt-2">
                        <button
                          type="button"
                          class="btn btn-outline-primary rounded-start-2 border-2 py-0 fw-bold fs-4 w-45px"
                          onclick="decrementValue('count${s}');"
                        >
                          -
                        </button>
                        <input
                          class="form-control border-primary fw-bold text-center py-1 py-sm-2"
                          type="text"
                          name="count"
                          id="count${s}"
                          value="${o.quantity}"
                          inputmode="numeric"
                          pattern="[0-9]"
                        />
                        <button
                          type="button"
                          class="btn btn-outline-primary rounded-end-2 border-2 py-0 fw-bold fs-4 w-45px"
                          onclick="incrementValue('count${s}');"
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
                      ${(y=o.course)==null?void 0:y.price.toString().replace(C,",")}
                      </span>
                    </h4>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-end gap-4">
                <p class="fs-sm fs-md-7">
                  預約截止日
                  <time datetime="${b.exec(e)[1]}">
                    ${b.exec(e)[1]}</time
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
      </li>`}),P.innerHTML=t}function N(){let t="",e=new Date;e.setDate(e.getDate()+365),e.setHours(23,59,59,999),e=e.toISOString(),p.length?p.forEach((o,s)=>{var n,c,r,i,l,d,f,y;t+=`
    <li data-course="${o.courseId}">
            <div
              class="shadow rounded-2 p-4 pb-md-4 pt-md-6 px-md-8 mb-1 mb-md-2"
            >
              <h3 class="fs-5 fs-md-4 fw-bold mb-4 mb-md-6 text-secondary2">
                ${(n=o.course)==null?void 0:n.name}
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
                        src="${(r=(c=o.course)==null?void 0:c.teacher)==null?void 0:r.avatar}"
                        alt="teacher"
                        width="90px"
                        height="90px"
                      />
                    </div>
                    <h5 class="fs-7 fs-md-6">${(l=(i=o.course)==null?void 0:i.teacher)==null?void 0:l.name}</h5>
                  </div>
                </div>

                <div class="col-8 col-sm-9 order">
                  <!-- 堂數 -->
                  <form class="mb-3 mb-md-5" action="#">
                    <div
                      class="d-flex flex-wrap align-items-center column-gap-8 row-gap-3"
                    >
                      <label for="hour2"
                        >單堂時長 (分鐘)
                        <select
                          class="form-select border-primary fw-bold mt-2 py-1 py-sm-2 w-150px"
                          name="hour2"
                          id="hour2"
                          disabled
                        >
                          <option value="${(d=o.course)==null?void 0:d.duration}" selected>${(f=o.course)==null?void 0:f.duration}</option>
                        </select>
                      </label>

                      <label class="w-150px" for="count2"
                        >堂數 (堂)
                        <div class="input-group w-fit mt-2">
                          <button
                            type="button"
                            class="btn btn-outline-primary rounded-start-2 border-2 py-0 fw-bold fs-4 w-45px"
                            onclick="decrementValue('count${s}');"
                          >
                            -
                          </button>
                          <input
                            class="form-control border-primary fw-bold text-center py-1 py-sm-2"
                            type="text"
                            name="count"
                            id="count${s}"
                            value="${o.quantity}"
                            inputmode="numeric"
                            pattern="[0-9]"
                          />
                          <button
                            type="button"
                            class="btn btn-outline-primary rounded-end-2 border-2 py-0 fw-bold fs-4 w-45px"
                            onclick="incrementValue('count${s}');"
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
                        NT$ <span class="OriginalCoursePrice">${(y=o.course)==null?void 0:y.price.toString().replace(C,",")}</span>
                      </h4>
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-end gap-4">
                  <p class="fs-sm fs-md-7">
                    預約截止日
                    <time datetime="${b.exec(e)[1]}">${b.exec(e)[1]}</time>
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
  </div>`,q.innerHTML=t}function E(){const t=`
  <div class="d-flex flex-column align-items-center text-center h-100 px-10 pt-10 mb-4">
    <p class="fs-4 mb-10">購物車內沒有商品</p>
    <a href="./course.html"
      class="btn btn-secondary2 rounded-2 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
    >
      繼續選購
    </a>
  </div>
  `;X.innerHTML=t}function le(){const t=`
    <div class="d-flex justify-content-center py-10">
      <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>`;P.innerHTML=t}function de(t){const e=t.getAttribute("data-bs-target"),o=document.querySelector(e),s=document.querySelector("#TotalPrice").innerText;let n=new Date;n.setDate(n.getDate()+5),n=n.toISOString(),o.querySelector(".js-paymentPrice").innerHTML=`NT$ ${s}`,o.querySelector(".js-dueDate").innerHTML=`${b.exec(n)[1]} 23:59:59`}
