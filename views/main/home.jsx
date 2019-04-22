let React = require("react");
let DefaultLayout = require("./layouts/default-layout");
let Card = require("./components/card");

class Main extends React.Component {
  render() {
    let userId = this.props.userId;
    let allPosts = this.props.allPosts;

    function findReplies(rootComment) {
      //assume we have the array of comments
      //some of them have a reply_to value (indicates which comment they are replying to)
      //some of them have root===true (indicates whether comment is a root element)

      //first step is to find out which comments reply to this
      //assume that comment tree/array is not huge, use for-loop
      let rootId = rootComment.id;
      function filterReplies(comment) {
        return comment.reply_to === rootId;
      }
      let repliesArray = commentsArray.filter(filterReplies);
      if (repliesArray[0] === undefined) {
        let rootCommentHTML = <Comment text={rootComment.text} />;
        return rootCommentHTML;
      } else {
        let childrenComments = repliesArray.map(comment => {
          return findReplies(comment);
        });
        let rootCommentHTML = (
        <Comment text={rootComment.text}>
        {findReplies()}
        </Comment>
        );
        return rootCommentHTML;
      }
      //happens when no more replies found on ALL children
      return postWithChildren;
    }

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
        <div className="testing">testing custom css</div>
        <div className="row">
          <div className="col-md-9 px-5">{allPostsHTML}</div>
          <div className="col-md-3">right column</div>
        </div>
      </DefaultLayout>
    );
  }
}
module.exports = Main;
