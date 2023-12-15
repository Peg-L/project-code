import{c as re,i as j,h as ce,a as $,u as I}from"./backtotop-f8562c14.js";import{h as le}from"./startCourse-eb5bf10a.js";let H=document.querySelector("#js-filter-bar"),R=document.querySelector("#js-sticky-mt");const U=document.querySelector(".navbar");window.addEventListener("scroll",()=>{let t;window.innerWidth<375?t=120:window.innerWidth<768?t=300:t=418,window.scrollY<t?(H.style.boxShadow="",R.style.marginTop="",U.style.display="block"):(H.style.boxShadow="0 10px 6px -6px rgba(0, 0, 0, 0.15)",R.style.marginTop="78px",U.style.display="none")});window.addEventListener("resize",function(){(window.innerWidth||document.documentElement.clientWidth)<1200&&document.getElementById("collapseFilter").classList.add("show")});const Y=document.querySelectorAll(".js-selectedFiltersNum");let m=0;const P=document.querySelectorAll('input[name="filterStar"]'),y=document.querySelector("input[name='minPrice']"),x=document.querySelector("input[name='maxPrice']");let oe=document.querySelector("#accordionFilter");const Z=document.querySelectorAll(".js-category"),ne=document.querySelector(".js-delFilterBtn");function v(){a.page=1,ee(),f(a),Q()}P.forEach(t=>{t.addEventListener("change",s=>{ie(s.target.id)})});function ie(t){a.rate_gte={allStar:0,filterStar5:5,filterStar4:4,filterStar3:3,filterStar2:2,filterStar1:1}[t],v()}y.addEventListener("change",G);x.addEventListener("change",G);function G(){const t=parseInt(this.value.trim());let s,e;this===y?(s=F,e=a.price_gte):this===x&&(s=M,e=a.price_lte),isNaN(t)?e!==s&&(this===y?a.price_gte=t:this===x&&(a.price_lte=t),v()):t!==e&&(this===y?a.price_gte=t:this===x&&(a.price_lte=t),v())}let J=sessionStorage.getItem("cateItemName");J&&document.addEventListener("DOMContentLoaded",de);function de(){const t=document.querySelector(`#${J}`);if(t.checked=!0,t.classList.contains("js-selectAll")){const s=document.querySelectorAll(`input[id^="${t.name}"]:not([id="${t.name}"])`);s.length&&(s.forEach(e=>{e.checked=!0,A()}),a.page=1,f(a),Q())}else if(t.type="checkbox"){const s=t.closest(".accordion-item").querySelector(".js-selectAll"),e=t.closest(".accordion-body").querySelectorAll(".js-category");K(s,e),A(),v()}sessionStorage.removeItem("cateItemName")}oe.addEventListener("change",t=>{const s=t.target;if(s.classList.contains("js-selectAll")){const e=s.checked,c=document.querySelectorAll(`input[id^="${s.name}"]:not([id="${s.name}"])`);c.length&&c.forEach(l=>{l.checked=e})}else if(s.type="checkbox"){const e=s.closest(".accordion-item").querySelector(".js-selectAll"),c=s.closest(".accordion-body").querySelectorAll(".js-category");K(e,c)}A(),v()});function A(){a.filters="";let t="",s="";Z.forEach(e=>{e.checked&&(e.value==="入門"||e.value==="進階"?(s=`&level_like=${e.value}`,a.filters+=s):(ue(e.value)?(t=`&categories_like=\\b${e.value}\\b`,e.value==="C"&&(t+="(?!%23)")):(t=`&categories_like=${W(e.value)}`,console.log(W(e.value)),console.dir(e)),a.filters+=t))})}function ue(t){return/^[a-zA-Z]+$/.test(t)}function W(t){return t.replace(/[!@#$%^&*()\s]/g,function(s){return encodeURIComponent(s)})}function K(t,s){const e=[...s];t.checked=e.every(c=>c.checked)}function Q(){P[0].checked||m++,(y.value||x.value)&&m++,Z.forEach(t=>{t.checked&&m++}),Y.forEach(t=>t.innerHTML=m),m=0}function fe(t){const s=document.querySelectorAll(".js-filterRatingNum"),e=document.querySelectorAll("[data-category]"),c=s.length,l=e.length,n={5:0,4:0,3:0,2:0,1:0},o={};for(let r=0;r<e.length;r++){let i=e[r].dataset.category;o[i]=0}t.forEach(r=>{const i=Math.floor(parseFloat(r.rate));if(i>=1)for(let d=1;d<=i;d++)n[d]++;r.categories.forEach(d=>{o[d]++}),o[r.level]++});for(let r=0;r<c;r++)s[r].innerHTML=`(${n[c-r]} 筆)`;for(let r=0;r<l;r++){let i=e[r].dataset.category;e[r].innerHTML=`(${o[i]})`}}ne.addEventListener("click",pe);function pe(){y.value="",x.value="",P[0].checked=!0,document.querySelectorAll(".js-selectAll, .js-category").forEach(s=>s.checked=!1),a.rate_gte=0,a.rate_lte=5,a.price_gte=F,a.price_lte=M,a.filters="",me(),v()}function me(){m=0,Y.forEach(t=>t.innerHTML=m)}function ee(){window.scrollTo({top:350,left:0,behavior:"smooth"})}const te=document.querySelector(".pagination");te.addEventListener("click",t=>{const s=t.target.closest("[data-page]");if(s){t.preventDefault();const{page:e}=s.dataset;switch(e){case"prev":a.page-=1;break;case"next":a.page+=1;break;default:a.page=Number(e)}f(a),ee()}});const N=document.querySelector("#courseList"),ge=/^(\d{4}-\d{2}-\d{2}).*/,z=/\B(?=(?:\d{3})+(?!\d))/g,he=re.replace("course","course_intro");N&&le(N);function O(){const t=document.querySelectorAll("input");_?t.forEach(s=>{s.disabled=!0}):t.forEach(s=>{s.disabled=!1})}function V(){ye();let t="";_?t+=`
      <div class="d-flex justify-content-center mt-4">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      `:b.length!==0?b.forEach(async e=>{var c,l,n,o,r,i,d,h,w,S,k,u,L,B,D;t+=`
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
                  ${j?"":'data-bs-toggle="modal"'}
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
                      src="${(c=e.teacher)==null?void 0:c.avatar}"
                      alt="teacher"
                    />
                  </div>
                  <!-- 姓名、職稱 -->
                  <h3 class="fs-7 fs-md-6 text-secondary2 fw-bold mb-1">
                    ${(l=e.teacher)==null?void 0:l.name}
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
                  <li>${(r=e.teacher)==null?void 0:r.total_students} 位學生</li>
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
                    <a href="${(w=e.teacher)==null?void 0:w.links_linkedin}" class="p-1" target="_blank">
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
                        class="me-2 d-none d-md-block w-40px h-40px rounded-circle"
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
                ${j?"":'data-bs-toggle="modal"'}
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
      </div>`,N.innerHTML=t;let s=document.querySelectorAll(".follow-btn");s.forEach(e=>{e.addEventListener("click",function(){s&&j?e.classList.contains("following")?X(e,!0):X(e,!1):ce()})})}function be(){const t=[...Array(T)].map((c,l)=>`<li class="page-item ${a.page===l+1?"active":""}" aria-current="page">
  <a class="page-link" href="#" data-page="${l+1}">${l+1}</a>
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
</li>`;te.innerHTML=s+t.join("")+e}let g=[];async function ye(){j?(g=(await $.get(`https://project-code-json-k0ti.onrender.com/users/${I}`)).data.followList,console.log(g)):console.log("沒有登入")}function X(t,s){let e=t.querySelector("i.fa-regular.fa-heart"),c=Number(e.dataset.buttonid);Swal.fire({title:s?"確定要取消追蹤課程?":"確定要追蹤課程?",showDenyButton:!0,confirmButtonColor:"#115BC9",confirmButtonText:s?"取消追蹤":"確認",denyButtonText:s?"我再想想":"取消"}).then(async l=>{if(l.isConfirmed)if(Swal.fire({position:"center",icon:"success",title:s?"已取消追蹤":"成功追蹤",showConfirmButton:!1,timer:1500}),t.classList.toggle("not-follow"),t.classList.toggle("following"),e.classList.toggle("fw-bold"),s){let n=g.filter(o=>o!=c);$.patch(`https://project-code-json-k0ti.onrender.com/users/${I}`,{followList:n}).then(o=>{}).catch(o=>{console.error(o)})}else g.push(c),await $.patch(`https://project-code-json-k0ti.onrender.com/users/${I}`,{followList:g})}).catch(l=>{console.error(l)})}let xe=document.querySelector(".js-totalSearchNum"),b=[],E,T;const F=0,M=9999;let a={page:1,limit:10,sort:"",order:0,q:"",rate_gte:0,rate_lte:5,price_gte:F,price_lte:M,filters:"",sort:"",order:"desc"},_=!1;$e();function $e(){const t=localStorage.getItem("indexSearchInput"),s=sessionStorage.getItem("cateItemName"),e=localStorage.getItem("redirectToPopular");!t&&!s&&!e&&f(a),ve(a)}async function f({page:t,limit:s,q:e,rate_gte:c,rate_lte:l,price_gte:n,price_lte:o,filters:r,sort:i,order:d}){try{const h=`https://project-code-json-k0ti.onrender.com/courses?_expand=teacher&_expand=comment&_page=${t}&_limit=${s}&q=${e}&rate_gte=${c}&rate_lte=${l}&price_gte=${n}&price_lte=${o}${r}&_sort=${i}&_order=${d}`;_=!0,V(),O();const w=await $.get(h);b=w.data,console.log("currentPageCourses",b),E=parseInt(w.headers.get("X-Total-Count")),xe.innerHTML=`共 ${E} 個結果`;const S=b.map(u=>`https://project-code-json-k0ti.onrender.com/comments/${u.commentId}?_expand=user`),k=await Promise.all(S.map(u=>$.get(u)));b.forEach((u,L)=>{u.comment=k[L].data}),_=!1,V(),O(),T=Math.ceil(parseInt(E)/parseInt(a.limit)),be()}catch(h){console.log("courseError",h)}}async function ve({q:t,rate_gte:s,rate_lte:e,price_gte:c,price_lte:l,filters:n}){try{const o=`https://project-code-json-k0ti.onrender.com/courses?&q=${t}&rate_gte=${s}&rate_lte=${e}&price_gte=${c}&price_lte=${l}${n}`,r=await $.get(o);fe(r.data)}catch(o){console.log("getAllData",o)}}const q=document.querySelector(".course-search-input"),C=localStorage.getItem("indexSearchInput");C&&(q.value=C,a.q=C,f(a),a.q="",localStorage.removeItem("indexSearchInput"));const se=document.querySelector(".course-search-button");se.addEventListener("click",function(){a.q=q.value,f(a)});q.addEventListener("keyup",function(t){t.key==="Enter"&&se.click()});const we=document.querySelector(".clear-input");we.addEventListener("click",function(){q.value=""});const ae=document.querySelector(".js-sortBy .dropdown-toggle"),Se=document.querySelector(".js-sortBy .dropdown-menu"),ke=localStorage.getItem("redirectToPopular");async function Le(){if(ke){const t="commentNum";a.sort!==t&&(a.sort=t,ae.innerHTML="排序依據：最熱門",a.page=1,await f(a),localStorage.removeItem("redirectToPopular"))}}Le();Se.addEventListener("click",t=>{const{order:s}=t.target.dataset;s&&a.sort!==s&&(a.sort=s,ae.innerHTML=`排序依據：${t.target.textContent}`,a.page=1,f(a))});
