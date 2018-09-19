//Exercise 2
/*Write a program that will receive two URLs as the first and second
  command-line arguments.

  Using http.get, create a GET request to these URLs and pass the response
  body to the callback.

  Pass in an object of task functions, using the property names requestOne
  and requestTwo, to async.series.

  console.log the results in the callback for series when all the task
  functions have completed.
 */

var async = require('async');
var url = [process.argv[2], process.argv[3]];
var http = require('http');

async.series({
    requestOne: function (done) {
        http.get(url[0], function (res) {
            res.on('data', function (chunk) {
                done(null, chunk.toString())
            });
        });

    },
    requestTwo: function (done) {
        http.get(url[1], function (res) {
            res.on('data', function (chunk) {
                done(null, chunk.toString());
            });
        });
    }
}, function (err, results) {
    console.log(results);
});