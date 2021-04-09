import {Component} from 'react';

import styles from './FormOrder.module.css';

const selectOptions = [
    {
        label: "Last published",
        value: "publishedAt",
    },
    {
        label: "Most likes",
        value: "likes",
    },
    {
        label: "Most comments",
        value: "comments",
    },
    {
        label: "Most views",
        value: "visits",
    },
];

class FormOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderBy: 'publishedAt'
        };
    }

    selectChangeHandler = (event) => {
        this.setState({orderBy: event.target.value});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.orderBy !== this.state.orderBy) {
            this.props.onOrderChange(this.state.orderBy);
        }
    }

    render() {
        return (
            <section>
                <form className={styles.form}>
                    <select className={styles.select} value={this.state.orderBy}
                            onChange={this.selectChangeHandler} disabled={this.props.disabled}>
                        {selectOptions.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </form>
            </section>
        );
    }
}

export default FormOrder;