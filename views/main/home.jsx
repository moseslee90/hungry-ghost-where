let React = require("react");
let DefaultLayout = require("./layouts/default-layout");
let Card = require("./components/card");

class Main extends React.Component {
  render() {
    let userId = this.props.userId;
    let allPosts = this.props.allPosts;

    // console.log(allPosts);
    let allPostsHTML = allPosts.map((post, index) => {
      return (
        <Card
          key={post.id.toString()}
          postId={post.id.toString()}
          username={post.username}
          title={post.title}
          time={post.date_time.toString()}
          image_url={post.image_url}
          votes={post.votes}
          comments_count={post.comments_count}
        />
      );
    });
    let customCSS = <link rel="stylesheet" href="/home.css" />;
    let customScript = <script src="/vote.js" />;
    return (
      <DefaultLayout
        loginStatus={this.props.loginStatus}
        css={customCSS}
        script={customScript}>
        <div className="row">
          <div className="col-md-9 px-5">{allPostsHTML}</div>
          <div className="col-md-3">right column</div>
        </div>
      </DefaultLayout>
    );
  }
}
module.exports = Main;
