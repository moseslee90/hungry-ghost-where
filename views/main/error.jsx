let React = require('react');
let DefaultLayout = require('./layouts/default-layout');

class Error extends React.Component {
render() {
return (
<DefaultLayout>
Opps something went wrong!
</DefaultLayout>
);}
}
module.exports = Error;