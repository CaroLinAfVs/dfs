const express = require("express")
const app = express()

const cors = require("cors")
const { getPost, addPost } = require("./post.js");
require("dotenv").config({ path: "./.env" });

app.use(express.json());
app.use(cors());

app.use(express.static("public"));
app.listen(3000, console.log("¡Servidor encendido!"));

app.get("/", (req, res) => {
   res.sendFile(__dirname + "/public/index.html");
  });

app.get("/posts", async (req, res) => {
    try {
      const post = await getPost();
      let modificado = post.map((p) => ({
        id: p.id,
        titulo: p.titulo,
        url: p.img,
        descripcion: p.description,
      }));
      res.json(modificado);
    } catch (error) {
      res.json({ message: " el post no esta disponible " });
    }
  });

  app.post("/posts", async (req, res) => {
    try {
      const { titulo, url, descripcion, likes } = req.body;
      console.log(req.body);

      await addPost(titulo, url, descripcion, likes);

      res.send("Post agregado exitosamente");
    } catch (error) {
      res.json({ message: "no esta disponible " });
    }
  });
