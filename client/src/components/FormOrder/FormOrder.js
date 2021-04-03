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

    render() {
        return (
            <section className="header-select">
                <form action="#" className="header-select-form" onChange={this.formOnChangeHandler}>
                    <label className="header-select-label">Order By
                        <select className="header-select-select" value={this.state.orderBy}
                                onChange={this.selectChangeHandler}>
                            <option value="likes asc">Likes</option>
                            <option value="views desc">Views</option>
                            <option value="comments">Comments</option>
                            <option value="createdAt">Created</option>
                        </select>
                    </label>
                </form>
            </section>
        );
    }
}

export default FormOrder;