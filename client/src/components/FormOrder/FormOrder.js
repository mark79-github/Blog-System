import {useEffect, useState} from 'react';

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

const FormOrder = (props) => {
    const [orderBy, setOrderBy] = useState('publishedAt');

    const selectChangeHandler = (event) => {
        setOrderBy(event.target.value);
    }

    useEffect(() => {
        props.onOrderChange(orderBy);
    }, [orderBy]);

    return (
        <section className={styles.container}>
            <form className={styles.form}>
                <select className={styles.select} value={orderBy}
                        onChange={selectChangeHandler} disabled={props.disabled}>
                    {selectOptions.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                    ))}
                </select>
            </form>
        </section>
    );
}

// class FormOrder extends Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {
//             orderBy: 'publishedAt'
//         };
//     }
//
//     selectChangeHandler = (event) => {
//         this.setState({orderBy: event.target.value});
//     }
//
//     componentDidUpdate(prevProps, prevState, snapshot) {
//         if (prevState.orderBy !== this.state.orderBy) {
//             this.props.onOrderChange(this.state.orderBy);
//         }
//     }
//
//     render() {
//         return (
//             <section className={styles.container}>
//                 <form className={styles.form}>
//                     <select className={styles.select} value={this.state.orderBy}
//                             onChange={this.selectChangeHandler} disabled={this.props.disabled}>
//                         {selectOptions.map((option, index) => (
//                             <option key={index} value={option.value}>{option.label}</option>
//                         ))}
//                     </select>
//                 </form>
//             </section>
//         );
//     }
// }

export default FormOrder;