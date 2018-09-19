//Exercise 3
/*Create a program that will receive two URLs as the first and second
  command-line arguments.

  Then using http.get, create two GET requests, one to each URL, and
  console.log any errors.
 */
var async = require('async'),
    http = require('http');


var urls = process.argv.slice(1, 3);

async.each(urls, function (item, done) {
        http.get(item).on('error', function (e) {
            done(e);
        });
    },
    function (err) {
        if (err) console.log(err);
    });