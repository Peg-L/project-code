import{c as le,i as j,h as oe,a as b,u as I}from"./backtotop-407cb22f.js";import{h as ne}from"./startCourse-732c2962.js";let R=document.querySelector("#js-filter-bar"),H=document.querySelector("#js-sticky-mt");const U=document.querySelector(".navbar");window.addEventListener("scroll",()=>{let t;window.innerWidth<375?t=120:window.innerWidth<768?t=300:t=418,window.scrollY<t?(R.style.boxShadow="",H.style.marginTop="",U.style.display="block"):(R.style.boxShadow="0 10px 6px -6px rgba(0, 0, 0, 0.15)",H.style.marginTop="78px",U.style.display="none")});window.addEventListener("resize",function(){(window.innerWidth||document.documentElement.clientWidth)<1200&&document.getElementById("collapseFilter").classList.add("show")});const Y=document.querySelectorAll(".js-selectedFiltersNum");let u=0;const P=document.querySelectorAll('input[name="filterStar"]'),g=document.querySelector("input[name='minPrice']"),h=document.querySelector("input[name='maxPrice']");let ie=document.querySelector("#accordionFilter");const Z=document.querySelectorAll(".js-category"),de=document.querySelector(".js-delFilterBtn");function y(){a.page=1,te(),i(a),Q(),ke(a)}P.forEach(t=>{t.addEventListener("change",s=>{ue(s.target.id)})});function ue(t){a.rate_gte={allStar:0,filterStar5:5,filterStar4:4,filterStar3:3,filterStar2:2,filterStar1:1}[t],y()}g.addEventListener("change",G);h.addEventListener("change",G);function G(){const t=parseInt(this.value.trim());let s,e;this===g?(s=F,e=a.price_gte):this===h&&(s=M,e=a.price_lte),isNaN(t)?(this===g?a.price_gte=s:this===h&&(a.price_lte=s),y()):t!==e&&(this===g?a.price_gte=t:this===h&&(a.price_lte=t),y())}let J=sessionStorage.getItem("cateItemName");J&&document.addEventListener("DOMContentLoaded",fe);function fe(){const t=document.querySelector(`#${J}`);if(t.checked=!0,t.classList.contains("js-selectAll")){const s=document.querySelectorAll(`input[id^="${t.name}"]:not([id="${t.name}"])`);s.length&&(s.forEach(e=>{e.checked=!0,A()}),a.page=1,i(a),Q())}else if(t.type="checkbox"){const s=t.closest(".accordion-item").querySelector(".js-selectAll"),e=t.closest(".accordion-body").querySelectorAll(".js-category");K(s,e),A(),y()}sessionStorage.removeItem("cateItemName")}ie.addEventListener("change",t=>{const s=t.target;if(s.classList.contains("js-selectAll")){const e=s.checked,c=document.querySelectorAll(`input[id^="${s.name}"]:not([id="${s.name}"])`);c.length&&c.forEach(r=>{r.checked=e})}else if(s.type="checkbox"){const e=s.closest(".accordion-item").querySelector(".js-selectAll"),c=s.closest(".accordion-body").querySelectorAll(".js-category");K(e,c)}A(),y()});function A(){a.filters="";let t="",s="";Z.forEach(e=>{e.checked&&(e.value==="入門"||e.value==="進階"?(s=`&level_like=${e.value}`,a.filters+=s):(pe(e.value)?(t=`&categories_like=\\b${e.value}\\b`,e.value==="C"&&(t+="(?!%23)")):(t=`&categories_like=${W(e.value)}`,console.log(W(e.value)),console.dir(e)),a.filters+=t))})}function pe(t){return/^[a-zA-Z]+$/.test(t)}function W(t){return t.replace(/[!@#$%^&*()\s]/g,function(s){return encodeURIComponent(s)})}function K(t,s){const e=[...s];t.checked=e.every(c=>c.checked)}function Q(){P[0].checked||u++,(g.value||h.value)&&u++,Z.forEach(t=>{t.checked&&u++}),Y.forEach(t=>t.innerHTML=u),u=0}function ee(t){const s=document.querySelectorAll(".js-filterRatingNum"),e=s.length,c={5:0,4:0,3:0,2:0,1:0};t.forEach(r=>{const l=Math.floor(parseFloat(r.rate));if(l>=1)for(let o=1;o<=l;o++)c[o]++});for(let r=0;r<e;r++)s[r].innerHTML=`(${c[e-r]} 筆)`}function me(t){const s=document.querySelectorAll("[data-category]"),e=s.length,c={};for(let r=0;r<s.length;r++){let l=s[r].dataset.category;c[l]=0}t.forEach(r=>{r.categories.forEach(l=>{c[l]++}),c[r.level]++});for(let r=0;r<e;r++){let l=s[r].dataset.category;s[r].innerHTML=`(${c[l]})`}}de.addEventListener("click",ge);function ge(){g.value="",h.value="",P[0].checked=!0,document.querySelectorAll(".js-selectAll, .js-category").forEach(s=>s.checked=!1),a.rate_gte=0,a.rate_lte=5,a.price_gte=F,a.price_lte=M,a.filters="",he(),y()}function he(){u=0,Y.forEach(t=>t.innerHTML=u)}function te(){window.scrollTo({top:350,left:0,behavior:"smooth"})}const se=document.querySelector(".pagination");se.addEventListener("click",t=>{const s=t.target.closest("[data-page]");if(s){t.preventDefault();const{page:e}=s.dataset;switch(e){case"prev":a.page-=1;break;case"next":a.page+=1;break;default:a.page=Number(e)}i(a),te()}});const N=document.querySelector("#courseList"),be=/^(\d{4}-\d{2}-\d{2}).*/,z=/\B(?=(?:\d{3})+(?!\d))/g,ye=le.replace("course","course_intro");N&&ne(N);function O(){const t=document.querySelectorAll("input");_?t.forEach(s=>{s.disabled=!0}):t.forEach(s=>{s.disabled=!1})}function V(){$e();let t="";_?t+=`
      <div class="d-flex justify-content-center mt-4">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      `:m.length!==0?m.forEach(async e=>{var c,r,l,o,x,v,w,p,$,S,k,n,L,B,D;t+=`
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
                    <span class="fw-bold me-1"> ${(o=e.teacher)==null?void 0:o.rate} </span>
                    講師評等
                  </li>
                  <li>${(x=e.teacher)==null?void 0:x.total_students} 位學生</li>
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
                    <a href="${($=e.teacher)==null?void 0:$.links_linkedin}" class="p-1" target="_blank">
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
                        src="${(n=(k=e.comment)==null?void 0:k.user)==null?void 0:n.avatar}"
                        alt="student"
                      />
                      <div class="d-flex flex-md-column fs-sm fs-md-7">
                        <p class="fw-bold me-2 me-md-0">${(B=(L=e.comment)==null?void 0:L.user)==null?void 0:B.name}</p>
                        <p>${be.exec((D=e.comment)==null?void 0:D.date)[1]}</p>
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
                ${j?"":'data-bs-toggle="modal"'}
              >
                立即上課
              </button>
              <a
                href="${ye}?courseId=${e.id}"
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
      </div>`,N.innerHTML=t;let s=document.querySelectorAll(".follow-btn");s.forEach(e=>{e.addEventListener("click",function(){s&&j?e.classList.contains("following")?X(e,!0):X(e,!1):oe()})})}function xe(){const t=[...Array(T)].map((c,r)=>`<li class="page-item ${a.page===r+1?"active":""}" aria-current="page">
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
</li>`;se.innerHTML=s+t.join("")+e}let f=[];async function $e(){j?(f=(await b.get(`https://project-code-json-k0ti.onrender.com/users/${I}`)).data.followList,console.log(f)):console.log("沒有登入")}function X(t,s){let e=t.querySelector("i.fa-regular.fa-heart"),c=Number(e.dataset.buttonid);Swal.fire({title:s?"確定要取消收藏課程?":"確定要收藏課程?",showDenyButton:!0,confirmButtonColor:"#115BC9",confirmButtonText:s?"取消收藏":"確認",denyButtonText:s?"我再想想":"取消"}).then(async r=>{if(r.isConfirmed)if(Swal.fire({position:"center",icon:"success",title:s?"已取消收藏":"成功收藏",text:s?"":"可至會員中心「我的收藏」中查看",showConfirmButton:!1,timer:1500}),t.classList.toggle("not-follow"),t.classList.toggle("following"),e.classList.toggle("fw-bold"),s){let l=f.filter(o=>o!=c);b.patch(`https://project-code-json-k0ti.onrender.com/users/${I}`,{followList:l}).then(o=>{}).catch(o=>{console.error(o)})}else f.push(c),await b.patch(`https://project-code-json-k0ti.onrender.com/users/${I}`,{followList:f})}).catch(r=>{console.error(r)})}let ve=document.querySelector(".js-totalSearchNum"),m=[],E,T;const F=0,M=9999;let a={page:1,limit:10,sort:"",order:0,q:"",rate_gte:0,rate_lte:5,price_gte:F,price_lte:M,filters:"",sort:"",order:"desc"},_=!1;we();function we(){const t=localStorage.getItem("indexSearchInput"),s=sessionStorage.getItem("cateItemName"),e=localStorage.getItem("redirectToPopular");!t&&!s&&!e&&i(a),Se(a)}async function i({page:t,limit:s,q:e,rate_gte:c,rate_lte:r,price_gte:l,price_lte:o,filters:x,sort:v,order:w}){try{const p=`https://project-code-json-k0ti.onrender.com/courses?_expand=teacher&_expand=comment&_page=${t}&_limit=${s}&q=${e}&rate_gte=${c}&rate_lte=${r}&price_gte=${l}&price_lte=${o}${x}&_sort=${v}&_order=${w}`;_=!0,V(),O();const $=await b.get(p);m=$.data,console.log("currentPageCourses",m),E=parseInt($.headers.get("X-Total-Count")),ve.innerHTML=`共 ${E} 個結果`;const S=m.map(n=>`https://project-code-json-k0ti.onrender.com/comments/${n.commentId}?_expand=user`),k=await Promise.all(S.map(n=>b.get(n)));m.forEach((n,L)=>{n.comment=k[L].data}),_=!1,V(),O(),T=Math.ceil(parseInt(E)/parseInt(a.limit)),xe()}catch(p){console.log("courseError",p)}}async function ae({q:t,rate_gte:s,rate_lte:e,price_gte:c,price_lte:r,filters:l}){try{const o=`https://project-code-json-k0ti.onrender.com/courses?&q=${t}&rate_gte=${s}&rate_lte=${e}&price_gte=${c}&price_lte=${r}${l}`;return(await b.get(o)).data}catch(o){console.log("getAllData",o)}}async function Se(t){const s=await ae(t);ee(s),me(s)}async function ke(t){const s=await ae(t);ee(s)}const q=document.querySelector(".course-search-input"),C=localStorage.getItem("indexSearchInput");C&&(q.value=C,a.q=C,i(a),a.q="",localStorage.removeItem("indexSearchInput"));const re=document.querySelector(".course-search-button");re.addEventListener("click",function(){a.q=q.value,i(a)});q.addEventListener("keyup",function(t){t.key==="Enter"&&re.click()});const Le=document.querySelector(".clear-input");Le.addEventListener("click",function(){q.value=""});const ce=document.querySelector(".js-sortBy .dropdown-toggle"),je=document.querySelector(".js-sortBy .dropdown-menu"),_e=localStorage.getItem("redirectToPopular");async function qe(){if(_e){const t="commentNum";a.sort!==t&&(a.sort=t,ce.innerHTML="排序依據：最熱門",a.page=1,await i(a),localStorage.removeItem("redirectToPopular"))}}qe();je.addEventListener("click",t=>{const{order:s}=t.target.dataset;s&&a.sort!==s&&(a.sort=s,ce.innerHTML=`排序依據：${t.target.textContent}`,a.page=1,i(a))});
