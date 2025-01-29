const express = require("express");
const router = express.Router();

router.get("/api/test", (req, res) => {
  res.json({ success: true, message: "Frontend and Backend are connected!" });
});

module.exports = router;
