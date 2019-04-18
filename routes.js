module.exports = (app, allModels) => {

  const mainControllerCallbacks = require("./controllers/main_controller")(allModels);
  app.get("/", mainControllerCallbacks.home);
  app.get("/create-post", mainControllerCallbacks.createPost);
  app.post("/create-post/query", mainControllerCallbacks.createPostQuery);
  app.get("/login", mainControllerCallbacks.login);
  app.post("/login/query", mainControllerCallbacks.loginQuery);
  app.get("/post", mainControllerCallbacks.post);
  app.get("/post-created", mainControllerCallbacks.postCreated);
  app.get("/register", mainControllerCallbacks.register);
  app.post("/register/query", mainControllerCallbacks.registerQuery);
  
};
