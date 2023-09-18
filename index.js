const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const conncetion = require("./database/database");
const connection = require("./database/database");
const questionModel = require("./database/Question");

connection
  .authenticate()
  .then(() => {
    console.log("Database connection done!.");
  })
  .catch((msgError) => {
    console.log(msgError);
  });

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/toask", (req, res) => {
  res.render("toask");
});

app.post("/savequestion", (req, res) => {
  var title = req.body.title;
  var description = req.body.description;
  res.send(
    "Form received! Title: " + title + " " + "Description: " + description
  );
});

app.listen(8080, () => {
  console.log("App is running...");
});
