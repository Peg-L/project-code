import"./backtotop-d0934485.js";let ce=document.querySelector("#js-filter-bar"),ie=document.querySelector("#js-sticky-mt");const de=document.querySelector(".navbar");window.addEventListener("scroll",()=>{let t;window.innerWidth<375?t=120:window.innerWidth<768?t=300:t=418,window.scrollY<t?(ce.style.boxShadow="",ie.style.marginTop="",de.style.display="block"):(ce.style.boxShadow="0 10px 6px -6px rgba(0, 0, 0, 0.15)",ie.style.marginTop="78px",de.style.display="none")});window.addEventListener("resize",function(){(window.innerWidth||document.documentElement.clientWidth)<1200&&document.getElementById("collapseFilter").classList.add("show")});const ye=document.querySelector(".pagination");ye.addEventListener("click",t=>{const s=t.target.closest("[data-page]");if(s){t.preventDefault();const{page:e}=s.dataset;switch(e){case"prev":console.log("prev"),a.page-=1;break;case"next":console.log("next"),a.page+=1;break;default:a.page=Number(e)}p(a)}});const je=document.querySelector("#courseList"),fe=/^(\d{4}-\d{2}-\d{2}).*/,S=/\B(?=(?:\d{3})+(?!\d))/g,Ae=window.location.href,pe=Ae.replace("course","course_intro");function ue(){const t=document.querySelectorAll("input");C?t.forEach(s=>{s.disabled=!0}):t.forEach(s=>{s.disabled=!1})}function me(){Ee(),xe();let t="";C?t+=`
      <div class="d-flex justify-content-center mt-4">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      `:w.length!==0?w.forEach(async e=>{var l,o,c,n,r,d,f,x,u,b,k,U,W,O,V,Q,X,Y,Z,G,J,K,ee,te,se,ae,le,re,oe,ne;$.includes(e.id)?t+=`
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
                      src="${(l=e.teacher)==null?void 0:l.avatar}"
                      alt="teacher"
                      loading="lazy"
                    />
                  </div>
                  <!-- 姓名、職稱 -->
                  <h3 class="fs-7 fs-md-6 text-secondary2 fw-bold mb-1">
                    ${(o=e.teacher)==null?void 0:o.name}
                  </h3>
                </a>
                <p class="fs-sm fs-md-7 text-secondary2 text-center mb-2">
                  ${(c=e.teacher)==null?void 0:c.title}
                </p>
                <ul class="text-center text-gray-300 fs-sm fs-md-7 mb-2">
                  <li class="d-flex align-items-center">
                    <img src="../assets/images/star.svg" alt="star" loading="lazy"/>
                    <span class="fw-bold me-1"> ${(n=e.teacher)==null?void 0:n.rate} </span>
                    講師評等
                  </li>
                  <li>${(r=e.teacher)==null?void 0:r.total_students} 位學生</li>
                  <li>${(d=e.teacher)==null?void 0:d.total_courses} 門課程</li>
                </ul>
                <!-- link -->
                <ul class="d-flex justify-content-center mb-0">
                  <li class="me-1">
                    <a href="${(f=e.teacher)==null?void 0:f.links_codepen}" class="p-1" target="_blank">
                      <i class="fa-brands fa-github"></i
                    ></a>
                  </li>
                  <li class="me-1">
                    <a href="${(x=e.teacher)==null?void 0:x.links_github}" class="p-1" target="_blank">
                      <i class="fa-brands fa-linkedin-in"></i
                    ></a>
                  </li>
                  <li>
                    <a href="${(u=e.teacher)==null?void 0:u.links_linkedin}" class="p-1" target="_blank">
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
                  ${e.badges.map(i=>`<li class="badge bg-primary fw-normal fs-sm fs-lg-7">${i}</li>`).join("")}</ul>`:""}
  
                <!-- 課程tag -->
                ${Array.isArray(e.tags)?`<ul class="d-flex flex-wrap mb-1 mb-sm-2 column-gap-1">
                  ${e.tags.map(i=>`<li class="text-primary text-nowrap fs-sm fs-md-7">
                    #${i}
                  </li>`).join("")}
                </ul>`:""}
  
                <!-- 課程評價、難度 -->
                <div class="d-flex">
                  <a
                    href="#"
                    class="d-flex align-items-center mb-1 mb-sm-2 mb-md-4"
                  >
                    <img src="../assets/images/star.svg" alt="star" loading="lazy"/>
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
                      ${e.categories.map(i=>`
                          <li>
                            <span class="badge text-bg-secondary text-gray-300 fs-sm fs-md-6">
                              ${i}
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
                          ${e.mainPoints.map(i=>`
                        <li class="list-check fs-sm fs-sm-7 fs-md-6">
                          ${i}
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
                     ${(b=e.comment)==null?void 0:b.content}
                    </p>
                    <div
                      class="d-flex justify-content-end align-items-center"
                    >
                      <img
                        class="me-2 d-none d-md-block w-40px h-40px"
                        src="${(U=(k=e.comment)==null?void 0:k.user)==null?void 0:U.avatar}"
                        alt="student"
                        loading="lazy"
                      />
                      <div class="d-flex flex-md-column fs-sm fs-md-7">
                        <p class="fw-bold me-2 me-md-0">${(O=(W=e.comment)==null?void 0:W.user)==null?void 0:O.name}</p>
                        <p>${fe.exec((V=e.comment)==null?void 0:V.date)[1]}</p>
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
                    NT$ ${e.price*.5.toString().replace(S,",")}
                    </span><br />體驗價
                </p>
                <p class="text-nowrap text-center fs-sm fs-sm-6">
                  <span class="fw-bold fs-7 fs-sm-5">
                    NT$ ${e.price.toString().replace(S,",")}
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
                href="${pe}?courseId=${e.id}"
                type="button"
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
                      src="${(Q=e.teacher)==null?void 0:Q.avatar}"
                      alt="teacher"
                      loading="lazy"
                    />
                  </div>
                  <!-- 姓名、職稱 -->
                  <h3 class="fs-7 fs-md-6 text-secondary2 fw-bold mb-1">
                    ${(X=e.teacher)==null?void 0:X.name}
                  </h3>
                </a>
                <p class="fs-sm fs-md-7 text-secondary2 text-center mb-2">
                  ${(Y=e.teacher)==null?void 0:Y.title}
                </p>
                <ul class="text-center text-gray-300 fs-sm fs-md-7 mb-2">
                  <li class="d-flex align-items-center">
                    <img src="../assets/images/star.svg" alt="star" loading="lazy"/>
                    <span class="fw-bold me-1"> ${(Z=e.teacher)==null?void 0:Z.rate} </span>
                    講師評等
                  </li>
                  <li>${(G=e.teacher)==null?void 0:G.total_students} 位學生</li>
                  <li>${(J=e.teacher)==null?void 0:J.total_courses} 門課程</li>
                </ul>
                <!-- link -->
                <ul class="d-flex justify-content-center mb-0">
                  <li class="me-1">
                    <a href="${(K=e.teacher)==null?void 0:K.links_codepen}" class="p-1" target="_blank">
                      <i class="fa-brands fa-github"></i
                    ></a>
                  </li>
                  <li class="me-1">
                    <a href="${(ee=e.teacher)==null?void 0:ee.links_github}" class="p-1" target="_blank">
                      <i class="fa-brands fa-linkedin-in"></i
                    ></a>
                  </li>
                  <li>
                    <a href="${(te=e.teacher)==null?void 0:te.links_linkedin}" class="p-1" target="_blank">
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
                  ${e.badges.map(i=>`<li class="badge bg-primary fw-normal fs-sm fs-lg-7">${i}</li>`).join("")}</ul>`:""}
  
                <!-- 課程tag -->
                ${Array.isArray(e.tags)?`<ul class="d-flex flex-wrap mb-1 mb-sm-2 column-gap-1">
                  ${e.tags.map(i=>`<li class="text-primary text-nowrap fs-sm fs-md-7">
                    #${i}
                  </li>`).join("")}
                </ul>`:""}
  
                <!-- 課程評價、難度 -->
                <div class="d-flex">
                  <a
                    href="#"
                    class="d-flex align-items-center mb-1 mb-sm-2 mb-md-4"
                  >
                    <img src="../assets/images/star.svg" alt="star" loading="lazy"/>
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
                      ${e.categories.map(i=>`
                          <li>
                            <span class="badge text-bg-secondary text-gray-300 fs-sm fs-md-6">
                              ${i}
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
                          ${e.mainPoints.map(i=>`
                        <li class="list-check fs-sm fs-sm-7 fs-md-6">
                          ${i}
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
                     ${(se=e.comment)==null?void 0:se.content}
                    </p>
                    <div
                      class="d-flex justify-content-end align-items-center"
                    >
                      <img
                        class="me-2 d-none d-md-block w-40px h-40px"
                        src="${(le=(ae=e.comment)==null?void 0:ae.user)==null?void 0:le.avatar}"
                        alt="student"
                        loading="lazy"
                      />
                      <div class="d-flex flex-md-column fs-sm fs-md-7">
                        <p class="fw-bold me-2 me-md-0">${(oe=(re=e.comment)==null?void 0:re.user)==null?void 0:oe.name}</p>
                        <p>${fe.exec((ne=e.comment)==null?void 0:ne.date)[1]}</p>
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
                    NT$ ${e.price*.5.toString().replace(S,",")}
                    </span><br />體驗價
                </p>
                <p class="text-nowrap text-center fs-sm fs-sm-6">
                  <span class="fw-bold fs-7 fs-sm-5">
                    NT$ ${e.price.toString().replace(S,",")}
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
                href="${pe}?courseId=${e.id}"
                type="button"
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
      </div>`,je.innerHTML=t;let s=document.querySelectorAll(".follow-btn");s&&(console.log("test"),s.forEach(e=>{e.addEventListener("click",function(){e.classList.contains("following")?ge(e,!0):ge(e,!1)})}))}function Ie(){const t=[...Array(T)].map((l,o)=>`<li class="page-item ${a.page===o+1?"active":""}" aria-current="page">
  <a class="page-link" href="#" data-page="${o+1}">${o+1}</a>
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
</li>`;ye.innerHTML=s+t.join("")+e}function Ee(){window.scrollTo({top:350,left:0,behavior:"smooth"})}const E="http://localhost:3000",q=1;let $;async function xe(){$=(await axios.get(`${E}/users/${q}`)).data.followList}async function ge(t,s){await xe();let e=t.querySelector("i.fa-regular.fa-heart"),l=Number(e.dataset.buttonid);Swal.fire({title:s?"確定要取消追蹤課程?":"確定要追蹤課程?",showDenyButton:!0,confirmButtonColor:"#115BC9",confirmButtonText:s?"取消追蹤":"確認",denyButtonText:s?"我再想想":"取消"}).then(async o=>{if(o.isConfirmed)if(Swal.fire({position:"center",icon:"success",title:s?"已取消追蹤":"成功追蹤",showConfirmButton:!1,timer:1500}),t.classList.toggle("not-follow"),t.classList.toggle("following"),e.classList.toggle("fw-bold"),s){let c=$.filter(n=>n!=l);axios.patch(`${E}/users/${q}`,{followList:c}).then(n=>{console.log("5. res.data.followList",n.data.followList)}).catch(n=>{console.error(n)})}else $.push(l),await axios.patch(`${E}/users/${q}`,{followList:$}).then(c=>{console.log("4. res.data.followList",c.data.followList)})}).catch(o=>{console.error(o)})}const be=document.querySelectorAll(".js-selectedFiltersNum");let m=0;const M=document.querySelectorAll('input[name="filterStar"]'),g=document.querySelector("input[name='minPrice']"),h=document.querySelector("input[name='maxPrice']");let qe=document.querySelector("#accordionFilter");const $e=document.querySelectorAll(".js-category"),Ne=document.querySelector(".js-delFilterBtn");M.forEach(t=>{t.addEventListener("change",s=>{Te(s.target.id)})});function Te(t){a.rate_gte={allStar:0,filterStar5:5,filterStar4:4,filterStar3:3,filterStar2:2,filterStar1:1}[t],v()}g.addEventListener("change",we);h.addEventListener("change",we);function we(){const t=parseInt(this.value.trim());let s,e;this===g?(s=B,e=a.price_gte):this===h&&(s=z,e=a.price_lte),isNaN(t)?e!==s&&(this===g?a.price_gte=t:this===h&&(a.price_lte=t),v()):t!==e&&(this===g?a.price_gte=t:this===h&&(a.price_lte=t),v())}let ve=sessionStorage.getItem("cateItemName");ve&&document.addEventListener("DOMContentLoaded",De);function De(){const t=document.querySelector(`#${ve}`);if(t.checked=!0,t.classList.contains("js-selectAll")){const s=document.querySelectorAll(`input[id^="${t.name}"]:not([id="${t.name}"])`);s.length?(s.forEach(e=>{e.checked=!0,N()}),a.page=1,p(a),Se()):console.log(`${t.name}內沒有checkbox`)}else if(t.type="checkbox"){const s=t.closest(".accordion-item").querySelector(".js-selectAll"),e=t.closest(".accordion-body").querySelectorAll(".js-category");ke(s,e),N(),v()}sessionStorage.removeItem("cateItemName")}qe.addEventListener("change",t=>{const s=t.target;if(s.classList.contains("js-selectAll")){const e=s.checked,l=document.querySelectorAll(`input[id^="${s.name}"]:not([id="${s.name}"])`);l.length?l.forEach(o=>{o.checked=e}):console.log(`${s.name}內沒有checkbox`)}else if(s.type="checkbox"){const e=s.closest(".accordion-item").querySelector(".js-selectAll"),l=s.closest(".accordion-body").querySelectorAll(".js-category");ke(e,l)}N(),v()});function N(){a.filters="";let t="",s="";$e.forEach(e=>{e.checked&&(e.value==="入門"||e.value==="進階"?(s=`&level_like=${e.value}`,a.filters+=s):(Pe(e.value)?(t=`&categories_like=\\b${e.value}\\b`,e.value==="C"&&(t+="(?!%23)")):Fe(e.value)?t=`&categories_like=${encodeURIComponent(e.value)}`:t=`&categories_like=${e.value}`,a.filters+=t))})}function Pe(t){return/^[a-zA-Z]+$/.test(t)}function Fe(t){return/.*[!@#$%^&*()].*/.test(t)}function ke(t,s){const e=[...s];t.checked=e.every(l=>l.checked)}function v(){a.page=1,p(a),Se()}function Se(){M[0].checked||m++,(g.value||h.value)&&m++,$e.forEach(t=>{t.checked&&m++}),be.forEach(t=>t.innerHTML=m),m=0}function Me(t){const s=document.querySelectorAll(".js-filterRatingNum"),e=document.querySelectorAll("[data-category]"),l=s.length,o=e.length,c={5:0,4:0,3:0,2:0,1:0},n={};for(let r=0;r<e.length;r++){let d=e[r].dataset.category;n[d]=0,n[d]===NaN&&console.log("篩選項目有打錯，出現NaN")}t.forEach(r=>{const d=Math.floor(parseFloat(r.rate));if(d>=1)for(let f=1;f<=d;f++)c[f]++;r.categories.forEach(f=>{n[f]++}),n[r.level]++});for(let r=0;r<l;r++)s[r].innerHTML=`(${c[l-r]} 筆)`;for(let r=0;r<o;r++){let d=e[r].dataset.category;e[r].innerHTML=`(${n[d]})`}}Ne.addEventListener("click",Be);function Be(){g.value="",h.value="",M[0].checked=!0,document.querySelectorAll(".js-selectAll, .js-category").forEach(s=>s.checked=!1),a.rate_gte=0,a.rate_lte=5,a.price_gte=B,a.price_lte=z,a.filters="",ze(),p(a)}function ze(){m=0,be.forEach(t=>t.innerHTML=m)}let Re=document.querySelector(".js-totalSearchNum"),w=[],A,T;const D="https://project-code-json-k0ti.onrender.com",B=0,z=9999;let a={page:1,limit:10,sort:"",order:0,q:"",rate_gte:0,rate_lte:5,price_gte:B,price_lte:z,filters:"",sort:"",order:"desc"},C=!1;const p=async({page:t,limit:s,q:e,rate_gte:l,rate_lte:o,price_gte:c,price_lte:n,filters:r,sort:d,order:f})=>{const x=`${D}/courses?_expand=teacher&_page=${t}&_limit=${s}&q=${e}&rate_gte=${l}&rate_lte=${o}&price_gte=${c}&price_lte=${n}${r}&_sort=${d}&_order=${f}`;console.log(x),C=!0,me(),ue();try{const u=await axios.get(x);w=u.data,A=parseInt(u.headers.get("X-Total-Count")),Re.innerHTML=`共 ${A} 個結果`;for(const b of w){const k=await axios.get(`${D}/comments/${b.commentId}?_expand=user`);b.comment=k.data}console.log("currentPageCourses",w),C=!1,me(),ue(),We(a),T=Math.ceil(parseInt(A)/parseInt(a.limit)),Ie()}catch(u){console.log("courseError",u)}},He=localStorage.getItem("indexSearchInput"),Ue=sessionStorage.getItem("cateItemName");!He&&!Ue&&p(a);const We=async({q:t,rate_gte:s,rate_lte:e,price_gte:l,price_lte:o,filters:c})=>{const n=`${D}/courses?&q=${t}&rate_gte=${s}&rate_lte=${e}&price_gte=${l}&price_lte=${o}${c}`;try{const r=await axios.get(n);Me(r.data)}catch(r){console.log("getAllData",r)}},he=localStorage.getItem("indexSearchInput");he&&(a.q=he,p(a),a.q="",localStorage.removeItem("indexSearchInput"));const L=document.querySelector(".course-search-input");let P="";L.addEventListener("input",function(){P=L.value});const Ce=document.querySelector(".course-search-button");Ce.addEventListener("click",function(){a.q=P,p(a),L.value="",P=""});L.addEventListener("keyup",function(t){t.key==="Enter"&&Ce.click()});const Oe=document.querySelector(".js-sortBy .dropdown-toggle"),Ve=document.querySelector(".js-sortBy .dropdown-menu");Ve.addEventListener("click",t=>{const{order:s}=t.target.dataset;s&&a.sort!==s&&(a.sort=s,Oe.innerHTML=`排序依據：${t.target.textContent}`,a.page=1,p(a))});const y="http://localhost:3000";let _=1,j;const I=Swal.mixin({icon:"success",toast:!0,position:"top-end",showConfirmButton:!1,timer:2e3,didOpen:t=>{t.addEventListener("mouseenter",Swal.stopTimer),t.addEventListener("mouseleave",Swal.resumeTimer)}});let F,Le,R,H;courseList.addEventListener("click",async t=>{t.target&&t.target.dataset.course&&(j=t.target.dataset.course,await _e(),H=Le.find(s=>s.couponId==R[0].id)!==void 0,Xe(),Ge(),Qe())});async function _e(){try{const t=`${y}/myCarts?userId=${_}&courseId=${j}`,s=`${y}/myCoupons?userId=${_}`,e=`${y}/coupons?courseId=${j}`,l=await Promise.all([axios.get(t),axios.get(s),axios.get(e)]);console.log("arrayRes",l),F=l[0].data,Le=l[1].data,R=l[2].data}catch{console.log("getStartCourseData",_e)}}async function Qe(){H?I.fire({title:"將課程加入購物車"}):(await I.fire({title:"將課程加入購物車"}),I.fire({title:"首次加入購物車，獲得「體驗課優惠券」、「多堂折價優惠券」"}))}function Xe(){F.length?Ze(F[0]):Ye()}async function Ye(){try{const t={userId:_,courseId:j,quantity:1,isPurchased:!1};await axios.post(`${y}/myCarts`,t,{headers:{"Content-Type":"application/json"}}),console.log("課程加入購物車")}catch(t){console.log("getMyCarts",t)}}async function Ze(t){try{let{id:s,quantity:e}=t;e+=1;let l={quantity:e};await axios.patch(`${y}/myCarts/${s}`,l,{headers:{"Content-Type":"application/json"}}),console.log("購物車數量加一")}catch(s){console.log("getMyCarts",s)}}async function Ge(){if(!H)try{await Promise.all(R.map(t=>Je(t)))}catch(t){console.error("Error adding coupons:",t)}}async function Je(t){try{let s=t.id,e=t.discountCourseNum*7,l=Date.now(),o=new Date(l);o.setDate(o.getDate()+e),o.setHours(23,59,59,999);let c={userId:_,couponId:s,canUse:!0,timestamp:l,dueDate:o};await axios.post(`${y}/myCoupons`,c,{headers:{"Content-Type":"application/json"}})}catch(s){console.log("addCoupon",s)}}
