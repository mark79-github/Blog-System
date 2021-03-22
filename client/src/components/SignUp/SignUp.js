import FormSignUp from "../FormSignUp/FormSignUp";

const SignUp = () => {
    return (
        <section className="sign-up form-container">
            <h2 className="form-container-title">I do not have an account</h2>
            <h4 className="form-container-sub-title">Sign up with email and password</h4>
            <FormSignUp/>
        </section>
    );
}

export default SignUp;