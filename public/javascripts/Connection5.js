
express = require('express');
var app = express();

var mysql = require('mysql');

var cors = require('cors');

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

var util = require('util'); // for async calls
/** node native promisify*/
const query = util.promisify(con.query).bind(con); // is bind needed?


var server = app.listen(8080, function() {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port);
});


app.get("/api/kirja", function (req, res) {
  console.log("Get books!");
  var q = url.parse(req.url, true).query;

  var Kirjannimi = q.Nimi;
  var Tekija = q.kirjoittaja;
  var julkaisuvuosi = q.Julkaisuvuosi;
  var string;



     var sql = "SELECT *"
      + " FROM Kirja"
      + " WHERE Kirja.Kirjannimi= ? || Kirja.KirjanTekija = ? || Kirja.Julkaisuvuosi=?";

      var sql2 = "DELETE"
      + " FROM Kirja"
      + " WHERE Kirja.Kirjannimi= ? || Kirja.KirjanTekija = ? || Kirja.Julkaisuvuosi=?" ;



  (async () => { // IIFE (Immediately Invoked Function Expression)
    try {
      /**Json:ista parsitaan String*/
      const rows = await query(sql, [Kirjannimi, Tekija,julkaisuvuosi]);
      string = JSON.stringify(rows);

      const rows2 = await query(sql2, [Kirjannimi, Tekija,julkaisuvuosi]);
      string = JSON.stringify(rows);


      alteredResult = '{"numOfRows":' + rows.length + ',"rows":' + string + '}';
      res.send(alteredResult);

      alteredResult2 = '{"numOfRows":' + rows2.length + ',"rows ":' + string + '}';
      res.send(alteredResult2);

    } catch (err) {
      console.log('Database error!' + err);
    } finally {
      //conn.end();
    }
  })();
});
var bodyParser = require('body-parser');
const res = require('express');


// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); // for reading JSON






