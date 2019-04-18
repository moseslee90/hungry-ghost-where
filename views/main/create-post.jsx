let React = require("react");
let DefaultLayout = require("./layouts/default-layout");

class CreatePost extends React.Component {
  render() {
    return (
      <DefaultLayout>
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <div className="row" id="create-post-title">
                <div className="">Create a post</div>
              </div>
              <div className="row">
                <form id="create-post-form" action="/create-post/query" method="POST">
                  <div className="form-group">
                    <input
                      type="title"
                      className="form-control"
                      name="title"
                      id="post-title"
                      placeholder="Title"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="title"
                      className="form-control"
                      name="image"
                      id="post-image"
                      placeholder="image url (optional)"
                    />
                  </div>
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      name="content"
                      id="post-content"
                      rows="10"
                    />
                  </div>
                  <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary px-4">
                      Post
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col">right column</div>
          </div>
        </div>
      </DefaultLayout>
    );
  }
}
module.exports = CreatePost;
