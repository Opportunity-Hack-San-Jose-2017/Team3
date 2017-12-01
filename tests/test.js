import { expect } from 'chai'
import React from 'react';
import ReactDOM from 'react-dom';

import App from '../app/components/App'
import VolunteerDisplayComponent from '../app/components/admin/volunteerDisplay/VolunteerDisplayComponent'
import { shallow, configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'

configure({ adapter: new Adapter() })

describe('main js app component', () => {

    beforeEach( () => {
        //console.log(App)
    })
    
    it('shallow render App', () => {
        const wrapper = shallow(<App />)
        // debugger // will start the debug then `repl` to check the values in scope of debugger
        expect(wrapper.length).to.eql(1)
    })
})
