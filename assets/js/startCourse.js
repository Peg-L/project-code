import { userId, isLogin } from "../config";
import { getCartLength, renderCartNum } from "../header";
import axios from "axios";

let courseId;
const Toast = Swal.mixin({
  icon: "success",
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

let myCart;
let myCoupons;
let courseCoupons;
let hasCoupons;

// coursePage：若直接監聽 button ，因為還沒渲染完會抓不到東西，因此監聽父元素 courseList 的點擊事件
courseList.addEventListener("click", async (e) => {
  if (e.target.dataset.course) {
    // 若有登入，執行加入購物車和優惠券
    if (isLogin) {
      courseId = e.target.dataset.course;
      await getData();
      // 若沒拿過優惠券(以體驗課 courseCoupons[0].id 為代表判斷)就能獲得優惠券
      hasCoupons =
        myCoupons.find((coupon) => coupon.couponId == courseCoupons[0].id) !==
        undefined;
      console.log("4654");
      addCart();
      checkCoupon();
      message();
    } else {
      // 若沒登入，打開 登入 modal
      // loginModal.show();

      // 設定倒數秒數
      let count = 5;
      let countdownActive = true;
      // 將秒數寫在指定元素中
      document.getElementById("timeBox").innerHTML = count;

      // 取得 btn-close 元素
      let closeBtnEl = document.querySelector("#btn-close");

      function countDown() {
        if (countdownActive) {
          // 當 count = 0 時跳轉頁面
          if (count == 0) {
            location.href = "./login.html";
          }

          // 將秒數寫在指定元素中
          document.getElementById("timeBox").innerHTML = count;
          // 每次執行就減1
          count -= 1;

          // 設定每秒執行1次

          setTimeout(countDown, 1000);
        }
      }

      // 監聽 close-btn 點擊事件
      closeBtnEl.addEventListener("click", function () {
        // 停止倒計時
        countdownActive = false;
      });

      // 執行 countDown
      countDown();
    }
  }
});

async function getData() {
  try {
    const myCartApi = `${_url}/myCarts?userId=${userId}&courseId=${courseId}&status=purchase`;
    const myCouponsApi = `${_url}/myCoupons?userId=${userId}`;
    const courseCouponsApi = `${_url}/coupons?courseId=${courseId}`;

    const arrayRes = await Promise.all([
      axios.get(myCartApi), // 取得目前user購物車內的該課程
      axios.get(myCouponsApi), // 取得目前user優惠券
      axios.get(courseCouponsApi), // 取得點擊課程的優惠券
    ]);
    // console.log("arrayRes", arrayRes);

    myCart = arrayRes[0].data; // user購物車內的該課程
    myCoupons = arrayRes[1].data; // user優惠券
    courseCoupons = arrayRes[2].data; // 課程優惠券
  } catch (error) {
    console.log("getStartCourseData", getData);
  }
}

async function message() {
  if (hasCoupons) {
    Toast.fire({
      title: "將課程加入購物車",
    });
  } else {
    await Toast.fire({
      title: "將課程加入購物車",
    });
    Toast.fire({
      title: `首次加入購物車，獲得「體驗課優惠券」、「多堂折價優惠券」`,
    });
  }
}
function addCart() {
  myCart.length
    ? addQuantityToMyCarts(myCart[0]) // 該課程已在購物車
    : addCourseToMyCarts(); // 該課程沒在購物車
}

// 新增購物車課程
async function addCourseToMyCarts() {
  try {
    const postData = {
      userId,
      courseId,
      quantity: 1,
      status: "purchase",
      isNextPurchase: false,
      dueDate: "",
    };
    await axios.post(`${_url}/myCarts`, postData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    await getCartLength();
    renderCartNum();
  } catch (error) {
    console.log("getMyCarts", error);
  }
}

async function addQuantityToMyCarts(myCarts) {
  try {
    let { id, quantity, isNextPurchase } = myCarts;
    let patchData = {};
    // 課程若在 下次再買 就把它移到 購物項目
    if (isNextPurchase) {
      patchData = {
        isNextPurchase: false,
      };
    }
    // 課程若在購物項目就加數量
    else {
      quantity = Number(quantity) + 1;
      patchData = {
        quantity,
      };
    }
    await axios.patch(`${_url}/myCarts/${id}`, patchData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("getMyCarts", error);
  }
}

async function checkCoupon() {
  if (!hasCoupons) {
    try {
      // 過期日以 優惠券折價堂數 * 7 天 計算
      await Promise.all(courseCoupons.map((coupon) => addCoupon(coupon)));
    } catch (error) {
      console.error("Error adding coupons:", error);
    }
  }
}

// 添加優惠券給 user
async function addCoupon(coupon) {
  try {
    let couponId = coupon.id;
    // 過期天數計算 = 折價課程數 * 7天
    let dueDay = coupon.discountCourseNum * 7;
    let timestamp = Date.now(); //毫秒
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
    await axios.post(`${_url}/myCoupons`, postData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("addCoupon", error);
  }
}
