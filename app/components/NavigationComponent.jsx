import * as React from 'react'
import LoginComponent from './LoginComponent'
import SignupComponent from './SignupComponent'
import VolunteerProfileComponent from './VolunteerProfileComponent'
import {
      BrowserRouter as Router,
      Route,
      Link
} from 'react-router-dom'

class NavigationBarComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedInUserBar: false
        }

    }
    loginNavigationBar = () => {
        this.setState({
            loggedInUserBar: true
        })
    }
    logoutNavigationBar = () => {
        this.setState({
            loggedInUserBar: false
        })
    }
    getNavigationBar = () => {
        const navBarContainer = {
            display: 'block',
            textAlign: 'center'
        }
        const navBarItem = {
            display: 'inline-block',
            fontSize: '24px',
            margin: '10px'

        }
        if (this.state.loggedInUserBar) {
            return (
                <div style={navBarContainer} >
                    <Link style={navBarItem} to='/login'>Logout</Link>
                </div>
            )
        }
        else {
            return (
                <div style={navBarContainer} >
                    <Link style={navBarItem} to='/login'>Login</Link>
                    <Link style={navBarItem} to='/signup'>Signup</Link>
                </div>
            )
        }
    }

    render() {

        return (
            <Router>
                <div>
                    {this.getNavigationBar()}
                    <hr/>

                    <Route exact path="/" component={LoginComponent}/>
                    <Route path="/login" component={LoginComponent}/>
                    <Route path="/signup" component={SignupComponent}/>
                    <Route path="/profile" component={VolunteerProfileComponent}/>
                </div>
            </Router>
        )
    }
}

export default NavigationBarComponent
