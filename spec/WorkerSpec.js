var stubs = require("../specHelpers/stubs");
var htmlFetcherHelpers = require("../workers/lib/html-fetcher-helpers");
var htmlFetcher = require("../workers/htmlfetcher");
var fs = require("fs");
var path = require("path");

var basePath = "/Users/Catalyst/code/archive.org";
var fakeSitesTextFilePath = path.join(basePath + "/data/fake_sites.txt");
var sitesDirectoryPath = path.join(basePath + "/data/sites/");

describe("html fetcher helpers", function(){

  it("should have a 'readUrls' function", function(){
    var urlArray = ["example1.com", "example2.com"];
    var resultUrls;

    var urlSource = new stubs.FileReadStream(urlArray.join("\n"));
 
    var resultArray;
    var result = htmlFetcherHelpers.readUrls(urlSource, function(urls){
      console.log("reading urls; urls is " + urls);
      resultArray = urls;
    });

    waits(200);
    runs(function(){
      // console.log("in expectation")
      expect(resultArray).toEqual(urlArray);
    });
  });
  
  it("should have a 'downloadUrls' function", function(){
    var urlArray = ["www.duckduckgo.com", "www.stackoverflow.com"];
    var resultArray = [];
    var result = htmlFetcherHelpers.downloadUrls(urlArray, function(headers){
      resultArray.push(headers);
    });
    expect(result).toBeTruthy();
    waits(1000);
    runs(function(){
      expect(resultArray.length).toEqual(urlArray.length);
    });
  });
});

describe("html fetcher", function(){

  it("should have a 'processUrlFile' function", function(){
    expect(htmlFetcher.processUrlFile).toBeDefined();
  });
    
  it("should delete the sites.txt file after the file has been read", function(){
    fs.appendFileSync(fakeSitesTextFilePath, "www.yahoo.com\n" + "www.nodejs.org\n");
    htmlFetcher.processUrlFile(fakeSitesTextFilePath);
    waits(500);
    runs(function(){
      expect(fs.existsSync(fakeSitesTextFilePath)).toBeFalsy();
    });
  });

  it("should download the websites in the urlArray", function(){
    var yahoo = "www.yahoo.com";
    var nodejs = "www.nodejs.org";
    waits(1000);
    runs(function(){
      expect(fs.existsSync(sitesDirectoryPath + yahoo)).toBeTruthy();
      expect(fs.existsSync(sitesDirectoryPath + nodejs)).toBeTruthy();
    });
  });

});