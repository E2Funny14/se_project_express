const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");
const auth = require("./middlewares/auth");
const cors = require("cors");

const app = express();
const { PORT = 3001 } = process.env;

app.use(express.json());
app.use(cors());

app.post("/signin", require("./controllers/users").login);
app.post("/signup", require("./controllers/users").createUser);
app.get("/items", require("./controllers/clothingItems").getItems);

app.use(auth);
app.use("/", mainRouter);

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
