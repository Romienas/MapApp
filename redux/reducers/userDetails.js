const initialState = {
    userDetails: {}
}

export default userDetailsReducer = (state = initialState, action) => {
    switch(action.type){
        case 'USER_DETAILS' : {
            return {
                ...state,
                userDetails: action.obj         
            }
        }
        default: {
            return state
        }
    }   
}