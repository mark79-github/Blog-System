import {lazy, Suspense} from 'react';

import Loader from 'react-loader-spinner';

const HomePage = (props) => {

    const Main = lazy(() => import('../../components/Main'));

    return (

        <Suspense fallback={<Loader type="Rings" color="white" height={80} width={80}/>}>
            <Main {...props}/>
        </Suspense>

    );
}

export default HomePage;