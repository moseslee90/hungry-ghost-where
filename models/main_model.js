module.exports = dbPoolInstance => {
  let downVote = (voter_cookie_hash, post_id, callback) => {
    //query database on votestatus
    //first check if voter is the author of the post

    let queryUser = "SELECT * FROM users WHERE cookie_hash='" + voter_cookie_hash + "'";
    let resultObj = {};
    dbPoolInstance.query(queryUser, (error, queryResult) => {
      if (error) {
        callback(error, null);
      } else {
        if (queryResult.rows.length > 0) {
          //voter user data entry found, get his userId
          let voter_id = queryResult.rows[0].id;
          //check if voter is author
          let queryCheckAuthor = "SELECT * FROM posts WHERE id='" + post_id + "'";

          dbPoolInstance.query(queryCheckAuthor, (error, queryCheckAuthorResult) => {
            if (error) {
              callback(error, null);
            } else {
              if (queryCheckAuthorResult.rows[0].user_id === voter_id) {
                //voter is the author, don't allow vote
                resultObj["code"] = "author";
                callback(null, resultObj);
              } else {
                //voter is not the author, allow vote
                //next step is to check for vote
                let queryCheckVote =
                  "SELECT * FROM post_votes WHERE voter_id='" +
                  voter_id +
                  "' AND post_id='" +
                  post_id +
                  "'";
                dbPoolInstance.query(queryCheckVote, (error, queryCheckVoteResult) => {
                  if (error) {
                    console.log(error);
                  } else {
                    function dbPostVoteCountUpdate(voteValue) {
                      let currentVoteCount = parseInt(
                        queryCheckAuthorResult.rows[0].votes
                      );
                      let newVoteCount = currentVoteCount + voteValue;
                      let updatePostVoteQuery =
                        "UPDATE posts SET votes='" +
                        newVoteCount +
                        "' WHERE id='" +
                        post_id +
                        "'";
                      dbPoolInstance.query(
                        updatePostVoteQuery,
                        (error, updatePostVoteQueryResult) => {
                          if (error) {
                            console.log(error);
                          } else {
                          }
                        }
                      );
                      return newVoteCount;
                    }

                    function dbVoteInsert(voteValue) {
                      let voteInsertQuery =
                        "INSERT INTO post_votes (voter_id, post_id, vote) " +
                        "VALUES ($1, $2, $3)";
                      let values = [voter_id, post_id, voteValue];
                      dbPoolInstance.query(
                        voteInsertQuery,
                        values,
                        (error, voteInsertQueryResult) => {
                          if (error) {
                            console.log(error);
                          }
                        }
                      );
                    }
                    function dbVoteUpdate(voteValue) {
                      let voteUpdateQuery =
                        "UPDATE post_votes SET vote='" +
                        voteValue +
                        "' WHERE voter_id='" +
                        voter_id +
                        "' AND post_id='" +
                        post_id +
                        "'";

                      dbPoolInstance.query(
                        voteUpdateQuery,
                        (error, voteUpdateQueryResult) => {
                          if (error) {
                            console.log(error);
                          }
                        }
                      );
                    }

                    if (queryCheckVoteResult.rows.length > 0) {
                      //vote entry found, check vote value
                      let voteValue = parseInt(queryCheckVoteResult.rows[0].vote);
                      if (voteValue === -1) {
                        //write query to change vote to 0
                        dbVoteUpdate(0);
                        let newVote = dbPostVoteCountUpdate(0 - voteValue);
                        resultObj["code"]="0";
                        resultObj["newVote"]=newVote.toString();
                        callback(null, resultObj);
                      } else if (voteValue !== -1) {
                        //write query to change vote to -1
                        dbVoteUpdate(-1);
                        let newVote = dbPostVoteCountUpdate(-1 - voteValue);
                        resultObj["code"]="-1";
                        resultObj["newVote"]=newVote.toString();
                        callback(null, resultObj);
                      }
                    } else {
                      //vote not found
                      //write query to INSERT vote -1
                      dbVoteInsert(-1);
                      let newVote = dbPostVoteCountUpdate(-1);
                      resultObj["code"]="-1";
                      resultObj["newVote"]=newVote.toString();
                      callback(null, resultObj);
                    }
                  }
                });
                console.log("voter is not author");
              }
            }
          });
        }
      }
    });
  };

  let getPosts = callback => {
    let query =
      "SELECT " +
      "posts.id, posts.user_id, posts.deleted, posts.title, posts.content, posts.image_url, posts.votes, posts.comments_count, posts.date_time, users.username " +
      "FROM posts INNER JOIN users ON (users.id = posts.user_id) " +
      "ORDER BY date_time ASC";

    dbPoolInstance.query(query, (error, queryResult) => {
      if (error) {
        callback(error, null);
      } else {
        if (queryResult.rows.length > 0) {
          callback(null, queryResult.rows);
        } else {
          callback(null, []);
        }
      }
    });
  };

  let getPost = (postId, callback) => {
    //get singular post related to post id
    let query =
      "SELECT " +
      "posts.id, posts.user_id, posts.deleted, posts.title, posts.content, posts.image_url, posts.votes, posts.comments_count, posts.date_time, users.username " +
      "FROM posts INNER JOIN users ON (users.id = posts.user_id) WHERE posts.id='" +
      postId +
      "'";
    dbPoolInstance.query(query, (error, queryResult) => {
      if (error) {
        callback(error, null);
      } else {
        if (queryResult.rows.length > 0) {
          let post = queryResult.rows[0];
          let getCommentsQuery = "SELECT " +
          "comments.id, comments.user_id, comments.post_id, comments.deleted, comments.content, comments.reply_to, comments.date_time, users.username " +
          "FROM comments INNER JOIN users ON (users.id = comments.user_id) WHERE comments.post_id='"+postId+"'";
          dbPoolInstance.query(getCommentsQuery, (error, commentsQueryResult) => {
            if (error) {
              callback(error, null);
            } else {
              post["comments"]=commentsQueryResult.rows;
              callback(null, post);
            }
          });
        } else {
          callback(null, "failure");
        }
      }
    });
  };

  let createComment = (commentData, callback) => {

    let cookie_hash = commentData.cookie_hash;
    let queryUserId = "SELECT id FROM users WHERE cookie_hash = '" + cookie_hash + "'";

    dbPoolInstance.query(queryUserId, (error, queryUserIdResult) => {
      if (error) {
        console.log(error);
      } else if (queryUserIdResult.rows.length > 0){
        console.log(commentData.reply_to);
        let user_id = queryUserIdResult.rows[0].id;
        let post_id = commentData.post_id;
        let deleted = false;
        let content = commentData.content;
        let reply_to;
        if (commentData.reply_to === "null") {
          reply_to = null;
        } else {
          reply_to = commentData.reply_to;
        }

        let addCommentQuery = 
        "INSERT INTO comments " +
        "(user_id, post_id, deleted, content, reply_to, date_time)" +
        "VALUES" +
        "($1,$2,$3,$4,$5,CURRENT_TIMESTAMP)";

        let values = [user_id,post_id,deleted,content,reply_to];

        dbPoolInstance.query(addCommentQuery, values, (error, queryResult) => {
          if (error) {
            callback(error, null);
          } else {
            if (queryResult.rows.length > 0) {
              callback(null, "success");
            } else {
              callback(null, null);
            }
          }
        });
      }
    });
  }

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
          "(user_id, deleted, title, content, image_url, votes, comments_count, date_time, date)" +
          "VALUES" +
          "($1,$2,$3,$4,$5,$6,$7,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)";

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
    let email_hash = loginData.email_hash;
    let password_hash = loginData.password_hash;

    let queryAuthenticate =
      "SELECT * FROM authentication WHERE email_hash = '" + email_hash + "'";
    dbPoolInstance.query(queryAuthenticate, (error, authenticateResult) => {
      if (error) {
        console.log(error);
      } else {
        if (authenticateResult.rows.length > 0) {
          //email match found
          //next check password
          if (authenticateResult.rows[0].password_hash === password_hash) {
            //password matched! log the user in
            callback(null, "success");
          } else {
            //wrong password
            callback(null, "password");
          }
        } else {
          //email not found
          callback(null, "email");
        }
      }
    });
  };

  let registerUser = (registerData, callback) => {
    let username = registerData.username;
    let password_hash = registerData.password_hash;
    let email = registerData.email;
    let email_hash = registerData.email_hash;
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
        } else {
          //no duplicate username AND email found, time to register user!!
          let queryRegister =
            "INSERT INTO users " +
            "(deleted, username, email, cookie_hash)" +
            "VALUES" +
            "($1,$2,$3,$4)";

          let queryAuthentication =
            "INSERT INTO authentication " +
            "(email_hash, password_hash)" +
            "VALUES" +
            "($1,$2)";

          let deleted = false;
          let valuesRegister = [deleted, username, email, cookie_hash];
          let valuesAuthentication = [email_hash, password_hash];
          dbPoolInstance.query(queryRegister, valuesRegister, (error, queryResult) => {
            if (error) {
              console.log(error);
            } else {
              dbPoolInstance.query(
                queryAuthentication,
                valuesAuthentication,
                (error, queryResult) => {
                  if (error) {
                    console.log(error);
                  } else {
                    callback(null, "success");
                  }
                }
              );
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

  let upVote = (voter_cookie_hash, post_id, callback) => {
    //query database on votestatus
    //first check if voter is the author of the post

    let queryUser = "SELECT * FROM users WHERE cookie_hash='" + voter_cookie_hash + "'";
    let resultObj = {};
    dbPoolInstance.query(queryUser, (error, queryResult) => {
      if (error) {
        callback(error, null);
      } else {
        if (queryResult.rows.length > 0) {
          //voter user data entry found, get his userId
          let voter_id = queryResult.rows[0].id;
          //check if voter is author
          let queryCheckAuthor = "SELECT * FROM posts WHERE id='" + post_id + "'";

          dbPoolInstance.query(queryCheckAuthor, (error, queryCheckAuthorResult) => {
            if (error) {
              callback(error, null);
            } else {
              if (queryCheckAuthorResult.rows[0].user_id === voter_id) {
                //voter is the author, don't allow vote
                resultObj["code"] = "author";
                callback(null, resultObj);
              } else {
                //voter is not the author, allow vote
                //next step is to check for vote
                let queryCheckVote =
                  "SELECT * FROM post_votes WHERE voter_id='" +
                  voter_id +
                  "' AND post_id='" +
                  post_id +
                  "'";
                dbPoolInstance.query(queryCheckVote, (error, queryCheckVoteResult) => {
                  if (error) {
                    console.log(error);
                  } else {
                    function dbPostVoteCountUpdate(voteValue) {
                      let currentVoteCount = parseInt(
                        queryCheckAuthorResult.rows[0].votes
                      );
                      let newVoteCount = currentVoteCount + voteValue;
                      let updatePostVoteQuery =
                        "UPDATE posts SET votes='" +
                        newVoteCount +
                        "' WHERE id='" +
                        post_id +
                        "'";
                      dbPoolInstance.query(
                        updatePostVoteQuery,
                        (error, updatePostVoteQueryResult) => {
                          if (error) {
                            console.log(error);
                          } else {
                          }
                        }
                      );
                      return newVoteCount;
                    }

                    function dbVoteInsert(voteValue) {
                      let voteInsertQuery =
                        "INSERT INTO post_votes (voter_id, post_id, vote) " +
                        "VALUES ($1, $2, $3)";
                      let values = [voter_id, post_id, voteValue];
                      dbPoolInstance.query(
                        voteInsertQuery,
                        values,
                        (error, voteInsertQueryResult) => {
                          if (error) {
                            console.log(error);
                          }
                        }
                      );
                    }
                    function dbVoteUpdate(voteValue) {
                      let voteUpdateQuery =
                        "UPDATE post_votes SET vote='" +
                        voteValue +
                        "' WHERE voter_id='" +
                        voter_id +
                        "' AND post_id='" +
                        post_id +
                        "'";

                      dbPoolInstance.query(
                        voteUpdateQuery,
                        (error, voteUpdateQueryResult) => {
                          if (error) {
                            console.log(error);
                          }
                        }
                      );
                    }

                    if (queryCheckVoteResult.rows.length > 0) {
                      //vote entry found, check vote value
                      let voteValue = parseInt(queryCheckVoteResult.rows[0].vote);
                      if (voteValue === 1) {
                        //write query to change vote to 0
                        dbVoteUpdate(0);
                        let newVote = dbPostVoteCountUpdate(0 - voteValue);
                        resultObj["code"]="0";
                        resultObj["newVote"]=newVote.toString();
                        callback(null, resultObj);
                      } else if (voteValue !== 1) {
                        //write query to change vote to -1
                        dbVoteUpdate(1);
                        let newVote = dbPostVoteCountUpdate(1 - voteValue);
                        resultObj["code"]="1";
                        resultObj["newVote"]=newVote.toString();
                        callback(null, resultObj);
                      }
                    } else {
                      //vote not found
                      //write query to INSERT vote -1
                      dbVoteInsert(1);
                      let newVote = dbPostVoteCountUpdate(1);
                      resultObj["code"]="1";
                      resultObj["newVote"]=newVote.toString();
                      callback(null, resultObj);
                    }
                  }
                });
                console.log("voter is not author");
              }
            }
          });
        }
      }
    });
  };

  return {
    downVote: downVote,
    getPosts: getPosts,
    getPost: getPost,
    createComment: createComment,
    createPost: createPost,
    loginUser: loginUser,
    registerUser: registerUser,
    upVote: upVote
  };
};
