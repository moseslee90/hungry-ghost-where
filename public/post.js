//get buttons with comment-submit-button className
function updateSubmitButtonState() {
  let buttonId = this.getAttribute("buttonid");
  let buttonHTML = document.getElementById(buttonId);
  let inputValue = this.value;
  if (inputValue !== "") {
      console.log("value is null");
    buttonHTML.classList.remove("disabled");
    buttonHTML.setAttribute("aria-disabled", "false");
    buttonHTML.setAttribute("disabled", "false");
  } else {
      console.log("value is not null");
  }
}

let commentInputs = document.getElementsByClassName("comment-input");
for (let i = 0; i < commentInputs.length; i++) {
  const commentInput = commentInputs[i];
  commentInput.addEventListener("input", updateSubmitButtonState);
}
