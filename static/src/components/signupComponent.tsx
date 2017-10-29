import * as React from 'react'
import { interests } from '../models/interests'
import  Checkbox from 'react-toolbox/lib/checkbox'

interface InterestCheckbox {
    interest: string,
    checked: boolean
}

interface VolenteerSignupState {
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    volenteerInterests?: Array<InterestCheckbox>,
    checkboxInterests?: Array<InterestCheckbox>,
    password: string,
    rePassword: string

}


class SignupComponent extends React.Component<{},VolenteerSignupState> {
    constructor(props) {
        super(props)
        var checkInter = []
        interests.map( (interest) => {
            var data = { interest: interest, checked: false }
            checkInter.push(data)
        })

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            rePassword: '',
            volenteerInterests: [],
            checkboxInterests: checkInter
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
    hasInterest = (event) => {
        event.preventDefault()

        var interest = event.target.value

        var interests = this.state.volenteerInterests
        var interestIndex = interests.indexOf(interest)
        if (interestIndex == -1) {
            return false
        }
        else {
            return true
        }

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

    handleCheckbox = (event, index, interest) => {
        var data = this.state.checkboxInterests
        data[index] = { interest: data[index].interest, checked: !data[index].checked }
        this.setState({
            ...this.state,
            checkboxInterests: data
        })
    }

    disableCheckboxes = () => {
        console.log(this.state.checkboxInterests.filter( (interest) => {return interest.checked}).length < 3)
        return this.state.checkboxInterests.filter( (interest) => {return interest.checked}).length < 3
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
                        this.state.checkboxInterests.map( (checkInterest, index) => {
                            if (this.disableCheckboxes()) {
                                return (
                                    <Checkbox key={index} label={checkInterest.interest} checked={checkInterest.checked} onChange={(e) => this.handleCheckbox(e, index, checkInterest.interest)} />
                                )
                            }
                            else {
                                return (
                                        <Checkbox key={index} disabled={checkInterest.checked} label={checkInterest.interest} checked={checkInterest.checked} onChange={(e) => this.handleCheckbox(e, index, checkInterest.interest)} />
                                )

                            }
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


interface CheckboxState {
    checked: boolean
}
interface CheckboxProps {
    key: any,
    handleCheckbox: any,
    checkedInterest: string
}
class MyCheckbox extends React.Component<CheckboxProps, CheckboxState> {
    constructor(props) {
        super(props)
    }

    render () {
        return (
            <div>
                {this.props}
                <input type='checkbox' value={this.props.checkedInterest} onChange={this.props.handleCheckbox}/><span>{this.props.checkedInterest}</span>
            </div>
        )
    }
}

export default SignupComponent
