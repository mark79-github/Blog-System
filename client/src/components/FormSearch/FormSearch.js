import {Component} from 'react'
import * as postService from '../../services/postService'

class FormSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: ''
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        postService.getAll({title: this.state.search})
            .then((res) => {
                this.setState({
                    search: ''
                })
            })
            .catch(err => console.error("Error: ", err))
    }

    render() {
        return (
            <form className="header-search-form" onSubmit={this.handleSubmit}>
                <input type="text" name="search" id="search" placeholder="Search by title ..."
                       onChange={this.handleInputChange}/>
                <input type="submit" className="header-search-form-submit" value="&#xf002;"/>
            </form>
        );
    }
}

export default FormSearch;