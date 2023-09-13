// 驗證
// Fetch all the forms we want to apply custom Bootstrap validation styles to
const forms = document.querySelectorAll(".needs-validation");

// Loop over them and prevent submission
Array.from(forms).forEach((form) => {
  form.addEventListener(
    "submit",
    (event) => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();
        sessionStorage.setItem("isLogin", "1");
        location.href = "./index.html";
      }
      form.classList.add("was-validated");
    },
    false
  );
});
