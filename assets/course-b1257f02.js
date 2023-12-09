import"./backtotop-948c3cb8.js";let B=document.querySelector("#js-filter-bar"),H=document.querySelector("#js-sticky-mt");const R=document.querySelector(".navbar");window.addEventListener("scroll",()=>{let t;window.innerWidth<375?t=120:window.innerWidth<768?t=300:t=418,window.scrollY<t?(B.style.boxShadow="",H.style.marginTop="",R.style.display="block"):(B.style.boxShadow="0 10px 6px -6px rgba(0, 0, 0, 0.15)",H.style.marginTop="78px",R.style.display="none")});window.addEventListener("resize",function(){(window.innerWidth||document.documentElement.clientWidth)<1200&&document.getElementById("collapseFilter").classList.add("show")});const X=document.querySelectorAll(".js-selectedFiltersNum");let m=0;const T=document.querySelectorAll('input[name="filterStar"]'),y=document.querySelector("input[name='minPrice']"),x=document.querySelector("input[name='maxPrice']");let oe=document.querySelector("#accordionFilter");const Y=document.querySelectorAll(".js-category"),ie=document.querySelector(".js-delFilterBtn");function b(){a.page=1,te(),p(a),ee()}T.forEach(t=>{t.addEventListener("change",s=>{de(s.target.id)})});function de(t){a.rate_gte={allStar:0,filterStar5:5,filterStar4:4,filterStar3:3,filterStar2:2,filterStar1:1}[t],b()}y.addEventListener("change",Z);x.addEventListener("change",Z);function Z(){const t=parseInt(this.value.trim());let s,e;this===y?(s=P,e=a.price_gte):this===x&&(s=D,e=a.price_lte),isNaN(t)?e!==s&&(this===y?a.price_gte=t:this===x&&(a.price_lte=t),b()):t!==e&&(this===y?a.price_gte=t:this===x&&(a.price_lte=t),b())}let G=sessionStorage.getItem("cateItemName");G&&document.addEventListener("DOMContentLoaded",fe);function fe(){const t=document.querySelector(`#${G}`);if(t.checked=!0,t.classList.contains("js-selectAll")){const s=document.querySelectorAll(`input[id^="${t.name}"]:not([id="${t.name}"])`);s.length&&(s.forEach(e=>{e.checked=!0,j()}),a.page=1,p(a),ee())}else if(t.type="checkbox"){const s=t.closest(".accordion-item").querySelector(".js-selectAll"),e=t.closest(".accordion-body").querySelectorAll(".js-category");K(s,e),j(),b()}sessionStorage.removeItem("cateItemName")}oe.addEventListener("change",t=>{const s=t.target;if(s.classList.contains("js-selectAll")){const e=s.checked,r=document.querySelectorAll(`input[id^="${s.name}"]:not([id="${s.name}"])`);r.length&&r.forEach(l=>{l.checked=e})}else if(s.type="checkbox"){const e=s.closest(".accordion-item").querySelector(".js-selectAll"),r=s.closest(".accordion-body").querySelectorAll(".js-category");K(e,r)}j(),b()});function j(){a.filters="";let t="",s="";Y.forEach(e=>{e.checked&&(e.value==="入門"||e.value==="進階"?(s=`&level_like=${e.value}`,a.filters+=s):(ue(e.value)?(t=`&categories_like=\\b${e.value}\\b`,e.value==="C"&&(t+="(?!%23)")):(t=`&categories_like=${U(e.value)}`,console.log(U(e.value)),console.dir(e)),a.filters+=t))})}function ue(t){return/^[a-zA-Z]+$/.test(t)}function U(t){return t.replace(/[!@#$%^&*()\s]/g,function(s){return encodeURIComponent(s)})}function K(t,s){const e=[...s];t.checked=e.every(r=>r.checked)}function ee(){T[0].checked||m++,(y.value||x.value)&&m++,Y.forEach(t=>{t.checked&&m++}),X.forEach(t=>t.innerHTML=m),m=0}function pe(t){const s=document.querySelectorAll(".js-filterRatingNum"),e=document.querySelectorAll("[data-category]"),r=s.length,l=e.length,i={5:0,4:0,3:0,2:0,1:0},c={};for(let n=0;n<e.length;n++){let d=e[n].dataset.category;c[d]=0}t.forEach(n=>{const d=Math.floor(parseFloat(n.rate));if(d>=1)for(let f=1;f<=d;f++)i[f]++;n.categories.forEach(f=>{c[f]++}),c[n.level]++});for(let n=0;n<r;n++)s[n].innerHTML=`(${i[r-n]} 筆)`;for(let n=0;n<l;n++){let d=e[n].dataset.category;e[n].innerHTML=`(${c[d]})`}}ie.addEventListener("click",me);function me(){y.value="",x.value="",T[0].checked=!0,document.querySelectorAll(".js-selectAll, .js-category").forEach(s=>s.checked=!1),a.rate_gte=0,a.rate_lte=5,a.price_gte=P,a.price_lte=D,a.filters="",ge(),b()}function ge(){m=0,X.forEach(t=>t.innerHTML=m)}function te(){window.scrollTo({top:350,left:0,behavior:"smooth"})}const se=document.querySelector(".pagination");se.addEventListener("click",t=>{const s=t.target.closest("[data-page]");if(s){t.preventDefault();const{page:e}=s.dataset;switch(e){case"prev":a.page-=1;break;case"next":a.page+=1;break;default:a.page=Number(e)}p(a),te()}});const he=document.querySelector("#courseList"),W=/^(\d{4}-\d{2}-\d{2}).*/,k=/\B(?=(?:\d{3})+(?!\d))/g,ye=window.location.href,z=ye.replace("course","course_intro");function O(){const t=document.querySelectorAll("input");C?t.forEach(s=>{s.disabled=!0}):t.forEach(s=>{s.disabled=!1})}async function V(){await ae();let t="";C?t+=`
      <div class="d-flex justify-content-center mt-4">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      `:w.length!==0?w.forEach(async e=>{var r,l,i,c,n,d,f,h,$,v,S,u;console.log("測試"),g&&console.log("測試2"),g&&g.includes(e.id)?t+=`
          <li class="card flex-row flex-wrap flex-md-nowrap shadow">
            <div class="d-flex flex-grow-1 p-4 p-lg-8">
              <!--  老師區塊 -->
              <div
                class="d-flex flex-column align-items-center min-w-100px w-100px min-w-md-150px w-md-150px bg-white me-4"
              >
                <!-- 愛心 -->
                <button
                  type="button"
                  class="btn p-0 text-center align-self-start follow-btn following"
                >
                  <i
                    class="fa-regular fa-heart fs-3 text-primary hover-bold fw-bold" data-buttonId="${e.id}"
                  ></i>
                </button>
  
                <a href="#" class="text-center">
                  <!-- 圖 -->
                  <div class="mb-2 w-100px h-100px">
                    <img
                      class="img-fluid rounded-circle p-1 p-md-0"
                      src="${e.teacher.avatar}"
                      alt="teacher"
                    />
                  </div>
                  <!-- 姓名、職稱 -->
                  <h3 class="fs-7 fs-md-6 text-secondary2 fw-bold mb-1">
                    ${e.teacher.name}
                  </h3>
                </a>
                <p class="fs-sm fs-md-7 text-secondary2 text-center mb-2">
                  ${e.teacher.title}
                </p>
                <ul class="text-center text-gray-300 fs-sm fs-md-7 mb-2">
                  <li class="d-flex align-items-center">
                    <img src="./assets/images/star.svg" alt="star" />
                    <span class="fw-bold me-1"> ${e.teacher.rate} </span>
                    講師評等
                  </li>
                  <li>${e.teacher.total_students} 位學生</li>
                  <li>${e.teacher.total_courses} 門課程</li>
                </ul>
                <!-- link -->
                <ul class="d-flex justify-content-center mb-0">
                  <li class="me-1">
                    <a href="${e.teacher.links_codepen}" class="p-1" target="_blank">
                      <i class="fa-brands fa-github"></i
                    ></a>
                  </li>
                  <li class="me-1">
                    <a href="${e.teacher.links_github}" class="p-1" target="_blank">
                      <i class="fa-brands fa-linkedin-in"></i
                    ></a>
                  </li>
                  <li>
                    <a href="${e.teacher.links_linkedin}" class="p-1" target="_blank">
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
                  ${e.badges.map(o=>`<li class="badge bg-primary fw-normal fs-sm fs-lg-7">${o}</li>`).join("")}</ul>`:""}
  
                <!-- 課程tag -->
                ${Array.isArray(e.tags)?`<ul class="d-flex flex-wrap mb-1 mb-sm-2 column-gap-1">
                  ${e.tags.map(o=>`<li class="text-primary text-nowrap fs-sm fs-md-7">
                    #${o}
                  </li>`).join("")}
                </ul>`:""}
  
                <!-- 課程評價、難度 -->
                <div class="d-flex">
                  <a
                    href="#"
                    class="d-flex align-items-center mb-1 mb-sm-2 mb-md-4"
                  >
                    <img src="./assets/images/star.svg" alt="star" />
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
                      ${e.categories.map(o=>`
                          <li>
                            <span class="badge text-bg-secondary text-gray-300 fs-sm fs-md-6">
                              ${o}
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
                          ${e.mainPoints.map(o=>`
                        <li class="list-check fs-sm fs-sm-7 fs-md-6">
                          ${o}
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
                     ${(r=e.comment)==null?void 0:r.content}
                    </p>
                    <div
                      class="d-flex justify-content-end align-items-center"
                    >
                      <img
                        class="me-2 d-none d-md-block w-40px h-40px"
                        src="${(i=(l=e.comment)==null?void 0:l.user)==null?void 0:i.avatar}"
                        alt="student"
                      />
                      <div class="d-flex flex-md-column fs-sm fs-md-7">
                        <p class="fw-bold me-2 me-md-0">${(n=(c=e.comment)==null?void 0:c.user)==null?void 0:n.name}</p>
                        <p>${W.exec((d=e.comment)==null?void 0:d.date)[1]}</p>
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
                    NT$ ${e.price*.5.toString().replace(k,",")}
                    </span><br />體驗價
                </p>
                <p class="text-nowrap text-center fs-sm fs-sm-6">
                  <span class="fw-bold fs-7 fs-sm-5">
                    NT$ ${e.price.toString().replace(k,",")}
                  </span>
                  <br />${e.duration}分鐘
                </p>
              </div>
              <!-- 購買按鈕 -->
              <button
                type="button"
                class="btn btn-secondary2 w-100 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
                data-course="${e.id}"
              >
                立即上課
              </button>
              <a
                href="${z}?courseId=${e.id}"
                class="btn btn-white w-100 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
              >
                查看介紹
              </a>
            </div>
          </li>
        `:t+=`
          <li class="card flex-row flex-wrap flex-md-nowrap shadow">
            <div class="d-flex flex-grow-1 p-4 p-lg-8">
              <!--  老師區塊 -->
              <div
                class="d-flex flex-column align-items-center min-w-100px w-100px min-w-md-150px w-md-150px bg-white me-4"
              >
                <!-- 愛心 -->
                <button
                  type="button"
                  class="btn p-0 text-center align-self-start follow-btn not-follow"
                >
                  <i
                    class="fa-regular fa-heart fs-3 text-primary hover-bold" data-buttonId="${e.id}"
                  ></i>
                </button>
  
                <a href="#" class="text-center">
                  <!-- 圖 -->
                  <div class="mb-2 w-100px h-100px">
                    <img
                      class="img-fluid rounded-circle p-1 p-md-0"
                      src="${e.teacher.avatar}"
                      alt="teacher"
                    />
                  </div>
                  <!-- 姓名、職稱 -->
                  <h3 class="fs-7 fs-md-6 text-secondary2 fw-bold mb-1">
                    ${e.teacher.name}
                  </h3>
                </a>
                <p class="fs-sm fs-md-7 text-secondary2 text-center mb-2">
                  ${e.teacher.title}
                </p>
                <ul class="text-center text-gray-300 fs-sm fs-md-7 mb-2">
                  <li class="d-flex align-items-center">
                    <img src="./assets/images/star.svg" alt="star" />
                    <span class="fw-bold me-1"> ${e.teacher.rate} </span>
                    講師評等
                  </li>
                  <li>${e.teacher.total_students} 位學生</li>
                  <li>${e.teacher.total_courses} 門課程</li>
                </ul>
                <!-- link -->
                <ul class="d-flex justify-content-center mb-0">
                  <li class="me-1">
                    <a href="${e.teacher.links_codepen}" class="p-1" target="_blank">
                      <i class="fa-brands fa-github"></i
                    ></a>
                  </li>
                  <li class="me-1">
                    <a href="${e.teacher.links_github}" class="p-1" target="_blank">
                      <i class="fa-brands fa-linkedin-in"></i
                    ></a>
                  </li>
                  <li>
                    <a href="${e.teacher.links_linkedin}" class="p-1" target="_blank">
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
                  ${e.badges.map(o=>`<li class="badge bg-primary fw-normal fs-sm fs-lg-7">${o}</li>`).join("")}</ul>`:""}
  
                <!-- 課程tag -->
                ${Array.isArray(e.tags)?`<ul class="d-flex flex-wrap mb-1 mb-sm-2 column-gap-1">
                  ${e.tags.map(o=>`<li class="text-primary text-nowrap fs-sm fs-md-7">
                    #${o}
                  </li>`).join("")}
                </ul>`:""}
  
                <!-- 課程評價、難度 -->
                <div class="d-flex">
                  <a
                    href="#"
                    class="d-flex align-items-center mb-1 mb-sm-2 mb-md-4"
                  >
                    <img src="./assets/images/star.svg" alt="star" />
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
                      ${e.categories.map(o=>`
                          <li>
                            <span class="badge text-bg-secondary text-gray-300 fs-sm fs-md-6">
                              ${o}
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
                          ${e.mainPoints.map(o=>`
                        <li class="list-check fs-sm fs-sm-7 fs-md-6">
                          ${o}
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
                     ${(f=e.comment)==null?void 0:f.content}
                    </p>
                    <div
                      class="d-flex justify-content-end align-items-center"
                    >
                      <img
                        class="me-2 d-none d-md-block w-40px h-40px"
                        src="${($=(h=e.comment)==null?void 0:h.user)==null?void 0:$.avatar}"
                        alt="student"
                      />
                      <div class="d-flex flex-md-column fs-sm fs-md-7">
                        <p class="fw-bold me-2 me-md-0">${(S=(v=e.comment)==null?void 0:v.user)==null?void 0:S.name}</p>
                        <p>${W.exec((u=e.comment)==null?void 0:u.date)[1]}</p>
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
                    NT$ ${e.price*.5.toString().replace(k,",")}
                    </span><br />體驗價
                </p>
                <p class="text-nowrap text-center fs-sm fs-sm-6">
                  <span class="fw-bold fs-7 fs-sm-5">
                    NT$ ${e.price.toString().replace(k,",")}
                  </span>
                  <br />${e.duration}分鐘
                </p>
              </div>
              <!-- 購買按鈕 -->
              <button
                type="button"
                class="btn btn-secondary2 w-100 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
                data-course="${e.id}"
              >
                立即上課
              </button>
              <a
                href="${z}?courseId=${e.id}"
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
      </div>`,he.innerHTML=t;let s=document.querySelectorAll(".follow-btn");s&&s.forEach(e=>{e.addEventListener("click",function(){e.classList.contains("following")?J(e,!0):J(e,!1)})})}function xe(){const t=[...Array(E)].map((r,l)=>`<li class="page-item ${a.page===l+1?"active":""}" aria-current="page">
  <a class="page-link" href="#" data-page="${l+1}">${l+1}</a>
</li>`),s=`<li class="page-item ${a.page===1?"disabled":""} ">
  <a
    class="page-link"
    href="#"
    aria-label="Previous" data-page="prev"
  >
    <i class="fa-solid fa-angle-left" ></i>
  </a>
</li>`,e=`<li class="page-item ${a.page===E?"disabled":""}">
<a class="page-link" href="#" aria-label="Next" data-page="next">
  <i class="fa-solid fa-angle-right"></i>
</a>
</li>`;se.innerHTML=s+t.join("")+e}let g;async function ae(){userId&&(g=(await axios.get(`${_url}/users/${userId}`)).data.followList)}async function J(t,s){await ae();let e=t.querySelector("i.fa-regular.fa-heart"),r=Number(e.dataset.buttonid);Swal.fire({title:s?"確定要取消追蹤課程?":"確定要追蹤課程?",showDenyButton:!0,confirmButtonColor:"#115BC9",confirmButtonText:s?"取消追蹤":"確認",denyButtonText:s?"我再想想":"取消"}).then(async l=>{if(l.isConfirmed)if(Swal.fire({position:"center",icon:"success",title:s?"已取消追蹤":"成功追蹤",showConfirmButton:!1,timer:1500}),t.classList.toggle("not-follow"),t.classList.toggle("following"),e.classList.toggle("fw-bold"),s){let i=g.filter(c=>c!=r);axios.patch(`${_url}/users/${userId}`,{followList:i}).then(c=>{}).catch(c=>{console.error(c)})}else g.push(r),await axios.patch(`${_url}/users/${userId}`,{followList:g})}).catch(l=>{console.error(l)})}let be=document.querySelector(".js-totalSearchNum"),w=[],I,E;const P=0,D=9999;let a={page:1,limit:10,sort:"",order:0,q:"",rate_gte:0,rate_lte:5,price_gte:P,price_lte:D,filters:"",sort:"",order:"desc"},C=!1;$e();function $e(){const t=localStorage.getItem("indexSearchInput"),s=sessionStorage.getItem("cateItemName");!t&&!s&&(p(a),we(a))}async function p({page:t,limit:s,q:e,rate_gte:r,rate_lte:l,price_gte:i,price_lte:c,filters:n,sort:d,order:f}){try{const h=`${_url}/courses?_expand=teacher&_page=${t}&_limit=${s}&q=${e}&rate_gte=${r}&rate_lte=${l}&price_gte=${i}&price_lte=${c}${n}&_sort=${d}&_order=${f}`;C=!0,V(),O();const $=await axios.get(h);w=$.data,I=parseInt($.headers.get("X-Total-Count")),be.innerHTML=`共 ${I} 個結果`;const v=w.map(u=>`${_url}/comments/${u.commentId}?_expand=user`),S=await Promise.all(v.map(u=>axios.get(u)));w.forEach((u,o)=>{u.comment=S[o].data}),C=!1,V(),O(),E=Math.ceil(parseInt(I)/parseInt(a.limit)),xe()}catch(h){console.log("courseError",h)}}async function we({q:t,rate_gte:s,rate_lte:e,price_gte:r,price_lte:l,filters:i}){try{const c=`${_url}/courses?&q=${t}&rate_gte=${s}&rate_lte=${e}&price_gte=${r}&price_lte=${l}${i}`,n=await axios.get(c);pe(n.data)}catch(c){console.log("getAllData",c)}}const Q=localStorage.getItem("indexSearchInput");Q&&(a.q=Q,p(a),a.q="",localStorage.removeItem("indexSearchInput"));const _=document.querySelector(".course-search-input");let q="";_.addEventListener("input",function(){q=_.value});const re=document.querySelector(".course-search-button");re.addEventListener("click",function(){a.q=q,p(a),_.value="",q=""});_.addEventListener("keyup",function(t){t.key==="Enter"&&re.click()});const le=document.querySelector(".js-sortBy .dropdown-toggle"),ve=document.querySelector(".js-sortBy .dropdown-menu"),Se=localStorage.getItem("redirectToPopular");async function ke(){if(Se){const t="commentNum";a.sort!==t&&(a.sort=t,le.innerHTML="排序依據：最熱門",a.page=1,await p(a),localStorage.removeItem("redirectToPopular"))}}ke();ve.addEventListener("click",t=>{const{order:s}=t.target.dataset;s&&a.sort!==s&&(a.sort=s,le.innerHTML=`排序依據：${t.target.textContent}`,a.page=1,p(a))});let L;const A=Swal.mixin({icon:"success",toast:!0,position:"top-end",showConfirmButton:!1,timer:2e3,didOpen:t=>{t.addEventListener("mouseenter",Swal.stopTimer),t.addEventListener("mouseleave",Swal.resumeTimer)}});let N,ne,M,F;courseList.addEventListener("click",async t=>{if(t.target&&t.target.dataset.course){let s=JSON.parse(localStorage.getItem("isLogin"));const e=new bootstrap.Modal(document.getElementById("#loginModal"));s?(L=t.target.dataset.course,await ce(),F=ne.find(r=>r.couponId==M[0].id)!==void 0,_e(),Ae(),Ce()):e.show()}});async function ce(){try{const t=`${_url}/myCarts?userId=${userId}&courseId=${L}`,s=`${_url}/myCoupons?userId=${userId}`,e=`${_url}/coupons?courseId=${L}`,r=await Promise.all([axios.get(t),axios.get(s),axios.get(e)]);N=r[0].data,ne=r[1].data,M=r[2].data}catch{console.log("getStartCourseData",ce)}}async function Ce(){F?A.fire({title:"將課程加入購物車"}):(await A.fire({title:"將課程加入購物車"}),A.fire({title:"首次加入購物車，獲得「體驗課優惠券」、「多堂折價優惠券」"}))}function _e(){N.length?Ie(N[0]):Le()}async function Le(){try{const t={userId,courseId:L,quantity:1,isPurchased:!1,isNextPurchase:!1};await axios.post(`${_url}/myCarts`,t,{headers:{"Content-Type":"application/json"}}),await getCartLength(),renderCartNum()}catch(t){console.log("getMyCarts",t)}}async function Ie(t){try{let{id:s,quantity:e,isNextPurchase:r}=t,l={};r?l={isNextPurchase:!1}:(e=Number(e)+1,l={quantity:e}),await axios.patch(`${_url}/myCarts/${s}`,l,{headers:{"Content-Type":"application/json"}})}catch(s){console.log("getMyCarts",s)}}async function Ae(){if(!F)try{await Promise.all(M.map(t=>je(t)))}catch(t){console.error("Error adding coupons:",t)}}async function je(t){try{let s=t.id,e=t.discountCourseNum*7,r=Date.now(),l=new Date(r);l.setDate(l.getDate()+e),l.setHours(23,59,59,999);let i={userId,couponId:s,canUse:!0,timestamp:r,dueDate:l};await axios.post(`${_url}/myCoupons`,i,{headers:{"Content-Type":"application/json"}})}catch(s){console.log("addCoupon",s)}}
