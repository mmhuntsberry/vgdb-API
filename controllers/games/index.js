const express = require("express");
const pool = require("../../sql/connection");
const mysql = require("mysql");

const list = (req, res) => {
  pool.query("SELECT * FROM games", (err, rows) => {
    if (err) {
      console.log({ err });
      return res.status(500).send("An unexpected error occurred.");
    }
    res.json(rows);
  });
};

const show = (req, res) => {
  let sql = "SELECT ?? FROM ?? WHERE ?? = ?";
  sql = mysql.format(sql, ["*", "games", "id", req.params.id]);
  pool.query(sql, (err, rows) => {
    if (err) {
      console.log({ err });
      return res.status(500).send("An unexpected error occurred.");
    }
    res.json(rows);
  });
};

const create = (req, res) => {
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
};

const update = (req, res) => {
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
};

const remove = (req, res) => {
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
};

module.exports = { show, list, create, update, remove };
