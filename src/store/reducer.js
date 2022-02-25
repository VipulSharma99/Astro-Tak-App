import * as actions from './action';

const state1={
    view : "",
    uuid:''
}

const reducer = (state={state1},action) => {
    switch(action.type)
    {
        case actions.view :
            return{
                ...state,
                view : action.screenview,
                uuid: ''
            }
        case actions.edit :
            return{
                ...state,
                view : action.screenview.screenview,
                uuid : action.screenview.data
            }
        default :
        return state;
    }
}

export default reducer;