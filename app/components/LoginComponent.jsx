import * as React from 'react'
import FacebookLogin from 'react-facebook-login'
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class LoginComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            passphrase: ''
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

    handleLoginEvent = (event) => {
        
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
        return (
            <Paper zDepth={1} style={style}>
                <form onSubmit={e => this.onSubmit(e)} className="MyForm">
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
