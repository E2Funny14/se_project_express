const express = require('express');
const mongoose = require('mongoose');
const mainRouter = require('./routes/index');

const app = express();
const { PORT = 3001 } = process.env;

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '682279fef26b7bd8d451c144'// paste the _id of the test user created in the previous step
  };
  next();
});
app.use("/", mainRouter);

mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db')
  .then(() => {
    console.log('Connected to DB');
  })
  .catch(console.error);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});