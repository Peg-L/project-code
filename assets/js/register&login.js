(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Define a function to handle form submission
  function handleFormSubmit(event, form) {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      if (form.id === "loginForm") {
        sessionStorage.setItem("isLogin", "1");
        location.href = "./index.html";
      } else if (form.id === "registerForm") {
        const registerSuccessModal = new bootstrap.Modal("#registerSuccess");
        registerSuccessModal.show();
      }
    }
    form.classList.add("was-validated");
  }

  Array.from(forms).forEach((form) => {
    form.addEventListener("submit", (event) => {
      handleFormSubmit(event, form);
    });
  });
})();
