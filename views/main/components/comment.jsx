let React = require("react");

class Comment extends React.Component {
  render() {
    let commentId;
    let voteId;
    let votes = 0;
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
            <div className="col">
              {this.props.username}
              <span className="votes-div" id={voteId}>
                {votes}
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col">{this.props.content}</div>
          </div>
          <div className="row">
            <div className="col">comment footer</div>
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
