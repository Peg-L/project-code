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
});

let myCart;
let myCoupons;
let courseCoupons;
let hasCoupons;

function handleClickStartCourseBtn(parentEl) {
  document.addEventListener("DOMContentLoaded", () => {
    parentEl.addEventListener("click", async (e) => {
      if (e.target.dataset.course && e.target.type === "button") {
        // 若有登入，執行加入購物車和優惠券
        if (isLogin) {
          courseId = e.target.dataset.course;
          const quantity = Number(e.target.dataset.quantity) || 1;
          await getData();
          // 若沒拿過優惠券(以體驗課 courseCoupons[0].id 為代表判斷)就能獲得優惠券
          hasCoupons =
            myCoupons.find(
              (coupon) => coupon.couponId == courseCoupons[0].id
            ) !== undefined;
          addCart(quantity);
          checkCoupon();
          message();
        }
      }
    });
  });
}

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
function addCart(quantity) {
  myCart.length
    ? addQuantityToMyCarts(myCart[0], quantity) // 該課程已在購物車
    : addCourseToMyCarts(quantity); // 該課程沒在購物車
}

// 新增購物車課程
async function addCourseToMyCarts(quantity) {
  try {
    const postData = {
      userId,
      courseId,
      quantity,
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

async function addQuantityToMyCarts(myCarts, addQuantity) {
  try {
    let { id, quantity, isNextPurchase } = myCarts;
    let patchData = {};
    // 課程若在 下次再買 就把它移到 購物項目，另若是按多堂的立即上課，會把數量加到指定堂數，若按一般的立即上課，堂數不變
    if (isNextPurchase) {
      patchData = {
        isNextPurchase: false,
        quantity: addQuantity === 1 ? quantity : addQuantity,
      };
    }
    // 課程若在購物項目就加數量或加到指定堂數
    else {
      quantity = Number(quantity) + 1;
      patchData = {
        quantity: addQuantity === 1 ? quantity++ : addQuantity,
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

export { handleClickStartCourseBtn };
