let React = require("react");
let DefaultLayout = require("./layouts/default-layout");
let Card = require("./components/card");

class Main extends React.Component {
  render() {
    let userId = this.props.userId;
    let allUsers = this.props.allUsers;
    let allUsersHTML = allUsers.map((user, index) => {
      return <Card key={user.id.toString()} username={user.name} id={user.id} />;
    });
    return (
      <DefaultLayout>
        <div className="row">
          <div className="col-8 px-5">{allUsersHTML}</div>
          <div className="col-4">right column</div>
        </div>
      </DefaultLayout>
    );
  }
}
module.exports = Main;
