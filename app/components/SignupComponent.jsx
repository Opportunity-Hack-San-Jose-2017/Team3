import * as React from 'react'
import { interests } from '../models/interests'
import  Checkbox from 'material-ui/Checkbox'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FbLogin from './fb-login.component.js'

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
    handleName = (event) => {
        event.preventDefault()
        this.setState({
            ...this.state,
            name: event.target.value
        })
    }
    handleCountry = (event) => {
        event.preventDefault()
        this.setState({
            ...this.state,
            country: event.target.value
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
    handleRePassword = (event) => {
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
        return this.state.checkboxInterests.filter( (interest) => {return interest.checked}).length < 3
    }
    onSubmit(e) {
        e.preventDefault();
        fetch('/user', {
            method: 'POST',
            headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state),
        }).then(response => {
            return console.log(response);
        });
    };
    render () {
        return (
            <MuiThemeProvider>
                <form onSubmit={e => this.onSubmit(e)} className="MyForm">
                    <FbLogin />
                    <div><TextField type="text" name="name" value={this.state.name} floatingLabelText="Name" onChange={this.handleName} /></div>
                    <div><TextField type="text" name="email" value={this.state.email} floatingLabelText="Email" onChange={this.handleEmail} /></div>
                    <div><TextField type="text" name="country" value={this.state.country} floatingLabelText="Country"  onChange={this.handleCountry} /></div>
                    <div><TextField type="password" name="password" floatingLabelText="Password"  onChange={this.handlePassword} /></div>
                    <div><TextField type="password" name="password" floatingLabelText="Retype Password"  onChange={this.handleRePassword} /></div>
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

                    <div><RaisedButton type="submit" label="Save" /></div>
                </form>
            </MuiThemeProvider>
        )
    }
}



export default SignupComponent
