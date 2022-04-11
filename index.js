const express = require("express");
const bp = require("body-parser");
const spotify = require("./script.js");
const app = express();

app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  spotify.getSpotifyShow().then(podcasts => {
    res.render("index.ejs", {
      podcasts: podcasts,
    });
    }
  );
  //   console.log(podcasts);
});

app.listen(3000, (erro) => {
  if (erro) console.log(erro);
  else console.log("Servidor Rodando");
});
