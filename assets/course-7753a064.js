import{c as re,i as _,a as x,u as I}from"./backtotop-257d1cbf.js";import{h as ce}from"./startCourse-477ed2b7.js";let H=document.querySelector("#js-filter-bar"),R=document.querySelector("#js-sticky-mt");const U=document.querySelector(".navbar");window.addEventListener("scroll",()=>{let t;window.innerWidth<375?t=120:window.innerWidth<768?t=300:t=418,window.scrollY<t?(H.style.boxShadow="",R.style.marginTop="",U.style.display="block"):(H.style.boxShadow="0 10px 6px -6px rgba(0, 0, 0, 0.15)",R.style.marginTop="78px",U.style.display="none")});window.addEventListener("resize",function(){(window.innerWidth||document.documentElement.clientWidth)<1200&&document.getElementById("collapseFilter").classList.add("show")});const Z=document.querySelectorAll(".js-selectedFiltersNum");let m=0;const P=document.querySelectorAll('input[name="filterStar"]'),b=document.querySelector("input[name='minPrice']"),y=document.querySelector("input[name='maxPrice']");let oe=document.querySelector("#accordionFilter");const G=document.querySelectorAll(".js-category"),ne=document.querySelector(".js-delFilterBtn");function $(){a.page=1,te(),f(a),ee()}P.forEach(t=>{t.addEventListener("change",s=>{ie(s.target.id)})});function ie(t){a.rate_gte={allStar:0,filterStar5:5,filterStar4:4,filterStar3:3,filterStar2:2,filterStar1:1}[t],$()}b.addEventListener("change",J);y.addEventListener("change",J);function J(){const t=parseInt(this.value.trim());let s,e;this===b?(s=F,e=a.price_gte):this===y&&(s=M,e=a.price_lte),isNaN(t)?e!==s&&(this===b?a.price_gte=t:this===y&&(a.price_lte=t),$()):t!==e&&(this===b?a.price_gte=t:this===y&&(a.price_lte=t),$())}let K=sessionStorage.getItem("cateItemName");K&&document.addEventListener("DOMContentLoaded",de);function de(){const t=document.querySelector(`#${K}`);if(t.checked=!0,t.classList.contains("js-selectAll")){const s=document.querySelectorAll(`input[id^="${t.name}"]:not([id="${t.name}"])`);s.length&&(s.forEach(e=>{e.checked=!0,j()}),a.page=1,f(a),ee())}else if(t.type="checkbox"){const s=t.closest(".accordion-item").querySelector(".js-selectAll"),e=t.closest(".accordion-body").querySelectorAll(".js-category");Q(s,e),j(),$()}sessionStorage.removeItem("cateItemName")}oe.addEventListener("change",t=>{const s=t.target;if(s.classList.contains("js-selectAll")){const e=s.checked,r=document.querySelectorAll(`input[id^="${s.name}"]:not([id="${s.name}"])`);r.length&&r.forEach(c=>{c.checked=e})}else if(s.type="checkbox"){const e=s.closest(".accordion-item").querySelector(".js-selectAll"),r=s.closest(".accordion-body").querySelectorAll(".js-category");Q(e,r)}j(),$()});function j(){a.filters="";let t="",s="";G.forEach(e=>{e.checked&&(e.value==="入門"||e.value==="進階"?(s=`&level_like=${e.value}`,a.filters+=s):(ue(e.value)?(t=`&categories_like=\\b${e.value}\\b`,e.value==="C"&&(t+="(?!%23)")):(t=`&categories_like=${W(e.value)}`,console.log(W(e.value)),console.dir(e)),a.filters+=t))})}function ue(t){return/^[a-zA-Z]+$/.test(t)}function W(t){return t.replace(/[!@#$%^&*()\s]/g,function(s){return encodeURIComponent(s)})}function Q(t,s){const e=[...s];t.checked=e.every(r=>r.checked)}function ee(){P[0].checked||m++,(b.value||y.value)&&m++,G.forEach(t=>{t.checked&&m++}),Z.forEach(t=>t.innerHTML=m),m=0}function fe(t){const s=document.querySelectorAll(".js-filterRatingNum"),e=document.querySelectorAll("[data-category]"),r=s.length,c=e.length,n={5:0,4:0,3:0,2:0,1:0},o={};for(let l=0;l<e.length;l++){let i=e[l].dataset.category;o[i]=0}t.forEach(l=>{const i=Math.floor(parseFloat(l.rate));if(i>=1)for(let d=1;d<=i;d++)n[d]++;l.categories.forEach(d=>{o[d]++}),o[l.level]++});for(let l=0;l<r;l++)s[l].innerHTML=`(${n[r-l]} 筆)`;for(let l=0;l<c;l++){let i=e[l].dataset.category;e[l].innerHTML=`(${o[i]})`}}ne.addEventListener("click",pe);function pe(){b.value="",y.value="",P[0].checked=!0,document.querySelectorAll(".js-selectAll, .js-category").forEach(s=>s.checked=!1),a.rate_gte=0,a.rate_lte=5,a.price_gte=F,a.price_lte=M,a.filters="",me(),$()}function me(){m=0,Z.forEach(t=>t.innerHTML=m)}function te(){window.scrollTo({top:350,left:0,behavior:"smooth"})}const se=document.querySelector(".pagination");se.addEventListener("click",t=>{const s=t.target.closest("[data-page]");if(s){t.preventDefault();const{page:e}=s.dataset;switch(e){case"prev":a.page-=1;break;case"next":a.page+=1;break;default:a.page=Number(e)}f(a),te()}});const A=document.querySelector("#courseList"),ge=/^(\d{4}-\d{2}-\d{2}).*/,z=/\B(?=(?:\d{3})+(?!\d))/g,he=re.replace("course","course_intro");A&&ce(A);function V(){const t=document.querySelectorAll("input");q?t.forEach(s=>{s.disabled=!0}):t.forEach(s=>{s.disabled=!1})}function O(){ye();let t="";q?t+=`
      <div class="d-flex justify-content-center mt-4">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      `:w.length!==0?w.forEach(async e=>{var r,c,n,o,l,i,d,h,v,S,k,u,L,B,D;t+=`
          <li class="card flex-row flex-wrap flex-md-nowrap shadow">
            <div class="d-flex flex-grow-1 p-4 p-lg-8">
              <!--  老師區塊 -->
              <div
                class="d-flex flex-column align-items-center min-w-100px w-100px min-w-md-150px w-md-150px bg-white me-4"
              >
                <!-- 愛心 -->
                <button
                  type="button"
                  class="btn p-0 text-center align-self-start follow-btn ${g.includes(e.id)?"following":"not-follow"}"
                  data-bs-target="#loginModal"
                  ${_?"":'data-bs-toggle="modal"'}
                >
                  <i
                    class="fa-regular fa-heart fs-3 text-primary hover-bold ${g.includes(e.id)?"fw-bold":""}" data-buttonId="${e.id}"
                  ></i>
                </button>
  
                <a href="#" class="text-center">
                  <!-- 圖 -->
                  <div class="mb-2 w-100px h-100px">
                    <img
                      class="img-fluid rounded-circle p-1 p-md-0"
                      src="${(r=e.teacher)==null?void 0:r.avatar}"
                      alt="teacher"
                    />
                  </div>
                  <!-- 姓名、職稱 -->
                  <h3 class="fs-7 fs-md-6 text-secondary2 fw-bold mb-1">
                    ${(c=e.teacher)==null?void 0:c.name}
                  </h3>
                </a>
                <p class="fs-sm fs-md-7 text-secondary2 text-center mb-2">
                  ${(n=e.teacher)==null?void 0:n.title}
                </p>
                <ul class="text-center text-gray-300 fs-sm fs-md-7 mb-2">
                  <li class="d-flex align-items-center">
                    <img src="https://raw.githubusercontent.com/Peg-L/project-code/89a637dfbea6e49a34b11aacf46dc07a001b4a90/assets/images/star.svg" />
                    <span class="fw-bold me-1"> ${(o=e.teacher)==null?void 0:o.rate} </span>
                    講師評等
                  </li>
                  <li>${(l=e.teacher)==null?void 0:l.total_students} 位學生</li>
                  <li>${(i=e.teacher)==null?void 0:i.total_courses} 門課程</li>
                </ul>
                <!-- link -->
                <ul class="d-flex justify-content-center mb-0">
                  <li class="me-1">
                    <a href="${(d=e.teacher)==null?void 0:d.links_codepen}" class="p-1" target="_blank">
                      <i class="fa-brands fa-github"></i
                    ></a>
                  </li>
                  <li class="me-1">
                    <a href="${(h=e.teacher)==null?void 0:h.links_github}" class="p-1" target="_blank">
                      <i class="fa-brands fa-linkedin-in"></i
                    ></a>
                  </li>
                  <li>
                    <a href="${(v=e.teacher)==null?void 0:v.links_linkedin}" class="p-1" target="_blank">
                      <i class="fa-brands fa-codepen"></i
                    ></a>
                  </li>
                </ul>
              </div>
              <!--  課程區塊 -->
              <div class="flex-grow-1">
                <!-- 課程名稱 -->
                <h3 class="card-title fs-6 fs-sm-4 ">
                  ${e.name}
                </h3>
                <!-- 優質標籤 -->
                ${Array.isArray(e.badges)?`<ul class="d-flex gap-2 mb-2">
                  ${e.badges.map(p=>`<li class="badge bg-primary fw-normal fs-sm fs-lg-7">${p}</li>`).join("")}</ul>`:""}
  
                <!-- 課程tag -->
                ${Array.isArray(e.tags)?`<ul class="d-flex flex-wrap mb-1 mb-sm-2 column-gap-1">
                  ${e.tags.map(p=>`<li class="text-primary text-nowrap fs-sm fs-md-7">
                    #${p}
                  </li>`).join("")}
                </ul>`:""}
  
                <!-- 課程評價、難度 -->
                <div class="d-flex">
                  <a
                    href="#"
                    class="d-flex align-items-center mb-1 mb-sm-2 mb-md-4"
                  >
                    <img src="https://raw.githubusercontent.com/Peg-L/project-code/89a637dfbea6e49a34b11aacf46dc07a001b4a90/assets/images/star.svg" alt="star" />
                    <span class="fw-bold fs-sm fs-md-7 ms-1">${e.rate}</span>
                    ・
                    <span class="fs-sm fs-md-7 me-2">${e.commentNum} 個評論</span>
                  </a>
                  <p class="text-gray-300">| ${e.level}</p>
                </div>
                <!-- 課程介紹 -->
                <p
                  class="fs-sm fs-sm-7 fs-md-6 text-justify truncate-lines-2 truncate-md-lines-4"
                >${e.info}
                </p>
                <hr />
                <!-- 課程篩選tag -->
                <div>
                  <h4
                    class="text-secondary2 fs-7 fs-sm-6 fs-md-5 mb-2 mb-sm-3"
                  >
                    你可以跟我學
                  </h4>
                  ${Array.isArray(e.categories)?`
                    <ul class="d-flex flex-wrap gap-1 gap-md-2 mb-0">
                      ${e.categories.map(p=>`
                          <li>
                            <span class="badge text-bg-secondary text-gray-300 fs-sm fs-md-6">
                              ${p}
                            </span>
                          </li>`).join("")}
                    </ul>`:""}
                </div>
                <hr />
                <!-- 收合內容 -->
                <div class="collapse" id="collapseCourse${e.id}">
                  <!-- 你將獲得 -->
                  <div>
                    <h4 class="text-secondary2 fs-7 fs-sm-5 mb-2 mb-sm-3">
                      你將獲得
                    </h4>
                    ${Array.isArray(e.mainPoints)?`<ul>
                          ${e.mainPoints.map(p=>`
                        <li class="list-check fs-sm fs-sm-7 fs-md-6">
                          ${p}
                        </li>`).join("")}`:""}
                    </ul>
  
                  </div>
                  <hr />
                  <!-- 評價 -->
                  <div>
                    <h4 class="text-secondary2 fs-7 fs-sm-5 mb-2 mb-sm-3">
                      精選評價
                    </h4>
                    <p
                      class="fs-sm fs-sm-7 fs-md-6 text-justify mb-1 mb-md-2"
                    >
                     ${(S=e.comment)==null?void 0:S.content}
                    </p>
                    <div
                      class="d-flex justify-content-end align-items-center"
                    >
                      <img
                        class="me-2 d-none d-md-block w-40px h-40px"
                        src="${(u=(k=e.comment)==null?void 0:k.user)==null?void 0:u.avatar}"
                        alt="student"
                      />
                      <div class="d-flex flex-md-column fs-sm fs-md-7">
                        <p class="fw-bold me-2 me-md-0">${(B=(L=e.comment)==null?void 0:L.user)==null?void 0:B.name}</p>
                        <p>${ge.exec((D=e.comment)==null?void 0:D.date)[1]}</p>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
                <!-- 瀏覽更多 -->
                <button
                  class="btn btn-gray fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4 float-end readMore"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseCourse${e.id}"
                  aria-expanded="false"
                  aria-controls="collapseCourse${e.id}"
                ></button>
              </div>
            </div>
            <!--  按鈕區塊 -->
            <div
              class="card-footer card-md-horizontal min-w-lg-250px w-lg-250px min-w-md-200px w-md-200px gap-2 gap-sm-6 p-4 p-md-8"
            >
              <!-- 價格 -->
              <div
                class="d-flex justify-content-center flex-md-column flex-lg-row gap-2 gap-sm-4"
              >
                <p class="text-nowrap text-center fs-sm fs-sm-6">
                  <span class="fw-bold fs-7 fs-sm-5">
                    NT$ ${e.price*.5.toString().replace(z,",")}
                    </span><br />體驗價
                </p>
                <p class="text-nowrap text-center fs-sm fs-sm-6">
                  <span class="fw-bold fs-7 fs-sm-5">
                    NT$ ${e.price.toString().replace(z,",")}
                  </span>
                  <br />${e.duration}分鐘
                </p>
              </div>
              <!-- 購買按鈕 -->
              <button
                type="button"
                class="btn btn-secondary2 w-100 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
                data-course="${e.id}"
                data-bs-target="#loginModal"
                ${_?"":'data-bs-toggle="modal"'}
              >
                立即上課
              </button>
              <a
                href="${he}?courseId=${e.id}"
                class="btn btn-white w-100 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
              >
                查看介紹
              </a>
            </div>
          </li>
        `}):t+=`
      <div class="d-flex flex-column justify-content-center text-center h-100 px-10">
        <p class="fs-3 mb-4">沒有符合條件的課程</p>
        <p class="fs-6">
          看起來目前沒有符合您需求的課程，請嘗試修改您的搜尋詞彙或篩選條件。
        </p>
      </div>`,A.innerHTML=t;let s=document.querySelectorAll(".follow-btn");s&&_&&s.forEach(e=>{e.addEventListener("click",function(){e.classList.contains("following")?X(e,!0):X(e,!1)})})}function be(){const t=[...Array(N)].map((r,c)=>`<li class="page-item ${a.page===c+1?"active":""}" aria-current="page">
  <a class="page-link" href="#" data-page="${c+1}">${c+1}</a>
</li>`),s=`<li class="page-item ${a.page===1?"disabled":""} ">
  <a
    class="page-link"
    href="#"
    aria-label="Previous" data-page="prev"
  >
    <i class="fa-solid fa-angle-left" ></i>
  </a>
</li>`,e=`<li class="page-item ${a.page===N?"disabled":""}">
<a class="page-link" href="#" aria-label="Next" data-page="next">
  <i class="fa-solid fa-angle-right"></i>
</a>
</li>`;se.innerHTML=s+t.join("")+e}let g=[];async function ye(){_?(g=(await x.get(`http://localhost:3000/users/${I}`)).data.followList,console.log(g)):console.log("沒有登入")}function X(t,s){let e=t.querySelector("i.fa-regular.fa-heart"),r=Number(e.dataset.buttonid);Swal.fire({title:s?"確定要取消追蹤課程?":"確定要追蹤課程?",showDenyButton:!0,confirmButtonColor:"#115BC9",confirmButtonText:s?"取消追蹤":"確認",denyButtonText:s?"我再想想":"取消"}).then(async c=>{if(c.isConfirmed)if(Swal.fire({position:"center",icon:"success",title:s?"已取消追蹤":"成功追蹤",showConfirmButton:!1,timer:1500}),t.classList.toggle("not-follow"),t.classList.toggle("following"),e.classList.toggle("fw-bold"),s){let n=g.filter(o=>o!=r);x.patch(`http://localhost:3000/users/${I}`,{followList:n}).then(o=>{}).catch(o=>{console.error(o)})}else g.push(r),await x.patch(`http://localhost:3000/users/${I}`,{followList:g})}).catch(c=>{console.error(c)})}let xe=document.querySelector(".js-totalSearchNum"),w=[],C,N;const F=0,M=9999;let a={page:1,limit:10,sort:"",order:0,q:"",rate_gte:0,rate_lte:5,price_gte:F,price_lte:M,filters:"",sort:"",order:"desc"},q=!1;$e();function $e(){const t=localStorage.getItem("indexSearchInput"),s=sessionStorage.getItem("cateItemName"),e=localStorage.getItem("redirectToPopular");console.log(e),!t&&!s&&!e&&f(a),ve(a)}async function f({page:t,limit:s,q:e,rate_gte:r,rate_lte:c,price_gte:n,price_lte:o,filters:l,sort:i,order:d}){try{const h=`http://localhost:3000/courses?_expand=teacher&_page=${t}&_limit=${s}&q=${e}&rate_gte=${r}&rate_lte=${c}&price_gte=${n}&price_lte=${o}${l}&_sort=${i}&_order=${d}`;q=!0,O(),V();const v=await x.get(h);w=v.data,C=parseInt(v.headers.get("X-Total-Count")),xe.innerHTML=`共 ${C} 個結果`;const S=w.map(u=>`http://localhost:3000/comments/${u.commentId}?_expand=user`),k=await Promise.all(S.map(u=>x.get(u)));w.forEach((u,L)=>{u.comment=k[L].data}),q=!1,O(),V(),N=Math.ceil(parseInt(C)/parseInt(a.limit)),be()}catch(h){console.log("courseError",h)}}async function ve({q:t,rate_gte:s,rate_lte:e,price_gte:r,price_lte:c,filters:n}){try{const o=`http://localhost:3000/courses?&q=${t}&rate_gte=${s}&rate_lte=${e}&price_gte=${r}&price_lte=${c}${n}`,l=await x.get(o);fe(l.data)}catch(o){console.log("getAllData",o)}}const Y=localStorage.getItem("indexSearchInput");Y&&(a.q=Y,f(a),a.q="",localStorage.removeItem("indexSearchInput"));const E=document.querySelector(".course-search-input");let T="";E.addEventListener("input",function(){T=E.value});const ae=document.querySelector(".course-search-button");ae.addEventListener("click",function(){a.q=T,f(a),E.value="",T=""});E.addEventListener("keyup",function(t){t.key==="Enter"&&ae.click()});const le=document.querySelector(".js-sortBy .dropdown-toggle"),we=document.querySelector(".js-sortBy .dropdown-menu"),Se=localStorage.getItem("redirectToPopular");async function ke(){if(Se){const t="commentNum";a.sort!==t&&(a.sort=t,le.innerHTML="排序依據：最熱門",a.page=1,await f(a),localStorage.removeItem("redirectToPopular"))}}ke();we.addEventListener("click",t=>{const{order:s}=t.target.dataset;s&&a.sort!==s&&(a.sort=s,le.innerHTML=`排序依據：${t.target.textContent}`,a.page=1,f(a))});
