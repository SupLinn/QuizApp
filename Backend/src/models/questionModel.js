const mongoose = require("mongoose")

const questionSchema = new mongoose.Schema({
    topic : {
        type : String,
        required : true,
        index : true
    },
    text : {
        type : String,
        required : true,
    },
    options : [{
        type : String,
        required : true
    }],
    correctAnswer : {
        type : String,
        required : true
    }
}, {timestamps : true})

const QuestionModel = new mongoose.model("Question", questionSchema)

module.exports = QuestionModel