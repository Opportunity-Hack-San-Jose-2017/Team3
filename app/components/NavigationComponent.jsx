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
      
        }

    }

    render() {
        return (
            <Router>
                <div>
                    <div >
                        <Link to={{
                              pathname: '/login',
                              search: '?sort=name',
                              hash: '#login',
                              state: { user: {name: 'my name'} }
                        }}>Login</Link>
                        <Link to='/signup'>Signup</Link>
                        <Link to='/profile'></Link>
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
