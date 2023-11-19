import"./backtotop-e6f982ee.js";let P=document.querySelector("#js-filter-bar"),M=document.querySelector("#js-sticky-mt");const B=document.querySelector(".navbar");window.addEventListener("scroll",()=>{let s;window.innerWidth<375?s=120:window.innerWidth<768?s=300:s=418,window.scrollY<s?(P.style.boxShadow="",M.style.marginTop="",B.style.display="block"):(P.style.boxShadow="0 10px 6px -6px rgba(0, 0, 0, 0.15)",M.style.marginTop="78px",B.style.display="none")});window.addEventListener("resize",function(){(window.innerWidth||document.documentElement.clientWidth)<1200&&document.getElementById("collapseFilter").classList.add("show")});const O=document.querySelector(".pagination");O.addEventListener("click",s=>{const t=s.target.closest("[data-page]");if(t){s.preventDefault();const{page:e}=t.dataset;switch(e){case"prev":console.log("prev"),a.page-=1;break;case"next":console.log("next"),a.page+=1;break;default:a.page=Number(e)}i(a)}});const ae=document.querySelector("#courseList"),H=/^(\d{4}-\d{2}-\d{2}).*/,w=/\B(?=(?:\d{3})+(?!\d))/g,le=window.location.href,R=le.replace("course","course_intro");function U(){const s=document.querySelectorAll("input");L?s.forEach(t=>{t.disabled=!0}):s.forEach(t=>{t.disabled=!1})}function W(){ce(),X();let s="";L?s+=`
      <div class="d-flex justify-content-center mt-4">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      `:y.length!==0?y.forEach(async e=>{var l,c,d,n,r,f,p,h,m,x,$,F;b.includes(e.id)?s+=`
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
                    <img src="../assets/images/star.svg" alt="star" />
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
                    <img src="../assets/images/star.svg" alt="star" />
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
                     ${(l=e.comment)==null?void 0:l.content}
                    </p>
                    <div
                      class="d-flex justify-content-end align-items-center"
                    >
                      <img
                        class="me-2 d-none d-md-block w-40px h-40px"
                        src="${(d=(c=e.comment)==null?void 0:c.user)==null?void 0:d.avatar}"
                        alt="student"
                      />
                      <div class="d-flex flex-md-column fs-sm fs-md-7">
                        <p class="fw-bold me-2 me-md-0">${(r=(n=e.comment)==null?void 0:n.user)==null?void 0:r.name}</p>
                        <p>${H.exec((f=e.comment)==null?void 0:f.date)[1]}</p>
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
                    NT$ ${e.price*.5.toString().replace(w,",")}
                    </span><br />體驗價
                </p>
                <p class="text-nowrap text-center fs-sm fs-sm-6">
                  <span class="fw-bold fs-7 fs-sm-5">
                    NT$ ${e.price.toString().replace(w,",")}
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
                href="${R}?courseId=${e.id}"
                type="button"
                class="btn btn-white w-100 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
              >
                查看介紹
              </a>
            </div>
          </li>
        `:s+=`
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
                    <img src="../assets/images/star.svg" alt="star" />
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
                    <img src="../assets/images/star.svg" alt="star" />
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
                     ${(p=e.comment)==null?void 0:p.content}
                    </p>
                    <div
                      class="d-flex justify-content-end align-items-center"
                    >
                      <img
                        class="me-2 d-none d-md-block w-40px h-40px"
                        src="${(m=(h=e.comment)==null?void 0:h.user)==null?void 0:m.avatar}"
                        alt="student"
                      />
                      <div class="d-flex flex-md-column fs-sm fs-md-7">
                        <p class="fw-bold me-2 me-md-0">${($=(x=e.comment)==null?void 0:x.user)==null?void 0:$.name}</p>
                        <p>${H.exec((F=e.comment)==null?void 0:F.date)[1]}</p>
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
                    NT$ ${e.price*.5.toString().replace(w,",")}
                    </span><br />體驗價
                </p>
                <p class="text-nowrap text-center fs-sm fs-sm-6">
                  <span class="fw-bold fs-7 fs-sm-5">
                    NT$ ${e.price.toString().replace(w,",")}
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
                href="${R}?courseId=${e.id}"
                type="button"
                class="btn btn-white w-100 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
              >
                查看介紹
              </a>
            </div>
          </li>
        `}):s+=`
      <div class="d-flex flex-column justify-content-center text-center h-100 px-10">
        <p class="fs-3 mb-4">沒有符合條件的課程</p>
        <p class="fs-6">
          看起來目前沒有符合您需求的課程，請嘗試修改您的搜尋詞彙或篩選條件。
        </p>
      </div>`,ae.innerHTML=s;let t=document.querySelectorAll(".follow-btn");t&&(console.log("test"),t.forEach(e=>{e.addEventListener("click",function(){e.classList.contains("following")?z(e,!0):z(e,!1)})}))}function re(){const s=[...Array(E)].map((l,c)=>`<li class="page-item ${a.page===c+1?"active":""}" aria-current="page">
  <a class="page-link" href="#" data-page="${c+1}">${c+1}</a>
</li>`),t=`<li class="page-item ${a.page===1?"disabled":""} ">
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
</li>`;O.innerHTML=t+s.join("")+e}function ce(){window.scrollTo({top:350,left:0,behavior:"smooth"})}const j="http://localhost:3000",I=1;let b;async function X(){b=(await axios.get(`${j}/users/${I}`)).data.followList}async function z(s,t){await X();let e=s.querySelector("i.fa-regular.fa-heart"),l=Number(e.dataset.buttonid);Swal.fire({title:t?"確定要取消追蹤課程?":"確定要追蹤課程?",showDenyButton:!0,confirmButtonColor:"#115BC9",confirmButtonText:t?"取消追蹤":"確認",denyButtonText:t?"我再想想":"取消"}).then(async c=>{if(c.isConfirmed)if(Swal.fire({position:"center",icon:"success",title:t?"已取消追蹤":"成功追蹤",showConfirmButton:!1,timer:1500}),s.classList.toggle("not-follow"),s.classList.toggle("following"),e.classList.toggle("fw-bold"),t){let d=b.filter(n=>n!=l);axios.patch(`${j}/users/${I}`,{followList:d}).then(n=>{console.log("5. res.data.followList",n.data.followList)}).catch(n=>{console.error(n)})}else b.push(l),await axios.patch(`${j}/users/${I}`,{followList:b}).then(d=>{console.log("4. res.data.followList",d.data.followList)})}).catch(c=>{console.error(c)})}const Y=document.querySelectorAll(".js-selectedFiltersNum");let g=0;const T=document.querySelectorAll('input[name="filterStar"]'),v=document.querySelector("input[name='minPrice']"),k=document.querySelector("input[name='maxPrice']");let ne=document.querySelector("#accordionFilter");const Z=document.querySelectorAll(".js-category"),oe=document.querySelector(".js-delFilterBtn");T.forEach(s=>{s.addEventListener("change",t=>{ie(t.target.id)})});function ie(s){a.rate_gte={allStar:0,filterStar5:5,filterStar4:4,filterStar3:3,filterStar2:2,filterStar1:1}[s],a.page=1,i(a),u()}v.addEventListener("blur",()=>{const s=parseInt(v.value.trim());isNaN(s)?a.price_gte!==S&&(a.price_gte=S,a.page=1,i(a),u()):s!==a.price_gte&&(a.price_gte=s,a.page=1,i(a),u())});k.addEventListener("blur",()=>{const s=parseInt(k.value.trim());isNaN(s)?a.price_lte!==_&&(a.price_lte=_,a.page=1,i(a),u()):s!==a.price_lte&&(a.price_lte=s,a.page=1,i(a),u())});let G=sessionStorage.getItem("cateItemName");G&&document.addEventListener("DOMContentLoaded",de);function de(){const s=document.querySelector(`#${G}`);if(s.checked=!0,s.classList.contains("js-selectAll")){const t=document.querySelectorAll(`input[id^="${s.name}"]:not([id="${s.name}"])`);t.length?(t.forEach(e=>{e.checked=!0,A()}),a.page=1,i(a),u()):console.log(`${s.name}內沒有checkbox`)}else if(s.type="checkbox"){const t=s.closest(".accordion-item").querySelector(".js-selectAll"),e=s.closest(".accordion-body").querySelectorAll(".js-category");J(t,e),A(),a.page=1,i(a),u()}sessionStorage.removeItem("cateItemName")}ne.addEventListener("change",s=>{const t=s.target;if(t.classList.contains("js-selectAll")){const e=t.checked,l=document.querySelectorAll(`input[id^="${t.name}"]:not([id="${t.name}"])`);l.length?l.forEach(c=>{c.checked=e}):console.log(`${t.name}內沒有checkbox`)}else if(t.type="checkbox"){const e=t.closest(".accordion-item").querySelector(".js-selectAll"),l=t.closest(".accordion-body").querySelectorAll(".js-category");J(e,l)}A(),a.page=1,i(a),u()});function A(){a.filters="";let s="",t="";Z.forEach(e=>{e.checked&&(e.value==="入門"||e.value==="進階"?(t=`&level_like=${e.value}`,a.filters+=t):(fe(e.value)?(s=`&categories_like=\\b${e.value}\\b`,e.value==="C"&&(s+="(?!%23)")):pe(e.value)?s=`&categories_like=${encodeURIComponent(e.value)}`:s=`&categories_like=${e.value}`,a.filters+=s))})}function fe(s){return/^[a-zA-Z]+$/.test(s)}function pe(s){return/.*[!@#$%^&*()].*/.test(s)}function J(s,t){const e=[...t];s.checked=e.every(l=>l.checked)}function u(){T[0].checked||g++,(v.value||k.value)&&g++,Z.forEach(s=>{s.checked&&g++}),Y.forEach(s=>s.innerHTML=g),g=0}function ue(s){const t=document.querySelectorAll(".js-filterRatingNum"),e=document.querySelectorAll("[data-category]"),l=t.length,c=e.length,d={5:0,4:0,3:0,2:0,1:0},n={};for(let r=0;r<e.length;r++){let f=e[r].dataset.category;n[f]=0,n[f]===NaN&&console.log("篩選項目有打錯，出現NaN")}s.forEach(r=>{const f=Math.floor(parseFloat(r.rate));if(f>=1)for(let p=1;p<=f;p++)d[p]++;r.categories.forEach(p=>{n[p]++}),n[r.level]++});for(let r=0;r<l;r++)t[r].innerHTML=`(${d[l-r]} 筆)`;for(let r=0;r<c;r++){let f=e[r].dataset.category;e[r].innerHTML=`(${n[f]})`}}oe.addEventListener("click",me);function me(){v.value="",k.value="",T[0].checked=!0,document.querySelectorAll(".js-selectAll, .js-category").forEach(t=>t.checked=!1),a.rate_gte=0,a.rate_lte=5,a.price_gte=S,a.price_lte=_,a.filters="",ge(),i(a)}function ge(){g=0,Y.forEach(s=>s.innerHTML=g)}let he=document.querySelector(".js-totalSearchNum"),y=[],C,E;const N="https://project-code-json-k0ti.onrender.com",S=0,_=9999;let a={page:1,limit:10,sort:"",order:0,q:"",rate_gte:0,rate_lte:5,price_gte:S,price_lte:_,filters:"",sort:"",order:"desc"},L=!1;const i=async({page:s,limit:t,q:e,rate_gte:l,rate_lte:c,price_gte:d,price_lte:n,filters:r,sort:f,order:p})=>{const h=`${N}/courses?_expand=teacher&_page=${s}&_limit=${t}&q=${e}&rate_gte=${l}&rate_lte=${c}&price_gte=${d}&price_lte=${n}${r}&_sort=${f}&_order=${p}`;console.log(h),L=!0,W(),U();try{const m=await axios.get(h);y=m.data,C=parseInt(m.headers.get("X-Total-Count")),he.innerHTML=`共 ${C} 個結果`;for(const x of y){const $=await axios.get(`${N}/comments/${x.commentId}?_expand=user`);x.comment=$.data}console.log("currentPageCourses",y),L=!1,W(),U(),ye(a),E=Math.ceil(parseInt(C)/parseInt(a.limit)),re()}catch(m){console.log("courseError",m)}},xe=localStorage.getItem("indexSearchInput"),be=sessionStorage.getItem("cateItemName");!xe&&!be&&i(a);const ye=async({q:s,rate_gte:t,rate_lte:e,price_gte:l,price_lte:c,filters:d})=>{const n=`${N}/courses?&q=${s}&rate_gte=${t}&rate_lte=${e}&price_gte=${l}&price_lte=${c}${d}`;try{const r=await axios.get(n);ue(r.data)}catch(r){console.log("getAllData",r)}},V=localStorage.getItem("indexSearchInput");V&&(a.q=V,i(a),a.q="",localStorage.removeItem("indexSearchInput"));const q=document.querySelector(".course-search-input");let K;q.addEventListener("input",function(){K=q.value});const Q=document.querySelector(".course-search-button");Q.addEventListener("click",function(){a.q=K,i(a),q.value=""});document.addEventListener("keyup",function(s){s.key==="Enter"&&Q.click()});const $e=document.querySelector(".js-sortBy .dropdown-toggle"),we=document.querySelector(".js-sortBy .dropdown-menu");we.addEventListener("click",s=>{const{order:t}=s.target.dataset;t&&a.sort!==t&&(a.sort=t,$e.innerHTML=`排序依據：${s.target.textContent}`,a.page=1,i(a))});const D="http://localhost:3000";let ee=1,se;const te=Swal.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:2e3,didOpen:s=>{s.addEventListener("mouseenter",Swal.stopTimer),s.addEventListener("mouseleave",Swal.resumeTimer)}});courseList.addEventListener("click",async s=>{s.target&&s.target.dataset.course&&(se=s.target.dataset.course,await te.fire({icon:"success",title:"將課程加入購物車"}),ve())});async function ve(){let s=await Se();console.log(s);let t=await _e();if(console.log("courseCoupons[0]",s[0]),t.find(e=>e.couponId==s[0].id)===void 0){te.fire({icon:"success",title:"首次加入購物車，獲得「體驗課優惠券」、「多堂折價優惠券」",timer:3e3});for(const e of s){let l=e.discountCourseNum*7;await ke(e.id,l)}}}async function ke(s,t){try{let e=new Date().getTime(),l=new Date(e);l.setDate(l.getDate()+t),l.setHours(23,59,59,999);let c={userId:ee,couponId:s,canUse:!0,timestamp:e,dueDate:l};await axios.post(`${D}/myCoupons`,c,{headers:{"Content-Type":"application/json"}})}catch(e){console.log("addCoupon",e)}}async function Se(){try{const{data:s}=await axios.get(`${D}/coupons?courseId=${se}`);return s}catch(s){console.log("getCourseCoupon",s)}}async function _e(){try{const{data:s}=await axios.get(`${D}/myCoupons?userId=${ee}`);return s}catch(s){console.log("getCouponId",s)}}
