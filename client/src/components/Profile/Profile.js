import {useEffect, useRef, useState} from 'react';
import {useParams} from 'react-router-dom';

import styles from './Profile.module.css';

import * as userService from '../../services/userService';
import Avatar from "../Icons/Avatar";
import Loader from "react-loader-spinner";

const Profile = () => {
    const {id} = useParams();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;
        userService.getById(id)
            .then((user) => {
                if (isMounted) {
                    setUser(user);
                    setLoading(false);
                }
            })
    }, [id]);

    if (loading) {
        return (
            // <main className={styles.container}>
            <Loader type="Rings" color="white" height={80} width={80}/>
            // </main>
        )
    }

    return (
        <section className={styles.profile}>
            <h2 className={styles.title}>User profile</h2>
            <div className={styles['img-wrapper']}>
                {/*<img className={styles.img} src={user.avatarImageUrl} alt="logo"/>*/}
                <Avatar img={user.avatarImageUrl}/>
            </div>
            <span className={styles.span}>Display name: {user.displayName}</span>
        </section>
    )
}

export default Profile;