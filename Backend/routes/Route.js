import express from "express";
import AuthController from "../Controllers/AuthConttroller.js";
import FeedController from "../Controllers/FeedController.js";
import multer from "multer";
import asyncHandler from "express-async-handler";
const router = express.Router();
const upload = multer({
  dest: "uploads/", 
});
router.post("/login",upload.any(),asyncHandler(AuthController.Login) );
router.post("/signup",upload.any(),asyncHandler(AuthController.signup) );
router.post("/insertFeed",upload.any(),asyncHandler(FeedController.insertFeed) );
router.get("/getFeed",asyncHandler(FeedController.getFeeds) );

export default router;