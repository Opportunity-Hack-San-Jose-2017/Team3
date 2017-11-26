import * as React from 'react'
import  Checkbox from 'material-ui/Checkbox'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

import GiveLightLogoComponent from '../commonComponents/GiveLightLogoComponent'
import VolunteerInterestsCheckboxesComponent from '../commonComponents/VolunteerInterestsCheckboxesComponent'

import { CountryDropdown, RegionDropdown } from 'react-country-region-selector-material-ui'

import { registerUser, signupFacebook } from '../../api/api'
import { interests } from '../../models/interests'


require('../sharedCss.css')
require('./SignupComponent.css')
require('../facebook/FacebookButton.css')

class SignupComponent extends React.Component {
    constructor(props) {
        super(props)
        const checkInter = interests.map(interest => ({ interest: interest, checked: false }))
        
        this.state = {
            name: '',
            email: '',
            country: '',
            region: '',
            phone: '',
            interests: [],
            skills: [],
            skillsInput: '',
            passphrase: '',
            retypePassphrase: '',
            isAdmin: false,
            checkboxInterests: checkInter,
        }
    }
    handleField = (fieldName, event) => {
        event.preventDefault()
        this.setState({
            ...this.state,
            [fieldName]: event.target.value
        })
    }
    handleCountry = (event, index, value) => {
        this.setState({
            ...this.state,
            country: value
        })
    }
    handleRegion = (event, index, value) => {
        this.setState({
            ...this.state,
            region: value
        })
    }
    handleSkillsInput = (event) => {
        event.preventDefault()
        this.setState({
            ...this.state,
            skillsInput: event.target.value,
            skills: event.target.value.split(/[ ,]+/)
        })
    }
    responseFacebook = (response) => {
        this.setState({
            ...this.state,
            name: response.name,
            email: response.email,
        })
    }
    signupWithFacebook = (e) => {
        e.preventDefault()
        window.location = '/api/auth/facebook'
    }
    handleCheckbox = (event, index, interest) => {
        var data = this.state.checkboxInterests
        data[index] = { interest: data[index].interest, checked: !data[index].checked }
        var volunteerInterests = []
        data.map( interestCheckbox => {
            if (interestCheckbox.checked) {
                volunteerInterests.push(interestCheckbox.interest)
            }
        })
        this.setState({
            ...this.state,
            checkboxInterests: data,
            interests: volunteerInterests
        })
    }
    validateState = () => {
        var errorMessage = ''
        let emailPatternReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (this.state.name.length == 0) {
            errorMessage += 'Please enter a valid name\n'
        }
        if (!emailPatternReg.test(this.state.email)) {
            errorMessage += 'Please enter a valid email\n'
        }
        if (!this.state.country) {
            errorMessage += 'Please select a country\n'
        }
        if (!this.state.region) {
            errorMessage += 'Please select a region\n'
        }
        if (!this.state.passphrase) {
            errorMessage += 'Please enter a passphrase\n'
        }
        if (!this.state.retypePassphrase) {
            errorMessage += 'Please retype the passphrase\n'
        }
        if (this.state.passphrase !== this.state.retypePassphrase) {
            errorMessage += 'Passphrases do not match\n'
        }
        return errorMessage
    }
    handleSubmit(e) {
        e.preventDefault()
        let error = this.validateState()
        if (!error) {
            registerUser(this.state)
        }
        else {
            window.alert(error)
        }

    }

    render () {
        return (
            <Paper>
            <GiveLightLogoComponent />
            <form onSubmit={e => this.onSubmit(e)} className="main">
                <div className="section">
                    <button
                        onClick={this.signupWithFacebook}
                        className="uibutton"
                    >
                        &nbsp;&nbsp;&nbsp;&nbsp;Signup with Facebook&nbsp;&nbsp;&nbsp;&nbsp;
                    </button>
                    <div className="checkBoxStyle"><TextField type="text" name="name" value={this.state.name} floatingLabelText="Name" onChange={(e) => this.handleField('name', e)} /></div>
                    <div><TextField type="text" name="email" value={this.state.email} floatingLabelText="Email" onChange={(e) => this.handleField('email', e)} /></div>
                    <div><TextField type="number" floatingLabelText="Phone" name="phone" onChange={(e) => this.handleField('phone', e)} /></div>
                    <div><TextField type="password" name="passphrase" value={this.state.passphrase} floatingLabelText="Passphrase" onChange={(e) => this.handleField('passphrase', e)} /></div>
                    <div><TextField type="password" name="retypePassphrase" value={this.state.retypePassphrase} floatingLabelText="Retype Passphrase" onChange={(e) => this.handleField('retypePassphrase', e)} /></div>
                    <div className="countryRegionContainer">
                        <CountryDropdown
                            value={this.state.country}
                            onChange={this.handleCountry}
                        />
                    </div>
                    <div>
                        <RegionDropdown
                            country={this.state.country}
                            value={this.state.region}
                            onChange={this.handleRegion}
                        />
                    </div>
                </div>
                <div className={`section volunteerDetailsContainer`}>
                    <h3>Please choose at most 3:</h3>
                    <VolunteerInterestsCheckboxesComponent handleCheckbox={this.handleCheckbox} checkboxInterests={this.state.checkboxInterests} />
                    <div className="skillsInputStyle"><TextField type="text" name="skills" value={this.state.skillsInput} floatingLabelText="Skills e.g.: excel, quickbooks,..." onChange={this.handleSkillsInput} /></div>
                </div>
                <div><button className="giveLightButton" onClick={e =>this.handleSubmit(e)} >sign up</button></div>
            </form>
            </Paper>
        )
    }
}


export default SignupComponent
