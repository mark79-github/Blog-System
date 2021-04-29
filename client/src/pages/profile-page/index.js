import styles from './index.module.css';

import Profile from '../../components/Profile';
import UserPosts from '../../components/UserPosts';

const ProfilePage = (props) => {

    return (
        <main className={styles.container}>
            <Profile/>
            <UserPosts {...props}/>
        </main>
    );
}

export default ProfilePage;