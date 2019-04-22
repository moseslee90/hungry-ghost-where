let React = require("react");
let DefaultLayout = require("./layouts/default-layout");
let CommentBox = require("./components/comment-box");
let Comment = require("./components/comment");

class Post extends React.Component {
  render() {
    // console.log(this.props.post);
    let postObject = this.props.post;
    let postTitle = postObject.title;
    let postContent = postObject.content;
    let image_url = postObject.image_url;
    let votes = postObject.votes;
    let comments_count = postObject.comments_count;
    let username = postObject.username;
    let dateData = postObject.date_time;
    let postId = postObject.id;

    let dateObject = new Date(dateData);
    let year = dateObject.getFullYear();
    let month = dateObject.getMonth();
    let day = dateObject.getDate();
    let hour = dateObject.getHours();
    let minute = dateObject.getMinutes();
    let parsedDate = new Date(year, month, day, hour, minute);
    let parsedTime = parsedDate.toTimeString().slice(0, 5);
    let dateTime = parsedDate.toDateString() + " " + parsedTime;

    let usernameURL = "/user/" + username;

    let imageExt = image_url.split(".").pop();
    let mediaHTML = <img className="post-image" src={image_url} alt="" srcSet="" />;

    if (imageExt === "png" || imageExt === "jpg" || imageExt === "jpeg") {
      //load code for image
      mediaHTML = <img className="post-image" src={image_url} alt="" srcSet="" />;
    } else if (imageExt === "mp4") {
      mediaHTML = (
        <video
          className="post-image"
          preload="auto"
          loop
          poster={image_url}
          autoPlay="autoplay"
          muted>
          <source src={image_url} type="video/mp4" />
        </video>
      );
    }

    let css = (
      <div>
        <link href="https://fonts.googleapis.com/css?family=Raleway" rel="stylesheet" />
        <link rel="stylesheet" href="/post.css" />
      </div>
    );
    let voteId = "vote-" + postId;
    let customScript = <script src="/vote.js" />;

    //-----------------------------------------------
    //COMMENT TREE GENERATION
    //-----------------------------------------------

    //assumes we have comments array
    //use findReplies on root comments

    let commentsArray = [
      {
        id: "1",
        content: "content of one",
        reply_to: null
      },
      {
        id: "2",
        content: "content of two",
        reply_to: "1"
      },
      {
        id: "3",
        content: "content of three",
        reply_to: "1"
      },
      {
        id: "4",
        content: "content of four",
        reply_to: "3"
      },
      {
        id: "5",
        content: "content of five",
        reply_to: "3"
      },
      {
        id: "6",
        content: "content of six",
        reply_to: "1"
      },
      {
        id: "7",
        content: "content of seven",
        reply_to: null
      }
    ];

    function findReplies(rootComment) {
      let rootId = rootComment.id;
      function filterReplies(comment) {
        return comment.reply_to === rootId;
      }
      //commentsArray is an external array of comments from the post
      let repliesArray = commentsArray.filter(filterReplies);
      if (repliesArray[0] === undefined) {
        let rootCommentHTML = <Comment content={rootComment.content} />;
        return rootCommentHTML;
      } else {
        let childrenComments = repliesArray.map(comment => {
          return findReplies(comment);
        });
        let rootCommentHTML = (
          <Comment content={rootComment.content}>{childrenComments}</Comment>
        );
        return rootCommentHTML;
      }
    }

    function findRootComments(comment) {
      return comment.reply_to === null;
    }

    let rootCommentsArray = commentsArray.filter(findRootComments);

    let commentsHTML = rootCommentsArray.map(rootCommentObject => {
      return findReplies(rootCommentObject);
    });

    return (
      <DefaultLayout loginStatus={this.props.loginStatus} css={css} script={customScript}>
        <div className="container">
          <div className="row post">
            <div className="col-1 d-flex align-items-center justify-content-start flex-column ml-2">
              <input
                className="mt-2 upvote"
                type="image"
                src="/images/upvote_reddit.png"
                votetype="upvote"
                postid={postId}
              />
              <div className="votes-div" id={voteId}>
                {votes}
              </div>
              <input
                className="downvote"
                type="image"
                src="/images/downvote_reddit.png"
                votetype="downvote"
                postid={postId}
              />
            </div>
            <div className="col">
              <div className="row">
                <div className="col">
                  Posted by <a href={usernameURL}>{username}</a> at{" "}
                  <span id="post-time">{dateTime}</span>
                </div>
              </div>
              <div className="row">
                <div className="col">{postTitle}</div>
              </div>
              <div className="row">
                <div className="col">{mediaHTML}</div>
              </div>
              <div className="row">
                <div className="col">{postContent}</div>
              </div>
              <div className="row">
                <div className="col">comments {comments_count}</div>
              </div>
              <div className="row">
                <CommentBox />
              </div>
            </div>
          </div>
          <div className="row">Existing Comments from users</div>
          {commentsHTML}
        </div>
      </DefaultLayout>
    );
  }
}
module.exports = Post;
