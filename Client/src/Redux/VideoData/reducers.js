import {VIDEO_UPDATE} from '../costants'
const initial_state={
    video:[],
}
const VideoReducer=(state=initial_state,action)=>{
    switch(action.type){
        case VIDEO_UPDATE:
        return {...state,video:action.payload}
        default:
        return state;
    }
}
export default VideoReducer;