const express = require('express')
const router = express();
const Tasks = require('../models/Tasks');
const Users = require('../models/Users');
const auth = require('./auth')

//POST- Add a task
router.post('/', auth, async (req,res)=>{

    const { task, description, priority, status, type, assigned, message } = req.body
    try {
        const tasks = new Tasks({
            submitter: req.user.id,
            task: task,
            description: description,
            status: status,
            type: type,
            priority: priority,
            assigned: assigned,
            message: message,
        })

        const addedTask = await tasks.save();
        if (addedTask){
             res.json(await Tasks.findById(addedTask._id).populate('submitter').populate('assigned'))
        }

    } catch (error) {
        console.log(error)
        res.status(500).json('Server Error')
    }

});

//GET- all the submitted tasks
router.get('/submitted/:sort', auth, async (req,res)=>{
    try{
        let result;

        if(req.params.sort === 'date'){
        result = await Tasks.find({
            submitter: req.user.id
            }).sort({date: 'descending'}).populate('submitter').populate('assigned')
        }
        else if(req.params.sort === 'priority'){
            result = await Tasks.find({
                submitter: req.user.id
                }).sort({priority: 'ascending'}).populate('submitter').populate('assigned')
            }
        else{
            result = await Tasks.find({
                submitter: req.user.id
                }).populate('submitter').populate('assigned')
        }
        res.json(result)
    }
    catch(error){
        console.log(error)
        res.status(500).json('Server Error')
    }
})

//GET- all the assigned tasks
router.get('/assigned/:sort', auth, async (req,res)=>{
    try{
        let result;

        if(req.params.sort === 'date'){
        result = await Tasks.find({
            assigned: req.user.id
            }).sort({date: 'descending'}).populate('submitter').populate('assigned')
        }
        else if(req.params.sort === 'priority'){
            result = await Tasks.find({
                assigned: req.user.id
                }).sort({priority: 'ascending'}).populate('submitter').populate('assigned')
            }
        else{
            result = await Tasks.find({
                assigned: req.user.id
                }).populate('submitter').populate('assigned')
        }
        res.json(result);
    }
    catch(error){
        console.log(error)
        res.status(500).json('Server Error')
    }
})

//Update task
router.put('/:id', auth, async (req,res)=>{

    const { task, description, status, type, submitter, assigned, message } = req.body
    const updatedTask = {}
    if(task) updatedTask.task = task;
    if(submitter) updatedTask.submitter = task;
    if(description) updatedTask.description = description;
    if(status) updatedTask.status = status;
    if(type) updatedTask.type = type;
    if(assigned) updatedTask.assigned = assigned;
    if(message) updatedTask.message = message;

    try {
        let check = await Tasks.findById(req.params.id)
        if(!check){
            res.status(404).json({msg:'Task not found'})
        }else{
            const task = await Tasks.findByIdAndUpdate(req.params.id, {$set: updatedTask}, {new: true}).populate('submitter').populate('assigned');
            // const task = await Tasks.find({
            //     submitter: req.user.id
            //     }).populate('submitter').populate('assigned');
            res.json(task);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json('Server Error')
    }
})

//Update task
router.post('/msg/:id', async (req,res)=>{
    try {
        let task = await Tasks.findById(req.params.id)
        if(!task){
            res.status(404).json({msg:'Task not found'})
        }else{
            task.message = undefined;
            const addedTask = await task.save();
            if (addedTask){
            res.json(await Tasks.findById(addedTask._id).populate('submitter').populate('assigned'))
            res.status(200).end();
        }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json('Server Error')
    }
})

//delete task
router.delete('/:id', auth, async (req,res)=>{
    try {
        let check = await Tasks.findById(req.params.id)
        if(!check){
            res.status(404).json({msg:'Task not found'})
        }else{
        await Tasks.findByIdAndDelete(req.params.id)
        res.status(200).end()
        }
    } catch (error) {
        console.log(error);
        res.status(500).json('Server Error')
    }
})

module.exports = router

