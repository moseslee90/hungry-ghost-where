let React = require("react");

class CommentBox extends React.Component {
  render() {
    return (
      <div className="col">
        <div className="row">
          <div className="col">Comment as USERNAME</div>
        </div>
        <div className="row">
          <div className="col">
            <div className="comment-form">
              <form id="create-post-form" action="/create-post/query" method="POST">
                <div className="form-group mb-0">
                  <textarea
                    className="form-control comment-input"
                    placeholder="What are your thoughts?"
                    name="content"
                    id="post-content"
                    rows="10"
                  />
                </div>
                <input type="hidden" name="date" value={this.props.date} />
                <div className="d-flex justify-content-end comment-button-row">
                  <button
                    id="comment-submit-button"
                    type="submit"
                    className="btn btn-primary px-3 py-1 my-1 mr-2">
                    COMMENT
                  </button>
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
