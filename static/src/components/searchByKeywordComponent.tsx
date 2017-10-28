import * as React from 'react'
import { connect } from 'react-redux'
import * as style from 'ts-style' //ts-style is correct one
import { bindActionCreators } from 'redux'
import { searchByKeyword } from '../redux/actions/searchMeetingMinutes'
import store from '../redux/store/store'
import { Meeting } from './types/types'
import displayMeeting from './displayMeeting'

interface SearchByKeywordState {
    keyword: string,
    found_meetings: Array<Meeting>
}
interface SearchByKeywordProps {
    fetchSearchByKeyword: any
    searchByKeywordResults: any
    keyword: string
}

const keywordInput = () => {
    return style.create({
        margin: '10px',
        textAlign: 'center'
    })
}

const foundMeetingsContainer = () => {
    return style.create({
        margin: '10px',
        textAlign: 'center',
        width: '600px',
    })
}


class SearchByKeywordComponent extends React.Component<SearchByKeywordProps, SearchByKeywordState> {
    constructor(props) {
        super(props)
        this.state = {
            keyword: '',
            found_meetings: []
        }
    }
    handleSearchByKeyword(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault()
        this.props.fetchSearchByKeyword(this.state.keyword)
    }

    handleSearchInput(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        const keyword = event.target.value
        if (this.state.keyword !== keyword) {
            this.setState({
                keyword: keyword
            })
        }
    }

    render() {
        return (
            <div>
                {console.log(this.state)}
                <input 
                    type='text' 
                    placeholder='Address'
                    onChange={ e => this.handleSearchInput(e) }
                />
                <button
                    onClick={ e => this.handleSearchByKeyword(e) }
                >
                Submit for info
                </button>
                <div style={foundMeetingsContainer()}>
                    <div><h3>{this.state.found_meetings.length} Found meetings</h3></div>
                    {
                        this.state.found_meetings.map( (meeting: Meeting, index: number) => {
                            return displayMeeting(meeting, index)
                        })
                    }
                </div>
            </div>
        )
    }
    componentWillReceiveProps(newProps) {
        this.setState({
            ...newProps
        })
    }
}
const mapStateToProps = (state) => {
    return {
        ...state.searchByKeyword
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchSearchByKeyword: (keyword) => dispatch(searchByKeyword(keyword)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchByKeywordComponent)
