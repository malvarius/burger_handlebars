var express = require("express");
var exphbs = require("express-handlebars");
var connection = require('./connection');
var app = express();
var orm = require('./orm')
// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
  app.get("/", function(req, res) {
    var notEaten = [];
      var devoured = [];
      // get function queries burgers from ORM file and pushed not eaten burgers to array and devoured burgers to another array
    orm.getAll('*','burgers',function(data){
      if (err) throw err;
      for (var i=0;i<data.length;i++){
        if (data[i].devoured){
          devoured.push(data[i]);
        }else(notEaten.push(data[i]))
      }
      res.render("index", { burgers: notEaten, devouredBurgers: devoured });
    })
  });
  app.post("/", function(req, res) {
    console.log(req.body)
    orm.insertInto('burgers','burger',req.body.burger,function(data){
      res.redirect('/');
    });
  });
  app.put("/api/update/:id",function(req,res){
    var id =req.params.id;
    console.log(req.body)
    connection.query("UPDATE burgers SET devoured = 1 WHERE id=?",[id],function(err, data){
      console.log(err)
      if (err) throw err;
      res.end();
    });
  });
  app.delete("/api/update",function(req,res){
    connection.query("DELETE from burgers WHERE devoured = 1",function(err,data){
      if(err) throw err;
      res.end();
    });
  });
});




app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});
