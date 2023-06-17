const express = require("express");
const itemRoutes = express.Router();
const controllers = require("../../controllers/header_detail");
// const isAdmin = require("../middlewares/isAdmin");

itemRoutes.get("/find/:vr_no", controllers.itemControllers.itemFind);
itemRoutes.get("/", controllers.itemControllers.itemList);
itemRoutes.put("/:vr_no", controllers.itemControllers.itemUpdate);
itemRoutes.post("/", controllers.itemControllers.itemCreate);
itemRoutes.delete("/:vr_no", controllers.itemControllers.itemDelete);


module.exports = itemRoutes;