import { body, CustomValidator } from 'express-validator';
import User from '../models/User';


const noRepeatEmail: CustomValidator = (value) => {
    return User.findOne({ email: value }).then(user => {
        if (user) {
            return Promise.reject("User email is already exists !")
        }
    })
}

const newUserValidator = [
    body("name")
        .notEmpty()
        .withMessage("Field is Required !")
        .trim(),
    body("surname")
        .notEmpty()
        .withMessage("Field is Required !")
        .trim(),
    body("email")
        .notEmpty()
        .withMessage("Field is Required !")
        .isEmail()
        .withMessage("Must be Email !")
        .custom(noRepeatEmail)
        .trim()
        .normalizeEmail(),
    body("password")
        .notEmpty()
        .withMessage("Field is Required !"),
    body("confirm")
        .notEmpty()
        .withMessage("Field is Required !")
        .custom((value, { req }) => {
            if (req.body.password !== value)
                throw new Error("Confirm Password no equal to Password");
            return true;
        })

];


export default newUserValidator;