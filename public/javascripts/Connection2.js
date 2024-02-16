
var express = require('express');
var app = express();
var mysql = require('mysql');
var cors = require('cors');
var bodyParser = require('body-parser');

var con = mysql.createConnection({
  host: "10.114.32.23",
  user: "HannKaimo",
  password: "1234",
  database: "KirjastoTietokanta"
});

var url = require('url');

app.use(cors());

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MySQL!");
});


app.use(express.static('local'));
app.use(express.json({limit: '1mb'}));

class Datastore {
  constructor(db) {

  }

}

const database = new Datastore('KirjastoTietokanta');
database.loadDatabase = function() {
  
};
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // for reading JSON


app.get('/api/Kirjautuminen',(request,response) => {
  console.log("Get events from a certain period");
  var q = url.parse(req.url, true).query;
  var params = q.start;
  var startDate = q.start;

  var string;
  // res.send("Getting events: "+params);
});

  app.post('/api/Kirjautuminen', urlencodedParser,(request, response) => {
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insertData(data);
    response.json(data);
  });

    var server = app.listen(8080, function() {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port);
  });

