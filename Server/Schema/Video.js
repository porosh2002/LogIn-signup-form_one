const mongoose = require('mongoose');
const VideoSchema = new mongoose.Schema({
    filePath:{
        type:String,
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
    },
    UploaderName: {
        type:String,
        required:true
    },
    UploadDetails:{
        type:String,
        required:true
    },
    Views:{
        type:String,
        required:true
    },
    Likes:{
        type:String,
        required:true
    },
    UnLike:{
        type:String,
        required:true
    }

});
const VideoModel = mongoose.model('Video', VideoSchema);
module.exports = VideoModel;