let React = require("react");
let DefaultLayout = require("./layouts/default-layout");
let Header = require("./components/header");

class Main extends React.Component {
  render() {
    let userId = this.props.userId;
    let allUsers = this.props.allUsers;
    let allUsersHTML = allUsers.map(user => {
      return (
        <div key={user.id}>
          <h1>allUsers</h1>
          <ul>
            <li>{user.name}</li>
            <li>{user.phone}</li>
          </ul>
        </div>
      );
    });
    return (
      <DefaultLayout>
        <Header />
        <div>userId is {userId}</div>
        {allUsersHTML}
      </DefaultLayout>
    );
  }
}
module.exports = Main;
