let React = require("react");

class Header extends React.Component {
  render() {
    let loginStatus = this.props.loginStatus;
    // console.log(loginStatus);
    let authenticationHTML;
    let dropdownHTML;
    if (loginStatus === true) {
      authenticationHTML = (
        <div className="row">
          <li className="nav-item dropdown col-md">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="dropdown03"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false">
              Dropdown
            </a>
            <div className="dropdown-menu mr-2" aria-labelledby="dropdown03">
              <a className="dropdown-item" href="/create-post">
                Create Post
              </a>
              <a className="dropdown-item" href="#">
                Another
              </a>
              <a className="dropdown-item" href="#">
                Something
              </a>
            </div>
          </li>

          <li className="nav-item col-md">
            <a className="nav-link" href="/logout">
              Logout
            </a>
          </li>
        </div>
      );
    } else {
      authenticationHTML = (
        <div className="d-flex flex-row">
          <li className="nav-item">
            <a className="nav-link" href="/login">
              Login
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/register">
              Register
            </a>
          </li>
        </div>
      );
    }

    return (
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <form action="/" method="get">
          <input type="image" src="/images/Nana_small.png" width="32" height="32" />
        </form>
        <a className="navbar-brand" href="/">
          HGW
        </a>
        <button
          className="navbar-toggler collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample03"
          aria-controls="navbarsExample03"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="navbar-collapse collapse" id="navbarsExample03">
          <form className="form-inline my-2 my-md-0">
            <select className="form-control" id="exampleFormControlSelect1">
              <option>All</option>
              <option>Popular</option>
            </select>
          </form>
          <form className="form-inline my-2 my-md-0" method="GET" action="/">
            <input
              className="form-control"
              type="text"
              placeholder="Search"
              name="search"
            />
          </form>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            {authenticationHTML}
          </ul>
        </div>
      </nav>
    );
  }
}
module.exports = Header;
