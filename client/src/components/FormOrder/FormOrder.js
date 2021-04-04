import {Component} from 'react'

class FormOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderBy: 'Comments'
        };
    }

    selectChangeHandler = (event) => {
        this.setState({
            orderBy: event.target.value
        })
    }


    formOnChangeHandler = (event) => {
        console.log(event.target.value);
    }

    //TODO Not implemented hide from DOM with display:none
    render() {
        return (
            <section className="header-select">
                <form className="header-select-form" onChange={this.formOnChangeHandler}>
                    <select className="header-select-select" value={this.state.orderBy}
                            onChange={this.selectChangeHandler}>
                        <option value="likes">Likes ascending</option>
                        <option value="likes">Likes descending</option>
                        <option value="views">Views ascending</option>
                        <option value="views">Views descending</option>
                        <option value="comments">Comments ascending</option>
                        <option value="comments">Comments descending</option>
                        <option value="createdAt">Created ascending</option>
                        <option value="createdAt">Created descending</option>
                    </select>
                </form>
            </section>
        );
    }
}

export default FormOrder;