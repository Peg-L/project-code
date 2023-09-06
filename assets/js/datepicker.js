$.datepicker.setDefaults($.datepicker.regional["zh-TW"]);
$(function () {
  $(".jq-appointmentDate").datepicker({
    minDate: 0,
    maxDate: "+1M +10D",
    formatDate: "yy-mm-dd",
  });
});
$(function () {
  $(".jq-birthday").datepicker({
    changeMonth: true,
    changeYear: true,
  });
});
