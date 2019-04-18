module.exports = db => {

  const hash = require("js-sha256");
  const SALT = "pepper";

  let createPostControllerCallback = (request, response) => {
    let data = {};

    data["userId"] = "alice";

    response.render("main/create-post", data);
  };


  let createPostQueryControllerCallback = (request, response) => {
    console.log(request.body);
    let postData = request.body;

    // db.HGW.createPost(postData, (error, queryResult) => {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     response.redirect("/post-created")
    //   }
    // });
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

  let postCreatedControllerCallback = (request, response) => {
    response.render("main/post-created")
  };

  return {
    createPost: createPostControllerCallback,
    createPostQuery: createPostQueryControllerCallback,
    home: homeControllerCallback,
    login: loginControllerCallback,
    loginQuery: loginQueryControllerCallback,
    post: postControllerCallback,
    postCreated: postCreatedControllerCallback
  };
};
