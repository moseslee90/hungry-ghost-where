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
          username={post.user_id}
          title={post.title}
          time={post.date_time.toString()}
          image_url={post.image_url}
        />
      );
    });
    let customCSS = <link rel="stylesheet" href="home.css" />;
    return (
      <DefaultLayout loginStatus={this.props.loginStatus} css={customCSS}>
        <div className="testing">testing custom css</div>
        <div className="row">
          <div className="col-8 px-5">{allPostsHTML}</div>
          <div className="col-4">right column</div>
        </div>
      </DefaultLayout>
    );
  }
}
module.exports = Main;
