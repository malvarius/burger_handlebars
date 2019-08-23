var connection = require('./connection')

  var orm = {
      getAll : function(query, table, cb){
        connection.query("SELECT ?? FROM ??",[query,table], function(err, data) {
            cb(data);
        }); 
      },

      insertInto: function(table, column, value, cb){
        connection.query("INSERT INTO ?? (??) VALUES (?)", [table,column,value], function(err, data) {
            cb(data);
        })
      }
  }

  module.exports = orm;