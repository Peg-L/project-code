import axios from "axios";
/***** 付款按鈕 *****/
import { patchMyCoupon } from "./coupon";
import { renderPaymentInfo } from "./render";
import { myCarts, headers } from "./cart";

// 取得 付款資訊按鈕
const paymentInfoBtns = document.querySelectorAll(".js-paymentInfoBtn");
// 取得 付款按鈕
const payBtns = document.querySelectorAll(".js-payBtn");

// 點擊付款後渲染繳款資訊
paymentInfoBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => renderPaymentInfo(e.target));
});

// 按下付款按鈕-紀錄使用的優惠券、購買的課程
payBtns.forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    if (e.target.type === "submit") {
      const form = e.target.closest("form");
      // 手動觸發表單驗證
      if (form.checkValidity()) {
        // 如果表單驗證通過
        await patchMyCoupon(); // 按確認購買後優惠券 canUse 改成 false
        await patchMyCarts(); // 按確認購買後更新商品狀態
        form.submit();
      } else {
        // 如果表單驗證沒通過
        // 顯示錯誤訊息
        form.reportValidity();
      }
    } else {
      await patchMyCoupon(); // 按確認購買後優惠券 canUse 改成 false
      await patchMyCarts(); // 按確認購買後更新商品狀態
      location.href = "cart2.html";
    }
  });
});

// 按確認購買後更新商品狀態
async function patchMyCarts() {
  try {
    const buyUrls = myCarts.map((item) => `${_url}/myCarts/${item.id}`);
    await Promise.all(
      buyUrls.map((url, index) => {
        const patchData = {
          status: "appointment",
          dueDate: myCarts[index].dueDate,
        };
        return axios.patch(url, patchData, headers);
      })
    );
  } catch (error) {
    console.log("patchMyCarts", error);
  }
}
