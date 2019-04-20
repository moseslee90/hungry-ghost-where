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

    let image_url = this.props.image_url;

    let userURL = "/user/" + this.props.username;
    let postURL = "/post/" + this.props.postId;

    let imageExt = image_url.split(".").pop();
    let mediaHTML = <img className="post-image" src={image_url} alt="" srcSet="" />;

    if (imageExt === "png" || imageExt === "jpg" || imageExt === "jpeg") {
      //load code for image
      mediaHTML = <img className="card-image" src={image_url} alt="" srcSet="" />;
    } else {
      let videoType = "video/"+imageExt;
      mediaHTML = (
        <video
          className="card-image"
          preload="auto"
          loop
          poster={image_url}
          autoPlay="autoplay"
          muted>
          <source src={image_url} type={videoType} />
        </video>
      );
    }
    
    return (
      <div className="row post-card d-flex justify-content-start">
        <div className="col-1 d-flex align-items-center justify-content-center flex-column ml-2">
          <input type="image" src="/images/upvote_reddit.png" />
          <div>{this.props.votes}</div>
          <input type="image" src="/images/downvote_reddit.png" />
        </div>
        <div className="col">
          <div className="row">
            <div className="col">Posted by <a href={userURL}>{this.props.username}</a> at {dateTime}</div>
          </div>
          <div className="row">
            <div className="col"> <a href={postURL}>{this.props.title}</a></div>
          </div>
          <div className="row">
            <div className="col">{mediaHTML}</div>
          </div>
          <div className="row pl-3 d-flex justify-content-start">
            <div className="mr-3">comments {this.props.comments_count}</div>
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
