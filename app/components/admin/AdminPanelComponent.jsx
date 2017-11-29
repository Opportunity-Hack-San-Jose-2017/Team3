import * as React from 'react'
import { exportUserData, getAllUsers, searchVolunteers } from '../../api/api'
import { interests } from '../../models/interests'
import VolunteerInterestsCheckboxesComponent from '../commonComponents/VolunteerInterestsCheckboxesComponent'
import VolunteerSkillsInputComponent from '../commonComponents/SkillsInputComponent'
import VolunteerListComponent from './volunteerList/VolunterrListComponent'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector-material-ui'

require('./AdminPanelComponent.css');
require('../sharedCss.css');



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
                filteredVolunteers: response,
            })
        }).catch( error => {
            console.log(error)    
        })
    }

    handleGettingData = (event) => {
        event.preventDefault()
        exportUserData().then(data => {
        }).catch( (error) => {
            console.log(error)
            window.alert('Error getting export data')
        })
    }

    getAllVolunteers = () => {
        getAllUsers().then( response => {
            this.setState({
                filteredVolunteers: response,
            })
        }).catch( error => {
            console.log(error)    
        })
    }

    handleSkillsInput = (event) => {
        event.preventDefault()
        let searchQuery = {
            ...this.state.searchQuery,
            skillsInput: event.target.value,
            skills: event.target.value.split(/\s*,\s*/),
        }
        if (searchQuery.skills && searchQuery.skills.length == 0 || searchQuery.skills[0] == '') {
            delete searchQuery['skills']
        }
        this.searchVolunteersHandler(searchQuery)
    }

    handleCountry = (event, index, value) => {
        event.preventDefault()
        let searchQuery = {
            ...this.state.searchQuery,
            country: value
        }
        this.searchVolunteersHandler(searchQuery)
    }

    handleRegion = (event, index, value) => {
        event.preventDefault()
        let searchQuery = {
            ...this.state.searchQuery,
            region: value
        }
        this.searchVolunteersHandler(searchQuery)
    }

    handleCheckbox = (event, index, interest) => {
        event.preventDefault()
        var data = this.state.volunteerInterestFilterCheckboxes
        data[index] = { interest: data[index].interest, checked: !data[index].checked }
        var volunteerInterests = []
        data.map( interestCheckbox => {
            if (interestCheckbox.checked) {
                volunteerInterests.push(interestCheckbox.interest)
            }
        })
        let searchQuery = {
            ...this.state.searchQuery,
            interests: volunteerInterests
        }
        if (searchQuery.interests.length == 0) {
            delete searchQuery['interests']
        }
        this.searchVolunteersHandler(searchQuery)
    }

    searchVolunteersHandler = (searchQuery) => {
        let cacheSkillsInput =  searchQuery['skillsInput']
        delete searchQuery['skillsInput']

        if (Object.keys(searchQuery).length != 0) {
            searchVolunteers(searchQuery).then( response => {
                if (response.length) {
                    this.setState({
                        ...this.state,
                        filteredVolunteers: response,
                        searchQuery: {
                            ...searchQuery,
                        }
                    })
                }
            }).catch( error => {
                console.log(error)
            })
        }
        else {
            this.getAllVolunteers()
        }
    }

    render() {
        return (
            <div className="adminPanelContainer">
                <div className="adminHeaderContainer">
                    <div>
                        <button onClick={this.handleGettingData}>Export User Data</button>
                    </div>
                </div>
                <div className="filterContainer">
                    <div >
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
                    <VolunteerSkillsInputComponent handleSkillsInput={this.handleSkillsInput} skillsInput={ this.state.searchQuery.skillsInput} />

                </div>
                <div className="filterResultsContainer">
                    <VolunteerListComponent allVolunteers={this.state.filteredVolunteers} />
                </div>
            </div>
        )
    }
}

export default AdminPanelComponent
