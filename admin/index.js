const express = require("express");
const product = require("./controller");
const router = new express.Router();


router.use("/", product.apiRouter);

module.exports = {
	router
}


