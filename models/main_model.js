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

  return {
    getPosts: getPosts,
  };
};
