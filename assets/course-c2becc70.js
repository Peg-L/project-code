import{i as S,a as i,u as y,g as ue,r as fe}from"./backtotop-e931ed7f.js";let z=document.querySelector("#js-filter-bar"),O=document.querySelector("#js-sticky-mt");const V=document.querySelector(".navbar");window.addEventListener("scroll",()=>{let e;window.innerWidth<375?e=120:window.innerWidth<768?e=300:e=418,window.scrollY<e?(z.style.boxShadow="",O.style.marginTop="",V.style.display="block"):(z.style.boxShadow="0 10px 6px -6px rgba(0, 0, 0, 0.15)",O.style.marginTop="78px",V.style.display="none")});window.addEventListener("resize",function(){(window.innerWidth||document.documentElement.clientWidth)<1200&&document.getElementById("collapseFilter").classList.add("show")});const K=document.querySelectorAll(".js-selectedFiltersNum");let g=0;const M=document.querySelectorAll('input[name="filterStar"]'),x=document.querySelector("input[name='minPrice']"),$=document.querySelector("input[name='maxPrice']");let pe=document.querySelector("#accordionFilter");const ee=document.querySelectorAll(".js-category"),me=document.querySelector(".js-delFilterBtn");function w(){a.page=1,re(),p(a),oe()}M.forEach(e=>{e.addEventListener("change",s=>{ge(s.target.id)})});function ge(e){a.rate_gte={allStar:0,filterStar5:5,filterStar4:4,filterStar3:3,filterStar2:2,filterStar1:1}[e],w()}x.addEventListener("change",te);$.addEventListener("change",te);function te(){const e=parseInt(this.value.trim());let s,t;this===x?(s=F,t=a.price_gte):this===$&&(s=B,t=a.price_lte),isNaN(e)?t!==s&&(this===x?a.price_gte=e:this===$&&(a.price_lte=e),w()):e!==t&&(this===x?a.price_gte=e:this===$&&(a.price_lte=e),w())}let se=sessionStorage.getItem("cateItemName");se&&document.addEventListener("DOMContentLoaded",he);function he(){const e=document.querySelector(`#${se}`);if(e.checked=!0,e.classList.contains("js-selectAll")){const s=document.querySelectorAll(`input[id^="${e.name}"]:not([id="${e.name}"])`);s.length&&(s.forEach(t=>{t.checked=!0,j()}),a.page=1,p(a),oe())}else if(e.type="checkbox"){const s=e.closest(".accordion-item").querySelector(".js-selectAll"),t=e.closest(".accordion-body").querySelectorAll(".js-category");ae(s,t),j(),w()}sessionStorage.removeItem("cateItemName")}pe.addEventListener("change",e=>{const s=e.target;if(s.classList.contains("js-selectAll")){const t=s.checked,o=document.querySelectorAll(`input[id^="${s.name}"]:not([id="${s.name}"])`);o.length&&o.forEach(r=>{r.checked=t})}else if(s.type="checkbox"){const t=s.closest(".accordion-item").querySelector(".js-selectAll"),o=s.closest(".accordion-body").querySelectorAll(".js-category");ae(t,o)}j(),w()});function j(){a.filters="";let e="",s="";ee.forEach(t=>{t.checked&&(t.value==="入門"||t.value==="進階"?(s=`&level_like=${t.value}`,a.filters+=s):(ye(t.value)?(e=`&categories_like=\\b${t.value}\\b`,t.value==="C"&&(e+="(?!%23)")):(e=`&categories_like=${Q(t.value)}`,console.log(Q(t.value)),console.dir(t)),a.filters+=e))})}function ye(e){return/^[a-zA-Z]+$/.test(e)}function Q(e){return e.replace(/[!@#$%^&*()\s]/g,function(s){return encodeURIComponent(s)})}function ae(e,s){const t=[...s];e.checked=t.every(o=>o.checked)}function oe(){M[0].checked||g++,(x.value||$.value)&&g++,ee.forEach(e=>{e.checked&&g++}),K.forEach(e=>e.innerHTML=g),g=0}function be(e){const s=document.querySelectorAll(".js-filterRatingNum"),t=document.querySelectorAll("[data-category]"),o=s.length,r=t.length,n={5:0,4:0,3:0,2:0,1:0},c={};for(let l=0;l<t.length;l++){let d=t[l].dataset.category;c[d]=0}e.forEach(l=>{const d=Math.floor(parseFloat(l.rate));if(d>=1)for(let u=1;u<=d;u++)n[u]++;l.categories.forEach(u=>{c[u]++}),c[l.level]++});for(let l=0;l<o;l++)s[l].innerHTML=`(${n[o-l]} 筆)`;for(let l=0;l<r;l++){let d=t[l].dataset.category;t[l].innerHTML=`(${c[d]})`}}me.addEventListener("click",xe);function xe(){x.value="",$.value="",M[0].checked=!0,document.querySelectorAll(".js-selectAll, .js-category").forEach(s=>s.checked=!1),a.rate_gte=0,a.rate_lte=5,a.price_gte=F,a.price_lte=B,a.filters="",$e(),w()}function $e(){g=0,K.forEach(e=>e.innerHTML=g)}function re(){window.scrollTo({top:350,left:0,behavior:"smooth"})}const le=document.querySelector(".pagination");le.addEventListener("click",e=>{const s=e.target.closest("[data-page]");if(s){e.preventDefault();const{page:t}=s.dataset;switch(t){case"prev":a.page-=1;break;case"next":a.page+=1;break;default:a.page=Number(t)}p(a),re()}});const we=document.querySelector("#courseList"),ve=/^(\d{4}-\d{2}-\d{2}).*/,X=/\B(?=(?:\d{3})+(?!\d))/g,Se=window.location.href,Ce=Se.replace("course","course_intro");function Y(){const e=document.querySelectorAll("input");I?e.forEach(s=>{s.disabled=!0}):e.forEach(s=>{s.disabled=!1})}function Z(){ke();let e="";I?e+=`
      <div class="d-flex justify-content-center mt-4">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      `:C.length!==0?C.forEach(async t=>{var o,r,n,c,l,d,u,b,v,L,k,f,E,U,W;e+=`
          <li class="card flex-row flex-wrap flex-md-nowrap shadow">
            <div class="d-flex flex-grow-1 p-4 p-lg-8">
              <!--  老師區塊 -->
              <div
                class="d-flex flex-column align-items-center min-w-100px w-100px min-w-md-150px w-md-150px bg-white me-4"
              >
                <!-- 愛心 -->
                <button
                  type="button"
                  class="btn p-0 text-center align-self-start follow-btn ${h.includes(t.id)?"following":"not-follow"}"
                  data-bs-target="#loginModal"
                  ${S?"":'data-bs-toggle="modal"'}
                >
                  <i
                    class="fa-regular fa-heart fs-3 text-primary hover-bold ${h.includes(t.id)?"fw-bold":""}" data-buttonId="${t.id}"
                  ></i>
                </button>
  
                <a href="#" class="text-center">
                  <!-- 圖 -->
                  <div class="mb-2 w-100px h-100px">
                    <img
                      class="img-fluid rounded-circle p-1 p-md-0"
                      src="${(o=t.teacher)==null?void 0:o.avatar}"
                      alt="teacher"
                    />
                  </div>
                  <!-- 姓名、職稱 -->
                  <h3 class="fs-7 fs-md-6 text-secondary2 fw-bold mb-1">
                    ${(r=t.teacher)==null?void 0:r.name}
                  </h3>
                </a>
                <p class="fs-sm fs-md-7 text-secondary2 text-center mb-2">
                  ${(n=t.teacher)==null?void 0:n.title}
                </p>
                <ul class="text-center text-gray-300 fs-sm fs-md-7 mb-2">
                  <li class="d-flex align-items-center">
                    <img src="https://raw.githubusercontent.com/Peg-L/project-code/89a637dfbea6e49a34b11aacf46dc07a001b4a90/assets/images/star.svg" />
                    <span class="fw-bold me-1"> ${(c=t.teacher)==null?void 0:c.rate} </span>
                    講師評等
                  </li>
                  <li>${(l=t.teacher)==null?void 0:l.total_students} 位學生</li>
                  <li>${(d=t.teacher)==null?void 0:d.total_courses} 門課程</li>
                </ul>
                <!-- link -->
                <ul class="d-flex justify-content-center mb-0">
                  <li class="me-1">
                    <a href="${(u=t.teacher)==null?void 0:u.links_codepen}" class="p-1" target="_blank">
                      <i class="fa-brands fa-github"></i
                    ></a>
                  </li>
                  <li class="me-1">
                    <a href="${(b=t.teacher)==null?void 0:b.links_github}" class="p-1" target="_blank">
                      <i class="fa-brands fa-linkedin-in"></i
                    ></a>
                  </li>
                  <li>
                    <a href="${(v=t.teacher)==null?void 0:v.links_linkedin}" class="p-1" target="_blank">
                      <i class="fa-brands fa-codepen"></i
                    ></a>
                  </li>
                </ul>
              </div>
              <!--  課程區塊 -->
              <div class="flex-grow-1">
                <!-- 課程名稱 -->
                <h3 class="card-title fs-6 fs-sm-4 ">
                  ${t.name}
                </h3>
                <!-- 優質標籤 -->
                ${Array.isArray(t.badges)?`<ul class="d-flex gap-2 mb-2">
                  ${t.badges.map(m=>`<li class="badge bg-primary fw-normal fs-sm fs-lg-7">${m}</li>`).join("")}</ul>`:""}
  
                <!-- 課程tag -->
                ${Array.isArray(t.tags)?`<ul class="d-flex flex-wrap mb-1 mb-sm-2 column-gap-1">
                  ${t.tags.map(m=>`<li class="text-primary text-nowrap fs-sm fs-md-7">
                    #${m}
                  </li>`).join("")}
                </ul>`:""}
  
                <!-- 課程評價、難度 -->
                <div class="d-flex">
                  <a
                    href="#"
                    class="d-flex align-items-center mb-1 mb-sm-2 mb-md-4"
                  >
                    <img src="https://raw.githubusercontent.com/Peg-L/project-code/89a637dfbea6e49a34b11aacf46dc07a001b4a90/assets/images/star.svg" alt="star" />
                    <span class="fw-bold fs-sm fs-md-7 ms-1">${t.rate}</span>
                    ・
                    <span class="fs-sm fs-md-7 me-2">${t.commentNum} 個評論</span>
                  </a>
                  <p class="text-gray-300">| ${t.level}</p>
                </div>
                <!-- 課程介紹 -->
                <p
                  class="fs-sm fs-sm-7 fs-md-6 text-justify truncate-lines-2 truncate-md-lines-4"
                >${t.info}
                </p>
                <hr />
                <!-- 課程篩選tag -->
                <div>
                  <h4
                    class="text-secondary2 fs-7 fs-sm-6 fs-md-5 mb-2 mb-sm-3"
                  >
                    你可以跟我學
                  </h4>
                  ${Array.isArray(t.categories)?`
                    <ul class="d-flex flex-wrap gap-1 gap-md-2 mb-0">
                      ${t.categories.map(m=>`
                          <li>
                            <span class="badge text-bg-secondary text-gray-300 fs-sm fs-md-6">
                              ${m}
                            </span>
                          </li>`).join("")}
                    </ul>`:""}
                </div>
                <hr />
                <!-- 收合內容 -->
                <div class="collapse" id="collapseCourse${t.id}">
                  <!-- 你將獲得 -->
                  <div>
                    <h4 class="text-secondary2 fs-7 fs-sm-5 mb-2 mb-sm-3">
                      你將獲得
                    </h4>
                    ${Array.isArray(t.mainPoints)?`<ul>
                          ${t.mainPoints.map(m=>`
                        <li class="list-check fs-sm fs-sm-7 fs-md-6">
                          ${m}
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
                     ${(L=t.comment)==null?void 0:L.content}
                    </p>
                    <div
                      class="d-flex justify-content-end align-items-center"
                    >
                      <img
                        class="me-2 d-none d-md-block w-40px h-40px"
                        src="${(f=(k=t.comment)==null?void 0:k.user)==null?void 0:f.avatar}"
                        alt="student"
                      />
                      <div class="d-flex flex-md-column fs-sm fs-md-7">
                        <p class="fw-bold me-2 me-md-0">${(U=(E=t.comment)==null?void 0:E.user)==null?void 0:U.name}</p>
                        <p>${ve.exec((W=t.comment)==null?void 0:W.date)[1]}</p>
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
                  data-bs-target="#collapseCourse${t.id}"
                  aria-expanded="false"
                  aria-controls="collapseCourse${t.id}"
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
                    NT$ ${t.price*.5.toString().replace(X,",")}
                    </span><br />體驗價
                </p>
                <p class="text-nowrap text-center fs-sm fs-sm-6">
                  <span class="fw-bold fs-7 fs-sm-5">
                    NT$ ${t.price.toString().replace(X,",")}
                  </span>
                  <br />${t.duration}分鐘
                </p>
              </div>
              <!-- 購買按鈕 -->
              <button
                type="button"
                class="btn btn-secondary2 w-100 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
                data-course="${t.id}"
                data-bs-target="#loginModal"
                ${S?"":'data-bs-toggle="modal"'}
              >
                立即上課
              </button>
              <a
                href="${Ce}?courseId=${t.id}"
                class="btn btn-white w-100 fs-sm fs-sm-7 py-1 px-2 py-sm-2 px-sm-4"
              >
                查看介紹
              </a>
            </div>
          </li>
        `}):e+=`
      <div class="d-flex flex-column justify-content-center text-center h-100 px-10">
        <p class="fs-3 mb-4">沒有符合條件的課程</p>
        <p class="fs-6">
          看起來目前沒有符合您需求的課程，請嘗試修改您的搜尋詞彙或篩選條件。
        </p>
      </div>`,we.innerHTML=e;let s=document.querySelectorAll(".follow-btn");s&&S&&s.forEach(t=>{t.addEventListener("click",function(){t.classList.contains("following")?G(t,!0):G(t,!1)})})}function Le(){const e=[...Array(N)].map((o,r)=>`<li class="page-item ${a.page===r+1?"active":""}" aria-current="page">
  <a class="page-link" href="#" data-page="${r+1}">${r+1}</a>
</li>`),s=`<li class="page-item ${a.page===1?"disabled":""} ">
  <a
    class="page-link"
    href="#"
    aria-label="Previous" data-page="prev"
  >
    <i class="fa-solid fa-angle-left" ></i>
  </a>
</li>`,t=`<li class="page-item ${a.page===N?"disabled":""}">
<a class="page-link" href="#" aria-label="Next" data-page="next">
  <i class="fa-solid fa-angle-right"></i>
</a>
</li>`;le.innerHTML=s+e.join("")+t}let h=[];async function ke(){S?(h=(await i.get(`http://localhost:3000/users/${y}`)).data.followList,console.log(h)):console.log("沒有登入")}function G(e,s){let t=e.querySelector("i.fa-regular.fa-heart"),o=Number(t.dataset.buttonid);Swal.fire({title:s?"確定要取消追蹤課程?":"確定要追蹤課程?",showDenyButton:!0,confirmButtonColor:"#115BC9",confirmButtonText:s?"取消追蹤":"確認",denyButtonText:s?"我再想想":"取消"}).then(async r=>{if(r.isConfirmed)if(Swal.fire({position:"center",icon:"success",title:s?"已取消追蹤":"成功追蹤",showConfirmButton:!1,timer:1500}),e.classList.toggle("not-follow"),e.classList.toggle("following"),t.classList.toggle("fw-bold"),s){let n=h.filter(c=>c!=o);i.patch(`http://localhost:3000/users/${y}`,{followList:n}).then(c=>{}).catch(c=>{console.error(c)})}else h.push(o),await i.patch(`http://localhost:3000/users/${y}`,{followList:h})}).catch(r=>{console.error(r)})}let Ee=document.querySelector(".js-totalSearchNum"),C=[],T,N;const F=0,B=9999;let a={page:1,limit:10,sort:"",order:0,q:"",rate_gte:0,rate_lte:5,price_gte:F,price_lte:B,filters:"",sort:"",order:"desc"},I=!1;Ie();function Ie(){const e=localStorage.getItem("indexSearchInput"),s=sessionStorage.getItem("cateItemName"),t=localStorage.getItem("redirectToPopular");console.log(t),!e&&!s&&!t&&p(a),_e(a)}async function p({page:e,limit:s,q:t,rate_gte:o,rate_lte:r,price_gte:n,price_lte:c,filters:l,sort:d,order:u}){try{const b=`http://localhost:3000/courses?_expand=teacher&_page=${e}&_limit=${s}&q=${t}&rate_gte=${o}&rate_lte=${r}&price_gte=${n}&price_lte=${c}${l}&_sort=${d}&_order=${u}`;I=!0,Z(),Y();const v=await i.get(b);C=v.data,T=parseInt(v.headers.get("X-Total-Count")),Ee.innerHTML=`共 ${T} 個結果`;const L=C.map(f=>`http://localhost:3000/comments/${f.commentId}?_expand=user`),k=await Promise.all(L.map(f=>i.get(f)));C.forEach((f,E)=>{f.comment=k[E].data}),I=!1,Z(),Y(),N=Math.ceil(parseInt(T)/parseInt(a.limit)),Le()}catch(b){console.log("courseError",b)}}async function _e({q:e,rate_gte:s,rate_lte:t,price_gte:o,price_lte:r,filters:n}){try{const c=`http://localhost:3000/courses?&q=${e}&rate_gte=${s}&rate_lte=${t}&price_gte=${o}&price_lte=${r}${n}`,l=await i.get(c);be(l.data)}catch(c){console.log("getAllData",c)}}const J=localStorage.getItem("indexSearchInput");J&&(a.q=J,p(a),a.q="",localStorage.removeItem("indexSearchInput"));const _=document.querySelector(".course-search-input");let P="";_.addEventListener("input",function(){P=_.value});const ce=document.querySelector(".course-search-button");ce.addEventListener("click",function(){a.q=P,p(a),_.value="",P=""});_.addEventListener("keyup",function(e){e.key==="Enter"&&ce.click()});const ne=document.querySelector(".js-sortBy .dropdown-toggle"),qe=document.querySelector(".js-sortBy .dropdown-menu"),Te=localStorage.getItem("redirectToPopular");async function Ae(){if(Te){const e="commentNum";a.sort!==e&&(a.sort=e,ne.innerHTML="排序依據：最熱門",a.page=1,await p(a),localStorage.removeItem("redirectToPopular"))}}Ae();qe.addEventListener("click",e=>{const{order:s}=e.target.dataset;s&&a.sort!==s&&(a.sort=s,ne.innerHTML=`排序依據：${e.target.textContent}`,a.page=1,p(a))});let q;const A=Swal.mixin({icon:"success",toast:!0,position:"top-end",showConfirmButton:!1,timer:2e3,didOpen:e=>{e.addEventListener("mouseenter",Swal.stopTimer),e.addEventListener("mouseleave",Swal.resumeTimer)}});let D,ie,H,R;courseList.addEventListener("click",async e=>{if(e.target.dataset.course)if(S)q=e.target.dataset.course,await de(),R=ie.find(s=>s.couponId==H[0].id)!==void 0,console.log("4654"),Ne(),Me(),je();else{let r=function(){t&&(s==0&&(location.href="./login.html"),document.getElementById("timeBox").innerHTML=s,s-=1,setTimeout(r,1e3))},s=5,t=!0;document.getElementById("timeBox").innerHTML=s,document.querySelector("#btn-close").addEventListener("click",function(){t=!1}),r()}});async function de(){try{const e=`http://localhost:3000/myCarts?userId=${y}&courseId=${q}&status=purchase`,s=`http://localhost:3000/myCoupons?userId=${y}`,t=`http://localhost:3000/coupons?courseId=${q}`,o=await Promise.all([i.get(e),i.get(s),i.get(t)]);D=o[0].data,ie=o[1].data,H=o[2].data}catch{console.log("getStartCourseData",de)}}async function je(){R?A.fire({title:"將課程加入購物車"}):(await A.fire({title:"將課程加入購物車"}),A.fire({title:"首次加入購物車，獲得「體驗課優惠券」、「多堂折價優惠券」"}))}function Ne(){D.length?De(D[0]):Pe()}async function Pe(){try{const e={userId:y,courseId:q,quantity:1,status:"purchase",isNextPurchase:!1,dueDate:""};await i.post("http://localhost:3000/myCarts",e,{headers:{"Content-Type":"application/json"}}),await ue(),fe()}catch(e){console.log("getMyCarts",e)}}async function De(e){try{let{id:s,quantity:t,isNextPurchase:o}=e,r={};o?r={isNextPurchase:!1}:(t=Number(t)+1,r={quantity:t}),await i.patch(`http://localhost:3000/myCarts/${s}`,r,{headers:{"Content-Type":"application/json"}})}catch(s){console.log("getMyCarts",s)}}async function Me(){if(!R)try{await Promise.all(H.map(e=>Fe(e)))}catch(e){console.error("Error adding coupons:",e)}}async function Fe(e){try{let s=e.id,t=e.discountCourseNum*7,o=Date.now(),r=new Date(o);r.setDate(r.getDate()+t),r.setHours(23,59,59,999);let n={userId:y,couponId:s,canUse:!0,timestamp:o,dueDate:r};await i.post("http://localhost:3000/myCoupons",n,{headers:{"Content-Type":"application/json"}})}catch(s){console.log("addCoupon",s)}}
