const express = require("express");
const router = express.Router();
const { wodController } = require("../controllers");

router.get('/', wodController.getAllWods)
router.post("/create", wodController.createWod);
router.put("/:id", wodController.updateWod);

module.exports = router;
