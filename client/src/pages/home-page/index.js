import React from 'react';
import Main from "../../components/Main";

const HomePage = (props) => {

    console.log('props.searchObj', props.searchObj);

    const getQueryStringParams = (query) => {
        return query
            ? (/^[?#]/.test(query) ? query.slice(1) : query)
                .split('&')
                .reduce((params, param) => {
                        let [key, value] = param.split('=');
                        params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
                        return params;
                    }, {}
                )
            : {}
    };

    let searchObj = Object.assign({}, getQueryStringParams(props.location.search));
    searchObj = Object.assign(searchObj, props.searchObj);

    return (
        <Main searchQry={searchObj}/>
    );
}

export default HomePage;