import {Component} from 'react';

class Unlike extends Component {

    handleClick = () => {
        this.props.onUnlike();
    }

    render() {
        return (
            <div className="main-article-details-likes-icons">
                <i className="far fa-thumbs-down" onClick={this.handleClick}/>
            </div>
        )
    }
}

export default Unlike;
