import * as React from 'react'
import {UIRouter, UIView, UISref, UISrefActive, pushStateLocationPlugin} from 'ui-router-react'
import { SignupState, LoginState, VolunteerProfileState } from '../routes/routes'
import Link from './Link'

class NavigationBarComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }

    }

    render() {
        return (
            <div>
                <UIRouter plugins={[pushStateLocationPlugin]} states={[LoginState('hello keyboard cat'), SignupState, VolunteerProfileState]}>
                <div>
                    <div>
                        <Link name='login' displayText='Login' />
                        <Link name='signup' displayText='Signup' />
                        <Link name='profile' />
                    </div>
                    <UIView/>
                </div>
                </UIRouter>
            </div>
        )
    }
}

export default NavigationBarComponent
