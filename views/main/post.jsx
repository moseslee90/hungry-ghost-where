let React = require("react");
let DefaultLayout = require("./layouts/default-layout");

class Post extends React.Component {
  render() {
    return (
      <DefaultLayout>
        this is the post page
        <div className="container">
          <div className="row">
            <div className="col-1">vote</div>
            <div className="col">
              <div className="row">
                <div className="col">
                  Posted by <a href="/#">Name</a> at <span id="post-time">TIME</span>
                </div>
              </div>
              <div className="row">
                <div className="col">Post Title</div>
              </div>
              <div className="row">
                <div className="col">Image if Exists</div>
              </div>
              <div className="row">
                <div className="col">Text Content if Exists</div>
              </div>
              <div className="row">
                <div className="col">Post Stats</div>
              </div>
              <div className="row">
                <div className="col">Add Comment Box</div>
              </div>
            </div>
          </div>
          <div className = "row">
          Existing Comments from users
          </div>
        </div>
      </DefaultLayout>
    );
  }
}
module.exports = Post;
