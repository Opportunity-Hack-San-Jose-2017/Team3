import * as React from 'react'
import FacebookLogin from 'react-facebook-login'
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class LoginComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    handleEmail = (event) => {
        event.preventDefault()
        this.setState({
            ...this.state,
            email: event.target.value
        })
    }
    handlePassword = (event) => {
        event.preventDefault()
        this.setState({
            ...this.state,
            password: event.target.value
        })
    }

    handleLoginEvent = (event) => {
        
    }

    rendor() {

    }
}
