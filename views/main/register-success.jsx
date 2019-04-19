let React = require('react');
let DefaultLayout = require('./layouts/default-layout');

class RegisterSuccess extends React.Component {
render() {
return (
<DefaultLayout loginStatus = {this.props.loginStatus}>
Registration Successful
</DefaultLayout>
);}
}
module.exports = RegisterSuccess;