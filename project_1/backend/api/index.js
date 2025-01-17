const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3001;
app.use(bodyParser.json());
app.use(cors());

const messages = require("../routes/messagesRoute");
app.use("/api", messages);

mongoose
  .connect(
    "mongodb+srv://user1211:aroobazaman@cluster0.zfmckuh.mongodb.net/message?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
