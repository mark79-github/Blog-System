import FormSignIn from '../FormSignIn';

import styles from './SignIn.module.css';

const SignIn = () => {
    return (
        <section className={styles.container}>
            <h2 className={styles.title}>I already have an account</h2>
            <h4 className={styles.subtitle}>Sign in with your email</h4>
            <FormSignIn/>
        </section>
    );
}

export default SignIn;