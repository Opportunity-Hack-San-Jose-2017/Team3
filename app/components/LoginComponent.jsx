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
            name: response.name,
            email: response.email,
            goToProfile: true
        })
    }

    redirectUrl = () => {

    }
    validateState = () => {
        var errorMessage = ''
        let emailPatternReg = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/ig
        if (this.state.email.length == 0 || emailPatternReg.test(this.state.email)) {
            errorMessage += 'Please enter a valid email\n'
        }
        return errorMessage
    }
    onSubmit = (event) => {
        event.preventDefault()
        let errorMsg = this.validateState()
        if (errorMsg.length != 0) {
            loginUser(this.state).then( (userData) => {
                console.log('back in component')
                console.log(userData)
                if (userData) {
                    this.setState({
                        ...this.state,
                        user: userData,
                        goToProfile: true
                    })
                }
            }).catch( (error) => {
                window.alert('Error Logging in please try again')
            })
        }
        else {
            window.alert(errorMsg)
        }
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
            return (
                <Redirect to={{
                    pathname: '/profile',
                    state: this.state.user
                }} />
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
                    <div><TextField type="passphrase" name="passphrase" value={this.state.passphrase} floatingLabelText="Passphrase" onChange={this.handlePassphrase} /></div>
                    <div><RaisedButton style={darkStyle, saveButton} type="submit" label="Login" /></div>

                </form>
            </Paper>
        )
    }
}

export default LoginComponent
