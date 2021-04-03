import {Component} from 'react';
import Edit from "../Icons/Edit";

class Like extends Component {
    constructor(props) {
        super(props);
    }

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