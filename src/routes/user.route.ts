import express = require('express');
import validator from "../validators/newUser.validator";
import userController from '../controllers/user.controller';
const router = express.Router();
router.post("/", validator, userController.create);
router.post("/sign-in", userController.signIn);


export default router;
