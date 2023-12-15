import axios from "axios";
import { userId } from "../config";
import { getCartLength, renderCartNum } from "../header";
import {
  renderCart,
  renderLoading,
  renderNextPurchaseCart,
  renderCoupon,
} from "./render";
import {
  couponInit,
  getCoupons,
  delUsedCoupon,
  reCheckCoupon,
  handleCouponDelBtn,
  getCartCouponsData,
} from "./coupon";

// 日期、數字三位一點規則
const dateReg = /^(\d{4}-\d{2}-\d{2}).*/;
const separatorReg = /\B(?=(?:\d{3})+(?!\d))/g;

// 目前網址
// const currentURL = window.location.href;
// const newURL = currentURL.replace("cart", "course_intro");
const purchaseTabContent = document.querySelector("#purchaseTabContent");
const cartContainer = document.querySelector("#mainPurchase");
const headers = {
  headers: {
    "Content-Type": "application/json",
  },
};
let myCarts = [];
let nextPurchaseCarts = [];

/***** 初始化、取資料 *****/

init();
async function init() {
  renderLoading(); // 渲染loading
  await getMyCart(); // 取得我的購物車資料
  renderCart();
  if (myCarts.length) {
    CalculateToTalSum();
    couponInit();
    getCoupons();
  }
  renderNextPurchaseCart();
}

// 取得購買項目和下次購買的課程
async function getMyCart() {
  try {
    // 取得課程
    const api = `${_url}/myCarts?userId=${userId}&status=purchase&_expand=course`;
    const { data } = await axios.get(api);
    if (data !== undefined) {
      // 取得各課程的老師資料
      const courseUrls = data.map(
        (item) => `${_url}/courses/${item.courseId}?_expand=teacher`
      );

      const responses = await Promise.all(
        courseUrls.map((courseUrl) => axios.get(courseUrl))
      );

      data.forEach((item, index) => {
        item.course = responses[index].data;
      });
      handleData(data);
    }
  } catch (error) {
    console.log("getMyCart", error);
  }
}

function handleData(data) {
  // 到期日(一年後)的 23:59:59 過期
  let dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 365);
  dueDate.setHours(23, 59, 59, 999);
  dueDate = dateReg.exec(dueDate.toISOString())[1];
  data.forEach((item) => {
    item.dueDate = dueDate;
  });

  // 購買項目
  myCarts = data.filter((item) => !item.isNextPurchase);
  // 下次再買項目
  nextPurchaseCarts = data.filter((item) => item.isNextPurchase);
}

document.addEventListener("DOMContentLoaded", () => {
  // 購物車卡片的按鈕監聽
  purchaseTabContent.addEventListener("click", (e) => {
    const target = e.target;
    const listItem = target.closest("li");

    if (listItem) {
      e.preventDefault(); // 防止連結跳轉的問題發生
      // e.stopPropagation();
      const courseId = listItem.dataset.course;
      // 取得 數量 input
      const countInput = listItem.querySelector("input[name='count']");
      // 若點擊 刪除 按鈕
      if (target.classList.contains("delete-order")) {
        deleteOrder(courseId);
      }
      // 若點擊 下次再買 按鈕
      else if (target.classList.contains("js-nextPurchaseBtn")) {
        nextPurchaseOrder(courseId);
      }
      // 若點擊 移至購買項目 按鈕
      else if (target.classList.contains("js-mainPurchaseBtn")) {
        mainPurchaseOrder(courseId);
      }
      // 若點擊 增加數量 按鈕
      else if (target.classList.contains("js-increment")) {
        incrementValue(courseId, countInput);
      }
      // 若點擊 減少數量 按鈕
      else if (target.classList.contains("js-decrement")) {
        decrementValue(courseId, countInput);
      } else if (target.classList.contains("js-delCoupon")) {
        const index = target.dataset.index;

        handleCouponDelBtn(index);
      }
    }
  });
});

/*** 刪除 ***/

// 刪除購物車內的課程
function deleteOrder(courseId) {
  Swal.fire({
    title: "確定要刪除嗎?",
    showDenyButton: true,
    confirmButtonColor: "#115BC9",
    confirmButtonText: "確定刪除",
    denyButtonText: `我再想想`,
  }).then(async (result) => {
    if (result.isConfirmed) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "已刪除課程",
        showConfirmButton: false,
        timer: 1500,
      });
      // listItem.remove(); // 刪除 listItem
      deleteCart(courseId); // 刪除購物車資料
      delUsedCoupon(courseId); // 刪除使用的優惠券資料
      couponInit(); // 清除所有使用的優惠券
      renderCoupon();
      // reCheckCoupon(listItem); // 重新確認優惠券資格
      CalculateToTalSum(); // 計算總額
    }
  });
}

