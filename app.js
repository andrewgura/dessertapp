var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var pg = require('pg');
var cons = require("consolidate");
var app = express();
var dust = require('dustjs-helpers');

//DB conenct string, connect to database: "mydb"
var connect = "postgres://me:password@localhost/mydb";

//Create Server
app.listen(3000, function (){
  console.log("Server hosted on port 3000");
})


//View engine using dust
app.engine('dust', cons.dust);
app.set('view engine', 'dust');
app.set('views' , __dirname + '/views');


// Set public folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Homepage and get results from table "tic" from mydb
app.get('/', function(req, res){
  pg.connect(connect, function(err, client, done) {
    if(err) {
      return console.error('error fetching cilent from pool', err);
    }
    client.query( 'SELECT * FROM tic', function(err, result) {
      if(err) {
        return console.error('error running query', err);
      }
      res.render('index', {tic: result.rows});
      done();
    });
  });
});

//Create New Entry to database mydb, table tic, redirect to homepage after adding new entry
app.post("/add", function(req,res){
  pg.connect(connect, function(err, client, done) {
    if(err) {
      return console.error('error fetching cilent from pool', err);
    }
    client.query("INSERT INTO tic(name, description, picture) VALUES($1, $2, $3)",
    [req.body.name, req.body.description, req.body.picture]);
    done();
    res.redirect("/");
  });
})

//Delete Entry from database mydb, table tic
app.delete("/delete/:id", function(req, res){
  pg.connect(connect, function(err, client, done) {
    if(err) {
      return console.error('error fetching cilent from pool', err);
    }
    client.query("DELETE FROM tic WHERE id = $1",
    [req.params.id]);
    done();
    //logs deletion
    res.send(200)
  });
})

//Edit Entry from database mydb, table tic, redirect to homepage after edit
app.post("/edit", function(req, res){
  pg.connect(connect, function(err, client, done) {
    if(err) {
      return console.error('error fetching cilent from pool', err);
    }
    client.query("UPDATE tic SET name=$1, description=$2, picture=$3 WHERE id=$4",
    [req.body.name, req.body.description, req.body.picture, req.body.id]);
    done();
    res.redirect("/");
});
})
