import {Component} from 'react';
import Loader from 'react-loader-spinner';

import notificationService from '../../services/notificationService';
import * as postService from '../../services/postService';

import AuthContext from '../AuthContext';

import FormPost from '../FormPost';

class EditPost extends Component {

    constructor(props) {
        super(props);

        this.postId = props.match.params.id;

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
                this.props.history.push(`/post/${this.postId}`)
            })
            .catch(err => notificationService.errorMsg(err.message))
    }

    componentDidMount() {
        postService.getById(this.postId)
            .then(res => {
                this.setState({
                    post: res
                })
            })
            .catch(err => {
                notificationService.errorMsg(err.message)
            })
    }

    render() {

        if (Object.keys(this.state.post).length === 0) {
            return (
                <div className="main-container">
                    <Loader type="Rings" color="white" height={80} width={80}/>
                </div>
            )
        }

        return (
            <div className="main-container">
                <section className="form-container">
                    <h2 className="form-container-title post">Edit Post</h2>
                    <FormPost data={this.state.post} onSubmitFormHandler={this.editPost}/>
                </section>
            </div>
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