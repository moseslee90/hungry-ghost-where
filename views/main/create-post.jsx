let React = require("react");
let DefaultLayout = require("./layouts/default-layout");

class CreatePost extends React.Component {
  render() {
    return (
      <DefaultLayout>
        <div className="container">
          <div className="row" id="create-post-title">
            <div className="">Create a post</div>
          </div>
          <div className="row">
            <form>
              <div class="form-group">
                <input
                  type="title"
                  class="form-control"
                  id="post-title"
                  placeholder="Title"
                />
              </div>
              <div class="form-group">
                <textarea
                  class="form-control"
                  id="post-content"
                  rows="3"
                />
              </div>
            </form>
          </div>
        </div>
      </DefaultLayout>
    );
  }
}
module.exports = CreatePost;
