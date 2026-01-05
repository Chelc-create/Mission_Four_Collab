const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#loginPassword");

togglePassword.addEventListener("click", function () {
  // Toggle the type attribute
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);

  // Toggle the eye / eye-slash icon
  this.classList.toggle("fa-eye");
  this.classList.toggle("fa-eye-slash");
});
