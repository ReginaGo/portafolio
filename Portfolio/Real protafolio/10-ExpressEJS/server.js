const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.engine("html", require("ejs").renderFile);
app.set("view engine", "ejs");

const longContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam...";

let posts = [];
let name;

app.get("/", (req, res) => {
  res.render("index", {errorMessage: null}); // Carga el archivo index.ejs desde la carpeta views
});

app.get("/login", (req, res) => {
  name = req.query.name;
  if(!name){
    return res.render("index", { error: "Please enter your name." });
  }
  res.render("test", { name, security: "insecure GET" });
});

app.post("/login", (req, res) => {
  name = req.body.name;
  if(!name){
    return res.render("index", { error: "Please enter your name." });
  
  }

  res.render("test", { name, security: "secure POST" });
});

app.get("/home", (req, res) => {
  if (!name) {

    return res.redirect("/");
  }
  res.render("home", { name, posts });
});

app.post("/add-post", (req, res) => {
  const newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content,
  };
  posts.push(newPost);
  res.redirect("/home");
});
app.get("/post/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) {
    return res.redirect("/home");
  }
  res.render("post", { post });
});

app.use((err, req, res, next) => {
    res.status(500).render('index',{ errorMessage: "Error: LOG IN FIRST "});
});


app.listen(3000, (err) => {
  console.log("PP TEAM RAFA FOREVER Listening on port 3000");
});
