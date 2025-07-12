const router = require("express").Router();
const {
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const { validateItemCreation, validateObjectId } = require("../middlewares/validation");

router.post("/", validateItemCreation, createItem);
router.delete("/:itemId", validateObjectId, deleteItem);
router.put("/:itemId/likes", validateObjectId, likeItem);
router.delete("/:itemId/likes", validateObjectId, dislikeItem);

module.exports = router;
