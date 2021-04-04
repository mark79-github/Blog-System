import React, {useContext} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useHistory} from 'react-router-dom';

import * as authService from '../../services/authService';
import notificationService from '../../services/notificationService';

import AuthContext from '../AuthContext';
import {globalConstants, notificationMsg} from "../../utils/globals";

const initialValues = {
    displayName: '',
    email: '',
    password: '',
    repeatPassword: '',
}

const validationSchema = Yup.object({
    displayName: Yup.string()
        .min(globalConstants.DISPLAY_NAME_MIN_LENGTH, notificationMsg.displayNameMinLength)
        .max(globalConstants.DISPLAY_NAME_MAX_LENGTH, notificationMsg.displayNameMaxLength)
        .required(notificationMsg.requiredField),
    email: Yup.string()
        .email(notificationMsg.emailValidate)
        .required(notificationMsg.requiredField),
    password: Yup.string()
        .min(globalConstants.PASSWORD_MIN_LENGTH, notificationMsg.passwordMinLength)
        .required(notificationMsg.requiredField),
    repeatPassword: Yup.string()
        .oneOf([Yup.ref('password')], notificationMsg.repeatPasswordValidate)
        .required(notificationMsg.requiredField)
});

const FormSignUp = () => {
    const {login} = useContext(AuthContext);
    const history = useHistory();

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: ({displayName, email, password}) => {
            authService.register(displayName, email, password)
                .then((response) => {
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
                    login(res.token, res.userId, res.displayName);
                    history.push('/');
                })
                .catch(err => {
                    formik.resetForm();
                    notificationService.errorMsg(err.message);
                })
        }
    });

    return (
        <form className="form" onSubmit={formik.handleSubmit}>
            <div className="form-row">
                <input
                    type="text"
                    name="displayName"
                    placeholder="Display Name"
                    value={formik.values.displayName}
                    onChange={formik.handleChange}
                />
                {formik.errors.displayName && formik.touched.displayName && (
                    <span className="form-input-error">{formik.errors.displayName}</span>
                )}
            </div>
            <div className="form-row">
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                />
                {formik.errors.email && formik.touched.email && (
                    <span className="form-input-error">{formik.errors.email}</span>
                )}
            </div>
            <div className="form-row">
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                />
                {formik.errors.password && formik.touched.password && (
                    <span className="form-input-error">{formik.errors.password}</span>
                )}
            </div>
            <div className="form-row">
                <input
                    type="password"
                    name="repeatPassword"
                    placeholder="Repeat Password"
                    value={formik.values.repeatPassword}
                    onChange={formik.handleChange}
                />
                {formik.errors.repeatPassword && formik.touched.repeatPassword && (
                    <span className="form-input-error">{formik.errors.repeatPassword}</span>
                )}
            </div>

            <button type="submit"> Sign Up</button>
            {/*disabled={!(formik.dirty && formik.isValid)}*/}
        </form>
    );
}

export default FormSignUp;