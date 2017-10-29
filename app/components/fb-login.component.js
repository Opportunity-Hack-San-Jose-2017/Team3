import * as React from 'react';
import FacebookLogin from 'react-facebook-login';

export class FbLogin extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: this.props.name,
            email: this.props.email,
        };

        this.redirectUrl = this.redirectUrl.bind(this);
    }

	responseFacebook = (response) => {
        console.log(response);
        console.log(response.name);
        console.log(response.email);

        this.setState({
            name: response.name,
            email: response.email,
        });
    }

    redirectUrl = () => {

    }
    

    render() {
        return <FacebookLogin
                appId="749202875279319"
                autoLoad={true}
                fields="name,email,picture"
                onClick={this.redirectUrl}
                callback={this.responseFacebook}
            />;
    }
}
 