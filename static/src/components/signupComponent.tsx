import * as React from 'react'
import { interests } from '../models/interests'

interface VolenteerSignupState {
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    volenteerInterests?: Array<string>,
    password: string,
    rePassword: string

}

class SignupComponent extends React.Component<{},VolenteerSignupState> {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            rePassword: '',
            volenteerInterests: []
        }
    }

    handleFirstName = (event) => {
        event.preventDefault()
        this.setState({
            ...this.state,
            firstName: event.target.value
        })
    }
    handleLastName = (event) => {
        event.preventDefault()
        this.setState({
            ...this.state,
            lastName: event.target.value
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
            rePassword: event.target.value
        })
    }
    handleRegister = (event) => {
        event.preventDefault()
        console.log(this.state)
    }
    handleInterest = (event) => {
        event.preventDefault()

        var interest = event.target.value

        var interests = this.state.volenteerInterests
        var interestIndex = interests.indexOf(interest)
        if (interestIndex == -1) {
            interests.push(interest)
        }
        else {
            interests.splice(interestIndex, 1)
        }
        this.setState({
            ...this.state,
            volenteerInterests: interests
        })
    }

    render () {
        return (
            <div>
                <div>
                    <label >First Name: </label><input type='text' placeholder='First Name' onChange={this.handleFirstName}/><br />
                    <label>Last Name: </label><input type='text' placeholder='Last Name' onChange={this.handleLastName}/><br />
                    <label>Email: </label><input type='email' placeholder='Email' onChange={this.handleEmail}/><br />
                    <label>Password: </label><input type='password' placeholder='Passphrase' onChange={this.handlePassword}/><br />
                    <label>Re Password: </label><input type='password' placeholder='Retype Passphrase' onChange={this.handleRePass}/><br />
                </div>
                <div>
                    Interests list to select from
                    {
                        interests.map( (interest, index) => {
                            return (
                            <div key={index}>
                                <input type='checkbox' value={interest} onChange={this.handleInterest}/><span>{interest}</span>
                            </div>
                            )
                        })
                    }
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
