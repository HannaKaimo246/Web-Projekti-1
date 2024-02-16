
express = require('express');
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
var util = require('util');
// node native promisify
const query = util.promisify(con.query).bind(con);


var server = app.listen(8084, function() {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port);
});

let urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.post("/api/Henkilotiedot2", urlencodedParser,function (req, res) {
  console.log("Put information!");
  var q = url.parse(req.url, true).query;
  var params = q.Nimi + " " + q.sposti + " " + q.osoite +" " + q.pnro + " " + q.Toimipaikka + q.tel;
  var nimi = q.Nimi;
  var sposti = q.sposti;
  var osoite = q.osoite;
  var postinro = q.pnro;
  var paikka = q.Toimipaikka;
  var puh = q.tel;

  var string;

  console.log("INSERTED");

    var sql = "INSERT INTO Henkilotiedot2 (Nimi, Sahkoposti, Katuosoite, Postinumero, Toimipaikka, PuhelinNumero) VALUES(Nimi, Sahkoposti, Katuosoite, Postinumero, Toimipaikka, PuhelinNumero)";

    (async () => { // IIFE (Immediately Invoked Function Expression)
      try {
        const rows = await query(sql,
            [nimi, sposti, osoite, postinro, paikka, puh]);
        string = JSON.stringify(rows);
        console.log(string);
        res.send(string);

        string = JSON.stringify(rows);
        alteredResult = '{"numOfRows":'+rows.length+',"rows":'+string+'}';
        res.send(alteredResult);
      } catch (err) {
        console.log('Database error!' + err);
      } finally {

      }

    })();

});


