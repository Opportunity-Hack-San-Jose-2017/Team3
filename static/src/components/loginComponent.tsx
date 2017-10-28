import * as React from "react";
import store from "../redux/store/store"
interface LoginState {
    username?: string,
    password?: string
}

var myStyle = {
    backgroundColor:"red",
    padding:"10px"
};
                                        /*<props passed in, state types? can assign the state type here>*/
class LoginComponent extends React.Component<{}, LoginState> {
    constructor() {
        super();
        this.state = ({} as LoginState);

        this.login = this.login.bind(this);
        this.usernameValidator = this.usernameValidator.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);

    }

    usernameValidator = (event: React.ChangeEvent<HTMLInputElement>) => {

        const username = (event.target as HTMLInputElement).value;

        this.setState({
            username: username,
        });

    }

    passwordHandler = (event: React.ChangeEvent<HTMLInputElement>   ) => {
        const password = (event.target as HTMLInputElement).value;
        this.setState({
            password: password,
        });
    }

    login = (event: any) => {
        console.log(this.state);
        store.dispatch({type: "LOG_IN", payload: this.state});
    }
    render() {
        return (
            <div>

                <label>Username:</label><input name="username" type="text" value={this.state.username} onChange={this.usernameValidator} />
                <label>Password:</label><input name="password" type="text" value={this.state.password} onChange={this.passwordHandler}/>
                <button onClick={this.login}>Submit</button>

            </div>
        );
    }
}

export default LoginComponent;
