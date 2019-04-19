let React = require("react");
let DefaultLayout = require("./layouts/default-layout");

class LoginSuccess extends React.Component {
  render() {
    return (
      <DefaultLayout loginStatus={this.props.loginStatus}>Login Success</DefaultLayout>
    );
  }
}
module.exports = LoginSuccess;
