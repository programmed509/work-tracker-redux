const express = require('express');
const router = express();
const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('./auth');
const Tasks = require('../models/Tasks');

router.post('/register', async (req,res)=>{
    
    const { name, username, pin } = req.body;

    try {
        let user = await Users.findOne({username})
        if(user){
            res.status(400).json({msg:'User already exists'});
        }else{

        user = new Users({
            name: name,
            username: username,
            pin: pin
        })

        user.pin = await bcrypt.hash(pin,4);
        res.json(await user.save());
    }
    } catch (error) {
        console.log(error)
        res.status(500).json('Server error')
    }
})

router.get('/all', async (req,res)=>{
    try {
        
        const result = await Users.find()
        res.json(result)

    } catch (error) {
        
        console.log(error)
        res.status(500).json('Server error')
    
    }  
})

router.get('/auth',auth, async(req,res)=>{
    try {
        
        const result = await Users.findById(req.user.id)
        res.json(result)

    } catch (error) {
        
        console.log(error)
        res.status(500).json('Server error')
    
    }
})

router.delete('/:id',auth, async(req,res)=>{
    try {
        const task = await Tasks.deleteMany({$or : [{ assigned: req.params.id}, {submitter: req.params.id }] });
        if(task){
        const result = await Users.findByIdAndDelete(req.params.id)
        res.json(result)
        }
    } catch (error) {
        
        console.log(error)
        res.status(500).json('Server error')
    
    }
})

router.put('/', auth, async(req,res)=>{
    
    const { oldPin, newPin } = req.body
    try {
        const user = await Users.findById(req.user.id);

        if(user) {
            
            const result = await bcrypt.compare(oldPin, user.pin);
            
            if(!result){
                
                res.json({msg:'current PIN is incorrect'})
            }
            else{

                res.json({msg: "PIN changed"})
                user.pin = await bcrypt.hash(newPin,4)
                await user.save();
            }
        }
        else{

            res.status(400).json({msg:'Invalid Credentials'})
        }
    }
    catch (error) {
        
        console.log(error)
        res.status(500).json('Server error')
    
    }
})


router.post('/login/', async (req,res)=>{
    
    const { username, pin } = req.body;

    try {
        let user = await Users.findOne({username});

        if(!user){
            res.status(400).json({msg:'Invalid Credentials'})
        }
        
        const result = await bcrypt.compare(pin, user.pin);

        if(!result){
            res.status(400).json({msg:'Invalid Credentials'})
        }

        const payload = {

            user : {
                id: user.id,
            }

        };

        jwt.sign(payload, 'secret', { expiresIn: 3600}, (error,token)=>{ if (error) throw error; res.json(token)})

    } catch (error) {
        console.log(error.message)
        res.status(500).json('Server error')
    }
})

router.put('/reset', auth, async(req,res)=>{
    
    const { username, pin } = req.body
    try {
        const admin = await Users.findById(req.user.id);

        if(admin.username === 'pmishra') {
            const user = await Users.findOne({username})
            
            if(user){ 
                user.pin = await bcrypt.hash(pin,4)
                await user.save().then(res.status(200).json({msg: 'Password has been reset'}));
            }
            else{
                res.status(400).json({msg: 'User not found'});
            }
        }
        else {
            res.status(400).json({msg: 'Not Authorized!!'})
        }
    }
    catch (error) {
        
        console.log(error)
        res.status(500).json('Server error')
    
    }
})

module.exports = router;
