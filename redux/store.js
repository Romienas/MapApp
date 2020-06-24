import { createStore, combineReducers } from 'redux'
import userDetailsReducer from './reducers/userDetails'
import fetchDataReducer from './reducers/fetchDataReduser'

const rootReducer = combineReducers({
    userDetailsReducer,
    fetchDataReducer
})

const store = createStore(rootReducer)
export default store;