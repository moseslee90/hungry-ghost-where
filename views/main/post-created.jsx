let React = require('react');
let DefaultLayout = require('./layouts/default-layout');

class PostCreated extends React.Component {
render() {
return (
<DefaultLayout>
    You've Created a Post
</DefaultLayout>
);}
}
module.exports = PostCreated;