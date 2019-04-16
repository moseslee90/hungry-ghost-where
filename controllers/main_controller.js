module.exports = db => {

  const hash = require("js-sha256");
  const SALT = "pepper";

  let homeControllerCallback = (request, response) => {
    let data = {};
    // data["userId"] = request.cookies.userId;
    data["userId"] = "alice";

    db.HGW.getAll((error, allUsers) => {
      data["allUsers"] = allUsers;
      response.render("main/home", data);

    });
  };

  return {
    home: homeControllerCallback,
  };
};
