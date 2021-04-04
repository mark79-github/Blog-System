import FormSignIn from "../FormSignIn";

const SignIn = () => {
    return (
        <section className="sign-in form-container">
            <h2 className="form-container-title">I already have an account</h2>
            <h4 className="form-container-sub-title">Sign in with your email</h4>
            <FormSignIn/>
        </section>
    );
}

export default SignIn;