// 刪除購物車課程
async function deleteCart(id) {
  try {
    let myCartId;
    myCarts = myCarts.filter((item) => {
      if (item.courseId == id) {
        myCartId = item.id;
      }
      return item.courseId != id;
    });
    nextPurchaseCarts = nextPurchaseCarts.filter((item) => {
      if (item.courseId == id) {
        myCartId = item.id;
      }
      return item.courseId != id;
    });
    checkAndRenderMyCart(); // 渲染購買項目和下次再買項目
    // await axios.patch(
    //   `${_url}/myCarts/${myCartId}`,
    //   { userId: "", courseId: "", quantity: "" },
    //   headers
    // );
    await axios.delete(`${_url}/myCarts/${myCartId}`); // coupons 的 id 1 和 2 也會一起被刪掉，不知道為什麼，所以先改成用 patch
  } catch (error) {
    console.log("刪除會報錯，但購物車能正常刪除"); // coupons 的 id 1 和 2 的 courseId 和 teacherId 改成 null，json-server 要把他們一起刪掉時會報錯，就不會被一起刪掉，只有購物車項目會被刪
  }
}

/*** 移至 下次再買 或 購買清單 ***/

// 移至下次再買 功能
async function nextPurchaseOrder(courseId) {
  const result = await Swal.fire({
    title: "確定要下次再買該課程嗎?",
    showDenyButton: true,
    confirmButtonColor: "#115BC9",
    confirmButtonText: "確定",
    denyButtonText: `我再想想`,
  });
  if (result.isConfirmed) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "已移至下次再買",
      showConfirmButton: false,
      timer: 1500,
    });
    // listItem.remove(); // 刪除 listItem
    toNextPurchase(courseId); // 將課程移置 下次再買
    delUsedCoupon(courseId); // 刪除使用的優惠券資料
    couponInit(); // 清除所有使用的優惠券
    renderCoupon();
    // reCheckCoupon(listItem); // 重新確認優惠券資格
    CalculateToTalSum(); // 計算總額
  }
}

// 購買項目 移至 下次購買
async function toNextPurchase(courseId) {
  try {
    let myCartId;
    // 移除購買項目
    myCarts = myCarts.filter((item) => {
      if (item.courseId == courseId) {
        myCartId = item.id; // 取得 id
        nextPurchaseCarts.push(item); // 加進下次再買項目
      }
      return item.courseId != courseId;
    });
    checkAndRenderMyCart(); // 渲染購買項目和下次再買項目
    await axios.patch(
      `${_url}/myCarts/${myCartId}`,
      { isNextPurchase: true },
      headers
    );
  } catch (error) {
    console.log("toNextPurchase", error);
  }
}

// 移至 購買項目 功能
function mainPurchaseOrder(courseId) {
  Swal.fire({
    title: "確定將該課程移至購物車嗎?",
    showDenyButton: true,
    confirmButtonColor: "#115BC9",
    confirmButtonText: "確定",
    denyButtonText: `我再想想`,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "已移置購買項目",
        showConfirmButton: false,
        timer: 1500,
      });
      // listItem.remove(); // 刪除 listItem
      toMainPurchase(courseId); // 將課程移置 購買項目
      // addEmptyUsedCoupon(); // 新增優惠券欄位
      couponInit(); // 清除所有使用的優惠券
      renderCoupon();
      CalculateToTalSum(); // 計算總額
    }
  });
}

// 下次購買 移至 購買項目
async function toMainPurchase(courseId) {
  try {
    let myCartId;
    // 移除下次再買項目
    nextPurchaseCarts = nextPurchaseCarts.filter((item) => {
      if (item.courseId == courseId) {
        myCartId = item.id;
        // 加進購買項目
        myCarts.push(item);
      }
      return item.courseId != courseId;
    });
    checkAndRenderMyCart(); // 渲染購買項目和下次再買項目
    await axios.patch(
      `${_url}/myCarts/${myCartId}`,
      { isNextPurchase: false },
      headers
    );
  } catch (error) {
    console.log("toMainPurchase", error);
  }
}

