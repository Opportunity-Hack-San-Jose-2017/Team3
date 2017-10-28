import * as React from 'react'

class SignupComponent extends React.Component<{}, {}> {
    constructor(props) {
        super(props)
    }

    handleFirstName = (event) => {
        event.preventDefault()
        this.setState({
            ...this.state,
            first_name: event.target.value
        })
    }
    handleLastName = (event) => {
        event.preventDefault()
        this.setState({
            ...this.state,
            last_name: event.target.value
        })
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
    handleRePass = (event) => {
        event.preventDefault()
        this.setState({
            ...this.state,
            re_pass: event.target.value
        })
    }
    handleRegister = (event) => {
        event.preventDefault()
        console.log(this.state)
    }

    render () {
        return (
            <div>
                <div>
                    <input type='text' placeholder='First Name' onChange={this.handleFirstName}/><br />
                    <input type='text' placeholder='Last Name' onChange={this.handleLastName}/><br />
                    <input type='email' placeholder='Email' onChange={this.handleEmail}/><br />
                    <input type='password' placeholder='Passphrase' onChange={this.handlePassword}/><br />
                    <input type='password' placeholder='Retype Passphrase' onChange={this.handleRePass}/><br />
                </div>
                <div>
                    Interests list to select from
                </div>
                <div>
                    Skill list to select from
                </div>
                <button onClick={this.handleRegister}>Register</button>
            </div>
        )
    }
}

export default SignupComponent
