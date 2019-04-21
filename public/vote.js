
let upvoteButtons = document.getElementsByClassName("upvote");

function upvoteClicked() {

    function responseHandler() {
        console.log("response text", this.responseText);
        console.log("status text", this.statusText);
        console.log("status code", this.status);
    }

  const postid = this.getAttribute("postid");
  const voteType = this.getAttribute("class");
  const requestQuery = "vote=upvote";
  let request = new XMLHttpRequest();
  let url = "http://127.0.0.1:3000/post/vote/"+postid;
  request.addEventListener("load",responseHandler)
  request.open("POST",url);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send(requestQuery);
}

for (let i = 0; i < upvoteButtons.length; i++) {
  const element = upvoteButtons[i];
  element.addEventListener("click", upvoteClicked);
}