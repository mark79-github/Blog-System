import {lazy, Suspense} from 'react';

import Loader from 'react-loader-spinner';

const DetailsPage = (props) => {

    const Details = lazy(() => import('../../components/Details'));

    return (

        <Suspense fallback={<Loader type="Rings" color="white" height={80} width={80}/>}>
            <Details {...props}/>
        </Suspense>

    );
}

export default DetailsPage;