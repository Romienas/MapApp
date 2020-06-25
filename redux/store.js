import { createStore, combineReducers } from 'redux'
import userDetailsReducer from './reducers/userDetails'
import fetchDataReducer from './reducers/fetchDataReduser'
import showListReducer from './reducers/showListReducer'

const rootReducer = combineReducers({
    userDetailsReducer,
    fetchDataReducer,
    showListReducer
})

const store = createStore(rootReducer)
export default store;