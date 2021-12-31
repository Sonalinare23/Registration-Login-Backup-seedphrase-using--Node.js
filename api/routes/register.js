
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router()
const userRegister = require('../models/user')

// Register new user
router.post('/', async (req, res, next) => {

    //Registration logic start
    try{
        //get password and confirm password for matching
        const password = req.body.password;
        const confirmpassword = req.body.confirmpassword;
        

         //seed phrase code
       const bip39 = require('bip39')
       const mnemonic = bip39.generateMnemonic()
       console.log(mnemonic)

        //checking password and confirm password
        if(password === confirmpassword){

            // get user input
            const { first_name, last_name, email, password, confirmpassword} = req.body;

            //validate user input
            if(!(first_name && last_name && email && password && confirmpassword)){
                res.status(400).send("All input field is required!");
            }

            //check if user already exist and validate in database
            const oldUser = await userRegister.findOne({email});

            if(oldUser){
                return res.status(403).send("User alredy exist!")
            }

            // encrypt user password usin bcrypt method
            const encryptedPassword = await bcrypt.hash(password, 10);
            const mnemonic = await bip39.generateMnemonic();
            
            //create us0er in database
            const user = await userRegister.create({
                first_name,
                last_name,
                email : email.toLowerCase(), // convert email into lowercase
                password : encryptedPassword,
                seedphrase:mnemonic
                // confirmpassword : encryptedPassword+
            });
            
            let u1 = await user.save();
 

            // create jwt token
            const token = jwt.sign(
                {
                    user_id : user._id, email
                },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );
            
            //save user token
            user.token = token;
            
            //return new user 
            res.status(201).json({
                message : 'User Registered Successfully!',
                user
            });
        }
        else{
            //response for password and confirm password not match
            res.status(401).send("Password not match!")
        }
    }
    catch(err){
        res.status(400).send('Invalid inputs')
        console.log(err);
    }
    //Registration logic end
});

module.exports = router