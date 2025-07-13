const mongoose= require("mongoose");

const EmpSchema= new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    resume:{
        type: String,
        default: ""
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
},{
    timestamps:true,
    versionKey: false
})

const EmpModel= new mongoose.model("resume",EmpSchema);
module.exports= EmpModel