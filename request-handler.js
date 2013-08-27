/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 * node module documentation at http://nodejs.org/api/modules.html. */

/* This is the callback function that will be called each time a
 * client (i.e.. a web browser) makes a request to our server. */
//var results = require("./basic-server.js");
var results = [];
var handleRequest = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  var statusCode = 200;
  //console.log(request.data);
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/plain";
  response.writeHead(statusCode, headers);
  // if request.method is POST --> save to results
  // if request.method is GET --> return results
  if(request.url === "/1/classes/messages") {
    if (request.method === "OPTIONS") {
      response.end();
    }
    else if (request.method === 'POST') {
      var body = '';
      request.on('data', function(data) {
        body += data;
      });
      request.on('end', function() {
        var text = JSON.parse(body);
        results.push(text);
        response.end();
      });
    } else if (request.method === 'GET') {
      if (!results.length) {
        response.end();
      } else {
      response.end(results[0]);
      //response.end();
      }
    }
  } else {
    response.end('you didnt do anything');
  }

};

/* These headers will allow Cross-Origin Resource Sharing.
 * This CRUCIAL code allows this server to talk to websites that
 * are on different domains. (Your chat client is running from a url
 * like file://your/chat/client/index.html, which is considered a
 * different domain.) */

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

module.exports = handleRequest;
