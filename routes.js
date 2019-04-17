module.exports = (app, allModels) => {

  const mainControllerCallbacks = require("./controllers/main_controller")(allModels);
  app.get("/", mainControllerCallbacks.home);
  app.get("/post", mainControllerCallbacks.post);
  app.get("/create-post", mainControllerCallbacks.createPost);
};
