import * as React from 'react'
import { interests } from '../models/interests'
import  Checkbox from 'material-ui/Checkbox'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector'
import { registerUser } from '../api/api'

import FacebookLogin from 'react-facebook-login';

class SignupComponent extends React.Component {
    constructor(props) {
        super(props)
        var checkInter = []
        interests.map( (interest) => {
            var data = { interest: interest, checked: false }
            checkInter.push(data)
        })

        this.state = {
            name: '',
            email: '',
            country: '',
            region: '',
            phone: '',
            volenteerInterests: [],
            checkboxInterests: checkInter,
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
    responseFacebook = (response) => {
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
            volenteerInterests: volenteerInterests
        })
    }
    disableCheckboxes = () => {
        return this.state.checkboxInterests.filter( (interest) => {return interest.checked}).length < 3
    }
    validateState = () => {
        var errorMessage = ''
        let emailPatternReg = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/ig
        console.log(emailPatternReg.test(this.state.email))
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
        return errorMessage
    }
    onSubmit(e) {
        e.preventDefault();
        let error = this.validateState()
        if (error.length == 0) {
            registerUser(this.state)
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
                <form onSubmit={e => this.onSubmit(e)} className="MyForm">
                    <FacebookLogin
                        appId="749202875279319"
                        autoLoad={false}
                        textButton="Use Facebook Info"
                        fields="name,email,picture"
                        onClick={this.redirectUrl}
                        callback={this.responseFacebook}
                        style = {checkBoxStyle}
                    />
                    <div style = {checkBoxStyle}><TextField type="text" name="name" value={this.state.name} floatingLabelText="Name" onChange={this.handleName} /></div>
                    <div><TextField type="text" name="email" value={this.state.email} floatingLabelText="Email" onChange={this.handleEmail} /></div>
                    <div><TextField type="number" floatingLabelText="Phone"  onChange={this.handlePhone} /></div>
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
                    <div><RaisedButton style={darkStyle, saveButton} type="submit" label="Save" /></div>

                </form>
                </Paper>
        )
    }
}


export default SignupComponent
