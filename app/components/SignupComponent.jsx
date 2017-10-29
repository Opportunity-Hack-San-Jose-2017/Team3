import * as React from 'react'
import { interests } from '../models/interests'
import  Checkbox from 'material-ui/Checkbox'


class SignupComponent extends React.Component {
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
    handleCheckbox = (event, index, interest) => {
        var data = this.state.checkboxInterests
        data[index] = { interest: data[index].interest, checked: !data[index].checked }
        this.setState({
            ...this.state,
            checkboxInterests: data
        })
    }
    disableCheckboxes = () => {
        console.log(this.state.checkboxInterests)
        console.log(this.state.checkboxInterests.filter( (interest) => {return interest.checked}).length)
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
                                      <Checkbox key={index} label={checkInterest.interest} checked={checkInterest.checked} onCheck={(e) => this.handleCheckbox(e, index, checkInterest.interest)} />
                                )
                            }
                            else {
                                return (
                                      <Checkbox key={index} disabled={!checkInterest.checked} label={checkInterest.interest} checked={checkInterest.checked} onCheck={(e) => this.handleCheckbox(e, index, checkInterest.interest)} />
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



export default SignupComponent
