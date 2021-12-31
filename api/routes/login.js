const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/user')

require('dotenv').config();



router.post('/', async(req, res, next) => {
    try{
        const { email, password} = req.body;

        console.log(email, password)
        //validate user input
        if(!(email && password)) {
            res.status(400).send('All input field is required!');
        }
        else{     
                //validate if user exist in database
                const user = await  Users.findOne({ email});
                
    
                if (user && (await bcrypt.compare(password, user.password))) {
                    const seed = user.seedphrase;
                    let mySeed = seed.split(" ")
                    const phrase = mySeed.sort( () => Math.random() -0.5);
                    
                    // let seedPhrase = phrase.toString();
                    //loging success message
                    res.status(200).send({
                        message : ` Please enter your secret recovery phrase in seedphrase`,
                        mySeed,
                    });
                }
                
                else
                {
                    res.status(400).send("Invalid Credentials")
                }
                
                // else
                // {
                //     res.status(400).send("Error! \nYour Email-ID is not exist! Please register!")
                // }
            }

    } 
    catch(err){
        console.log(err)
    }
})

module.exports = router



















































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































