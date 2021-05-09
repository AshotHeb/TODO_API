#!/usr/bin/env node
'use strict';
process.env.NODE_ENV = "dev";
import express = require('express');
import config  from "./config/index";
import * as mongoose from 'mongoose';
import cors = require('cors');
import userRoutes from './src/routes/user.route';



//Configs
//Imports
const PORT = config.server.PORT || 3001;
const MONGO_URL = config.mongo.MONGO_URL;
const app = express();

//Connections
app.use(cors());
app.use(
    express.urlencoded({
        extended: true
    })
)

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
app.use(express.json());
mongoose.connect(MONGO_URL, {useUnifiedTopology: true});
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at ${config.server.BASE_URL}`);
});


//Routes
app.use('/user', userRoutes);



