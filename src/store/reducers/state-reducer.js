import { ADMIN_SIGNED, SIGNED } from '../actions/action_types';

const INITIAL_STATE = {
    user__state:0,
    admin__state:0
}

const reducer = (state = INITIAL_STATE, action ) => {
    switch(action.type){
        case SIGNED:
            return{
                ...state, user__state: 1
            }
        case ADMIN_SIGNED:
            return{
                ...state, admin__state: 1
            }
        default: return state;
    }
}

export default reducer;