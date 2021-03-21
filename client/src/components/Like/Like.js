import {Component} from 'react';

class Like extends Component {
    handleClick = () => {
        this.props.onLike();
    }

    render() {
        return (
            <span className="main-article-details-thumb-up">
                <i className="far fa-thumbs-up" onClick={this.handleClick}>Like</i>
            </span>
        )
    }
}

export default Like;