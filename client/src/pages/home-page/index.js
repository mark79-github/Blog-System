import React from 'react';
import Main from "../../components/Main";

const HomePage = (props) => {

    // console.log('location.search',props.location.search);
    //location.search

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

    // console.log(getQueryStringParams(props.location.search));

    return (
        <Main searchQry={getQueryStringParams(props.location.search)}/>
    );
}

export default HomePage;