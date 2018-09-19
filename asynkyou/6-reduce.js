//Exercise 6
/*
  Write a program that will receive a URL as the first command line
  argument.
  To this URL, for each of the values in the following array, send a GET
  request using http.get with a query parameter named number set at the
  proper value:
     ['one', 'two', 'three']
  Each time, convert the response body to Number and add it to the previous
  value. console.log the final reduced value.
 ## Hints
  Use async.reduce:
  (https://github.com/caolan/async#reduce)
 */
var http = require('http'),
    async = require('async');

var url = process.argv[2],
    number = ['one', 'two', 'three'];

async.reduce(number, 0, function(memo, item, callback) {
    http.get(url + "?number=" + item, function(res) {
        var body = '';
        res.on('data', function(block) {
            body += block;
        });
        res.on('end', function() {
           callback(null, +body + memo); 
        });
    }).on('error', callback);
}, function(err, result) {
    if (err) return console.error(err); 
    console.log(result);
});