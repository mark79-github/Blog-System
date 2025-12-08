import React from 'react';
import PropTypes from 'prop-types';
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
        globalThis.onunhandledrejection = (error) => {
            this.setState({
                hasError: true,
                error: error.reason?.message || 'Unhandled rejection'
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

CustomErrorBoundary.propTypes = {
    children: PropTypes.node
}

export default CustomErrorBoundary;
