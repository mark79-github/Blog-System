import React from 'react';

import styles from './index.module.css';

import SignUp from '../../components/SignUp';
import SignIn from '../../components/SignIn';

const SignPage = () => {

    return (
        <main>
            <div className={styles.container}>
                <SignUp/>
                <SignIn/>
            </div>
        </main>
    );
}

export default SignPage;