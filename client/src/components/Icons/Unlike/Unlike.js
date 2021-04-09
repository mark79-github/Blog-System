import {Component} from 'react';

class Unlike extends Component {

    handleClick = () => {
        this.props.onUnlike();
    }

    render() {
        return (
            // <div className="main-article-details-likes-icons">
            <div>
                <i className="far fa-thumbs-down" onClick={this.handleClick}/>
            </div>
            // </div>
        )
    }
}

export default Unlike;
