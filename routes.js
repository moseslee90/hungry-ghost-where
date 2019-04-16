module.exports = (app, allModels) => {

  const mainControllerCallbacks = require("./controllers/main_controller")(allModels);
  app.get("/", mainControllerCallbacks.home);
};
