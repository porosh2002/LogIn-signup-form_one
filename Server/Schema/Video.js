const mongoose = require('mongoose');
const VideoSchema = new mongoose.Schema({
    Video:{
        type:Buffer,
        required:true,
    },
    VideoID:{
        type:String,
        required:true
    }
});
const VideoModel = mongoose.model('Video', VideoSchema);
module.exports = VideoModel;