const express = require('express');
const UserModel = require('../models/Users');
const userRoutes = express.Router();
const docs = require('../UsersData.json');

//insert userdata.json to mongoDB database and perform validation
//http://localhost:3000/users
userRoutes.post('', async (req, res) => {
    try {
        const users = await UserModel.insertMany(docs);
        res.status(200).send({
            status: true,
            message: "User data inserted"
        })
    } catch (e) {
        res.status(400).send(
            {
                status: false,
                message: e.message
            })
    }
})

module.exports = userRoutes