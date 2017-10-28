import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {ReactStateDeclaration, UIView} from 'ui-router-react'
import AboutComponent from '../components/aboutComponent'
import ContactComponent from '../components/contactsComponent'
import SignupComponent from '../components/signupComponent'

export const aboutState:ReactStateDeclaration = {
    name: 'about',
    url: '/about',
    component: AboutComponent,
    onEnter: () => {console.log("on enter")},
    onExit: () => {console.log("neat exiting see ya")}
}

export var contactState:ReactStateDeclaration = {
    name: 'contact',
    url: '/contact',
    component: ContactComponent,
    onEnter: () => {console.log("on enter contact")},
    onExit: () => {console.log("neat exiting contact see ya")}
}

export var signupState:ReactStateDeclaration = {
    name: 'signup',
    url: '/',
    component: SignupComponent,
    onEnter: () => {console.log("on enter contact")},
    onExit: () => {console.log("neat exiting contact see ya")}
}
