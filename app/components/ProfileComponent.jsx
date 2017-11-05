import * as React from 'react'
import { interests } from '../models/interests'
import  Checkbox from 'material-ui/Checkbox'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { Redirect } from 'react-router-dom'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector-material-ui'
import { getUser, updateUser } from '../api/api'

require('./SignupComponent.css');

class ProfileComponent extends React.Component {
    constructor(props) {
        super(props)
        //const checkboxInterests = interests.map(interest => ({ interest, checked: false }));
        var checkInter = []
        console.log('-----------HERE-----------')
        console.log(this.props.location)

        if (this.props.location.state) {
            
            var volunteerInterests = this.props.location.state.userData.interests == 0 ? this.props.location.state.userData.volenteerInterests : this.props.location.state.userData.interests
            interests.map( (interest) => {
                var data = {}
                var interestIndex = volunteerInterests.indexOf(interest)
                if (interestIndex != -1) {
                    data = { interest: interest, checked: true }
                }
                else {
                    data = { interest: interest, checked: false }
                }
                checkInter.push(data)
            })
            this.state = {
                ...this.props.location.state.userData,
                checkboxInterests: checkInter,
            }
        }
        else {
            interests.map( (interest) => {
                var data = {}
                data = { interest: interest, checked: false }
                checkInter.push(data)
            })
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

    componentDidMount() {
        //const href = window.location.href;
        //const id = href.substr(href.lastIndexOf('/') + 1);
        /*
        getUser(id).then(response => {
            const checkboxInterests = this.state.checkboxInterests.map(interest => {
                if (response.user.volunteerInterests.includes(interest.interest)) {
                    return { ...interest, checked: true };
                } 
                return { ...interest, checked: false };
            });
            this.setState({...response.user, checkboxInterests});
            console.log(response.user);
        });
         */
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
        let errorMessage = ''
        let emailPatternReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (!this.state.name) {
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
    onSubmit(e) {
        e.preventDefault();
        let error = this.validateState()
        if (!error) {
            this.handleUpdateProfile()
        }
        else {
            window.alert(error)
        }

    }
    handleUpdateProfile = () => {
        updateUser(this.state).then( (response) => {
            window.alert('Thank you for editing your account information')    

        }).catch( (error) => {
            console.log(error)
            window.alert('failed update')
        })

    }

    render () {
        return (
            <Paper>
            <form onSubmit={e => this.onSubmit(e)} className="main">
                <h2>Volunteer Profile</h2>
                <div className="section">
                    <div className="checkBoxStyle"><TextField type="text" name="name" value={this.state.name} floatingLabelText="Name" onChange={(e) => this.handleField('name', e)} /></div>
                    <div><TextField type="text" name="email" value={this.state.email} floatingLabelText="Email" onChange={(e) => this.handleField('email', e)} /></div>
                    <div><TextField type="number" floatingLabelText="Phone" name="phone" value={this.state.phone} onChange={(e) => this.handleField('phone', e)} /></div>
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
                    <div className="interestsCheckboxContainer">
                        <div className="checkBoxStyle">
                            {
                                this.state.checkboxInterests.map((checkInterest, index) => {
                                    if (this.disableCheckboxes()) {
                                        return (
                                            <Checkbox key={index} label={checkInterest.interest} checked={checkInterest.checked}
                                                onCheck={(e) => this.handleCheckbox(e, index, checkInterest.interest)} />
                                        )
                                    }
                                    else {
                                        return (
                                            <Checkbox key={index} disabled={!checkInterest.checked} label={checkInterest.interest}
                                                checked={checkInterest.checked} onCheck={(e) => this.handleCheckbox(e, index, checkInterest.interest)} />
                                        )

                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
                <div><RaisedButton className={`darkStyle saveButton`} type="submit" label="Update Profile" /></div>
            </form>
            </Paper>
        )
    }
}


export default ProfileComponent
