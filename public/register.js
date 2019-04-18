let confirmPasswordHTML = document.getElementById("confirmPassword");
let passwordHTML = document.getElementById("inputPassword");

function passwordValidation() {
  let passwordInputValue = passwordHTML.value;
  let confirmPasswordValue = confirmPasswordHTML.value;
  console.log(passwordInputValue);
  console.log(confirmPasswordValue);
  if (passwordInputValue !== confirmPasswordValue) {
    //alter classlist
    confirmPasswordHTML.classList.remove("is-valid");
    confirmPasswordHTML.classList.add("is-invalid");
  } else {
    confirmPasswordHTML.classList.remove("is-invalid");
    confirmPasswordHTML.classList.add("is-valid");
  }
}

confirmPasswordHTML.addEventListener("input", passwordValidation);
