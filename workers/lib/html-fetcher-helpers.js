var fs = require("fs");
var path = require("path");
// var httpGet = require("http-get");
// var _ = require("underscore");

var basePath = "/Users/Catalyst/code/archive.org";
var _ = require(path.join(basePath + "/node_modules/underscore"));
var httpGet = require(path.join(basePath + "/node_modules/http-get"));
var sitesDirectoryPath = path.join(basePath + "/data/sites/");

var createOptions = function(url){
  var options = {
    url: url,
    stream: true
  };
  return options;
};

exports.readUrls = function(urlSource, cb){
  var urlsString = "";
  var urls;

  urlSource.on("data", function(data){
    urlsString += data;
  });
  
  urlSource.on("end", function(){
    urls = urlsString.split("\n");
    cb(urls);
  });

};

exports.downloadUrls = function(urls, cb){
  _.each(urls, function(url){
    var options = createOptions(url);
    httpGet.get(options, function(error, result){
      if (error) {
        console.log(error);
      } else {
        var website = "";
        result.stream.on("data", function(data){
          website += data;
        });
        result.stream.on("end", function(){
          fs.writeFileSync(sitesDirectoryPath + url, website);
          // console.log(result.headers);
          cb(result.headers);
        });
        result.stream.resume();
      }
    });
  });
  return true;
};




