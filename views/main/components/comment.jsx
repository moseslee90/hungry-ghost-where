let React = require("react");

class Comment extends React.Component {
  render() {
    return (
      <div>
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
            <div className="ml-4">{this.props.children}</div>
          </div>
        </div>
      </div>
    );
  }
}
module.exports = Comment;
