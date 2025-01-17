const express = require("express");
const router = express.Router();
const Messages = require("../controllers/messagesController");

router.get("/getmessages", Messages.getmessages);
router.post("/sendmessages", Messages.sendmessages);
router.delete("/delete/:id", Messages.deletemessage);
router.put("/update/:id", Messages.updatedata);

module.exports = router;
