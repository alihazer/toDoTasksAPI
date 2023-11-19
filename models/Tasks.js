import mongoose from "mongoose";


const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name']
    },
    description:{
        type: String,
        required: [true, 'Please provide a description']
    },
    completed: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    
    
},
{   
    toJSON: {virtuals: true},
    timestamps: true

});

const Task = mongoose.model('Task', TaskSchema);
export default Task;