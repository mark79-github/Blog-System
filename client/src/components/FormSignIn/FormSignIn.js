import {Component} from 'react';
import * as authService from "../../services/authService";

class FormSignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });

        // console.log('name: ', name, ' value: ', value);
    }

    handleSubmit = (event) => {
        event.preventDefault();

        authService.login(this.state.email, this.state.password)
            .then((response) => {

                this.setState({
                    email: '',
                    password: ''
                });


                if (response.hasOwnProperty('token')) {
                    window.localStorage.setItem('authToken', response.token);
                }
                if (response.hasOwnProperty('user')) {
                    window.localStorage.setItem('authUser', JSON.stringify({
                        _id: response.user._id,
                        displayName: response.user.displayName
                    }));
                }
                if (response.hasOwnProperty('message')) {
                    return response.message
                }
            }).catch(err => console.error("Error:", err));
    }

    render() {
        return (
            <form className="form" onSubmit={this.handleSubmit}>
                <input type="email" name="email" placeholder="Email" value={this.state.email}
                       onChange={this.handleInputChange}/>
                <input type="password" name="password" placeholder="Password" value={this.state.password}
                       onChange={this.handleInputChange}/>
                <input type="submit" value="Sign In"/>
            </form>
        );
    }
}

export default FormSignIn;