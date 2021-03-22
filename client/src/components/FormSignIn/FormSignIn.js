import {Component} from 'react';
import * as userService from "../../services/userService";

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

        console.log('name: ', name, ' value: ', value);
    }

    handleSubmit = (event) => {
        event.preventDefault();

        console.log(JSON.stringify(this.state));
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