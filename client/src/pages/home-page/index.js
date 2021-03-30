import Main from "../../components/Main";

const HomePage = (props) => {

    console.log(props);

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
    console.log('searchObj in HomePage', searchObj);

    return (
        <>
            {/*<Main searchQry={searchObj}/>*/}
            <Main searchQry={searchObj}/>
        </>
    );
}

export default HomePage;