const mongoose = require('mongoose');
const ThumbSchema = new mongoose.Schema({
    ThumbnailID:{
        type:String,
        required:true
    },
    Thumbnail:{
        type:Buffer,
        required:true
    }
});
const ThumbModel = mongoose.model('Thumbnail',ThumbSchema);
module.exports = ThumbModel;