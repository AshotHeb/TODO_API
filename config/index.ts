import * as dotenv from "dotenv";
dotenv.config();
dotenv.config({ path: './config/env/' + process.env.NODE_ENV + '.env' });
import server from './server.config';
import mongo from "./mongo.config";
import auth from './auth.config';

export default {
    server,
    mongo,
    auth
}
