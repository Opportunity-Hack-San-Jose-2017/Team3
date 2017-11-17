import * as React from 'react'
import FacebookLogin from 'react-facebook-login'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import GiveLightLogoComponent from '../commonComponents/GiveLightLogoComponent'
import { loginUser } from '../../api/api'
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Link
} from 'react-router-dom'

require('./LoginComponent.css');
require('../sharedCss.css');
require('../facebook/FacebookButton.css');


var facebookAppID = require('!json../../../config/projectInfoData.json')['facebookAppID']

class LoginComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ...this.state,
            email: '',
            passphrase: '',
            facebookLogin: false,
            goToProfile: false
        }
    }

    handleField = (event, fieldName) => {
        event.preventDefault()
        this.setState({
            ...this.state,
            [fieldName]: event.target.value
        })
    }

    responseFacebook = (response) => {
        this.setState({
            ...this.state,
            facebookLogin: true,
            name: response.name,
            email: response.email
        })
        this.handleLoggingUser()
    }

    redirectUrl = () => {

    }
    handleSubmit = (event) => {
        event.preventDefault()
        this.handleLoggingUser()
    }

    handleLoggingUser = () => {
        loginUser(this.state).then(user => {
            console.log(user)
            if (user) {
                this.setState({
                    ...this.state,
                    user,
                    goToProfile: true
                })
            }
            else {
                window.alert('Error logging in please try again')
                this.setState({
                    ...this.state,
                    email: '',
                    passphrase: ''
    
                })
            }
        }).catch( (error) => {
            window.alert('Error logging in please try again')
        })

    }

    goBacktoGiveLightMain = (event) => {
        window.location = 'http://www.givelight.org'
    }

    render() {
        if (this.state.goToProfile) {
            let userData = this.state.user
            let profileComponentDataAndNavBarFunctions = {
                pathname: '/profile',
                state: {
                    logoutNavBar: this.props.location.state,
                    userData
                }
            }
            return (
                <Redirect to={profileComponentDataAndNavBarFunctions} />
            )
        }
        return (
            <Paper zDepth={1} className="paperStyle">
                <GiveLightLogoComponent />
                <form onSubmit={this.onSubmit} className="LoginForm">
                    <FacebookLogin
                        appId={facebookAppID}
                        autoLoad={false}
                        textButton="Login With Facebook"
                        fields="name,email,picture"
                        onClick={this.redirectUrl}
                        callback={this.responseFacebook}
                    />
                    <div><TextField type="text" name="email" value={this.state.email} floatingLabelText="Email" onChange={e => this.handleField(e, 'email')} /></div>
                    <div><TextField type="password" name="passphrase" value={this.state.passphrase} floatingLabelText="Passphrase" onChange={e => this.handleField(e, 'passphrase')} /></div>
                    <div><button className="giveLightButton" onClick={e => this.handleSubmit(e)} >login</button></div>
                </form>
            </Paper>
        )
    }
}

export default LoginComponent
