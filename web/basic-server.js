var http = require("http");
var myStuff = require("./request-handler");

var port = 8080;
var ip = "0.0.0.0";
var server = http.createServer(myStuff.handleRequest);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

