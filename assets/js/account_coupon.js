// 記得改 userId
const couponPageArrow = document.querySelectorAll(".js-couponPageArrow");

let myCoupons = [];
let couponCurrentPage = 1;
let couponLastPage;
getCoupons();

// 確認有無過期，過期的改為 canUse: false 不顯示
async function checkDueDate() {
  let today = new Date().getTime();
  for (const coupon of myCoupons) {
    if (new Date(coupon.dueDate).getTime() < today) {
      try {
        await axios.patch(
          `${_url}/myCoupons/${coupon.id}`,
          {
            canUse: false,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("過期", coupon);
        getCoupons();
      } catch (error) {
        console.log("checkDueDate", error);
      }
    } else {
      console.log("沒過期");
      renderCoupons();
      renderCouponPagination();
    }
  }
}
// 取得 coupons
async function getCoupons() {
  try {
    const couponUrl = `${_url}/myCoupons?_expand=coupon&canUse=true&userId=${userId}&_page=${couponCurrentPage}&_limit=6_sort=dueDate&_order=asc`;
    const res = await axios.get(couponUrl);
    let myCouponsNum = parseInt(res.headers.get("X-Total-Count"));
    // 展開老師資料
    for (item of res.data) {
      const { data } = await axios.get(
        `${_url}/coupons/${item.couponId}?_expand=teacher`
      );
      item.coupon = data;
    }
    if (res.data.length) {
      myCoupons = res.data;
      couponLastPage = Math.ceil(myCouponsNum / 6);
      //   console.log("myCoupons", myCoupons);
      checkDueDate();
    } else {
      renderCoupons();
    }
  } catch (error) {
    console.log("getCoupons", error);
  }
}

//渲染 Coupons
function renderCoupons() {
  console.log("123", myCoupons);
  console.log("123", myCoupons.length);
  // 日期規則
  const dateReg = /^(\d{4}-\d{2}-\d{2}).*/;
  // 選取 優惠券ul
  const couponGroup = document.querySelector(".js-couponGroup");

  let couponListHtml = "";
  myCoupons.length
    ? myCoupons.forEach((myCoupon) => {
        couponListHtml += `
            <li class="col drop-shadow">
              <div class="card border-x-wave h-100">
                <div class="row g-0 h-100">
                  <div class="col-3 d-flex align-items-center p-4 ${
                    myCoupon.coupon.type === "allCourse"
                      ? "bg-primary"
                      : "bg-gray-300"
                  }">
                  <img
                    class="img-fluid w-100 rounded-circle img-thumbnail border-0"
                    src="${
                      myCoupon.coupon.type === "allCourse"
                        ? "./assets/images/logo-img.svg"
                        : myCoupon.coupon.teacher.avatar
                    }"
                    alt="teacher"
                  />
                  </div>
                  <div class="col-6">
                    <div class="card-body h-100 d-flex flex-column">
                      <h5 class="card-title fs-7 fs-sm-5 mb-2 mb-sm-4 truncate-lines-2">
                        ${myCoupon.coupon.title}
                      </h5>
                      <p class="card-text fs-sm fs-sm-7 mb-3 flex-grow-1">
                        ${myCoupon.coupon.info}
                      </p>
                      <p class="card-text">
                        <small
                          class="text-body-secondary d-flex align-items-center gap-1">
                          <span class="material-symbols-outlined">
                            update </span>
                          <time datetime="${
                            dateReg.exec(myCoupon.dueDate)[1]
                          }">${dateReg.exec(myCoupon.dueDate)[1]}</time>
                          失效
                        </small>
                      </p>
                    </div>
                  </div>
                  <div class="col-3 d-flex align-items-center pe-4">
                    <a
                      href="course.html"
                      class="btn btn-secondary2 px-1 px-sm-4 w-100"
                      >馬上使用</a
                    >
                  </div>
                </div>
              </div>
            </li>`;
      })
    : (couponListHtml += `<p class="text-center fs-5">目前沒有優惠券<p>`);

  couponGroup.innerHTML = couponListHtml;
}

// 渲染 Coupons 分頁
function renderCouponPagination() {
  couponPageArrow.forEach((arrow, index, arrowGroup) => {
    // 要有分頁
    if (couponLastPage > 1) {
      arrow.classList.remove("d-none");

      // 幫上一頁、下一頁加 disabled
      if (couponCurrentPage === 1) {
        arrowGroup[0].classList.add("disabled");
      } else {
        arrowGroup[0].classList.remove("disabled");
      }
      if (couponCurrentPage === couponLastPage) {
        arrowGroup[1].classList.add("disabled");
      } else {
        arrowGroup[1].classList.remove("disabled");
      }
    } else {
      // coupons 太少不需要分頁
      arrow.classList.add("d-none");
    }
  });
}
// 上一頁、下一頁點擊事件
couponPageArrow.forEach((arrow, index) => {
  arrow.addEventListener("click", (e) => {
    e.preventDefault();
    const target = e.target.closest(".js-couponPageArrow");
    if (!target.classList.contains("disabled")) {
      index === 1 ? couponCurrentPage++ : Math.max(1, couponCurrentPage--);

      getCoupons();
    }
  });
});
