import styles from './index.module.css';

import Profile from '../../components/Profile';
import UserPosts from '../../components/UserPosts';

const ProfilePage = () => {

    return (
        <main className={styles.container}>
            <Profile/>
            <UserPosts/>
        </main>
    );
}

export default ProfilePage;