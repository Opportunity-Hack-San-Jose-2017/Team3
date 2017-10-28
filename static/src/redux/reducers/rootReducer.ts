import { combineReducers } from 'redux'
import SearchByKeyword from './searchByKeyword'

const rootReducer = combineReducers({
    searchByKeyword: SearchByKeyword
})

export default rootReducer
