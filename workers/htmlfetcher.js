// #!/usr/local/bin/node

// crontab -e: */1 * * * * /usr/local/bin/node /Users/Catalyst/code/archive.org/workers/htmlfetcher.js

// eventually, you'll have some code here that uses the tested helpers 
// to actually download the urls you want to download.
var fs = require("fs");
var path = require("path");

var htmlFetcherHelpers = require("./lib/html-fetcher-helpers");

var basePath = "/Users/Catalyst/code/archive.org";
var _ = require(path.join(basePath + "/node_modules/underscore"));
var sitesTextFilePath = path.join(basePath + "/data/sites.txt");

var processUrlFile = function(path){
  fs.exists(path, function(exists){
    if (exists) {
      var urlArray;
      htmlFetcherHelpers.readUrls(fs.ReadStream(path), function(urls){
        urlArray = _.filter(urls, function(url){
          return url !== "";
        });
        fs.unlinkSync(path);
        htmlFetcherHelpers.downloadUrls(urlArray, function(headers){
          // headersArray.push(headers);
          console.log(headers["date"]);
        });
      });
    } else {
      process.exit();
    }
  });
};

processUrlFile(sitesTextFilePath);

exports.processUrlFile = processUrlFile