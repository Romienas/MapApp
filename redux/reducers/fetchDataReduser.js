import fetchData from "../actions/fetchData"

const initialState = {
    fetchData: {}
}

export default fetchDataResucer = (state = initialState, action) => {
    switch(action.type){
        case 'FETCH_DATA' : {
            return {
                ...state,
                fetchData: action.obj
            }
        }
        default: {
            return state
        }
    }
}