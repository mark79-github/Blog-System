import React from 'react';
import SignUp from "../../components/SignUp";
import SignIn from "../../components/SignIn";

const SignPage = () => {
    return (
        <main>
            <div className="sign-form-wrapper">
                <SignUp/>
                <SignIn/>
            </div>
        </main>
    );
}

export default SignPage;