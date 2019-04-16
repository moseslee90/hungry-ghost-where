let React = require("react");

class Header extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-8">
          <div className="row">
            <div className="col-2 d-flex justify-content-end align-items-center pr-0">
              <button className="btn btn-light">
                <img id="site-logo" src="/images/Nana_small.png" width="32" height="32" />
              </button>
            </div>
            <div id="navbar-title" className="col-2 d-flex align-items-center">
              <div>HGW</div>
            </div>
            <div className="col-4 d-flex align-items-center">
              <div className="form-group">
                <select className="form-control" id="exampleFormControlSelect1">
                  <option>All</option>
                  <option>Popular</option>
                </select>
              </div>
            </div>
            <div className="col-4">search box</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="row">
            <div className="col-5">
              <button className="btn btn-primary">Login</button>
            </div>
            <div className="col-5">
              <button className="btn btn-primary">Signup</button>
            </div>
            <div className="col-2">account</div>
          </div>
        </div>
      </div>
    );
  }
}
module.exports = Header;
