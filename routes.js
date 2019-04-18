module.exports = (app, allModels) => {

  const mainControllerCallbacks = require("./controllers/main_controller")(allModels);
  app.get("/", mainControllerCallbacks.home);
  app.get("/create-post", mainControllerCallbacks.createPost);
  app.get("/login", mainControllerCallbacks.login);
  app.get("/login/query", mainControllerCallbacks.loginQuery);
  app.get("/post", mainControllerCallbacks.post);
  
};
