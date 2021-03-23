import {Component} from 'react'

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

        console.log('name: ', name, ' value: ', value);
    }

    handleSubmit = (event) => {
        event.preventDefault();

        //TODO postService
    }

    render() {
        return (
            <form className="header-search-form" onSubmit={this.handleSubmit}>
                <input type="search" name="search" id="search" placeholder="Search by title ..."
                       onChange={this.handleInputChange}/>
                <input type="submit" className="header-search-form-submit" value="&#xf002;"/>
            </form>
        );
    }
}

export default FormSearch;