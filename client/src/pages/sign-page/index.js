import styles from './index.module.css';

import SignUp from '../../components/SignUp';
import SignIn from '../../components/SignIn';

const SignPage = () => {

    return (
        <main className={styles.container}>
            <SignUp/>
            <SignIn/>
        </main>
    );
}

export default SignPage;