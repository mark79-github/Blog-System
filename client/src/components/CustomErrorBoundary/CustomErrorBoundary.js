import React from 'react';
import NotFound from '../NotFound';

class CustomErrorBoundary extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
            error: ''
        };
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error: error.message
        }
    }

    componentDidCatch(error) {
        console.log('Error from componentDidCatch: ', error.message);
    }

    componentDidMount() {
        window.onunhandledrejection = (error) => {
            this.setState({
                hasError: true,
                error: error.reason.message
            })
        }
    }

    render() {
        if (this.state.hasError) {
            return <NotFound error={this.state.error}/>
        }

        return this.props.children;
    }
}

export default CustomErrorBoundary;