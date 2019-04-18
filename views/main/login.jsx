let React = require("react");
let DefaultLayout = require("./layouts/default-layout");

class Login extends React.Component {
  render() {
    return (
      <DefaultLayout>
        <div className="text-center d-flex justify-content-center">
          <form className="form-signin">
            <img
              className="mb-4"
              src="/images/Nana_small.png"
              alt=""
              width="72"
              height="72"
            />
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
            <label htmlFor="inputEmail" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              id="inputEmail"
              className="form-control"
              placeholder="Email address"
              required=""
              autoFocus=""
            />
            <label htmlFor="inputPassword" className="sr-only">
              Password
            </label>
            <input
              type="password"
              id="inputPassword"
              className="form-control"
              placeholder="Password"
              required=""
            />
            <div className="checkbox mb-2 mt-2">
              <label>
                <input className="mr-1" type="checkbox" value="remember-me" />Remember Me
              </label>
            </div>
            <button className="btn btn-lg btn-primary btn-block" type="submit">
              Sign in
            </button>
            <p className="mt-5 mb-3 text-muted">© 2017-2019</p>
          </form>
        </div>
      </DefaultLayout>
    );
  }
}
module.exports = Login;
