import {Component} from 'react';

class Like extends Component {

    handleClick = () => {
        this.props.onLike();
    }

    render() {
        return (
            // <div className="main-article-details-likes-icons">
            <div>
                <i className="far fa-thumbs-up" onClick={this.handleClick}/>
            </div>
            // </div>
        )
    }
}

export default Like;