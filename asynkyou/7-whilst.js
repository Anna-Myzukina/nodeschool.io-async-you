//Exercise 7
/*
  Write a program that will receive a single command line argument to a URL.
  Using async.whilst and http.get, send GET requests to this URL until the
  response body contains the string "meerkat".
  console.log the amount of GET requests needed to retrieve the "meerkat"
  string.
 ## Hints
  String.prototype.trim() is your friend.
  You can get documentation on async.whilst() here:
  (https://github.com/caolan/async#whilst)
 */
var http = require('http'),
    async = require('async');

var url = process.argv[2];

var responseString = '',
    count = 0;

async.whilst(
    function () {
        return responseString != 'meerkat';
    },
    getRequest,
    function (err) {
        if (err) console.log(err);
        console.log(count);
    });

function getRequest(done) {
    body = '';
    count++;
    http.get(url, function (res) {
        res.on('data', function (block) {
            body += block;
        });
        res.on('end', function () {
            responseString = body;
            done(null, count);
        });
    }).on('error', done);
}