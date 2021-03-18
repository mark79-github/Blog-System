const Sign = () => {
    return(
        <main>
            <div className="sign-form-wrapper">
                <section className="sign-up form-container">
                    <h2 className="form-container-title">I do not have an account</h2>
                    <h4 className="form-container-sub-title">Sign up with email and password</h4>
                    <form action="#" className="form">
                        <input type="text" name="displayName" placeholder="Display Name"/>
                            <input type="email" name="email" placeholder="Email"/>
                                <input type="password" name="password" placeholder="Password"/>
                                    <input type="password" name="repeatPassword" placeholder="Repeat Password"/>
                                        <input type="submit" value="Sign Up"/>
                    </form>
                </section>
                <section className="sign-in form-container">
                    <h2 className="form-container-title">I already have an account</h2>
                    <h4 className="form-container-sub-title">Sign in with your email</h4>
                    <form action="#" className="form">
                        <input type="email" name="email" placeholder="Email"/>
                            <input type="password" name="password" placeholder="Password"/>
                                <input type="submit" value="Sign In"/>
                    </form>
                </section>
            </div>
        </main>
    );
}

export default Sign;