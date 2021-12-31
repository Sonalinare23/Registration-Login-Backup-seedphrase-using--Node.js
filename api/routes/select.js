const express =  require('express');
const router = express.Router();
const userRegister = require('../models/user')

router.get('/test',async(req,res, next) => {
    try{
        const { seedphrase } = req.body;
        const seed = await userRegister.findOne({seedphrase})
        if(seedphrase === seed.seedphrase){
            res.send('Login success!');
        } else  {
            res.send('Invalid phrase')
        }
    } catch (error) {
        console.log(error)
    }
});

module.exports = router;