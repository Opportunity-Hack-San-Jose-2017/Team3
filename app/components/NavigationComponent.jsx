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
    constructor(props: NavigationProps) {
        super(props)
        this.state = {
            loggedInUserBar: false
        }

    }

    render() {
        const navBarContainer = {
            display: 'block',
            textAlign: 'center'
        }
        const navBarItem = {
            display: 'inline-block',
            fontSize: '24px',
            margin: '10px'

        }
        return (
            <Router>
                <div>
                    <div style={navBarContainer} >
                        <Link style={navBarItem} to='/login'>Login</Link>
                        <Link style={navBarItem} to='/signup'>Signup</Link>
                    </div>
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
