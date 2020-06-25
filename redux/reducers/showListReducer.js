import showList from "../actions/showList"

const initialState = {
    showList: {}
}

export default fetchDataResucer = (state = initialState, action) => {
    switch(action.type){
        case 'SHOW_LIST' : {
            return {
                ...state,
                showList: action.bool
            }
        }
        default: {
            return state
        }
    }
}