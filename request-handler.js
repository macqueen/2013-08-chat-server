/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 * node module documentation at http://nodejs.org/api/modules.html. */

/* This is the callback function that will be called each time a
 * client (i.e.. a web browser) makes a request to our server. */
//var results = require("./basic-server.js");
var messages = {results: []};
var handleRequest = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  var statusCode = 200;
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/plain";
  //response.writeHead(statusCode, headers);
  var urlRegex = RegExp('\/1\/classes\/.+');
  if(urlRegex.test(request.url)) {
    if (request.method === "OPTIONS") {
      response.writeHead(statusCode, headers);
      response.end();
    }
    else if (request.method === 'POST') {
      var body = '';
      request.on('data', function(data) {
        body += data;
      });
      request.on('end', function() {
        var text = JSON.parse(body);
        messages.results.push(text);
        statusCode = 201;
        response.writeHead(statusCode, headers);
        response.end();
      });
    } else if (request.method === 'GET') {
      statusCode = 200;
      response.writeHead(statusCode, headers);
      if (!messages.results.length) {
        response.end('[]');
      } else {
      console.log(messages.results);
      response.end(JSON.stringify(messages));
      //response.end();
      }
    }
  } else {
    statusCode = 404;
    response.writeHead(statusCode, headers);
    response.end();
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

// module.exports = handleRequest;
exports.handleRequest = handleRequest;
