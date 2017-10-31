import LoginComponent from '../components/LoginComponent'
import SignupComponent from '../components/SignupComponent'

export const RegisterState = {
      name: 'signup',
      url: '/signup',
      component: SignupComponent,
      onEnter: () => {console.log('signup onEnter')},
      onExit: () => {console.log('signup onExit')}
}

export const LoginState = {
      name: 'login',
      url: '/login',
      component: LoginComponent
}
/*
export const mainPageState = {
      name: 'about',
      url: '/about',
      component: AboutComponent,
      onEnter: () => {console.log("on enter")},
      onExit: () => {console.log("neat exiting see ya")}
}
*/
