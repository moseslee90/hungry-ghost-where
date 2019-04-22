let React = require("react");

class CommentBox extends React.Component {
  render() {
    let postURL = "/post/add-comment/" + this.props.post_id;
    let reply_to;
    let submitButtonHTML;
    let textAreaId;
    let submitButtonId;
    if (this.props.reply_to !== undefined) {
      reply_to = this.props.reply_to;
      submitButtonId = "comment-submit-reply-" + reply_to;
      textAreaId = "textarea-reply-" + reply_to;
      submitButtonHTML = (
        <button
        id={submitButtonId}
        type="submit"
        disabled="true"
        className="btn btn-primary px-3 py-1 my-1 mr-2 comment-submit-button">
          REPLY
        </button>
      );
    } else {
      reply_to = "null";
      submitButtonId = "comment-submit-post-" + this.props.post_id;
      textAreaId = "textarea-post-" + this.props.post_id;
      submitButtonHTML = (
        <button
          id={submitButtonId}
          type="submit"
          disabled="true"
          className="btn btn-primary px-3 py-1 my-1 mr-2 comment-submit-button">
          COMMENT
        </button>
      );
    }
    return (
      <div className="col">
        <div className="row">
          <div className="col">Comment as {this.props.username}</div>
        </div>
        <div className="row">
          <div className="col">
            <div className="comment-form">
              <form id="create-post-form" action={postURL} method="POST">
                <div className="form-group mb-0">
                  <textarea
                    className="form-control comment-input"
                    placeholder="What are your thoughts?"
                    name="content"
                    id={textAreaId}
                    buttonid={submitButtonId}
                    rows="10"
                  />
                </div>
                <input type="hidden" name="reply_to" value={reply_to} />
                <input type="hidden" name="post_id" value={this.props.post_id} />
                <div className="d-flex justify-content-end comment-button-row">
                  {submitButtonHTML}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
module.exports = CommentBox;
