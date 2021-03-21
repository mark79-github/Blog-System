import {Component} from 'react';

class Unlike extends Component {

    handleClick = () => {
        this.props.onUnlike();
    }

    render() {
        return (
            <span className="main-article-details-thumb-down">
                <i className="far fa-thumbs-down" onClick={this.handleClick}>Unlike</i>
            </span>
        )
    }
}

export default Unlike;
