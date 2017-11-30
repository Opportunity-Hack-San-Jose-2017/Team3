import { expect } from 'chai'
import React from 'react';
import ReactDOM from 'react-dom';

import App from '../app/components/App'
import VolunteerDisplayComponent from '../app/components/admin/volunteerDisplay/VolunteerDisplayComponent'
import { shallow, configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'

configure({ adapter: new Adapter() })

describe('VolunteerDisplay component tests', () => {
    
    it ('test VolunteerDisplay props', () => {
        const testVolunteer = {
            name: 'test name',
            email: 'test@tests.com',
            phone: '234345456',
            country: 'United States',
            region: 'California',
            skills: ['testing'],
            interests: ['Gardening']
        }
        const wrapper = shallow(<VolunteerDisplayComponent key={1} volunteerData={testVolunteer} />)
        // const mountedWrapper = mount(<VolunteerDisplayComponent key={1} volunteerData={testVolunteer} />)
        //console.log(mountedWrapper) for mount to work NEED JSDOM package since mount uses `document` and needs it defined within the test, mount is used for testing the react component life cycles if need to
        expect(wrapper.instance().props.volunteerData).to.equal(testVolunteer)
    })
})

describe('main js app component', () => {
    const defaultProps = {
        dispatch: () => {},
        manifest: { components: [] },
    }

    beforeEach( () => {
        //console.log(App)
    })
    
    it('should render without blowing up', () => {
        const wrapper = shallow(<App />)
        console.log(wrapper)
        console.log(Object.keys(wrapper))
        expect(wrapper.length).to.eql(1)
    })


})
