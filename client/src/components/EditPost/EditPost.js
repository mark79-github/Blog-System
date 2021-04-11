import {Component} from 'react';
import Loader from 'react-loader-spinner';

import notificationService from '../../services/notificationService';
import * as postService from '../../services/postService';

import styles from './EditPost.module.css';

import AuthContext from '../../contexts';

import FormPost from '../FormPost';
import {notificationMsg} from '../../utils/globals';

class EditPost extends Component {

    constructor(props) {
        super(props);

        this.postId = props.match.params.id;
        this._isMounted = false;

        this.state = {
            post: {},
        }
    }

    editPost = (data) => {

        let title = data.title
        let content = data.content;
        let urlToImage = data.urlToImage;

        postService.editPost(this.postId, title, content, urlToImage, this.props.token)
            .then(() => {
                this.props.history.push(`/post/${this.postId}`);
                notificationService.successMsg(notificationMsg.editPostSuccessfully);
            })
            .catch(err => notificationService.errorMsg(err.message))
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        postService.getById(this.postId)
            .then(post => {
                if (this._isMounted) {
                    this.setState({post});
                }
            })
            .catch(err => {
                notificationService.errorMsg(err.message)
            })
    }

    render() {

        if (Object.keys(this.state.post).length === 0) {
            return (
                <main className={styles.container}>
                    <Loader type="Rings" color="white" height={80} width={80}/>
                </main>
            )
        }

        return (
            <main className={styles.container}>
                <section className={styles.wrapper}>
                    <h2 className={styles.title}>Edit Post</h2>
                    <FormPost data={this.state.post} onSubmitFormHandler={this.editPost}/>
                </section>
            </main>
        );
    }
}

const EditPostWithContext = (props) => (
    <AuthContext.Consumer>
        {({token}) => (
            <EditPost {...props} token={token}/>
        )}
    </AuthContext.Consumer>
);

export default EditPostWithContext;