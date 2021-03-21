import {Component} from 'react';

class FormSignUp extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form className="form">
                <input type="text" name="displayName" placeholder="Display Name"/>
                <input type="email" name="email" placeholder="Email"/>
                <input type="password" name="password" placeholder="Password"/>
                <input type="password" name="repeatPassword" placeholder="Repeat Password"/>
                <input type="submit" value="SignIn Up"/>
            </form>
        );
    }
}

export default FormSignUp;