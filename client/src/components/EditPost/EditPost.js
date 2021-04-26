import {useContext, useEffect, useRef, useState} from 'react';
import Loader from 'react-loader-spinner';

import * as postService from '../../services/postService';

import styles from './EditPost.module.css';

import AuthContext from '../../contexts';

import FormPost from '../FormPost';
import {useHistory, useParams} from 'react-router-dom';

const EditPost = () => {

    const {id} = useParams();
    const {token, userId} = useContext(AuthContext);
    const history = useHistory();

    const [post, setPost] = useState({});

    const isMounted = useRef(false);

    const editPost = (data) => {

        let title = data.title
        let content = data.content;
        let urlToImage = data.urlToImage;

        postService.editPost(id, title, content, urlToImage, token)
            .then(() => {
                history.push(`/post/${id}`);
            });
    }

    useEffect(() => {
        const getPostById = (postId) => {
            postService.getById(postId)
                .then(post => {
                    if (isMounted) {
                        if (post.author === userId) {
                            setPost(post);
                        } else {
                            history.push('/');
                        }
                    }
                });
        }

        isMounted.current = true;
        getPostById(id);

        return () => {
            isMounted.current = false;
        }
    }, [id, history, userId]);

    return (
        <main className={styles.container}>
            {
                Object.keys(post).length
                    ?
                    <section className={styles.wrapper}>
                        <h2 className={styles.title}>Edit Post</h2>
                        <FormPost data={post} onSubmitFormHandler={editPost}/>
                    </section>
                    :
                    <Loader type="Rings" color="white" height={80} width={80}/>
            }
        </main>
    );

}

export default EditPost;

// class EditPost extends Component {
//
//     constructor(props) {
//         super(props);
//
//         this.postId = props.match.params.id;
//         this._isMounted = false;
//
//         this.state = {
//             post: {},
//         }
//     }
//
//     editPost = (data) => {
//
//         let title = data.title
//         let content = data.content;
//         let urlToImage = data.urlToImage;
//
//         postService.editPost(this.postId, title, content, urlToImage, this.props.token)
//             .then(() => {
//                 this.props.history.push(`/post/${this.postId}`);
//             });
//     }
//
//     componentWillUnmount() {
//         this._isMounted = false;
//     }
//
//     componentDidMount() {
//         this._isMounted = true;
//         postService.getById(this.postId)
//             .then(post => {
//                 if (this._isMounted) {
//                     if (post.author === this.props.userId) {
//                         this.setState({post});
//                     } else {
//                         this.props.history.push('/');
//                     }
//                 }
//             });
//     }
//
//     render() {
//
//         if (Object.keys(this.state.post).length === 0) {
//             return (
//                 <main className={styles.container}>
//                     <Loader type="Rings" color="white" height={80} width={80}/>
//                 </main>
//             )
//         }
//
//         return (
//             <main className={styles.container}>
//                 <section className={styles.wrapper}>
//                     <h2 className={styles.title}>Edit Post</h2>
//                     <FormPost data={this.state.post} onSubmitFormHandler={this.editPost}/>
//                 </section>
//             </main>
//         );
//     }
// }
//
// const EditPostWithContext = (props) => (
//     <AuthContext.Consumer>
//         {({token, userId}) => (
//             <EditPost {...props} token={token} userId={userId}/>
//         )}
//     </AuthContext.Consumer>
// );

// export default EditPostWithContext;