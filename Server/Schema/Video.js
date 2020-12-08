const mongoose = require('mongoose');
const VideoSchema = new mongoose.Schema({
    filePath:{
        type:Buffer,
        required:true,
    },
    fileName:{
        type:String,
        required:true
    },
    Title:{
        type:String,
        required:true
    },
    Des:{
        type:String,
        required:true
    },
    ThumbnailID:{
        type:String,
        required:true
    }

});
const VideoModel = mongoose.model('Video', VideoSchema);
module.exports = VideoModel;