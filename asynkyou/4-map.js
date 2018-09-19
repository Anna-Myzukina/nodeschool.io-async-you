//Exercise 4
/*Write a program that will receive two command-line arguments to two URLs.
  Using http.get create two GET requests to these URLs.
  You will need to use async.map, then console.log the results array.
 */
var async = require('async'),
  http = require('http');

var urls = process.argv.slice(2, 4);

async.map(urls, function(url, done) {
   http.get(url, function(res) {
     var body = '';
     res.on('data', function(chunk) {
       body += chunk;
     });

     res.on('end', function() {
       return done(null, body);
     });
   });
},
function(err, results) {
  if (err) {
    return console.log(err);
  }
  console.log(results);
});