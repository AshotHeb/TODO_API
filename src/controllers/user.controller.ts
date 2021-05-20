import express = require('express');
import User from '../models/User';
import { validationResult } from 'express-validator';
import errorFormatter from '../utils/error.formatter';
import * as bcrypt from 'bcrypt';
import authConfig from '../../config/auth.config';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import Token from '../models/Token';


class UserController {
    create = async (
        req: express.Request,
        res: express.Response,
        next: express.next
    ) => {
        try {
            const errors = validationResult(req).formatWith(errorFormatter);
            if (!errors.isEmpty()) {
                return res.status(400).json({ error: errors });
            }
            delete req.body.confirm;
            req.body.password = await this.hashPassword(req.body.password);
            const newUser = new User(req.body);
            await newUser.save();
            return res.status(201).json(newUser);
        } catch (err) {
            console.log("err", err);
            return res.status(400).json({ error: err });
        }
    }
    signIn = async (
        req: express.Request,
        res: express.Response,
        next: express.next
    ) => {
        try {
            const { email, password } = req.body;
            const candidate = await User.findOne({ email });
            if (!candidate) throw new Error("User not Found ,Email or Psssword wrong!");
            const isPasswordTrue = await bcrypt.compare(password + authConfig.PASS_PREFIX, candidate.password);
            res.json({ isAuth: isPasswordTrue });
            const { jwt, refreshToken } = await this.generateJWT(candidate._id);
            const token = new Token({
                jwt,
                refreshToken,
                owner: candidate._id
            });
            await token.save();
            res.json({
                token
            });

        } catch (error) {
            console.log("🚀 ~ error", error)

            res.json(error)
        }
    }

    hashPassword = (pass: string) => bcrypt.hash(pass + authConfig.PASS_PREFIX, +authConfig.SOLT_ROUND);

    generateJWT = (payload: string) => {
        return new Promise((res, rej) => {
            res(
                jwt.sign(
                    { payload, timestamp: Date.now() },
                    "Sscret Code",
                    { expiresIn: 60 * 60 }
                )
            )
        })
            .then(async jwt => {
                const refreshToken = await this.generateToken();
                return { jwt, refreshToken };
            })
    }
    generateToken = (length = 12) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(length, (err, buffer) => {
                if (err) return reject(err);
                return resolve(buffer.toString('hex'));
            });
        });
    }


}
const token = new UserController().generateJWT("id");

export default new UserController();