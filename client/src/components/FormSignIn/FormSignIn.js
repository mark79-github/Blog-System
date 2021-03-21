import {Component} from 'react';

class FormSignIn extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form className="form">
                <input type="email" name="email" placeholder="Email"/>
                <input type="password" name="password" placeholder="Password"/>
                <input type="submit" value="SignIn"/>
            </form>
        );
    }
}

export default FormSignIn;