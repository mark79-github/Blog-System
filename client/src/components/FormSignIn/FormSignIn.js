import {useContext, useState} from 'react';
import {useHistory} from 'react-router-dom';

import * as authService from "../../services/authService";
import AuthContext from "../AuthContext";
import notificationService from "../../services/notificationService";

const FormSignIn = () => {
    const authContext = useContext(AuthContext);
    let history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailInputChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordInputChange = (event) => {
        setPassword(event.target.value);
    }

    const notifications = {
        emailRequired: "Email must be valid",
        passwordRequired: "Password must be at least 3 characters long",
    };


    const validateInput = () => {

        let isValid = true;
        const errors = {};

        if (!email || email.trim().length === 0) {
            isValid = false;
            errors.email = notifications.emailRequired;
        }

        if (!password || password.trim().length < 3) {
            isValid = false;
            errors.password = notifications.passwordRequired;
        }

        return isValid;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateInput()){
            notificationService.errorMsg('Data is not valid')
            return
        }

        authService.login(email, password)
            .then((response) => {
                setEmail('');
                setPassword('');

                if (response.hasOwnProperty('token')) {
                    authContext.login(response.token, response.user._id, response.user.displayName);
                    history.push('/');
                }
                // if (response.hasOwnProperty('user')) {
                //     localStorage.setItem('authUser', JSON.stringify({
                //         _id: response.user._id,
                //         displayName: response.user.displayName
                //     }));
                // }
                if (response.hasOwnProperty('message')) {
                    throw Error(response.message);
                }
            })
            .catch(err => {
                notificationService.errorMsg(err.message);
            });
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" value={email}
                   onChange={handleEmailInputChange}/>
            <input type="password" name="password" placeholder="Password" value={password}
                   onChange={handlePasswordInputChange}/>
            <input type="submit" value="Sign In"/>
        </form>
    );

}

export default FormSignIn;