let React = require('react');
let DefaultLayout = require('./layouts/default-layout');

class Logout extends React.Component {
render() {
return (
<DefaultLayout loginStatus ={this.props.loginStatus}>
You have been Logged out!
</DefaultLayout>
);}
}
module.exports = Logout;