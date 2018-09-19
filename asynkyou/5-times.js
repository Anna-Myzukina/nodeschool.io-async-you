//Exercise 5
/*In this problem, you will need to co-ordinate a few async operations.
  Use async.series for this and pass in an Object. One of the task functions
  will need to use async.times to send POST requests using http.request. The
  other will then do the GET request.
  You can read more about async.times here:
  (https://github.com/caolan/async#times)
 */

var http = require('http')
, qs = require('querystring')
, async = require('async')
, hostname = process.argv[2]
, port = process.argv[3]
, url = 'http://' +  hostname + ':' + port;

async.series({
post: function(done){
  async.times(5, function(n, next){
    _addUser(++n, function(err){
      next(err);
    });
  }, function next(err){
    if (err) return done(err);
    done(null, 'saved');
  });
},

get: function(done){
  http.get(url + '/users', function(res){
    var body = "";
    res.on('data', function(chunk){
      body += chunk.toString();
    });

    res.on('end', function(){
      done(null, body);
    });
  }).on('error', done);
}

}, function done(err, result){
if (err) return console.log(err);
console.log(result.get);
});


function _addUser(user_id, next){
var postdata = JSON.stringify({'user_id': user_id}),
opts = {
  hostname: hostname,
  port: port,
  path: '/users/create',
  method: 'POST',
  headers: {
    'Content-Length': postdata.length
  }
};

var req = http.request(opts, function(res){
  res.on('data', function(chunk){})

  res.on('end', function(){
    next();
  });
});

req.on('error', function(err){
  next(err);
});

req.write(postdata);
req.end();
}