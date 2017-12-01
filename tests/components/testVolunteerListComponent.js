import { expect } from 'chai'
import React from 'react';
import ReactDOM from 'react-dom';

import VolunteerListComponent from '../../app/components/admin/volunteerList/VolunterrListComponent'
import { shallow, configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'

configure({ adapter: new Adapter() })

describe('VolunteerList component tests', () => {
    
    it ('test VolunteerList props with valid volunteers', () => {
        const testVolunteers = [
            {
                name: 'test name',
                email: 'test@tests.com',
                phone: '234345456',
                country: 'United States',
                region: 'California',
                skills: ['testing'],
                interests: ['Gardening']
            },
            {
                name: 'test2 name',
                email: 'test2@tests.com',
                phone: '222222234345456',
                country: 'United States',
                region: 'California',
                skills: ['testing2'],
                interests: ['Gardening']
            },
        ]
        const wrapper = shallow(<VolunteerListComponent allVolunteers={testVolunteers} />)
        expect(wrapper.find('.volunteerListContainer').length).to.equal(1)
        expect(wrapper.instance().props.allVolunteers).to.equal(testVolunteers)
    })

    it ('displays no volunteers list container if no volunteers', () => {
        const testVolunteers = []
        const wrapper = shallow(<VolunteerListComponent allVolunteers={testVolunteers} />)
        expect(wrapper.instance().props.allVolunteers).to.equal(testVolunteers)

    })
})
