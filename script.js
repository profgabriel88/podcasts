const { response } = require("express");
const request = require("request");

var id = "3cb6e1094cb24b669744c040e4b62397";
var secret = "9e5253ed17bf4e81af1b46ec432d88c9";

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

var token = '';

// obtem os episódios de um dado podcast com base em sua id
// a função retorna um Promise para que possamos chamar a função no modelo
// funcao().then(()=>{})
exports.getSpotifyEp = function (url) {
  return new Promise((resolve, reject) => {
    
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

    })
  })
};

// obtem uma lista de 10 de podcasts com base na variável urlBusca
// a função retorna um Promise para que possamos chamar a função no modelo
// funcao().then(()=>{})
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

// toca o episódio em questão
// a função retorna um Promise para que possamos chamar a função no modelo
// funcao().then(()=>{})
exports.tocar = function (url) {
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
};
