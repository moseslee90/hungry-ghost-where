module.exports = (app, allModels) => {

  const mainControllerCallbacks = require("./controllers/main_controller")(allModels);
  app.get("/", mainControllerCallbacks.home);
  app.get("/create-post", mainControllerCallbacks.createPost);
  app.post("/create-post/query", mainControllerCallbacks.createPostQuery);
  app.get("/create-post/success", mainControllerCallbacks.postCreated);
  app.get("/login", mainControllerCallbacks.login);
  app.get("/login/query", mainControllerCallbacks.loginQuery);
  app.get("/login/success", mainControllerCallbacks.loginSuccess);
  app.get("/post", mainControllerCallbacks.post);
  app.get("/register", mainControllerCallbacks.register);
  app.post("/register/query", mainControllerCallbacks.registerQuery);
  app.get("/register/success", mainControllerCallbacks.registerSuccess);
  
};
