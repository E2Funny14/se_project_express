const Item = require("../models/clothingItem");
const BadRequestError = require("../errors/BadRequestError");
const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");

const getItems = (req, res, next) => {
  Item.find({})
    .then((items) => res.send(items))
    .catch(next);
};

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user?._id;
  Item.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};
const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  Item.findById(itemId)
    .orFail(() => {
      throw new NotFoundError("Item not found");
    })
    .then((item) => {
      if (item.owner.toString() !== userId) {
        throw new ForbiddenError("You are not authorized to delete this item");
      }
      return Item.findByIdAndDelete(itemId);
    })
    .then(() => res.status(200).send({ message: "Item deleted successfully" }))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("The id string is in an invalid format"));
      } else {
        next(err);
      }
    });
};

const likeItem = (req, res, next) => {
  Item.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("Item not found");
    })
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("The id string is in an invalid format"));
      } else {
        next(err);
      }
    });
};

const dislikeItem = (req, res, next) => {
  Item.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("Item not found");
    })
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("The id string is in an invalid format"));
      } else {
        next(err);
      }
    });
};

module.exports = { getItems, createItem, deleteItem, likeItem, dislikeItem };
