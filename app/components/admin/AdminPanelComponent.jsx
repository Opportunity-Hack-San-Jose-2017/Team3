import * as React from 'react'
import { exportUserData, getAllUsers, searchVolunteers } from '../../api/api'
import { interests } from '../../models/interests'
import VolunteerInterestsCheckboxesComponent from '../commonComponents/VolunteerInterestsCheckboxesComponent'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector-material-ui'

require('./AdminPanelComponent.css');


class AdminPanelComponent extends React.Component {
    constructor(props) {
        super(props)
        const checkInterests = interests.map(interest => ({ interest: interest, checked: false }));
        this.state = {
            allUsers: [],
            filteredVolunteers: [],
            volunteerInterestFilterCheckboxes: checkInterests,
            filterInterests: '',
            searchQuery: {
            },
        }
    }
    componentDidMount() {
        getAllUsers().then( response => {
            this.setState({
                allUsers: response,
                filteredVolunteers: response,
            })
        }).catch( error => {
            console.log(error)    
        })
    }

    handleCountry = (event, index, value) => {
        this.setState({
            ...this.state,
            searchQuery: {
                ...this.state.searchQuery,
                country: value
            }
        })
    }

    handleRegion = (event, index, value) => {
        this.setState({
            ...this.state,
            searchQuery: {
                ...this.state.searchQuery,
                region: value
            }
        })
    }

    handleGettingData = (event) => {
        event.preventDefault()
        exportUserData().then(data => {
            console.log("admin panel component response")
            console.log(data)
        }).catch( (error) => {
            console.log(error)
            window.alert('Error getting export data')
        })
    }
    handleCheckbox = (event, index, interest) => {
        var data = this.state.volunteerInterestFilterCheckboxes
        data[index] = { interest: data[index].interest, checked: !data[index].checked }
        var volunteerInterests = []
        data.map( interestCheckbox => {
            if (interestCheckbox.checked) {
                volunteerInterests.push(interestCheckbox.interest)
            }
        })
        this.setState({
            ...this.state,
            volunteerInterestFilterCheckboxes: data,
            searchQuery: {
                ...this.state.searchQuery,
                interests: volunteerInterests
            },
        })
    }

    handleSearch = (event) => {
        console.log(this.state)
        searchVolunteers(this.state.searchQuery).then( response => {
            console.log(response)
            this.setState({
                filteredVolunteers: response
            })
        }).catch( error => {
            console.log(error)    
        })

    }

    render() {
        return (
            <div>
                <h2>Welcome to Admin Organization Page</h2>
                <div>
                    <button onClick={this.handleGettingData}>Export User Data</button>
                </div>
                <div>
                    <div className="countryRegionContainer">
                        <CountryDropdown
                            value={this.state.searchQuery.country}
                            onChange={this.handleCountry}
                        />
                    </div>
                    <div>
                        <RegionDropdown
                            country={this.state.searchQuery.country}
                            value={this.state.searchQuery.region}
                            onChange={this.handleRegion}
                        />
                    </div>
                    <VolunteerInterestsCheckboxesComponent handleCheckbox={this.handleCheckbox} checkboxInterests={this.state.volunteerInterestFilterCheckboxes} allowAll={true} />

                    <button onClick={this.handleSearch}>Filter</button>
                </div>
                <VolunteerList allVolunteers={this.state.filteredVolunteers} />
            </div>
        )
    }
}

class VolunteerList extends React.Component {
    constructor (props) {
        super(props)
        this.props = props
    }

    render () {
        if (this.props.allVolunteers) {
            return (
                <div className="volunteerListContainer">
                    {
                        this.props.allVolunteers.map( (volunteer, index) => {
                            return ( <VolunteerDisplay key={index} volunteerData={volunteer} />)
                        })
                    }
                </div>
            )
        }
        else {
            return (<div></div>)
        }
    }
}

class VolunteerDisplay extends React.Component {
    constructor (props) {
        super(props)
        this.props = props
    }

    render () {
        return (
            <div className="volunteerDisplayContainer">
                <div className="volunteerContactInformation">
                    <div>Name: {this.props.volunteerData.name}</div>
                    <div>Email: {this.props.volunteerData.email}</div>
                    <div>Phone: {this.props.volunteerData.phone}</div>
                    <div>Country: {this.props.volunteerData.country}</div> 
                    <div>Region: {this.props.volunteerData.region}</div> 
                </div> 
                <div className="volunteerDetailsContainer">
                    <div>Interests: {this.props.volunteerData.interests.join(', ')}</div>
                    <div>Skills: {this.props.volunteerData.skills.join(', ')}</div> 
                </div> 
            </div>
        )
    }
}

export default AdminPanelComponent
