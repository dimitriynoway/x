const express = require("express");
const tokenRouter = express.Router();
const tokenController = require('../controllers/tokenController')
tokenRouter.get("/valid", tokenController.valid)
 
module.exports = tokenRouter;