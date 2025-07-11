const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { NOT_FOUND } = require("./utils/errors");
const usersRouter = require("./routes/users");
const clothingItemsRouter = require("./routes/clothingItems");
const auth = require("./middlewares/auth");
const errorHandler = require("./middlewares/errorHandler");
const { validateUserLogin, validateUserRegistration } = require("./middlewares/validation");

const app = express();
const { PORT = 3001 } = process.env;
app.use(requestLogger);
app.use(express.json());
app.use(cors());

app.post("/signin", validateUserLogin, require("./controllers/users").login);
app.post("/signup", validateUserRegistration, require("./controllers/users").createUser);
app.get("/items", require("./controllers/clothingItems").getItems);

app.use(auth);
app.use("/users", usersRouter);
app.use("/items", clothingItemsRouter);

app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(console.error);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
