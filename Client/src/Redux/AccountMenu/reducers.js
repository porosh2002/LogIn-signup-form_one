import {CHANGE_ACCOUNTMENU} from '../costants'
const initial_state={
    account_menu:false,
}
const AccountMenu=(state=initial_state,action)=>{
    switch(action.type){
        case CHANGE_ACCOUNTMENU:
        return {...state,account_menu:action.payload}
        default:
        return state;
    }
}
export default AccountMenu;