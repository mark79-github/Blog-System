import {useContext, useState} from 'react';
import * as authService from '../../services/authService';
import AuthContext from "../AuthContext";
import {useHistory} from "react-router-dom";
import notificationService from "../../services/notificationService";

// class FormSignUp extends Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             displayName: '',
//             email: '',
//             password: '',
//             repeatPassword: ''
//         }
//     }
//
//     handleInputChange = (event) => {
//         const target = event.target;
//         const value = target.type === 'checkbox' ? target.checked : target.value;
//         const name = target.name;
//         this.setState({
//             [name]: value
//         });
//
//         // console.log('name: ', name, ' value: ', value);
//     }
//
//     handleSubmit = (event) => {
//         event.preventDefault();
//
//         authService.register(this.state.displayName, this.state.email, this.state.password)
//             .then((res) => {
//                 this.setState({
//                     displayName: '',
//                     email: '',
//                     password: '',
//                     repeatPassword: ''
//                 })
//                 console.log(res.token);
//                 // redirect to login
//                 // or login and redirect to home
//             })
//             .catch(err => console.error('Error: ', err))
//     }
//
//     render() {
//         return (
//             <form className="form" onSubmit={this.handleSubmit}>
//                 <input type="text" name="displayName" placeholder="Display Name" value={this.state.displayName}
//                        onChange={this.handleInputChange}/>
//                 <input type="email" name="email" placeholder="Email" value={this.state.email}
//                        onChange={this.handleInputChange}/>
//                 <input type="password" name="password" placeholder="Password" value={this.state.password}
//                        onChange={this.handleInputChange}/>
//                 <input type="password" name="repeatPassword" placeholder="Repeat Password"
//                        value={this.state.repeatPassword} onChange={this.handleInputChange}/>
//                 <input type="submit" value="Sign Up"/>
//             </form>
//         );
//     }
// }

const FormSignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [displayName, setDisplayName] = useState('');

    let history = useHistory();
    const authContext = useContext(AuthContext);

    const handleSubmit = (event) => {
        event.preventDefault();

        authService.register(displayName, email, password)
            .then((response) => {

                if (response.hasOwnProperty('token')) {
                    authContext.login(response.token);
                    history.push('/');
                }

                if (response.hasOwnProperty('message')) {
                    throw Error(response.message);
                }

                setDisplayName('');
                setEmail('');
                setPassword('');
                setRepeatPassword('');
            })
            .catch(err => {
                notificationService.errorMsg(err.message);
            })
    }

    const handleDisplayNameInputChange = (event) => {
        setDisplayName(event.target.value);
    }

    const handleEmailInputChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordInputChange = (event) => {
        setPassword(event.target.value);
    }

    const handleRepeatPasswordInputChange = (event) => {
        setRepeatPassword(event.target.value);
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <input type="text" name="displayName" placeholder="Display Name" value={displayName}
                   onChange={handleDisplayNameInputChange}/>
            <input type="email" name="email" placeholder="Email" value={email}
                   onChange={handleEmailInputChange}/>
            <input type="password" name="password" placeholder="Password" value={password}
                   onChange={handlePasswordInputChange}/>
            <input type="password" name="repeatPassword" placeholder="Repeat Password"
                   value={repeatPassword} onChange={handleRepeatPasswordInputChange}/>
            <input type="submit" value="Sign Up"/>
        </form>
    );
}

export default FormSignUp;