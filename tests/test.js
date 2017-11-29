var expect = require('chai').expect

var givelightSite = require('../index.js')
describe('connecting give light frontend server', function() {
    var frontendServer
    const defaultProps = {
        dispatch: () => {},
        manifest: { components: [] },
    }

    beforeEach(function() {
        frontendServer = givelightSite
        console.log(frontendServer)
    });
    
    it('should render without blowing up', () => {
        //const wrapper = shallow(<Thing {...defaultProps} />);
        console.log('first test')
        expect(1).to.eql(1);
    })


})
