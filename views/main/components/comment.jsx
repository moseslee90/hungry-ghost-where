let React = require("react");
let CommentBox = require("./comment-box");

class Comment extends React.Component {
  render() {
    let commentId = this.props.commentId;
    let voteId = this.props.commentId;
    let votes = 0;
    let post_id = this.props.post_id;
    let replyCommentBoxId = "reply-"+commentId;
    let replyHref = "#"+replyCommentBoxId;
    return (
      <div className="row">
        <div className="upvote-column d-flex align-items-center justify-content-start flex-column">
          <input
            className="mt-2 upvote"
            type="image"
            src="/images/upvote_reddit.png"
            votetype="upvote"
            commentid={commentId}
          />
          <input
            className="mt-1 downvote"
            type="image"
            src="/images/downvote_reddit.png"
            votetype="downvote"
            commentid={commentId}
          />
          <div className="comment-line" />
        </div>
        <div className="col mt-1">
          <div className="row">
            <div className="col d-flex flex-row">
              <div>{this.props.username} </div>
              <div>
                <div className="votes-div-comments mb-1 ml-2" id={voteId}>
                  points: {votes}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">{this.props.content}</div>
          </div>
          <div className="row">
            <div className="col">
              {" "}
              <a
                className="reply-button"
                data-toggle="collapse"
                href={replyHref}
                role="button"
                aria-expanded="false"
                aria-controls={replyCommentBoxId}>
                Reply
              </a>{" "}
            </div>
          </div>
          <div className="row collapse" id={replyCommentBoxId}>
            <CommentBox post_id={post_id} reply_to={commentId}/>
          </div>
          <div className="row">
            <div className="col">
              <div className="">{this.props.children}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
module.exports = Comment;
