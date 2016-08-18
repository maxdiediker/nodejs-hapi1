var hapi = require("hapi");
// var async = require("async");
var server = new hapi.Server();

server.connection({
  host: 'localhost',
  port: 8000
});

server.start(function(){
  // console.log(server.info);
  //this is a callback function to let you know the server is running...
});

var counter = 0;

server.route({
  method:"GET",
  path: "/{name?}",
  //if a name is provided or not
  handler: function(request,reply){
    console.log("this is requesst arg...........");
    var name = request.params.name || "anonymous";
    counter++;
    // console.log(request.headers);
    console.log(request.params);
    // console.log(request.state);
    reply("hleeloo " + name +", from hapi.js  " + counter);

  }
});

server.route({
  method:"GET",
  path: "/{name}/{id}",
  handler: function(req,rep){
    rep(req.params.name + " | " + req.params.id);
  }
})
