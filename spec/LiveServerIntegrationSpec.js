var request = require("request");

describe("Live Node Chat Server", function() {
 it("Should respond to get requests for /log", function(done) {
   request("http://127.0.0.1:8080/1/classes/messages",
           function(error, response, body) {
             expect(body).toEqual("[]");
             done();
           });
 });

 it("Should accept posts to /messages", function(done) {
   request({method: "POST",
            uri: "http://127.0.0.1:8080/1/classes/messages",
            json: {username: "Jono",
               message: "Do my bidding!"}
            },
           function(error, response, body) {
             expect(response.statusCode).toEqual(201);
             // Now if we request the log, that message
             // we posted should be there:
             request("http://127.0.0.1:8080/1/classes/messages",
                     function(error, response, body) {
                       var messageLog = JSON.parse(body);
                       expect(messageLog.results[0].username).toEqual("Jono");
                       expect(messageLog.results[0].message).toEqual("Do my bidding!");
                       done();
                     });

           });
 });

 it("Should 404 when asked for a nonexistent file", function(done) {
   request("http://127.0.0.1:8080/arglebargle",
           function(error, response, body) {
             expect(response.statusCode).toEqual(404);
             done();
           });
 });


});