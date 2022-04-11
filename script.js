const { response } = require("express");
const request = require("request");

var id = "1389d439e6f54e2eb3a73dcff9eb872d";
var secret = "fee5bea2ac824983a83a17a4416e61dc";

var urlEpisodio =
  "https://api.spotify.com/v1/episodes/0ZlIlSkv3AYTEp0Sstwp73?market=BR";
var urlShow =
  "https://api.spotify.com/v1/shows/6NNGJVOhT8q250DElM2PIV?market=BR";
var urlBusca =
  "https://api.spotify.com/v1/search?q=podcasts&type=show&market=BR&limit=10";

var authOptions = {
  url: "https://accounts.spotify.com/api/token",
  headers: {
    Authorization: "Basic " + new Buffer(id + ":" + secret).toString("base64"),
  },
  form: {
    grant_type: "client_credentials",
  },
  json: true,
};

var token = "";
exports.getSpotifyEp = function (url) {
  return new Promise((resolve, reject) => {
    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        token = body.access_token;
        console.log(token);
        var artista = {
          url:
            "https://api.spotify.com/v1/shows/" + url + "/episodes?market=BR",
          headers: {
            Authorization: "Bearer " + token,
          },
          json: true,
        };

        request.get(artista, function (error, response, body) {
          if (error) {
            return reject(error);
          }
          //   console.log(body);
          resolve(body);
          //   body.items.forEach((element) => {
          //       console.log(element);

          //     }

          //   );
        });
      }
    });
  });
};

exports.getSpotifyShow = function () {
  return new Promise((resolve, reject) => {
    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        token = body.access_token;
        console.log(token);
        var artista = {
          url: urlBusca,
          headers: {
            Authorization: "Bearer " + token,
          },
          json: true,
        };

        request.get(artista, function (error, response, body) {
          if (error) return reject(error);
          else resolve(body.shows.items);
          body.shows.items.forEach((element) => {
            if (!element.explicit) {
              //   console.log(element.name);
              //   console.log(element.uri);
              //   console.log(element);
            }
          });
        });
      }
    });
  });
};

exports.tocar = function (url) {
  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      token = body.access_token;
      console.log(token);
      var artista = {
        url: urlBusca,
        headers: {
          Authorization: "Bearer " + token,
        },
        json: true,
      };

      var tocar = {
        headers: {
          Authorization: "Bearer " + token,
        },
        json: true,
        url: "https://api.spotify.com/v1/me/player/play/",
        context_uri: url,
      };
      request.put(tocar, (error, response, body) => {
        if (!error) console.log(body);
        else console.log(error);
      });
    }
  });
};
