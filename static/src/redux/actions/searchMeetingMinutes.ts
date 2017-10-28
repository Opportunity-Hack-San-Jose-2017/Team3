import { Action } from 'redux'
import { HANDLE_SEARCH_KEYWORD } from './actionTypes'
import store from '../store/store'
import axios from 'axios'
import { postToBackend, getFromBackend } from '../../api/api'

interface SearchKeywordAction<Action> {
    type: string
    payload?: any
}
const searchByKeyword = (keyword: string) => {
    const url: string = 'http://localhost:5000/api/keyword'
    const data = {
        keyword
    }
    return function(dispatch, getState) {
        if (keyword !== '') { 
            return postToBackend(url, data).then(function (response) {
                const keywordSearchResults = {
                    ...response.data
                }
                dispatch(searchKeywordSuccess(keywordSearchResults))
            }).catch(function (error) {
                  console.log(error)
            })
        }
    }
}
const searchKeywordSuccess = (keywordResults: any) => {
    return {
        type: HANDLE_SEARCH_KEYWORD,
        payload: keywordResults
    }
}

export {
    searchByKeyword, SearchKeywordAction 
}
