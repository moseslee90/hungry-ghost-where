let React = require("react");

class Card extends React.Component {
  render() {
    let dateObject = new Date(this.props.time);
    let year = dateObject.getFullYear();
    let month = dateObject.getMonth();
    let day = dateObject.getDate();
    let hour = dateObject.getHours();
    let minute = dateObject.getMinutes();
    let parsedDate = new Date(year, month, day, hour, minute);
    let parsedTime = parsedDate.toTimeString().slice(0,5);
    let dateTime = parsedDate.toDateString() + " " + parsedTime;
    console.log(dateTime);

    let userURL = "/user/" + this.props.username;
    
    return (
      <div className="row post-card d-flex justify-content-start">
        <div className="col-1 d-flex align-items-center justify-content-center flex-column ml-2">
          <input type="image" src="/images/upvote_reddit.png" />
          <div>number</div>
          <input type="image" src="/images/downvote_reddit.png" />
        </div>
        <div className="col">
          <div className="row">
            <div className="col">Posted by <a href={userURL}>{this.props.username}</a> at {dateTime}</div>
          </div>
          <div className="row">
            <div className="col">TITLE {this.props.title}</div>
          </div>
          <div className="row">
            <div className="col"><img className = "card-image" src={this.props.image_url} alt="" srcSet=""/></div>
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
