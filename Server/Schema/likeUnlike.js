const mongoose = require('mongoose');
const ActivitySchema = new mongoose.Schema({
    Liked:{
        type:Boolean,
        required:true
    },
    UnLiked:{
        type:Boolean,
        required:true
    },
    userID: {
        type: String,
        required:true
    },
    ContentID: {
        type: String,
        required:true
    }
});
const ActivityModel = mongoose.model('Activity',ActivitySchema);
module.exports = ActivityModel;