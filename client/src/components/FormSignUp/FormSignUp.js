import React, {useContext} from "react";

import {useFormik} from "formik";
import * as Yup from "yup";
import * as authService from "../../services/authService";
import notificationService from "../../services/notificationService";
import AuthContext from "../AuthContext";
import {useHistory} from "react-router-dom";

const initialValues = {
    displayName: "",
    email: "",
    password: "",
    repeatPassword: ""
}

const validationSchema = Yup.object({
    displayName: Yup.string()
        .min(3, "Display name must be at least 3 characters long")
        .max(15, "Display name must be at most 15 characters long")
        .required("Required field!"),
    email: Yup.string()
        .email("Invalid email format")
        .required("Required field!"),
    password: Yup.string()
        .min(5, "Password must be at least 5 characters long")
        .required("Required field!"),
    repeatPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Repeat password not match")
        .required("Required field!")
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

            <button
                type="submit"
                // disabled={!(formik.dirty && formik.isValid)}
            >
                Sign Up
            </button>

        </form>
    );
}

export default FormSignUp;