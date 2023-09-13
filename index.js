const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  
  res.render("index");
});

app.get("/toask", (req, res) => {
  res.render("toask");
})

app.listen(8080, () => {
  console.log("App is running...");
});
