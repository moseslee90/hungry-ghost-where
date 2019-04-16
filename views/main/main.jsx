let React = require('react');

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
)
});
return (
<html>
<head>
<meta charSet="utf-8" />
<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
<title>Hungry Ghost Where</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body>
Main Page of Hungry Ghost Where
<h2>userId</h2>
{userId}
{allUsersHTML}
</body>
</html>
);}
}
module.exports = Main;