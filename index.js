const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Question = require("./database/Question");
const Answer = require("./database/Answer");

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
  Question.findAll({ raw: true, order: [["id", "DESC"]] }).then((questions) => {
    res.render("index", {
      questions: questions,
    });
  });
});

app.get("/toask", (req, res) => {
  res.render("toask");
});

app.post("/savequestion", (req, res) => {
  var title = req.body.title;
  var description = req.body.description;
  Question.create({
    title: title,
    description: description,
  }).then(() => {
    res.redirect("/");
  });
});

app.get("/ask/:id", (req, res) => {
  var id = req.params.id;
  Question.findOne({
    where: { id: id },
  }).then((ask) => {
    if (ask != undefined) {
      Answer.findAll({
        where: { questionId: ask.id },
        order: [["id", "DESC"]],
      }).then((answers) => {
        res.render("ask", {
          ask: ask,
          answers: answers,
        });
      });
    } else {
      res.redirect("/");
    }
  });
});

app.post("/answer", (req, res) => {
  var bodyAnswer = req.body.bodyAnswer;
  var questionId = req.body.ask;
  Answer.create({
    bodyAnswer: bodyAnswer,
    questionId: questionId,
  }).then(() => {
    res.redirect("/ask/" + questionId);
  });
});

app.listen(8080, () => {
  console.log("App is running...");
});
