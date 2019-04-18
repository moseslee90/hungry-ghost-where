module.exports = db => {

  const hash = require("js-sha256");
  const SALT = "pepper";

  let createPostControllerCallback = (request, response) => {
    let data = {};

    data["userId"] = "alice";

    response.render("main/create-post", data);
  };

  let homeControllerCallback = (request, response) => {
    let data = {};
    // data["userId"] = request.cookies.userId;
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
    let data = {};
    // data["userId"] = request.cookies.userId;
    data["userId"] = "alice";

    response.render("main/login", data);
    // db.HGW.getPosts((error, allUsers) => {
    //   data["allUsers"] = allUsers;

    // });
  };

  let postControllerCallback = (request, response) => {
    let data = {};

    data["userId"] = "alice";

    db.HGW.getPosts((error, allUsers) => {
      data["allUsers"] = allUsers;
      response.render("main/post", data);

    });
  };

  return {
    home: homeControllerCallback,
    post: postControllerCallback,
    createPost: createPostControllerCallback,
    login: loginControllerCallback,
    loginQuery: loginQueryControllerCallback
  };
};
