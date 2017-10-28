import * as React from 'react'
import store from '../redux/store/store'

import * as style from 'ts-style'
import {UIRouter, UIView, UISref, UISrefActive, pushStateLocationPlugin} from 'ui-router-react'
import { aboutState, signupState, contactState } from '../routes/routes'
import MainHeaderComponent from './mainHeaderComponent'
import Link from './linkComponent'
interface NavigationProps {
    userType: string,
}
interface NavigationBarItem {
    id: number,
    url: string,
    count: number,
    active: boolean
}
interface NavigationBarState {
    home?: NavigationBarItem,
    about?: NavigationBarItem,
    contact?: NavigationBarItem,
}
const mainPageCSS = {
    textAlign: 'center'
}
const navigationBarContainer = {
    padding:'10px',
    margin: '20px',
    textAlign: 'center',
}
class NavigationBarComponent extends React.Component<NavigationProps, NavigationBarState> {
    constructor(props: NavigationProps) {
        super(props)
        this.props = props
        this.state = ({} as NavigationBarState)

    }
    render() {
        return (
            <div>
                <UIRouter plugins={[pushStateLocationPlugin]} states={[aboutState, signupState, contactState]}>

                    <div style={mainPageCSS}>
                        <MainHeaderComponent />
                        <div style={navigationBarContainer}>
                            <Link name='signup' displayText='Signup' />
                            <Link name='about' displayText='About' />
                            <Link name='contact' displayText='Contact' />
                        </div>
                        <UIView/>
                    </div>
                </UIRouter>
            </div>
        );
    }
}

export default NavigationBarComponent
