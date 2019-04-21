let upvoteButtons = document.getElementsByClassName("upvote");
let downvoteButtons = document.getElementsByClassName("downvote");

function voteClicked() {
  const postid = this.getAttribute("postid");
  const voteType = this.getAttribute("class");

  function responseHandler() {
    console.log("response text", this.responseText);
    console.log("status text", this.statusText);
    console.log("status code", this.status);
    let voteHTML = document.getElementById("vote-" + postid);
    voteHTML.innerText = this.responseText;
  }

  const requestQuery = "vote=" + voteType;
  let request = new XMLHttpRequest();
  let url = "http://127.0.0.1:3000/post/vote/" + postid;
  request.addEventListener("load", responseHandler);
  request.open("POST", url);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send(requestQuery);
}

for (let i = 0; i < upvoteButtons.length; i++) {
  const element = upvoteButtons[i];
  element.addEventListener("click", voteClicked);
}
for (let i = 0; i < downvoteButtons.length; i++) {
  const element = downvoteButtons[i];
  element.addEventListener("click", voteClicked);
}
