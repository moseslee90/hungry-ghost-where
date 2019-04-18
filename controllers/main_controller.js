module.exports = db => {
  const hash = require("js-sha256");
  const SALT = "pepper";

  let createPostControllerCallback = (request, response) => {
    let data = {};

    data["userId"] = "alice";

    response.render("main/create-post", data);
  };

  let createPostQueryControllerCallback = (request, response) => {
    let cookie = request.cookie("cookie");
    console.log(cookie);
    let cookie_hash = hash(SALT + cookie);

    let postData = request.body;
    postData["cookie_hash"] = cookie_hash;
    db.HGW.createPost(postData, (error, queryResult) => {
      if (error) {
        console.log(error);
      } else {
        response.redirect("/post-created");
      }
    });
  };

  let homeControllerCallback = (request, response) => {
    let data = {};
    //code to check for logged in status for header
    let cookie = request.cookies.cookie;
    if (cookie !== undefined) {
      data["loginStatus"] = true;
    } else {
      data["loginStatus"] = false;
    }

    data["userId"] = "alice";

    db.HGW.getPosts((error, allUsers) => {
      data["allUsers"] = allUsers;
      response.render("main/home", data);
    });
  };

  let loginControllerCallback = (request, response) => {
    let data = {};
    // data["userId"] = request.cookies.userId;
    data["userId"] = "alice";

    response.render("main/login", data);
    // db.HGW.getPosts((error, allUsers) => {
    //   data["allUsers"] = allUsers;

    // });
  };

  let loginQueryControllerCallback = (request, response) => {

    console.log(request.query);
    let loginData = {};
    let email = request.query.email;
    let email_hash = hash(SALT + email);
    let password = request.query.password;
    let password_hash = hash(SALT + password);
    let cookie = hash(SALT + email);

    loginData["email_hash"] = email_hash;
    loginData["password_hash"] = password_hash;

    db.HGW.loginUser(loginData, (error, result) => {
      if (error) {
        console.log(error);
      } else {
        if (result === "email") {
          console.log("invalid email");
          response.send("Invalid email address");
        } else if (result === "password") {
          console.log("wrong password");
          response.send("wrong password");
        } else if (result === "success") {
          response.cookie("cookie", cookie);
          response.redirect('/login/success');
        }
      }
    });
  };

  let loginSuccessControllerCallback = (request, response) => {
    response.render("main/login-success");
  }

  let postControllerCallback = (request, response) => {
    let data = {};

    data["userId"] = "alice";

    db.HGW.getPosts((error, allUsers) => {
      data["allUsers"] = allUsers;
      response.render("main/post", data);
    });
  };

  let postCreatedControllerCallback = (request, response) => {
    response.render("main/post-created");
  };

  let registerControllerCallback = (request, response) => {
    response.render("main/register");
  };

  let registerQueryControllerCallback = (request, response) => {
    let registerData = {};

    let username_hash = hash(SALT + request.body.username);
    let password_hash = hash(SALT + request.body.password);
    let email_hash = hash(SALT + request.body.email);

    let cookie = hash(SALT + request.body.email);
    let cookie_hash = hash(SALT + cookie);

    registerData["username_hash"] = username_hash;
    registerData["username"] = request.body.username;
    registerData["password_hash"] = password_hash;
    registerData["cookie_hash"] = cookie_hash;
    registerData["email_hash"] = email_hash;
    registerData["email"] = request.body.email;

    db.HGW.registerUser(registerData, (error, result) => {
      if (error) {
        console.log(error);
      } else {
          if (result === "username") {
            console.log("duplicate username");
            response.send("username already taken");
          } else if (result === "email") {
            console.log("duplicate email");
            response.send("email already taken");
          } else {
            response.redirect("/register/success");
          }
      }
    });
  };

  let registerSuccessControllerCallback = (request, response) => {
    response.render("main/register-success");
  }

  return {
    createPost: createPostControllerCallback,
    createPostQuery: createPostQueryControllerCallback,
    home: homeControllerCallback,
    login: loginControllerCallback,
    loginQuery: loginQueryControllerCallback,
    loginSuccess: loginSuccessControllerCallback,
    post: postControllerCallback,
    postCreated: postCreatedControllerCallback,
    register: registerControllerCallback,
    registerQuery: registerQueryControllerCallback,
    registerSuccess: registerSuccessControllerCallback
  };
};
