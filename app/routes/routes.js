import LoginComponent from '../components/LoginComponent'
import SignupComponent from '../components/SignupComponent'
import VolunteerProfileComponent from '../components/VolunteerProfileComponent'

export const SignupState = {
      name: 'signup',
      url: '/signup',
      component: SignupComponent,
      onEnter: () => {console.log('signup onEnter')},
      onExit: () => {console.log('signup onExit')}
}

export const LoginState = (something) => {
	  console.log(something)
	  return {
			name: 'login',
			url: '/login',
			component: LoginComponent,
			params: [
				  {
						something: something
				  }
			]
	  }
}
export const VolunteerProfileState = {
      name: 'profile',
      url: '/profile',
      component: VolunteerProfileComponent
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
