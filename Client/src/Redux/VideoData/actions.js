import {VIDEO_UPDATE} from '../costants'
export const setVideoData=(text)=>({
    type:VIDEO_UPDATE,
    payload:text
})
