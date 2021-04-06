import React, {useContext, useState} from 'react';
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
    file: ''
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
        .required(notificationMsg.requiredField),
    file: Yup.mixed()
        .required(notificationMsg.requiredField)
        .test('size', notificationMsg.largeFileSize, (value) => {
            return value && value.size <= globalConstants.MAX_FILE_SIZE;
        })
        .test('type', notificationMsg.supportedFormats, value => value && globalConstants.IMAGE_FORMATS.includes(value.type)),
});

const FormSignUp = () => {
    const {login} = useContext(AuthContext);
    const history = useHistory();

    const formik = useFormik({
        initialValues,
        validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        validateOnMount: true,
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
            <div className="form-row">
                <div className="wrapper">
                    <div className="file-upload">
                        <input
                            type="file"
                            id="name"
                            name="file"
                            onChange={(event) => {
                                formik.setFieldValue('file', event.target.files[0]);
                                formik.setFieldTouched('file', true);
                            }}
                        />
                        <i className="fa fa-arrow-up"/>
                    </div>
                </div>
                {formik.errors.file && formik.touched.file && (
                    <span className="form-input-error">{formik.errors.file}</span>
                ) || formik.values.file && (
                    <span className="form-input-error">{formik.values.file.name}</span>
                )}
            </div>
            <button type="submit"> Sign Up</button>
            {/*disabled={!(formik.dirty && formik.isValid)}*/}
        </form>
    );
}

export default FormSignUp;