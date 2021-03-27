import {useContext, useState} from 'react';
import * as postService from '../../services/postService';
import AuthContext from "../AuthContext";
import {useHistory} from "react-router-dom";

// class FormPost extends Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             title: '',
//             content: '',
//             urlToImage: ''
//         }
//     }
//
//     handleInputChange = (event) => {
//         const target = event.target;
//         const value = target.type === 'checkbox' ? target.checked : target.value;
//         const name = target.name;
//
//         this.setState({
//             [name]: value
//         });
//     }
//
//     handleSubmit = (event) => {
//         event.preventDefault();
//         postService.addPost(this.state.title, this.state.content, this.state.urlToImage)
//             .then((res) => {
//                 // console.log('res add post', res);
//                 this.setState({
//                     title: '',
//                     content: '',
//                     urlToImage: ''
//                 });
//                 //TODO useHistory to redirect
//             })
//             .catch(err => console.error("Error: ", err))
//     }
//
//     render() {
//         return (
//             <form className="form" onSubmit={this.handleSubmit}>
//                 <input type="text" name="title" placeholder="Title" value={this.state.title}
//                        onChange={this.handleInputChange}/>
//                 <textarea name="content" cols="30" rows="10" placeholder="Content" value={this.state.content}
//                           onChange={this.handleInputChange}/>
//                 <input type="text" name="urlToImage" placeholder="Image url" value={this.state.urlToImage}
//                        onChange={this.handleInputChange}/>
//                 <input type="submit" value="Create"/>
//             </form>
//         );
//     }
// }

const FormPost = () => {
    const authContext = useContext(AuthContext);
    let history = useHistory();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [urlToImage, setUrlToImage] = useState('');

    const handleTitleInputHandler = (event) => {
        setTitle(event.target.value);
    }

    const handleContentInputHandler = (event) => {
        setContent(event.target.value);
    }

    const handleUrlToImageInputHandler = (event) => {
        setUrlToImage(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        postService.addPost(title, content, urlToImage, authContext.token)
            .then((res) => {
                console.log('res add post', res);
                setTitle('');
                setContent('');
                setUrlToImage('');
                history.push('/');
            })
            .catch(err => console.error("Error: ", err))
    }


    return (
        <form className="form" onSubmit={handleSubmit}>
            <input type="text" name="title" placeholder="Title" value={title}
                   onChange={handleTitleInputHandler}/>
            <textarea name="content" placeholder="Content" value={content}
                      onChange={handleContentInputHandler}/>
            <input type="text" name="urlToImage" placeholder="Image url" value={urlToImage}
                   onChange={handleUrlToImageInputHandler}/>
            <input type="submit" value="Create"/>
        </form>
    );
}

export default FormPost;