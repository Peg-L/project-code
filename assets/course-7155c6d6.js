import{c as le,i as j,h as ne,a as b,u as I}from"./backtotop-407cb22f.js";import{h as oe}from"./startCourse-732c2962.js";let U=document.querySelector("#js-filter-bar"),W=document.querySelector("#js-sticky-mt");const z=document.querySelector(".navbar");window.addEventListener("scroll",()=>{let t;window.innerWidth<375?t=120:window.innerWidth<768?t=300:t=418,window.scrollY<t?(U.style.boxShadow="",W.style.marginTop="",z.style.display="block"):(U.style.boxShadow="0 10px 6px -6px rgba(0, 0, 0, 0.15)",W.style.marginTop="78px",z.style.display="none")});window.addEventListener("resize",function(){(window.innerWidth||document.documentElement.clientWidth)<1200&&document.getElementById("collapseFilter").classList.add("show")});const G=document.querySelectorAll(".js-selectedFiltersNum");let u=0;const P=document.querySelectorAll('input[name="filterStar"]'),g=document.querySelector("input[name='minPrice']"),h=document.querySelector("input[name='maxPrice']");let ie=document.querySelector("#accordionFilter");const J=document.querySelectorAll(".js-category"),de=document.querySelector(".js-delFilterBtn");function $(){a.page=1,M(),o(a),F(),Le(a)}function ue(){a.page=1,M(),o(a),F()}P.forEach(t=>{t.addEventListener("change",s=>{fe(s.target.id)})});function fe(t){a.rate_gte={allStar:0,filterStar5:5,filterStar4:4,filterStar3:3,filterStar2:2,filterStar1:1}[t],ue()}g.addEventListener("change",K);h.addEventListener("change",K);function K(){const t=parseInt(this.value.trim());let s,e;this===g?(s=B,e=a.price_gte):this===h&&(s=D,e=a.price_lte),isNaN(t)?(this===g?a.price_gte=s:this===h&&(a.price_lte=s),$()):t!==e&&(this===g?a.price_gte=t:this===h&&(a.price_lte=t),$())}let Q=sessionStorage.getItem("cateItemName");Q&&document.addEventListener("DOMContentLoaded",pe);function pe(){const t=document.querySelector(`#${Q}`);if(t.checked=!0,t.classList.contains("js-selectAll")){const s=document.querySelectorAll(`input[id^="${t.name}"]:not([id="${t.name}"])`);s.length&&(s.forEach(e=>{e.checked=!0,A()}),a.page=1,o(a),F())}else if(t.type="checkbox"){const s=t.closest(".accordion-item").querySelector(".js-selectAll"),e=t.closest(".accordion-body").querySelectorAll(".js-category");ee(s,e),A(),$()}sessionStorage.removeItem("cateItemName")}ie.addEventListener("change",t=>{const s=t.target;if(s.classList.contains("js-selectAll")){const e=s.checked,c=document.querySelectorAll(`input[id^="${s.name}"]:not([id="${s.name}"])`);c.length&&c.forEach(r=>{r.checked=e})}else if(s.type="checkbox"){const e=s.closest(".accordion-item").querySelector(".js-selectAll"),c=s.closest(".accordion-body").querySelectorAll(".js-category");ee(e,c)}A(),$()});function A(){a.filters="";let t="",s="";J.forEach(e=>{e.checked&&(e.value==="入門"||e.value==="進階"?(s=`&level_like=${e.value}`,a.filters+=s):(me(e.value)?(t=`&categories_like=\\b${e.value}\\b`,e.value==="C"&&(t+="(?!%23)")):(t=`&categories_like=${O(e.value)}`,console.log(O(e.value)),console.dir(e)),a.filters+=t))})}function me(t){return/^[a-zA-Z]+$/.test(t)}function O(t){return t.replace(/[!@#$%^&*()\s]/g,function(s){return encodeURIComponent(s)})}function ee(t,s){const e=[...s];t.checked=e.every(c=>c.checked)}function F(){P[0].checked||u++,(g.value||h.value)&&u++,J.forEach(t=>{t.checked&&u++}),G.forEach(t=>t.innerHTML=u),u=0}function te(t){const s=document.querySelectorAll(".js-filterRatingNum"),e=s.length,c={5:0,4:0,3:0,2:0,1:0};t.forEach(r=>{const l=Math.floor(parseFloat(r.rate));if(l>=1)for(let n=1;n<=l;n++)c[n]++});for(let r=0;r<e;r++)s[r].innerHTML=`(${c[e-r]} 筆)`}function ge(t){const s=document.querySelectorAll("[data-category]"),e=s.length,c={};for(let r=0;r<s.length;r++){let l=s[r].dataset.category;c[l]=0}t.forEach(r=>{r.categories.forEach(l=>{c[l]++}),c[r.level]++});for(let r=0;r<e;r++){let l=s[r].dataset.category;s[r].innerHTML=`(${c[l]})`}}de.addEventListener("click",he);function he(){g.value="",h.value="",P[0].checked=!0,document.querySelectorAll(".js-selectAll, .js-category").forEach(s=>s.checked=!1),a.rate_gte=0,a.rate_lte=5,a.price_gte=B,a.price_lte=D,a.filters="",be(),$()}function be(){u=0,G.forEach(t=>t.innerHTML=u)}function M(){window.scrollTo({top:350,left:0,behavior:"smooth"})}const se=document.querySelector(".pagination");se.addEventListener("click",t=>{const s=t.target.closest("[data-page]");if(s){t.preventDefault();const{page:e}=s.dataset;switch(e){case"prev":a.page-=1;break;case"next":a.page+=1;break;default:a.page=Number(e)}o(a),M()}});const N=document.querySelector("#courseList"),ye=/^(\d{4}-\d{2}-\d{2}).*/,V=/\B(?=(?:\d{3})+(?!\d))/g,xe=le.replace("course","course_intro");N&&oe(N);function X(){const t=document.querySelectorAll("input");_?t.forEach(s=>{s.disabled=!0}):t.forEach(s=>{s.disabled=!1})}function Y(){ve();let t="";_?t+=`
      <div class="d-flex justify-content-center mt-4">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      `:m.length!==0?m.forEach(async e=>{var c,r,l,n,y,v,w,p,x,S,k,i,L,R,H;t+=`
          <li class="card flex-row flex-wrap flex-md-nowrap shadow">
            <div class="d-flex flex-grow-1 p-4 p-lg-8">
              <!--  老師區塊 -->
              <div
                class="d-flex flex-column align-items-center min-w-100px w-100px min-w-md-150px w-md-150px bg-white me-4"
              >
                <!-- 愛心 -->
                <button
                  type="button"
                  class="btn p-0 text-center align-self-start follow-btn ${f.includes(e.id)?"following":"not-follow"}"
                  data-bs-target="#loginModal"
                  ${j?"":'data-bs-toggle="modal"'}
                >
                  <i
                    class="fa-regular fa-heart fs-3 text-primary hover-bold ${f.includes(e.id)?"fw-bold":""}" data-buttonId="${e.id}"
                  ></i>
                </button>
  
                <a href="#" class="text-center">
                  <!-- 圖 -->
                  <div class="mb-2 w-100px h-100px">
                    <img
                      class="img-fluid rounded-circle p-1 p-md-0"
                      src="${(c=e.teacher)==null?void 0:c.avatar}"
                      alt="teacher"
                    />
                  </div>
                  <!-- 姓名、職稱 -->
                  <h3 class="fs-7 fs-md-6 text-secondary2 fw-bold mb-1">
                    ${(r=e.teacher)==null?void 0:r.name}
                  </h3>
                </a>
                <p class="fs-sm fs-md-7 text-secondary2 text-center mb-2">
                  ${(l=e.teacher)==null?void 0:l.title}
                </p>
                <ul class="text-center text-gray-300 fs-sm fs-md-7 mb-2">
                  <li class="d-flex align-items-center">
                    <img src="https://raw.githubusercontent.com/Peg-L/project-code/89a637dfbea6e49a34b11aacf46dc07a001b4a90/assets/images/star.svg" />
                    <span class="fw-bold me-1"> ${(n=e.teacher)==null?void 0:n.rate} </span>
                    講師評等
                  </li>
                  <li>${(y=e.teacher)==null?void 0:y.total_students} 位學生</li>
                  <li>${(v=e.teacher)==null?void 0:v.total_courses} 門課程</li>
                </ul>
                <!-- link -->
                <ul class="d-flex justify-content-center mb-0">
                  <li class="me-1">
                    <a href="${(w=e.teacher)==null?void 0:w.links_codepen}" class="p-1" target="_blank">
                      <i class="fa-brands fa-github"></i
                    ></a>
                  </li>
                  <li class="me-1">
                    <a href="${(p=e.teacher)==null?void 0:p.links_github}" class="p-1" target="_blank">
                      <i class="fa-brands fa-linkedin-in"></i
                    ></a>
                  </li>
                  <li>
                    <a href="${(x=e.teacher)==null?void 0:x.links_linkedin}" class="p-1" target="_blank">
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
                  ${e.badges.map(d=>`<li class="badge bg-primary fw-normal fs-sm fs-lg-7">${d}</li>`).join("")}</ul>`:""}
  
                <!-- 課程tag -->
                ${Array.isArray(e.tags)?`<ul class="d-flex flex-wrap mb-1 mb-sm-2 column-gap-1">
                  ${e.tags.map(d=>`<li class="text-primary text-nowrap fs-sm fs-md-7">
                    #${d}
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
                      ${e.categories.map(d=>`
                          <li>
                            <span class="badge text-bg-secondary text-gray-300 fs-sm fs-md-6">
                              ${d}
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
                          ${e.mainPoints.map(d=>`
                        <li class="list-check fs-sm fs-sm-7 fs-md-6">
                          ${d}
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
                        class="me-2 d-none d-md-block w-40px h-40px rounded-circle"
                        src="${(i=(k=e.comment)==null?void 0:k.user)==null?void 0:i.avatar}"
                        alt="student"
                      />
                      <div class="d-flex flex-md-column fs-sm fs-md-7">
                        <p class="fw-bold me-2 me-md-0">${(R=(L=e.comment)==null?void 0:L.user)==null?void 0:R.name}</p>
                        <p>${ye.exec((H=e.comment)==null?void 0:H.date)[1]}</p>
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
                    NT$ ${e.price*.5.toString().replace(V,",")}
                    </span><br />體驗價
                </p>
                <p class="text-nowrap text-center fs-sm fs-sm-6">
                  <span class="fw-bold fs-7 fs-sm-5">
                    NT$ ${e.price.toString().replace(V,",")}
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
                ${j?"":'data-bs-toggle="modal"'}
              >
                立即上課
              </button>
              <a
                href="${xe}?courseId=${e.id}"
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
      </div>`,N.innerHTML=t;let s=document.querySelectorAll(".follow-btn");s.forEach(e=>{e.addEventListener("click",function(){s&&j?e.classList.contains("following")?Z(e,!0):Z(e,!1):ne()})})}function $e(){const t=[...Array(T)].map((c,r)=>`<li class="page-item ${a.page===r+1?"active":""}" aria-current="page">
  <a class="page-link" href="#" data-page="${r+1}">${r+1}</a>
</li>`),s=`<li class="page-item ${a.page===1?"disabled":""} ">
  <a
    class="page-link"
    href="#"
    aria-label="Previous" data-page="prev"
  >
    <i class="fa-solid fa-angle-left" ></i>
  </a>
</li>`,e=`<li class="page-item ${a.page===T?"disabled":""}">
<a class="page-link" href="#" aria-label="Next" data-page="next">
  <i class="fa-solid fa-angle-right"></i>
</a>
</li>`;se.innerHTML=s+t.join("")+e}let f=[];async function ve(){j?(f=(await b.get(`https://project-code-json-k0ti.onrender.com/users/${I}`)).data.followList,console.log(f)):console.log("沒有登入")}function Z(t,s){let e=t.querySelector("i.fa-regular.fa-heart"),c=Number(e.dataset.buttonid);Swal.fire({title:s?"確定要取消收藏課程?":"確定要收藏課程?",showDenyButton:!0,confirmButtonColor:"#115BC9",confirmButtonText:s?"取消收藏":"確認",denyButtonText:s?"我再想想":"取消"}).then(async r=>{if(r.isConfirmed)if(Swal.fire({position:"center",icon:"success",title:s?"已取消收藏":"成功收藏",text:s?"":"可至會員中心「我的收藏」中查看",showConfirmButton:!1,timer:1500}),t.classList.toggle("not-follow"),t.classList.toggle("following"),e.classList.toggle("fw-bold"),s){let l=f.filter(n=>n!=c);b.patch(`https://project-code-json-k0ti.onrender.com/users/${I}`,{followList:l}).then(n=>{}).catch(n=>{console.error(n)})}else f.push(c),await b.patch(`https://project-code-json-k0ti.onrender.com/users/${I}`,{followList:f})}).catch(r=>{console.error(r)})}let we=document.querySelector(".js-totalSearchNum"),m=[],E,T;const B=0,D=9999;let a={page:1,limit:10,sort:"",order:0,q:"",rate_gte:0,rate_lte:5,price_gte:B,price_lte:D,filters:"",sort:"",order:"desc"},_=!1;Se();function Se(){const t=localStorage.getItem("indexSearchInput"),s=sessionStorage.getItem("cateItemName"),e=localStorage.getItem("redirectToPopular");!t&&!s&&!e&&o(a),ke(a)}async function o({page:t,limit:s,q:e,rate_gte:c,rate_lte:r,price_gte:l,price_lte:n,filters:y,sort:v,order:w}){try{const p=`https://project-code-json-k0ti.onrender.com/courses?_expand=teacher&_expand=comment&_page=${t}&_limit=${s}&q=${e}&rate_gte=${c}&rate_lte=${r}&price_gte=${l}&price_lte=${n}${y}&_sort=${v}&_order=${w}`;_=!0,Y(),X();const x=await b.get(p);m=x.data,console.log("currentPageCourses",m),E=parseInt(x.headers.get("X-Total-Count")),we.innerHTML=`共 ${E} 個結果`;const S=m.map(i=>`https://project-code-json-k0ti.onrender.com/comments/${i.commentId}?_expand=user`),k=await Promise.all(S.map(i=>b.get(i)));m.forEach((i,L)=>{i.comment=k[L].data}),_=!1,Y(),X(),T=Math.ceil(parseInt(E)/parseInt(a.limit)),$e()}catch(p){console.log("courseError",p)}}async function ae({q:t,rate_gte:s,rate_lte:e,price_gte:c,price_lte:r,filters:l}){try{const n=`https://project-code-json-k0ti.onrender.com/courses?&q=${t}&rate_gte=${s}&rate_lte=${e}&price_gte=${c}&price_lte=${r}${l}`;return(await b.get(n)).data}catch(n){console.log("getAllData",n)}}async function ke(t){const s=await ae(t);te(s),ge(s)}async function Le(t){const s=await ae(t);te(s)}const q=document.querySelector(".course-search-input"),C=localStorage.getItem("indexSearchInput");C&&(q.value=C,a.q=C,o(a),a.q="",localStorage.removeItem("indexSearchInput"));const re=document.querySelector(".course-search-button");re.addEventListener("click",function(){a.q=q.value,o(a)});q.addEventListener("keyup",function(t){t.key==="Enter"&&re.click()});const je=document.querySelector(".clear-input");je.addEventListener("click",function(){q.value=""});const ce=document.querySelector(".js-sortBy .dropdown-toggle"),_e=document.querySelector(".js-sortBy .dropdown-menu"),qe=localStorage.getItem("redirectToPopular");async function Ee(){if(qe){const t="commentNum";a.sort!==t&&(a.sort=t,ce.innerHTML="排序依據：最熱門",a.page=1,await o(a),localStorage.removeItem("redirectToPopular"))}}Ee();_e.addEventListener("click",t=>{const{order:s}=t.target.dataset;s&&a.sort!==s&&(a.sort=s,ce.innerHTML=`排序依據：${t.target.textContent}`,a.page=1,o(a))});
