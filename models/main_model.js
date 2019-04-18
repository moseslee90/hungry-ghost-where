module.exports = (dbPoolInstance) => {

  let getPosts = (callback) => {

    let query = "SELECT * FROM users";

    dbPoolInstance.query(query, (error, queryResult) => {
      if( error ){

        callback(error, null);

      }else{


        if( queryResult.rows.length > 0 ){
          callback(null, queryResult.rows);

        }else{
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
        
        let query = "INSERT INTO posts "+
        "(user_id, deleted, title, content, image_url, votes, comments_count)"+
        "VALUES"+
        "($1,$2,$3,$4,$5,$6,$7)";
        
        let user_id = queryUserIdResult.rows[0].id;
        
        let deleted = false;
        let title = postData.title;
        let content = postData.content;
        let image_url = postData.image_url;
        let votes = 0;
        let comments_count = 0;
    
        let values = [user_id, deleted, title, content, image_url, votes, comments_count];
    
        dbPoolInstance.query(query, (error, queryResult) => {
          if( error ){
    
            callback(error, null);
    
          }else{
    
    
            if( queryResult.rows.length > 0 ){
              callback(null, queryResult.rows);
    
            }else{
              callback(null, null);
    
            }
          }
        });
      }
    });
  };

  return {
    getPosts: getPosts,
    createPost: createPost
  };
};
