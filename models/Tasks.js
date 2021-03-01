const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    submitter:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users'
    },

    assigned:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users'
    },
    
    task:{
        type: String,
        required: true
    },

    description:{
        type: String
    },

    type:{
        type: String
    },

    status:{
        type: String
    },

    priority:{
        type: String
    },

    message:{
        type: String
    },

    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('tasks',TaskSchema)