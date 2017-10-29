import * as React from 'react'
import { interests } from '../models/interests'
import  Checkbox from 'material-ui/Checkbox'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FbLogin from './fb-login.component.js'
import Paper from 'material-ui/Paper';

import FacebookLogin from 'react-facebook-login';

class SignupComponent extends React.Component {
    constructor(props) {
        super(props)
        var checkInter = []
        interests.map( (interest) => {
            var data = { interest: interest, checked: false }
            checkInter.push(data)
        })

        this.state = {
            name: '',
            email: '',
            country: '',
            phone: '',
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
    handlePhone = (event) => {
        event.preventDefault()
        this.setState({
            ...this.state,
            phone: event.target.value
        })
    }
    responseFacebook = (response) => {
        console.log(response);
        console.log(response.name);
        console.log(response.email);

        this.setState({
            ...this.state,
            name: response.name,
            email: response.email,
        });
    }
    redirectUrl = () => {

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
        }).catch(error => {
            return console.log(error)
        });
    };

    render () {

        const style = {
                margin: "20px",
                backgroundColor: "#F3F2F0"
        };
        return (
            <Paper zDepth={1} style={style}>
                <form onSubmit={e => this.onSubmit(e)} className="MyForm">
                    <FacebookLogin
                        appId="749202875279319"
                        autoLoad={true}
                        textButton="Use Facebook Info"
                        fields="name,email,picture"
                        onClick={this.redirectUrl}
                        callback={this.responseFacebook}
                    />
                    <div><TextField type="text" name="name" value={this.state.name} floatingLabelText="Name" onChange={this.handleName} /></div>
                    <div><TextField type="text" name="email" value={this.state.email} floatingLabelText="Email" onChange={this.handleEmail} /></div>
                    <div><TextField type="text" name="country" value={this.state.country} floatingLabelText="Country"  onChange={this.handleCountry} /></div>
                    <div><TextField type="number" floatingLabelText="Phone"  onChange={this.handlePhone} /></div>
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
                </Paper>
        )
    }
}


export default SignupComponent
