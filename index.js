const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/:name?/:lang?", (req, res) => {
  var name = req.params.name;
  var lang = req.params.lang;
  var displayMsg = true;

  var products = [
    { name: "Doritos", price: 3.14 },
    { name: "Coca-Cola", price: 5 },
    { name: "Milk", price: 1.45 },
    { name: "Meat", price: 15 },
    { name: "Redbull", price: 6 },
    { name: "Nescau", price: 4 },
  ];

  res.render("index", {
    name: name,
    lang: lang,
    company: "Oracle",
    subscribers: 8000,
    msg: displayMsg,
    products: products,
  });
});

app.listen(8080, () => {
  console.log("App is running...");
});
