import * as React from 'react'
import FacebookLogin from 'react-facebook-login'
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { loginUser } from '../api/api'
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Link
} from 'react-router-dom'

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

    handleEmail = (event) => {
        event.preventDefault()
        this.setState({
            ...this.state,
            email: event.target.value
        })
    }
    handlePassphrase = (event) => {
        event.preventDefault()
        this.setState({
            ...this.state,
            passphrase: event.target.value
        })
    }

    responseFacebook = (response) => {
        this.setState({
            ...this.state,
            facebookLogin: true,
            name: response.name,
            email: response.email,
            goToProfile: true
        })
        loginUser(this.state)
    }

    redirectUrl = () => {

    }
    onSubmit = (event) => {
        event.preventDefault()
        this.handleLoggingUser()
    }

    handleLoggingUser = () => {
        loginUser(this.state).then( (userData) => {
            console.log('LOGIN passssed')
            this.setState({
                ...this.state,
                user: userData,
                goToProfile: true
            })
        }).catch( (error) => {
            console.log('LOGIN ERROR?????')
            console.log(error)
            window.alert('Error logging in please try again')
        })

    }

    render() {
        const style = {
            margin: "20px",
            backgroundColor: "#F3F2F0",
            textAlign: 'center'
        }

        const checkBoxStyle = {
            marginTop: "20px",
        }

        const darkStyle = {
            margin: "20px",
            backgroundColor: "#252525"
        }
        const saveButton = {
            width: '185px',
            fontSize: '26px'
        }
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
            <Paper zDepth={1} style={style}>
                <form onSubmit={this.onSubmit} className="LoginForm">
                    <FacebookLogin
                        appId="749202875279319"
                        autoLoad={false}
                        textButton="Login With Facebook"
                        fields="name,email,picture"
                        onClick={this.redirectUrl}
                        callback={this.responseFacebook}
                        style = {checkBoxStyle}
                    />
                    <div><TextField type="text" name="email" value={this.state.email} floatingLabelText="Email" onChange={this.handleEmail} /></div>
                    <div><TextField type="password" name="passphrase" value={this.state.passphrase} floatingLabelText="Passphrase" onChange={this.handlePassphrase} /></div>
                    <div><RaisedButton style={darkStyle, saveButton} type="submit" label="Login" /></div>

                </form>
            </Paper>
        )
    }
}

export default LoginComponent
