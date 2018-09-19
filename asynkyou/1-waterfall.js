//Exercise 1
/*write a program that first reads the
  contents of a file.

  The path will be provided as the first command-line argument to your
  program (i.e. process.argv[2]).

  The file will contain a single URL. Using http.get, create a GET
  request to this URL and console.log the response body.
 */
var fs    = require("fs");
var fp    = process.argv[2];
var http  = require('http');
var async = require('async');
async.waterfall([function(cb)
{
	fs.readFile(fp,function(err,data)
	{
		if(err) return console.log(error);
		cb(null,data.toString());
	});
},function(data)
{
	http.get(data,function(res)
		{
			var body = "";
			res.on('data',function(chunk)
				{
					body +=chunk.toString();
				});
			res.on('end',function()
				{
					console.log(body);
				});
		});
}]);
