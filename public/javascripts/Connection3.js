
express = require('express');
var app = express();

var mysql = require('mysql');

var cors = require('cors');

const fs = require('fs')
app.set('view engine', 'ejs')

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
// node native promisify
const query = util.promisify(con.query).bind(con); // is bind needed?

// parametrien kirjoitustapa selaimessa : http://localhost:8084/api/events?start=2021-01-01&end=2021-11-29


var server = app.listen(8080, function() {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port);
});

let bodyParser = require('body-parser');
const res = require('express');


// Create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); // for reading JSON



app.get("/api/Kirja", function (req, res) {
  console.log("Get books!");
//kuvan haku- yritys
 /* const data = fs.readFileSync('C:/Users/Administrator/WebstormProjects/kirjastoprojekti/Kuvat/anytownfarmersmarket.png')

  res.render('page', {
    image: data.toString('base64')
  })*/

  var q = url.parse(req.url, true).query;
  //var params = q.start + " " + q.end;
  //var Julkaisuvuosi = q.start;
  var nimi = q.kirjannimi;
  var ID = q.ID;
  var tekija = q.kirjoittaja;
  var ajankohta = q.Julkaisuvuosi;
  var kuva = q.foto;
  var string;

  var sql = "SELECT *"
      + " FROM Kirja"
      +
      " WHERE Kirja.KirjaID=? || Kirja.KirjanTekija=? || Kirja.KirjanNimi=? || Kirja.Julkaisuvuosi=?";

  (async () => { // IIFE (Immediately Invoked Function Expression)
    try {
      // tekee JSON:sta stringin
      const rows = await query(sql, [ID, tekija, nimi, ajankohta, kuva]);
      string = JSON.stringify(rows);

      alteredResult = '{"numOfRows":' + rows.length + ',"rows":' + string + '}';
      res.send(alteredResult);

    } catch (err) {
      console.log('Database error!' + err);
    } finally {
      //conn.end();
    }
  })();

})






