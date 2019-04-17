let React = require("react");

class Header extends React.Component {
  render() {
    return (
      <div className="row mb-3 pl-2 pr-2">
        <div className="col-lg-8">
          <div className="row">
            <div className="col-1 d-flex justify-content-end align-items-center pr-0">
              <input type="image" src="/images/Nana_small.png" width="32" height="32" />
            </div>
            <div id="navbar-title" className="col-1 d-flex align-items-center">
              <div>HGW</div>
            </div>
            <div className="col pr-0 pl-4">
              <form action="">
                <div className="form-group mt-1 mb-auto">
                  <select className="form-control" id="exampleFormControlSelect1">
                    <option>All</option>
                    <option>Popular</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="col-7">
              <form action="">
                <div className="form-group row mt-1 mb-auto">
                  <div className="col-9">
                    <input
                      type="text"
                      className="form-control"
                      id="search-bar"
                      placeholder="Search"
                    />
                  </div>
                  <div className="col-3 pl-0 pr-2">
                    <button className="btn btn-primary" type="submit" id="search-button">
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="row mt-1 mb-auto">
            <div className="col-lg-2 col-0" />
            <div className="col-lg-3 col-4 d-flex justify-content-end" id="login-column">
              <button className="btn btn-primary">Login</button>
            </div>
            <div className="col-lg-3 col-4 d-flex justify-content-center">
              <button className="btn btn-primary">Signup</button>
            </div>
            <div className="col-lg-2 col-4 nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false">
                Account
              </a>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="#one">
                  one
                </a>
                <a className="dropdown-item" href="#two">
                  two
                </a>
                <div role="separator" className="dropdown-divider" />
                <a className="dropdown-item" href="#three">
                  three
                </a>
              </div>
            </div>
            <div className="col-lg-2 col-0" />
          </div>
        </div>
      </div>
    );
  }
}
module.exports = Header;
