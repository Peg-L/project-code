// 定義一個全局變數來存儲購物車數量數據
var cartData = {};

// 在頁面載入完全後執行
// 在頁面載入時，檢查本地存儲中是否有相應的數據
$(function () {
  // 檢查本地存儲中是否有相應的數據
  var storedData = localStorage.getItem("cartData");
  cartData = JSON.parse(storedData) || {};

  // 將本地存儲的數據應用到對應的 input 元素上
  Object.keys(cartData).forEach(function (id) {
    $("#" + id).val(cartData[id]);
  });

  // 確保資料載入完成後再執行 CalculateToTalSum
  CalculateToTalSum();

  // 綁定所有 class 為 delete-order 的按鈕的點擊事件
  $(".delete-order").on("click", function (event) {
    event.preventDefault();
    // 找尋離自己最近的 li 的父元素
    var listItem = $(this).closest("li");
    // 如果有就刪了
    if (listItem) {
      listItem.remove();
      CalculateToTalSum();
    }
  });
});

// 使用 jQuery 實現增加數字輸入的值
function incrementValue(id) {
  $("#" + id).val(function (i, currentValue) {
    currentValue = parseInt(currentValue) + 1;
    updateLocalStorage(id, currentValue);
    return currentValue;
  });
  CalculateToTalSum();
}

// 使用 jQuery 實現減少數字輸入的值
function decrementValue(id) {
  $("#" + id).val(function (i, currentValue) {
    currentValue = parseInt(currentValue);
    currentValue = currentValue > 1 ? currentValue - 1 : currentValue;
    updateLocalStorage(id, currentValue);
    return currentValue;
  });
  CalculateToTalSum();
}

function updateLocalStorage(id, value) {
  // 更新全局變數
  cartData[id] = value;

  // 將更新後的資料存儲回本地存儲
  localStorage.setItem("cartData", JSON.stringify(cartData));
}

function CalculateToTalSum() {
  console.log("Calculating Total Sum...");

  // 選擇每一張訂單
  var Orders = $(".order");

  // 初始化原始價格總和
  var OriginalTotalPrice = 0;
  var CourseDiscountPrice = 0;

  // 用each跑遍整個order
  Orders.each(function () {
    var Order = $(this);

    // 獲取課堂數量的值
    var Count = parseInt(Order.find('[name="count"]').val());
    console.log("Count:", Count);

    // 獲取每個 order 的價格並轉成 Int
    var CoursePriceText = Order.find(".CoursePrice").text().replace(",", "");
    var CoursePrice = parseInt(CoursePriceText) || 0;

    // 獲取每個 order 的原始價格並轉成 Int
    var OriginalPriceText = Order.find(".OriginalCoursePrice")
      .text()
      .replace(",", "");
    var OriginalPrice = parseInt(OriginalPriceText);

    // 計算每個小計的價格
    var Subtotal = Count * OriginalPrice;

    // 將小計加到原價
    OriginalTotalPrice += Subtotal;

    // 計算課程優惠價格
    var Discount = OriginalPrice - CoursePrice;
    if (CoursePrice != 0) {
      CourseDiscountPrice += Discount * Count;
    }
  });

  // 這裡的 console.log 是為了確認值的正確性
  console.log("OriginalTotalPrice:", OriginalTotalPrice);
  console.log("CourseDiscountPrice:", CourseDiscountPrice);

  // 獲取網頁上原價的物件
  var OriginalPriceObject = $("#OriginalPrice");
  // 將原價顯示在上面
  OriginalPriceObject.text(OriginalTotalPrice);

  // 獲取課程優惠的價格
  var WebDiscountPrice = parseInt($("#WebDiscount").text().replace(",", ""));
  // 總金額為原價-課程優惠-全站優惠
  var TotalPrice = OriginalTotalPrice - CourseDiscountPrice - WebDiscountPrice;
  // 獲取並將總額顯示在上面
  var CourseDiscountPriceText = $("#CourseDiscount").text(CourseDiscountPrice);
  var TotalPriceText = $("#TotalPrice").text(TotalPrice);

  // 這裡的 console.log 是為了確認值的正確性
  console.log("TotalPrice:", TotalPrice);
}

function updateLocalStorage(id, value) {
  // 從本地存儲中讀取現有資料
  var storedData = localStorage.getItem("cartData") || "{}";
  var cartData = JSON.parse(storedData);

  // 更新資料
  cartData[id] = value;

  // 將更新後的資料存儲回本地存儲
  localStorage.setItem("cartData", JSON.stringify(cartData));
}
