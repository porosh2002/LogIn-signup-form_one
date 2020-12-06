import {CHANGE_ACCOUNTMENU} from '../costants'
const initial_state={
    notification_menu:false,
}
const NotificationMenu=(state=initial_state,action)=>{
    switch(action.type){
        case CHANGE_ACCOUNTMENU:
        return {...state,notification_menu:action.payload}
        default:
        return state;
    }
}
export default NotificationMenu;