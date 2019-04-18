let React = require("react");

class Card extends React.Component {
  render() {
    return (
      <div className="row post-card d-flex justify-content-start">
        <div className="d-flex align-items-center justify-content-center flex-column mx-1">
          <input type="image" src="/images/upvote_reddit.png" />
          <div>number</div>
          <input type="image" src="/images/downvote_reddit.png" />
        </div>
        <div className="">
          <div className="row">
            <div className="col">Posted by {this.props.username} at TIME</div>
          </div>
          <div className="row">
            <div className="col">TITLE {this.props.id}</div>
          </div>
          <div className="row">
            <div className="col">IMAGE IF EXISTS</div>
          </div>
          <div className="row pl-3 d-flex justify-content-start">
            <div className="mr-3">comments ####</div>
            <div className="">
              <a href="#">save</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
module.exports = Card;
