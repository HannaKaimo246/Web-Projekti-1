
const express = require('express');
var bodyParser = require('body-parser');


var app = express();
var mysql = require('mysql');

const cors = require('cors');
/**muodostetaan yhteys tietokantaan*/
var con = mysql.createConnection({
  host: "10.114.32.23",
  user: "HannKaimo",
  password: "1234",
  database: "KirjastoTietokanta"
});

app.use(cors());

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MySQL!");
});

var util = require('util'); /** for async calls*/
/** node native promisify*/
const query = util.promisify(con.query).bind(con);


var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // luetaan JSON

/**lähetetään tiedot*/
app.post("/api/Kirja", urlencodedParser, function (req, res) {

  let string;
//saa JSON- objectin HTML- bodysta
  console.log("body: %j", req.body);
  let jsonObj = req.body;



  /** tekee päivitykset tietokantaan*/
  let responseString = JSON.stringify(jsonObj)

  var sql = "INSERT INTO Kirja (KirjanTekija, KirjanNimi, Julkaisuvuosi)" +
      "VALUES (?,?,?)";

  (async () => {
    try {

      const rows = await query(sql, [jsonObj.KirjanTekija, jsonObj.KirjanNimi, jsonObj.julkaisuvuosi]);
      string = JSON.stringify(rows);
      res.send("POST succesful: " + responseString);
      console.log("Inserted!")

    } catch (err) {
      console.log('Database error!' + err);
    } finally {
      //conn.end();
    }
  })();
});

var server = app.listen(8080, function() {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port);


});














