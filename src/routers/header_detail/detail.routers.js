const express = require("express");
const detailRoutes = express.Router();
const controllers = require("../../controllers/header_detail");
// const isAdmin = require("../middlewares/isAdmin");

detailRoutes.get("/find/:vr_no", controllers.detailControllers.detailFind);
detailRoutes.get("/", controllers.detailControllers.detailList);
detailRoutes.put("/:vr_no", controllers.detailControllers.detailUpdate);
detailRoutes.post("/", controllers.detailControllers.detailCreate);
detailRoutes.delete("/:vr_no", controllers.detailControllers.detailDelete);


module.exports = detailRoutes;