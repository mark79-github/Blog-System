import {Component} from 'react'

class FormSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: ''
        }
    }

    handleInputChange = (event) => {
        this.setState({
            search: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({
            search: ''
        })
        // postService.getAll({title: this.state.search})
        //     .then((res) => {
        //         this.setState({
        //             search: ''
        //         })
        //     })
        //     .catch(err => console.error("Error: ", err))
    }

    render() {
        return (
            <form className="header-search-form" onSubmit={this.handleSubmit}>
                <input type="text" name="search" id="search" placeholder="Search by title ..."
                       value={this.state.search}
                       onChange={this.handleInputChange}/>
                <input type="submit" className="header-search-form-submit" value="&#xf002;"/>
            </form>
        );
    }

}

export default FormSearch;