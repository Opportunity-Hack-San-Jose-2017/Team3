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
        console.log(this.props.location.state)
        console.log(this.props.location)
        console.log(this.props)
        this.state = {
            ...this.state,
            email: '',
            passphrase: '',
            goToMain: false
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
            goToMain: true
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
    onSubmit = (even) => {
        let errorMsg = this.validateState()
        if (errorMsg.length != 0) {
            loginUser(this.state)
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
        if (this.state.goToMain) {
            return (
                <Redirect to='/profile' />
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
