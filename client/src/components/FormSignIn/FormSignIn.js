import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {useFormik} from 'formik';
import * as Yup from 'yup';

import * as authService from '../../services/authService';
import notificationService from '../../services/notificationService';

import AuthContext from '../AuthContext';
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
    const {login} = useContext(AuthContext);
    const history = useHistory();

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: ({email, password}) => {
            authService.login(email.toLowerCase(), password)
                .then((response) => {

                    if (response.hasOwnProperty('token')) {
                        login(response.token, response.user._id, response.user.displayName);
                        history.push('/');
                    }

                    if (response.hasOwnProperty('message')) {
                        throw Error(response.message);
                    }
                })
                .catch(err => {
                    formik.resetForm();
                    notificationService.errorMsg(err.message);
                });
        }
    });

    return (
        <form className="form" onSubmit={formik.handleSubmit}>
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
            {/*disabled={!(formik.dirty && formik.isValid)}*/}
            <button type="submit"> Sign In</button>
        </form>
    );
}

export default FormSignIn;