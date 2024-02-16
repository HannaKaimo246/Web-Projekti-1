var express = require('express');
var app = express();

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "10.114.32.23",
  user: "HannKaimo",
  password: "1234",
  database: "KirjastoTietokanta"
});
//var url = require('url');

//var util = require('util');

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM Kirja WHERE Teema='Liikunta' OR Teema='Lastenkirjat' ", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});

var util = require('util'); // for async calls
// node native promisify
const query = util.promisify(con.query).bind(con); // is bind needed?


var server = app.listen(9000, function() {
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port);
});
