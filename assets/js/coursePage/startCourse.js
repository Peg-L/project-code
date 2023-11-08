const apiUrl = "http://localhost:3000";
let userId = 1;
let courseId;
const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
// coursePage：若直接監聽 button ，因為還沒渲染完會抓不到東西，因此監聽父元素 courseList 的點擊事件
courseList.addEventListener("click", async (e) => {
  if (e.target && e.target.dataset.course) {
    courseId = e.target.dataset.course;
    await Toast.fire({
      icon: "success",
      title: "將課程加入購物車",
    });
    checkCoupon();
  }
});

async function checkCoupon() {
  let courseCoupons = await getCourseCoupon();
  console.log(courseCoupons);
  let myCoupons = await getMyCoupons();
  console.log("courseCoupons[0]", courseCoupons[0]);
  // 若沒拿過優惠券(以體驗課 courseCoupons[0].id 為代表判斷)就能獲得優惠券
  if (
    myCoupons.find((coupon) => coupon.couponId == courseCoupons[0].id) ===
    undefined
  ) {
    Toast.fire({
      icon: "success",
      title: `首次加入購物車，獲得「體驗課優惠券」、「多堂折價優惠券」`,
      timer: 3000,
    });
    for (const coupon of courseCoupons) {
      // 過期日以 優惠券折價堂數 * 7 天 計算
      let dueDay = coupon.discountCourseNum * 7;
      await addCoupon(coupon.id, dueDay);
    }
  }
}

// 添加優惠券給 user
async function addCoupon(couponId, dueDay) {
  try {
    let timestamp = new Date().getTime(); //毫秒
    // 到期日的 23:59:59 過期
    let dueDate = new Date(timestamp);
    dueDate.setDate(dueDate.getDate() + dueDay);
    dueDate.setHours(23, 59, 59, 999);
    let postData = {
      userId,
      couponId,
      canUse: true,
      timestamp,
      dueDate,
    };
    await axios.post(`${apiUrl}/myCoupons`, postData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("addCoupon", error);
  }
}

// 取得要得到的coupon的id
async function getCourseCoupon() {
  try {
    const { data } = await axios.get(`${apiUrl}/coupons?courseId=${courseId}`);
    return data;
  } catch (error) {
    console.log("getCourseCoupon", error);
  }
}

// 取得目前user優惠券
async function getMyCoupons() {
  try {
    const { data } = await axios.get(`${apiUrl}/myCoupons?userId=${userId}`);
    return data;
  } catch (error) {
    console.log("getCouponId", error);
  }
}
