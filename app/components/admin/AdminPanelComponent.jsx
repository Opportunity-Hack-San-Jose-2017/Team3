import * as React from 'react'
import { exportUserData, getAllUsers } from '../../api/api'
//require('./GiveLightLogoComponent.css');


class AdminPanelComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            allUsers: [],
        }
    }
    componentDidMount() {
        getAllUsers().then( response => {
            console.log('in get all users response')
            console.log(response)
            this.setState({
                allUsers: response
            })
        }).catch( error => {
            console.log(error)    
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

    render() {
        return (
            <div>
                <h2>Welcome to Admin Organization Page</h2>
                <button onClick={this.handleGettingData}>Export User Data</button>
                {console.log(this.state)}
                <VolunteerList allVolunteers={this.state.allUsers} />
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
                <div>
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
            <div>
                <span>{this.props.volunteerData.name}</span> 
            </div>
        )
    }
}

export default AdminPanelComponent
