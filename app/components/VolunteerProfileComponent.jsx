import * as React from 'react'
import { interests } from '../models/interests'
import  Checkbox from 'material-ui/Checkbox'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector'
import { updateUser } from '../api/api'

import FacebookLogin from 'react-facebook-login';

class VolunteerProfileComponent extends React.Component {
    constructor(props) {
        super(props)
        var checkInter = []
        interests.map( (interest) => {
            var data = { interest: interest, checked: false }
            checkInter.push(data)
        })
        
        if (this.props.location.state) {
            this.state = {
                ...this.props.location.state,
                checkboxInterests: checkInter,
            }
        }
        else {
            this.state = {
                name: '',
                email: '',
                country: '',
                region: '',
                phone: '',
                interests: [],
                passphrase: '',
                retypePassphrase: '',
                checkboxInterests: checkInter,
            }
        }
    }
    handleName = (event) => {
        event.preventDefault()
        this.setState({
            ...this.state,
            name: event.target.value
        })
    }
    handleCountry = (value) => {
        console.log(value)
        this.setState({
            ...this.state,
            country: value
        })
    }
    handleRegion = (value) => {
        console.log(value)
        this.setState({
            ...this.state,
            region: value
        })
    }
    handleEmail = (event) => {
        event.preventDefault()
        this.setState({
            ...this.state,
            email: event.target.value
        })
    }
    handlePhone = (event) => {
        event.preventDefault()
        this.setState({
            ...this.state,
            phone: event.target.value
        })
    }
    handlePassphrase = (event) => {
        event.preventDefault()
        this.setState({
            ...this.state,
            passphrase: event.target.value
        })
    }
    handleRetypePassphrase = (event) => {
        event.preventDefault()
        this.setState({
            ...this.state,
            retypePassphrase: event.target.value
        })
    }
    responseFacebook = (response) => {
        console.log(response)
        this.setState({
            ...this.state,
            name: response.name,
            email: response.email,
        });
    }
    redirectUrl = () => {

    }
    handleCheckbox = (event, index, interest) => {
        var data = this.state.checkboxInterests
        data[index] = { interest: data[index].interest, checked: !data[index].checked }
        var volenteerInterests = []
        data.map( interestCheckbox => {
            if (interestCheckbox.checked) {
                volenteerInterests.push(interestCheckbox.interest)
            }
        })
        this.setState({
            ...this.state,
            checkboxInterests: data,
            interests: volenteerInterests
        })
    }
    disableCheckboxes = () => {
        return this.state.checkboxInterests.filter( (interest) => {return interest.checked}).length < 3
    }
    validateState = () => {
        var errorMessage = ''
        let emailPatternReg = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/ig
        if (this.state.name.length == 0) {
            errorMessage += 'Please enter a valid name\n'
        }
        if (emailPatternReg.test(this.state.email)) {
            errorMessage += 'Please enter a valid email\n'
        }
        if (this.state.country == '') {
            errorMessage += 'Please select a country\n'
        }
        if (this.state.region == '') {
            errorMessage += 'Please select a region\n'
        }
        if (this.state.passphrase == this.state.retypePassphrase) {
            errorMessage += 'Passphrases do not match\n'
        }
        if (this.state.passphrase != '') {
            errorMessage += 'Please select a region\n'
        }
        if (this.state.retypePassphrase != '') {
            errorMessage += 'Please select a region\n'
        }
        return errorMessage
    }
    onSubmit(e) {
        e.preventDefault();
        let error = this.validateState()
        if (error.length == 0) {
            updateUser(this.state)
        }
        else {
            window.alert(error)
        }

    };

    render () {

        const style = {
            margin: "20px",
            backgroundColor: "#F3F2F0",
            textAlign: 'center'
        };

        const checkBoxStyle = {
            marginTop: "20px",
        };

        const darkStyle = {
            margin: "20px",
            backgroundColor: "#252525"
        }
        const volunteerDetailsContainer = {
            display: 'inline-block',
            width: '100%'
        }
        const interestsCheckboxContainer = {
            display: 'inline-block',
            width: '360px',
            textAlign: 'left'
        }
        const countryRegionContainer = {
            margin: '10px',
        }
        const saveButton = {
            width: '185px',
            fontSize: '26px'
        }
        return (
            <Paper zDepth={1} style={style}>
                <h2>Volunteer Profile</h2>
                <form onSubmit={e => this.onSubmit(e)} className="UpdateProfileForm">
                    <div style = {checkBoxStyle}><TextField type="text" name="name" value={this.state.name} floatingLabelText="Name" onChange={this.handleName} /></div>
                    <div><TextField type="text" name="email" value={this.state.email} floatingLabelText="Email" onChange={this.handleEmail} /></div>
                    <div><TextField type="number" floatingLabelText="Phone"  onChange={this.handlePhone} /></div>
                    <div><TextField type="password" name="passphrase" value={this.state.passphrase} floatingLabelText="Passphrase" onChange={this.handlePassphrase} /></div>
                    <div><TextField type="password" name="repassphrase" value={this.state.retypePassphrase} floatingLabelText="Retype Passphrase" onChange={this.handleRetypePassphrase} /></div>
                    <div style={countryRegionContainer}>
                        <CountryDropdown
                            value={this.state.country}
                            onChange={this.handleCountry} 
                        />
                        <RegionDropdown
                            country={this.state.country}
                            value={this.state.region}
                            onChange={this.handleRegion} 
                        />
                    </div>
                    <div style={volunteerDetailsContainer}>
                        <h3>Please choose at most 3</h3>
                        <div style={interestsCheckboxContainer}>
                            <div style = {checkBoxStyle}>
                                {
                                    this.state.checkboxInterests.map( (checkInterest, index) => {
                                        if (this.disableCheckboxes()) {
                                            return (
                                                  <Checkbox key={index} label={checkInterest.interest} checked={checkInterest.checked} onCheck={(e) => this.handleCheckbox(e, index, checkInterest.interest)} />
                                            )
                                        }
                                        else {
                                            return (
                                                  <Checkbox key={index} disabled={!checkInterest.checked} label={checkInterest.interest} checked={checkInterest.checked} onCheck={(e) => this.handleCheckbox(e, index, checkInterest.interest)} />
                                            )

                                        }
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div><RaisedButton style={darkStyle, saveButton} type="submit" label="Update Info" /></div>

                </form>
            </Paper>
        )
    }
}


export default VolunteerProfileComponent
