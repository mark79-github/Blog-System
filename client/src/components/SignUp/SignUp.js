import FormSignUp from '../FormSignUp';

import styles from './SignUp.module.css';

const SignUp = () => {
    return (
        <section className={styles.container}>
            <h2 className={styles.title}>I do not have an account</h2>
            <h4 className={styles.subtitle}>Sign up with email and password</h4>
            <FormSignUp/>
        </section>
    );
}

export default SignUp;