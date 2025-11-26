import {useContext, useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useFormik} from 'formik';
import * as Yup from 'yup';

import styles from './FormSignIn.module.css';

import * as authService from '../../services/authService';

import AuthContext from '../../contexts';
import {globalConstants, notificationMsg} from '../../utils/globals';

const initialValues = {
    email: '',
    password: '',
}

const validationSchema = Yup.object({
    email: Yup.string()
        .email(notificationMsg.emailValidate)
        .required(notificationMsg.requiredField),
    password: Yup.string()
        .min(globalConstants.PASSWORD_MIN_LENGTH, notificationMsg.passwordMinLength)
        .required(notificationMsg.requiredField),
})

const FormSignIn = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const timer = useRef(null);

    useEffect(() => {
        timer.current = setTimeout(() => setError(''), 2000);
        return () => {
            clearTimeout(timer.current);
        };
    }, [error]);

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: ({email, password}) => {
            authService.login(email.toLowerCase().trim(), password)
                .then((response) => {

                    if (response.hasOwnProperty('token')) {
                        authContext.login(response.token, response.user._id, response.user.displayName);
                        navigate('/');
                    }

                    if (response.hasOwnProperty('message')) {
                        throw new Error(response.message);
                    }
                })
                .catch(err => {
                    setError(err.message);
                    formik.resetForm();
                });
        }
    });


    return (
        <form className={styles.form} onSubmit={formik.handleSubmit}>
            <div className={styles.row}>
                <input
                    type="text"
                    name="email"
                    className={styles.input}
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                />
                {formik.errors.email && formik.touched.email && (
                    <span className={styles.error}>{formik.errors.email}</span>
                )}
            </div>
            <div className={styles.row}>
                <input
                    type="password"
                    name="password"
                    className={styles.input}
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                />
                {formik.errors.password && formik.touched.password && (
                    <span className={styles.error}>{formik.errors.password}</span>
                )}
            </div>
            {error && <span className={styles.credentials}>{error}</span>}
            <button type="submit" className={styles.button}>Sign In</button>
        </form>
    );
}

export default FormSignIn;