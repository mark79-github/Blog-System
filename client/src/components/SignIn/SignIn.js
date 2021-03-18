const SignIn = () => {
    return (
        <section className="sign-in form-container">
            <h2 className="form-container-title">I already have an account</h2>
            <h4 className="form-container-sub-title">SignIn in with your email</h4>
            <form action="#" className="form">
                <input type="email" name="email" placeholder="Email"/>
                <input type="password" name="password" placeholder="Password"/>
                <input type="submit" value="SignIn In"/>
            </form>
        </section>
    );
}

export default SignIn;