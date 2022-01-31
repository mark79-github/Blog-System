import React, {useContext} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useHistory} from 'react-router-dom';

import * as authService from '../../services/authService';

import styles from './FormSignUp.module.css';

import AuthContext from '../../contexts';
import {globalConstants, notificationMsg} from '../../utils/globals';

const initialValues = {
    displayName: '',
    email: '',
    password: '',
    repeatPassword: '',
    file: '',
    filename: '',
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
    const authContext = useContext(AuthContext);
    const history = useHistory();

    const formik = useFormik({
        initialValues,
        validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        validateOnMount: true,
        onSubmit: ({displayName, email, password, file}) => {

            const form = new FormData();
            form.append("displayName", displayName);
            form.append("email", email);
            form.append("password", password);
            form.append("file", file);

            return authService.register(form)
                .then(response => {
                    if (response.hasOwnProperty('message')) {
                        throw Error(response.message);
                    }
                    return {
                        token: response.token,
                        userId: response.newUser._id,
                        displayName: response.newUser.displayName
                    };
                }).then(({token, userId, displayName}) => {
                    authContext.login(token, userId, displayName);
                    history.push('/');
                }).catch(() => formik.resetForm());
        }
    });

    return (
        <form className={styles.form} onSubmit={formik.handleSubmit}>
            <div className={styles.row}>
                <input
                    type="text"
                    name="displayName"
                    className={styles.input}
                    placeholder="Display Name"
                    value={formik.values.displayName}
                    onChange={formik.handleChange}
                />
                {formik.errors.displayName && formik.touched.displayName && (
                    <span className={styles.error}>{formik.errors.displayName}</span>
                )}
            </div>
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
            <div className={styles.row}>
                <input
                    type="password"
                    name="repeatPassword"
                    className={styles.input}
                    placeholder="Repeat Password"
                    value={formik.values.repeatPassword}
                    onChange={formik.handleChange}
                />
                {formik.errors.repeatPassword && formik.touched.repeatPassword && (
                    <span className={styles.error}>{formik.errors.repeatPassword}</span>
                )}
            </div>
            <div style={{textAlign: "center", width: "inherit"}}>
                {formik.values.file instanceof File && (
                    <img className={styles.img} src={URL.createObjectURL(formik.values.file)} alt=""/>
                )}
            </div>
            <div className={styles.row}>
                <div className={styles.wrapper}>
                    <input
                        id="filename"
                        type="text"
                        name="filename"
                        className={styles.input}
                        placeholder="Select file"
                        readOnly
                        value={formik.values.file && formik.values.filename}
                    />
                    <div className={styles.file}>
                        <input
                            type="file"
                            id="name"
                            name="file"
                            className={styles['input-file']}
                            onChange={(event) => {
                                formik.setFieldValue('file', event.target.files[0]);
                                formik.setFieldTouched('file', true);
                                formik.setFieldValue('filename', event.target.files[0].name)
                            }}
                        />
                        <i className="fa fa-arrow-up"/>
                    </div>
                </div>
                {formik.errors.file && formik.touched.file && (
                    <span className={styles.error}>{formik.errors.file}</span>
                )}
            </div>
            <button type="submit" className={styles.button}> Sign Up</button>
            {/*disabled={!(formik.dirty && formik.isValid)}*/}
        </form>
    );
}

export default FormSignUp;
