import React, {useState} from 'react';
import Main from "../../components/Main";
import Search from "../../components/Search";

const HomePage = (props) => {
    const [filter, setFilter] = useState({})
    // console.log('props.searchObj', props.searchObj);

    const onSearch = (searchQry) => {
        console.log('searchQry', searchQry)
        setFilter(searchQry);
    }

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
    searchObj = Object.assign(searchObj, filter);

    console.log('searchObj', searchObj);

    return (
        <>
            <Main searchQry={searchObj}/>
        </>
    );
}

export default HomePage;