import express  = require('express');
import { validationResult ,ValidationError } from 'express-validator';
import validator from "../validators/user.validator";
import  User from '../models/User';
const router = express.Router();

const errorFormatter = ({ location, msg, param, value, nestedErrors }:ValidationError) => {
    // Build your resulting errors however you want! String, object, whatever - it works!
    return `${location}[${param}]: ${msg}`;
};
router.post("/", validator, async (req: express.Request, res: express.Response) => {
    try {
        
        const errors = validationResult(req).formatWith(errorFormatter);
        if (!errors.isEmpty()) {
            console.log("Errors Array", errors);

            return res.status(400).json({ error: errors });
        }
        const newUser = new User(req.body);
        await newUser.save();
        // logger.info("User Was Created");
        return res.status(201).json(newUser);
    } catch (err) {
        console.log("err", err);

        return res.status(400).json({ error: err });
    }

});

export default router;
