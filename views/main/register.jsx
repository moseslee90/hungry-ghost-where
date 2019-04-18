let React = require("react");
let DefaultLayout = require("./layouts/default-layout");

class Register extends React.Component {
  render() {
    return (
      <DefaultLayout>
        <div className="text-center d-flex justify-content-center">
          <form className="form-signin" action="/register/query" method="POST">
            <img
              className="mb-4"
              src="/images/Nana_small.png"
              alt=""
              width="72"
              height="72"
            />
            <h1 className="h3 mb-3 font-weight-normal">Please Register</h1>
            <label htmlFor="inputUsername" className="sr-only">
              Username
            </label>
            <input
              type="text"
              id="inputUsername"
              className="form-control mb-1"
              name="username"
              placeholder="Username"
              required=""
              autoFocus=""
            />
            <label htmlFor="inputEmail" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              id="inputEmail"
              className="form-control mb-1"
              name="email"
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
              className="form-control mb-1"
              name="password"
              placeholder="Password"
              required=""
            />
            <label htmlFor="inputPassword" className="sr-only">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="form-control mb-1"
              placeholder="Confirm Password"
              required=""
            />
            <button className="btn btn-lg btn-primary btn-block" type="submit">
              Register
            </button>
            <p className="mt-5 mb-3 text-muted">© 2017-2019</p>
          </form>
        </div>
        <script src="/register.js" />
      </DefaultLayout>
    );
  }
}
module.exports = Register;
