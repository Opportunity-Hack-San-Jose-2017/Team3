
import { Action } from 'redux'
import { SearchKeywordAction, searchByKeyword } from '../actions/searchMeetingMinutes'
import { HANDLE_SEARCH_KEYWORD } from '../actions/actionTypes'

const INITIAL_STATE = {}

const SearchByKeyword = (state: any = INITIAL_STATE, action: SearchKeywordAction<Action>): any => {
    switch(action.type) {
        case HANDLE_SEARCH_KEYWORD:
            return {
                ...action.payload
            }

        default:
            return state
    }
}
export default SearchByKeyword
