const express = require("express");
const bp = require("body-parser");
const spotify = require("./script.js");
const app = express();

app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

app.set("view engine", "ejs");
app.use(express.static('public'));

app.get("/", (req, res) => {
  var modo = 'explorar';
  spotify.getSpotifyShow().then((podcasts) => {
    res.render("index.ejs", {
      podcasts: podcasts,
      modo: modo
    });
    // console.log(podcasts.episodes);
  });
});

app.get("/episodios/:id", (req, res) => {
    console.log(req.params.id);
  var modo = 'episodios';
  spotify.getSpotifyEp(req.params.id).then((episodios) => {
    res.render("index.ejs", {
      episodios: episodios,
      modo: modo
    });
  });
});

app.get('/tocar/:url', (req, res) => {
    console.log(req.params.url);
    spotify.tocar(req.params.url);
})

app.listen(3000, (erro) => {
  if (erro) console.log(erro);
  else console.log("Servidor Rodando");
});


