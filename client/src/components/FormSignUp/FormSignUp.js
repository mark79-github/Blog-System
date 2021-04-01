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
    const authContext = useContext(AuthContext);
    let history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [displayName, setDisplayName] = useState('');

    const notifications = {
        emailRequired: "Please provide your email address",
        nicknameRequired: "Please provide your nickname",
        passwordRequired: "Please provide your password",
        passwordsDoNotMatch: "Passwords do not match",
    };

    const validateInput = () => {

        let isValid = true;
        const errors = {};

        if (!email || email.trim().length === 0) {
            isValid = false;
            errors.email = notifications.emailRequired;
        }

        if (!displayName || displayName.trim().length < 4) {
            isValid = false;
            errors.nickname = notifications.nicknameRequired;
        }

        if (!password || password.trim().length < 4) {
            isValid = false;
            errors.password = notifications.passwordRequired;
        }

        if (!repeatPassword || repeatPassword.trim().length < 4) {
            isValid = false;
            errors.repeatPassword = notifications.passwordRequired;
        }

        if (repeatPassword && password !== repeatPassword) {
            isValid = false;
            errors.repeatPassword = notifications.passwordsDoNotMatch;
        }

        return isValid;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateInput()){
            notificationService.errorMsg('Data is not valid')
            return
        }

        authService.register(displayName, email, password)
            .then((response) => {

                setDisplayName('');
                setEmail('');
                setPassword('');
                setRepeatPassword('');

                if (response.hasOwnProperty('message')) {
                    throw Error(response.message);
                }

                return {
                    token: response.token,
                    userId: response.newUser._id,
                    displayName: response.newUser.displayName
                };
            })
            .then(res => {
                authContext.login(res.token, res.userId, res.displayName);
                history.push('/');
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