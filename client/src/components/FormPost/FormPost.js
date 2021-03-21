import {Component} from 'react';
import * as postService from '../../services/postService';

class FormPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            content: '',
            urlToImage: ''
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        postService.addPost(this.state.title, this.state.content, this.state.urlToImage)
            .then(() => this.setState({
                title: '',
                content: '',
                urlToImage: ''
            }))
            .catch(err => console.error("Error: ", err))
    }

    render() {
        return (
            <form className="form" onSubmit={this.handleSubmit}>
                <input type="text" name="title" placeholder="Title" value={this.state.title}
                       onChange={this.handleInputChange}/>
                <textarea name="content" cols="30" rows="10" placeholder="Content" value={this.state.content}
                          onChange={this.handleInputChange}/>
                <input type="text" name="urlToImage" placeholder="Image url" value={this.state.urlToImage}
                       onChange={this.handleInputChange}/>
                <input type="submit" value="Create"/>
            </form>
        );
    }
}

export default FormPost;