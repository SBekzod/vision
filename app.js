console.log("Web Serverni boshlash");
const db = require("./server");
const express = require("express");
const app = express();

// 1: Kirish code
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2: Session code
// 3: Views code
app.set("views", "views");
app.set("view engine", "ejs");

// 4 Routing code
app.post("/create-item", (req, res) => {
  console.log("/create-item");
  const { vision } = req.body;
  db.createNewVision(vision)
    .then((data) => res.json(data))
    .catch((err) => res.end("Something went wrong!"));
});

app.post("/edit-item", (req, res) => {
  console.log("/edit-item");
  const input = req.body;
  db.updateVisionById(input)
    .then((data) => res.json({ state: "success" }))
    .catch((err) => res.end("Something went wrong!"));
});

app.post("/delete-item", (req, res) => {
  console.log("/delete-item");
  const { visionId } = req.body;
  db.deleteVisionById(visionId)
    .then((data) => res.json({ state: "success" }))
    .catch((err) => res.end("Something went wrong!"));
});

app.post("/delete-all", (req, res) => {
  console.log("/delete-all");
  db.removalVisions()
    .then((data) => res.json({ state: "All Visions are removed!" }))
    .catch((err) => res.end("Something went wrong!"));
});

app.get("/", function (req, res) {
  console.log("/");

  db.getVisions()
    .then((data) => {
      console.log("THIS IS UPDATED USER: ", data);
      res.render("list", { items: data });
    })
    .catch((err) => res.end("something went wrong"));
});

module.exports = app;
