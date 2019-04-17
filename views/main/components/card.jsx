let React = require("react");

class Card extends React.Component {
  render() {
    return (
      <div className="row post-card" key={this.props.key}>
        <div className="col-1 d-flex align-items-center justify-content-center flex-column">
          <input type="image" src="/images/upvote_reddit.png" />
          <div>number</div>
          <input type="image" src="/images/downvote_reddit.png" />
        </div>
        <div className="col">
          <div className="row">
            <div className="col">Posted by {this.props.username} at TIME</div>
          </div>
          <div className="row">
            <div className="col">TITLE</div>
          </div>
          <div className="row">
            <div className="col">IMAGE IF EXISTS</div>
          </div>
          <div className="row d-flex justify-content-start">
            <div className="col-3">comments comments_number</div>
            <div className="col-3">favourite button</div>
          </div>
        </div>
      </div>
    );
  }
}
module.exports = Card;
