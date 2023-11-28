import{a as g}from"./axios-21b846bc.js";const p=document.querySelectorAll("#change"),B=document.querySelectorAll("#saveBtn"),b=document.querySelectorAll("#btnBlock"),w=document.querySelectorAll("#date"),m=document.querySelectorAll("#time");p.forEach((a,t)=>{a.addEventListener("click",f=>{w[t].toggleAttribute("disabled"),m[t].toggleAttribute("disabled"),b[t].classList.toggle("hidden"),a.toggleAttribute("disabled")})});B.forEach((a,t)=>{a.addEventListener("click",f=>{w[t].toggleAttribute("disabled"),m[t].toggleAttribute("disabled"),b[t].classList.toggle("hidden"),p[t].toggleAttribute("disabled")})});const h="http://localhost:3000";let n=1,r=[],d=0,u=[];document.addEventListener("DOMContentLoaded",async function(){async function a(){try{r=(await g.get(`${h}/users/${userId}`)).data.followList,d=Math.ceil(r.length/6);let e="";if(r.length!=0){let o=`${h}/courses?_expand=teacher&_page=${n}&_limit=6`;r.forEach(l=>{o+=`&id=${l}`}),u=(await g.get(`${o}`)).data,console.log("追蹤的課程資料",u);const i=document.querySelector("#followList");u.forEach(l=>{e+=`<div class="col"><div class="card teacher-card swiper-slide h-100"><button
        type="button"
        class="btn p-3 text-center align-self-start position-absolute top-0 end-0 following"
      >
        <i class="fa-regular fa-heart fs-4 text-primary fw-bold" data-buttonId="${l.id}"></i>
      </button>
    <div class="card-body d-flex justify-content-between">
      <div>
        <h5 class="card-title teacher-card-title truncate-lines-2">${l.name}
        </h5>
        <p class="teacher-card-name">${l.teacher.name}</p>
        <ul class="teacher-card-object">
          <li class="teacher-card-evaluate">${l.rate}</li>
          <li class="teacher-card-hours">50分鐘</li>
        </ul>
        <p class="teacher-card-price">NT$<span>${l.price}</span></p>
      </div>
      <div class="teacher-card-img">
        <img
          src="${l.teacher.avatar}"
          alt="老師"
          class="w-100px w-sm-120px"
        />
      </div>
    </div>
    <div>
      <p class="teacher-card-text">
      ${l.info}
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
  </div></div>`})}else e='<p class="text-center fs-5">目前沒有追蹤任何課程</p>';followList.innerHTML=e,t(),f(),v()}catch(s){console.log("錯誤",s)}}a();function t(){const s=document.querySelector(".followPagination");let e="";if(d){const o=`<li class="page-item prevButton ${n==1?"disabled":""}"><a class="page-link" href="#" aria-label="Previous"><i class="fa-solid fa-angle-left"></i></a></li>`;e+=o;for(let i=1;i<=d;i++){let l=`<li class="page-item ${i===n?"active":""} pageButton">
                          <a class="page-link" href="#">
                            ${i}
                          </a>
                        </li>`;e+=l}const c=`<li class="page-item nextButton ${n==d?"disabled":""}">
                      <a class="page-link" href="#" aria-label="Next">
                        <i class="fa-solid fa-angle-right"></i>
                      </a>
                    </li>`;e+=c}s.innerHTML=e}function f(){const s=document.querySelector(".prevButton"),e=document.querySelector(".nextButton");let o=document.querySelectorAll(".pageButton");s.addEventListener("click",function(){n>1&&(n--,t(),a())}),e.addEventListener("click",function(){d>n&&(n++,t(),a())}),o.forEach(c=>{c.addEventListener("click",()=>{n=Number(c.innerText),a(),t()})})}function v(){document.querySelectorAll(".following").forEach(e=>{e.addEventListener("click",o=>{y(o)})})}async function y(s){let e=s.target.dataset.buttonid,o=r.filter(c=>c!=e);Swal.fire({title:"確定要取消追蹤?",showDenyButton:!0,confirmButtonColor:"#115BC9",confirmButtonText:"取消追蹤",denyButtonText:"我再想想"}).then(c=>{c.isConfirmed&&(Swal.fire({position:"center",icon:"success",title:"已取消追蹤",showConfirmButton:!1,timer:1500}),g.patch(`${h}/users/${userId}`,{followList:o}).then(async i=>{await a(),console.log(u),u.length==0&&(n--,a()),t()}))})}});
