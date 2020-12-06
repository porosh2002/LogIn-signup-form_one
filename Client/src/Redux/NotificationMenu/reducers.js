import {CHANGE_NOTIFICATIONMENU} from '../costants'
const initial_state={
    notification_menu:false,
}
const NotificationMenu=(state=initial_state,action)=>{
    switch(action.type){
        case CHANGE_NOTIFICATIONMENU:
        return {...state,notification_menu:action.payload}
        default:
        return state;
    }
}
export default NotificationMenu;