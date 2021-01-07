const express = require("express");
const router = express.Router();
const {
  create,
  update,
  remove,
  show,
  list,
} = require("../../controllers/games");

router.get("/games", list);

router.get("/games/:id", show);

router.post("/games", create);

router.put("/games/:id", update);

router.delete("/games/:id", remove);

module.exports = router;
