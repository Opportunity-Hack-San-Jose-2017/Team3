import * as React from 'react'
import * as ReactDOM from 'react-dom'
import store from './redux/store/store'
import { Provider } from 'react-redux'
import {UIRouter, UIView, UISref, UISrefActive, pushStateLocationPlugin} from 'ui-router-react'
import NavigationBarComponent from './components/navigationBarComponent'


ReactDOM.render(
    <Provider store={store}>
        <NavigationBarComponent userType='buyer' />
    </Provider>,
    document.getElementById("root")
)
