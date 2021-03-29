import React from 'react';
import Main from "../../components/Main";
import Search from "../../components/Search";

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
        <>
            <Search/>
            <Main searchQry={searchObj}/>
        </>
    );
}

export default HomePage;