
var express = require('express');
var app = express();

var mysql = require('mysql');

var cors = require('cors');

var con = mysql.createConnection({
  host: "10.114.32.23",
  user: "HannKaimo",
  password: "1234",
  database: "example_db"
});

var url = require('url');

app.use(cors());

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MySQL!");
});

var util = require('util'); // for async calls
// node native promisify
const query = util.promisify(con.query).bind(con); // is bind needed?

// parametrien kirjoitustapa selaimessa : http://localhost:8089/api/events?start=2021-01-01&end=2021-11-29

app.get("/api/events", function (req, res) {
  console.log("Get events from a certain period");
  var q = url.parse(req.url, true).query;
  var params = q.start + " " + q.end;
  var startDate = q.start;
  var endDate = q.end;
  var string;
  // res.send("Getting events: "+params);

  var sql = "SELECT *"
      + " FROM Event_date, Event"
      + " WHERE Event_date.Event_id = Event.Event_id"
      + " AND Event_date.Date >= ? and Event_date.Date <= ?";


  (async () => { // IIFE (Immediately Invoked Function Expression)
    try {
      const rows = await query(sql,[startDate, endDate]);
      string = JSON.stringify(rows);

       alteredResult = '{"numOfRows":'+rows.length+',"rows":'+string+'}';
      res.send(alteredResult);

    }
    catch (err) {
      console.log("Database error!"+ err);
    }
    finally {
      //conn.end();
    }
  })()
});

var bodyParser = require('body-parser');
const res = require('express');
const req = require('express'); // Create application/x-www-form-urlencoded parser (for POST)


var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // for reading JSON

var server = app.listen(8080, function() {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port);
});









