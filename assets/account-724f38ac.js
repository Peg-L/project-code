import{a as g}from"./axios-21b846bc.js";const m=document.querySelectorAll("#change"),A=document.querySelectorAll("#saveBtn"),v=document.querySelectorAll("#btnBlock"),y=document.querySelectorAll("#date"),B=document.querySelectorAll("#time");console.log(m);m.forEach((o,e)=>{o.addEventListener("click",f=>{y[e].toggleAttribute("disabled"),B[e].toggleAttribute("disabled"),v[e].classList.toggle("hidden"),o.toggleAttribute("disabled")})});A.forEach((o,e)=>{o.addEventListener("click",f=>{y[e].toggleAttribute("disabled"),B[e].toggleAttribute("disabled"),v[e].classList.toggle("hidden"),m[e].toggleAttribute("disabled")})});const b="http://localhost:3000";userId=2;let w=1;document.addEventListener("DOMContentLoaded",async function(){async function o(a){try{let l=(await g.get(`${b}/users`)).data[userId-1].followList;console.log("追蹤列表",l);let n=`${b}/courses?_expand=teacher&_page=${a}&_limit=6`;l.forEach(i=>{n+=`&id=${i}`}),console.log(n);let r=(await g.get(`${n}`)).data;console.log("追蹤的課程資料",r);const c=document.querySelector("#followList");let u="";r.forEach(i=>{u+=`<div class="col"><div class="card teacher-card swiper-slide h-100"><button
        type="button"
        class="btn p-3 text-center align-self-start position-absolute top-0 end-0 following"
      >
        <i class="fa-regular fa-heart fs-4 text-primary fw-bold" data-buttonId="${i.id}"></i>
      </button>
    <div class="card-body d-flex justify-content-between">
      <div>
        <h5 class="card-title teacher-card-title truncate-lines-2">${i.name}
        </h5>
        <p class="teacher-card-name">${i.teacher.name}</p>
        <ul class="teacher-card-object">
          <li class="teacher-card-evaluate">${i.rate}</li>
          <li class="teacher-card-hours">50分鐘</li>
        </ul>
        <p class="teacher-card-price">NT$<span>${i.price}</span></p>
      </div>
      <div class="teacher-card-img">
        <img
          src="${i.teacher.avatar}"
          alt="老師"
          class="w-100px w-sm-120px"
        />
      </div>
    </div>
    <div>
      <p class="teacher-card-text">
      ${i.info}
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
  </div></div>`}),c.innerHTML=u,$(a);let h=Math.ceil(l.length/6);return console.log("followTotalPages",h),{followTotalPages:h,followArray:l,courseData:r}}catch(t){console.log("錯誤",t)}}let{followArray:e,followTotalPages:f,courseData:S}=await o(w);function d(a,t,l){console.log("pageId 3",t);const n=document.querySelector(".followPagination");let s="";const r=`<li class="page-item prevButton ${t==1?"disabled":""}"><a class="page-link" href="#" aria-label="Previous"><i class="fa-solid fa-angle-left"></i></a></li>`;s+=r;for(let u=1;u<=l;u++){let h=`<li class="page-item ${u===t?"active":""} pageButton">
                        <a class="page-link" href="#">
                          ${u}
                        </a>
                      </li>`;s+=h}const c=`<li class="page-item nextButton ${t==l?"disabled":""}">
                    <a class="page-link" href="#" aria-label="Next">
                      <i class="fa-solid fa-angle-right"></i>
                    </a>
                  </li>`;s+=c,n.innerHTML=s,p(l,t)}d(e,w,f);function p(a,t,l){const n=document.querySelector(".prevButton"),s=document.querySelector(".nextButton");let r=document.querySelectorAll(".pageButton");n.addEventListener("click",function(){t>1&&(t--,d(e,t,a),o(t))}),s.addEventListener("click",function(){a>t&&(t++,console.log("pageId 頁數切換",t),d(e,t,a),o(t))}),r.forEach(c=>{c.addEventListener("click",()=>{t=Number(c.innerText),o(t),d(e,t,a)})})}p(f,w);function $(a){document.querySelectorAll(".following").forEach(l=>{l.addEventListener("click",n=>{console.log("點擊到了"),L(n,a)})})}async function L(a,t){let l=a.target.dataset.buttonid,n=e.filter(s=>s!=l);Swal.fire({title:"確定要取消追蹤?",showDenyButton:!0,confirmButtonColor:"#115BC9",confirmButtonText:"取消追蹤",denyButtonText:"我再想想"}).then(s=>{s.isConfirmed&&(Swal.fire({position:"center",icon:"success",title:"已取消追蹤",showConfirmButton:!1,timer:1500}),g.patch(`${b}/users/${userId}`,{followList:n}).then(async r=>{console.log(r);const c=await o(t);e=c.followArray,c.followTotalPages==1&&(t=1),o(t),d(e,t,c.followTotalPages)}))})}});
