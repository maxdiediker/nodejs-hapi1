var hapi = require("Hapi");

var server = new hapi.Server();
var handlebars = require("handlebars");
var orders = require("./orders");
server.connection({
  port:8000
});

server.start();
//
// server.views({
//   path:"templates",
//   engines: {
//     html: require("handlebars")
//   },
//   isCached: false
// });

server.register(require('vision'), (err) => {

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: 'templates',
        isCached: false
    });
});

server.route ({
  method:"GET",
  path:"/{name?}",
  handler: function(req,reply) {
    var name = req.params.name || "Anonomouse";
    reply.view('index',{
      user:name
    });
    // reply("something");
  }
});

server.route({
  method:"POST",
  path:"/order",
  handler: function(req,reply){
    orders.add(req.payload)
    reply.view("index",{
      pizzas: orders.pizzas
    });
  }
});
