import { expect } from 'chai'
import React from 'react';
import ReactDOM from 'react-dom';

import App from '../app/components/App'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'

configure({ adapter: new Adapter() })

describe('main js app component', function() {
    const defaultProps = {
        dispatch: () => {},
        manifest: { components: [] },
    }

    beforeEach(function() {
        console.log(App)
    });
    
    it('should render without blowing up', () => {
        const wrapper = shallow(<App />)
        console.log('first test')
        expect(wrapper.length).to.eql(1);
    })


})