// 依據購物車商品數量來進行渲染購買項目和下次再買項目
async function checkAndRenderMyCart() {
  renderCart(); // 渲染購買項目
  if (myCarts.length) {
    getCartCouponsData(); // 取得課程優惠券、渲染優惠券選項
  }
  renderNextPurchaseCart(); // 渲染下次購買

  // 渲染navbar 購物車數量顯示
  await getCartLength();
  renderCartNum();
}

/*** 購買課程數量 ***/

// 增加數字輸入的值
function incrementValue(courseId, input) {
  $(input).val(function (i, currentValue) {
    return parseInt(currentValue) + 1;
  });

  // 更新數量
  quantityChange(courseId, input.value);
}

// 減少數字輸入的值
function decrementValue(courseId, input) {
  $(input).val(function (i, currentValue) {
    return parseInt(currentValue) === 1 ? 1 : parseInt(currentValue) - 1;
  });
  // 更新數量
  quantityChange(courseId, input.value);
}

// 直接更改數量 "change" 和 "按 enter" 都會觸發
document.addEventListener("change", (e) => {
  if (e.target.name === "count") {
    handleQuantityInputChange(e.target);
  }
});
document.addEventListener("keydown", (e) => {
  if (e.target.name === "count" && e.key === "Enter") {
    e.preventDefault();
    handleQuantityInputChange(e.target);
  }
});

// 直接更改數量
function handleQuantityInputChange(target) {
  const courseId = target.closest("[data-course]").dataset.course;

  // 若是輸入非數字或為0，就變成預設的值，不然就是照輸入的值
  if (target.value.match(/[^0-9]|^0$/g)) {
    target.value = target.defaultValue;
  }
  // 變更數量、重新確認優惠券資格、計算總額
  quantityChange(courseId, target.value);
}

// 變更數量、重新確認優惠券資格、計算總額
function quantityChange(courseId, quantity) {
  updateQuantity(courseId, quantity);
  reCheckCoupon(courseId, quantity); // 重新確認優惠券資格
  CalculateToTalSum();
}

// 更新課程購買數量
function updateQuantity(courseId, quantity) {
  let myCartId;
  myCarts.forEach((cart) => {
    if (cart.courseId == courseId) {
      myCartId = cart.id; // 取得 id
      cart.quantity = quantity; // 更新數量
    }
  });
  // 更新遠端數量
  patchQuantity(myCartId, quantity);
}

// 更新遠端數量
async function patchQuantity(id, quantity) {
  try {
    const api = `${_url}/myCarts/${id}`;
    const patchData = { quantity };
    await axios.patch(api, patchData, headers);
  } catch (error) {}
}

function CalculateToTalSum() {
  // 選擇每一張訂單
  const Orders = $(".order");

  // 初始化原始價格總和
  let OriginalTotalPrice = 0;
  // 用each跑遍整個order
  Orders.each(function () {
    const Order = $(this);

    // 獲取課堂數量的值
    const Count = parseInt(Order.find('[name="count"]').val());

    // 獲取每個 order 的價格並轉成 Int
    const OriginalPriceText = Order.find(".OriginalCoursePrice")
      .text()
      .replace(",", "");
    const OriginalPrice = parseInt(OriginalPriceText);

    // 計算每個小計的價格
    const Subtotal = Count * OriginalPrice;

    // 將小計加到原價
    OriginalTotalPrice += Subtotal;
  });

  //獲取網頁上原價的物件
  const OriginalPriceObject = $("#OriginalPrice");
  //將原價顯示在上面
  OriginalPriceObject.text(
    OriginalTotalPrice.toString().replace(separatorReg, ",")
  );
  //獲取課程優惠的價格
  const CourseDiscountPrice = parseInt(
    $("#CourseDiscount").text().replace(",", "")
  );
  //獲取全站優惠的價格
  const WebDiscountPrice = parseInt($("#WebDiscount").text().replace(",", ""));
  //總金額為原價-課程優惠-全站優惠
  const TotalPrice =
    OriginalTotalPrice - CourseDiscountPrice - WebDiscountPrice;
  $("#TotalPrice").text(TotalPrice.toString().replace(separatorReg, ","));
}

export {
  myCarts,
  cartContainer,
  nextPurchaseCarts,
  dateReg,
  separatorReg,
  headers,
};
