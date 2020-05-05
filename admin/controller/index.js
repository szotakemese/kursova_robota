const express = require("express");
const controller = require("./product_controller");
const productApiRouter = new express.Router();

productApiRouter.post("/", controller.PoductController.post);
productApiRouter.get("/", controller.PoductController.get);
productApiRouter.get("/:id", controller.PoductController.getId);
productApiRouter.delete("/:id", controller.PoductController.deleteId);


module.exports = {
	apiRouter:productApiRouter
}
