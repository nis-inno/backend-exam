const express = require("express");
const headerRoutes = express.Router();
const controllers = require("../../controllers/header_detail");
// const isAdmin = require("../middlewares/isAdmin");

headerRoutes.get("/find/:vr_no", controllers.headerControllers.headerFind);
headerRoutes.get("/", controllers.headerControllers.headerList);
headerRoutes.put("/:vr_no", controllers.headerControllers.headerUpdate);
headerRoutes.post("/", controllers.headerControllers.headerCreate);
headerRoutes.delete("/:vr_no", controllers.headerControllers.headerDelete);


module.exports = headerRoutes;