console.log("Web Serverni boshlash");
const con = require("./server");
const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");

// 1: Kirish code
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2: Session code
// 3: Views code
app.set("views", "views");
app.set("view engine", "ejs");

// 4 Routing code
app.post("/create-item", async (req, res) => {
  try {
    console.log("/create-item");
    const { vision } = req.body;
    const visionId = uuidv4();

    const sql =
      "INSERT INTO visions SET visionId = ?, visionName = ?, createdAt = NOW()";
    const [result] = await con.execute(sql, [visionId, vision]);
    if (result.affectedRows !== 1) throw new Error("Create is Failed");

    const [rows] = await con.execute(
      `SELECT * FROM visions WHERE visionId = '${visionId}'`
    );
    console.log("rows:", rows);

    res.json(rows[0]);
  } catch (err) {
    console.log("Error, /create-item:", err);
    res.end("something went wrong");
  }
});

app.post("/edit-item", async (req, res) => {
  try {
    console.log("/edit-item");
    const input = req.body;
    const sql = "UPDATE visions SET visionName = ? WHERE visionId = ?";
    const result = await con.execute(sql, [input.visionName, input.visionId]);

    console.log("result:", result[0]);

    res.json({ state: "success" });
  } catch (err) {
    console.log("Error, /edit-item:", err);
    res.end("something went wrong");
  }
});

app.post("/delete-item", async (req, res) => {
  try {
    console.log("/delete-item");
    const { visionId } = req.body;
    const [result] = await con.execute(
      "DELETE FROM visions WHERE visionId = ?",
      [visionId]
    );
    console.log("result:", result);

    res.json({ state: "success" });
  } catch (err) {
    console.log("Error, /delete-item:", err);
    res.end("something went wrong");
  }
});

app.post("/delete-all", async (req, res) => {
  try {
    console.log("/delete-all");
    const [result] = await con.execute("DELETE FROM visions WHERE 1 = 1");
    console.log("result:", result);

    res.json({ state: "All Visions are removed!" });
  } catch (err) {
    console.log("Error, /delete-all:", err);
    res.end("something went wrong");
  }
});

app.get("/", async (req, res) => {
  try {
    console.log("/");
    const [result] = await con.execute("SELECT * FROM visions WHERE 1 = 1");
    console.log("result:", result);

    res.render("list", { items: result });
  } catch (err) {
    console.log("Error, /:", err);
    res.end("something went wrong");
  }
});

module.exports = app;
