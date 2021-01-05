const express = require("express");
var bodyParser = require("body-parser");
const pool = require("./sql/connection");
const mysql = require("mysql");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to VGDB");
});

app.get("/games", (req, res) => {
  pool.query("SELECT * FROM games", (err, rows) => {
    if (err) {
      console.log({ err });
      return res.status(500).send("An unexpected error occurred.");
    }
    res.json(rows);
  });
});

app.get("/games/:id", (req, res) => {
  let sql = "SELECT ?? FROM ?? WHERE ?? = ?";
  sql = mysql.format(sql, ["*", "games", "id", req.params.id]);
  pool.query(sql, (err, rows) => {
    if (err) {
      console.log({ err });
      return res.status(500).send("An unexpected error occurred.");
    }
    res.json(rows);
  });
});

app.post("/games", (req, res) => {
  let sql = "INSERT INTO ?? VALUES (?, ?, ?, ?, ?)";
  sql = mysql.format(sql, [
    "games",
    null,
    req.body.title,
    req.body.release_year,
    req.body.box_art,
    req.body.synopsis,
  ]);

  pool.query(sql, (err, results) => {
    if (err) {
      console.error({ err });
      return res.status(500).send("An unexpected error occurred");
    }
    return res.json({ id: results.insertId });
  });
});

app.put("/games/:id", (req, res) => {
  let sql = "UPDATE ?? SET ? WHERE id = ?";
  sql = mysql.format(sql, ["games", req.body, req.params.id]);
  pool.query(sql, (err, results) => {
    if (err) {
      console.error({ err });
      return res.status(500).send("An unexpected error occurred");
    }
    console.log({ results });
    return res.json({ id: results.message });
  });
});

app.delete("/games/:id", (req, res) => {
  let sql = "DELETE FROM ?? WHERE ?? = ?";
  sql = mysql.format(sql, ["games", "id", req.params.id]);
  pool.query(sql, (err, results) => {
    if (err) {
      console.error({ err });
      return res.status(500).send("An unexpected error occurred");
    }
    console.log({ results });
    return res.json({ id: results.affectedRows });
  });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
