module.exports = dbPoolInstance => {
  let getPosts = callback => {
    let query = "SELECT * FROM users";

    dbPoolInstance.query(query, (error, queryResult) => {
      if (error) {
        callback(error, null);
      } else {
        if (queryResult.rows.length > 0) {
          callback(null, queryResult.rows);
        } else {
          callback(null, null);
        }
      }
    });
  };

  let createPost = (postData, callback) => {
    //use postData to structure query in VALUES

    let cookie_hash = postData.cookie_hash;
    let queryUserId = "SELECT id FROM users WHERE cookie_hash = '" + cookie_hash + "'";

    dbPoolInstance.query(queryUserId, (error, queryUserIdResult) => {
      if (error) {
        console.log(error);
      } else {
        let query =
          "INSERT INTO posts " +
          "(user_id, deleted, title, content, image_url, votes, comments_count)" +
          "VALUES" +
          "($1,$2,$3,$4,$5,$6,$7)";

        let user_id = queryUserIdResult.rows[0].id;

        let deleted = false;
        let title = postData.title;
        let content = postData.content;
        let image_url = postData.image_url;
        let votes = 0;
        let comments_count = 0;

        let values = [user_id, deleted, title, content, image_url, votes, comments_count];

        dbPoolInstance.query(query, values, (error, queryResult) => {
          if (error) {
            callback(error, null);
          } else {
            if (queryResult.rows.length > 0) {
              callback(null, queryResult.rows);
            } else {
              callback(null, null);
            }
          }
        });
      }
    });
  };

  let loginUser = (loginData, callback) => {

  }

  let registerUser = (registerData, callback) => {
    let username_hash = registerData.username_hash;
    let username = registerData.username;
    let password_hash = registerData.password_hash;
    let email = registerData.email;
    let cookie_hash = registerData.cookie_hash;
    //first we need to check if username or email has been taken
    let queryUsername = "SELECT * FROM users WHERE username = '" + username + "'";

    function checkEmail(error, queryResultEmail) {
      if (error) {
        console.log(error);
        callback(error, null);
      } else {
        if (queryResultEmail.rows.length > 0) {
          callback(null, "email");
        } else  {
          //no duplicate username AND email found, time to register user!!
          let queryRegister = 
          "INSERT INTO users " +
          "(deleted, username, email, cookie_hash)" +
          "VALUES" +
          "($1,$2,$3,$4)";
          let deleted = false;
          let values = [deleted, username, email, cookie_hash];
          dbPoolInstance.query(queryRegister,values, (error, queryResult) => {
            if (error) {
              console.log(error);
            } else {
              callback(null, "success");
            }
          });
        }
      }
    }

    function checkUsername(error, queryResultUsername) {
      if (error) {
        console.log(error);
        callback(error, null);
      } else {
        if (queryResultUsername.rows.length > 0) {
          //duplicate username found
          callback(null, "username");
        } else {
          //no duplicate username found, now check for duplicate email
          let queryEmail = "SELECT * FROM users WHERE email = '" + email + "'";

          dbPoolInstance.query(queryEmail, checkEmail);
        }
      }
    }

    dbPoolInstance.query(queryUsername, checkUsername);
  };

  return {
    getPosts: getPosts,
    createPost: createPost,
    loginUser: loginUser,
    registerUser: registerUser
  };
};
