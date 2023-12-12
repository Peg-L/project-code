/***** 付款按鈕 *****/
import { patchMyCoupon } from "./coupon";
import { renderPaymentInfo } from "./render";

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
    await patchMyCoupon(); // 按確認購買後優惠券 canUse 改成 false
    await patchMyCarts(); // 按確認購買後更新商品狀態
    location.href = "cart2.html";
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
  } catch (error) {}
}
