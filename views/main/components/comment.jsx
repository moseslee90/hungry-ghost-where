let React = require("react");

class Comment extends React.Component {
  render() {
    let commentId;
    let voteId;
    let votes = 0;
    return (
      <div className="row">
        <div className="col-1 d-flex align-items-center justify-content-start flex-column">
          <input
            className="mt-2 upvote"
            type="image"
            src="/images/upvote_reddit.png"
            votetype="upvote"
            commentid={commentId}
          />
          <div className="votes-div" id={voteId}>
            {votes}
          </div>
          <input
            className="downvote"
            type="image"
            src="/images/downvote_reddit.png"
            votetype="downvote"
            commentid={commentId}
          />
          <div className="comment-line"/>
        </div>
        <div className="col">
          <div className="row">
            <div className="col">{this.props.username}</div>
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
