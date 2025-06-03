// const router = require("express").Router();

// const { NOT_FOUND } = require("../utils/errors");
// const itemRouter = require("./clothingItems");
// const { createUser, login } = require("../controllers/users");

// router.use("/items", itemRouter);

// router.post('/signup', createUser);
// router.post('/signin', login);

// router.use((req, res) => {
//   res.status(NOT_FOUND).send({ message: "Requested resource not found" });
// });

// module.exports = router;
const router = require("express").Router();
const { createUser, login } = require("../controllers/users");

router.post("/signup", createUser); // Route for user signup
router.post("/signin", login); // Route for user login

module.exports = router;
