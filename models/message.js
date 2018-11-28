const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var MessageSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: "Title is Required"
    },
    body: {
        type: String,
        required: "Body text is Required"
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: "Sender is Required"
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: "Receiver is Required"
    }
})

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;