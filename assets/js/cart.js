$(function () {
    CalculateToTalSum();
});

// 使用 jQuery 實現增加數字輸入的值
function incrementValue(id) {
    $("#" + id).val(function (i, currentValue) {
        return parseInt(currentValue) + 1;
    });
    CalculateToTalSum();
}

// 使用 jQuery 實現減少數字輸入的值
function decrementValue(id) {
    $("#" + id).val(function (i, currentValue) {
        currentValue = parseInt(currentValue);
        return currentValue > 1 ? currentValue - 1 : currentValue;
    });
    CalculateToTalSum();
}

//獲取所有class=delete-menu的按鈕
$(function () {
    //獲取所有class為delete-order的按鈕
    $(".delete-order").on('click', function (event) {
        event.preventDefault(); // 防止連結跳轉的問題發生
        // 找尋離自己最近的li的父元素
        var listItem = $(this).closest("li");
        //如果有就刪了
        if (listItem) {
            listItem.remove();
            CalculateToTalSum();
        }
    });
});

function CalculateToTalSum() {
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

        // 獲取每個 order 的價格並轉成 Int
        var CoursePriceText = Order.find('.CoursePrice').text().replace(",", "");
        var CoursePrice = parseInt(CoursePriceText) || 0;

        // 獲取每個 order 的原始價格並轉成 Int
        var OriginalPriceText = Order.find('.OriginalCoursePrice').text().replace(",", "");
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
    //獲取網頁上原價的物件
    var OriginalPriceObject = $("#OriginalPrice");
    //將原價顯示在上面
    OriginalPriceObject.text(OriginalTotalPrice);
    //獲取課程優惠的價格
    //var CourseDiscountPrice = parseInt($("#CourseDiscount").text().replace(",", ""));
    //獲取全站優惠的價格
    var WebDiscountPrice = parseInt($("#WebDiscount").text().replace(",", ""));
    //總金額為原價-課程優惠-全站優惠
    var TotalPrice = OriginalTotalPrice - CourseDiscountPrice - WebDiscountPrice;
    //獲取並將總額顯示在上面
    var CourseDiscountPriceText = $("#CourseDiscount").text(CourseDiscountPrice);
    var TotalPriceText = $("#TotalPrice").text(TotalPrice);
}