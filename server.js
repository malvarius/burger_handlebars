var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require("mysql");

var app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "sdt27gd!",
  database: "burgers_db"
});


connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
  app.get("/", function(req, res) {
    connection.query("SELECT * FROM burgers;", function(err, data) {
      if (err) throw err;
      var notEaten = [];
      var devoured = [];
      for (var i=0;i<data.length;i++){
        if (data[i].devoured){
          devoured.push(data[i]);
        }else(notEaten.push(data[i]))
      }
      res.render("index", { burgers: notEaten, devouredBurgers: devoured });
    });
  });
  app.post("/", function(req, res) {
    connection.query("INSERT INTO burgers (burger) VALUES (?)", [req.body.burger], function(err, data) {
      if (err) throw err;
      res.redirect("/");
    });
  });
  app.put("/api/update/:id",function(req,res){
    var id =req.params.id;
    console.log(req.body)
    connection.query("UPDATE burgers SET devoured = 1 WHERE id=?",[id],function(err, data){
      if (err) throw err;
      res.redirect("/");
    });
  });
  app.delete("/api/update",function(req,res){
    connection.query("DELETE from burgers WHERE devoured = 1",function(err,data){
      if(err) throw err;
      res.redirect("/");
    });
  });
});




app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});
