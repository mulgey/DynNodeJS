var profile = require("./profile");
var renderer = require("./renderer");

//Handle HTTP route GET / and POST / i.e. Home
function home (req, res) {
    //if url == "/" && GET
    if (req.url === "/")  {
      if (req.method.toLowerCase() === "get") {
        //show search
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        renderer.görüş("header", {}, res);
        renderer.görüş("search", {}, res);
        renderer.görüş("footer", {}, res);
        res.end();
      } else {
        // if url == "/" && POST

        // get the post data from the body
        req.on("data", chunk => {
          var chunkString = chunk.toString();
          // extract the username
          var sorgu = querystring.parse(chunkString);
          res.write(sorgu.username);
          res.end();
          // redirect to /:username
        })
        
      }
    }
  }
   
  //Handle HTTP route GET /:username i.e. /chalkers
  function user (req, res) {
    //if url == "/...."
    var username = req.url.replace("/", "");
    if (username.length > 0) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      renderer.görüş("header", {}, res);

      //get json from Treehouse
      var studentProfile = new profile(username);
      //on "end"
      studentProfile.on("end", function(profileJSON) {
        //show profile

        //store the values we need
        var values = {
          avatarUrl: profileJSON.gravatar_url,
          username: profileJSON.profile_name,
          badges: profileJSON.badges.length,
          javascriptPoints: profileJSON.points.JavaScript 
        }

        // simple response
        renderer.görüş("profile", values, res);
        renderer.görüş("footer", {}, res);
        res.end();
      });

      //on "error"
      studentProfile.on("error", function(error){
        //show error
        renderer.görüş("header", {errorMessage: error.message}, res);
        renderer.görüş("search", {}, res);
        renderer.görüş("footer", {}, res);
        res.end();
      });
    }
  }


  module.exports.ev = home;
  module.exports.kullanıcı = user;