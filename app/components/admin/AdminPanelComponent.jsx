import * as React from 'react'
import { exportUserData } from '../../api/api'
//require('./GiveLightLogoComponent.css');


class AdminPanelComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    handleGettingData = (event) => {

        event.preventDefault()
        console.log("call that fucking api")
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
                <button onClick={this.handleGettingData}>Export User Data</button>
            </div>
        )
    }
}

export default AdminPanelComponent