import {Route, Switch} from 'react-router-dom';

import HomePage from './pages/home-page';
import SignPage from './pages/sign-page';
import DetailsPage from './pages/details-page';
import ErrorPage from './pages/error-page';
import CreatePostPage from './pages/create-post-page';
import EditPostPage from './pages/edit-post-page';
import ProfilePage from './pages/profile-page';
import Header from './components/Header';
import Footer from './components/Footer';
import Logout from './components/Logout';

import haveToBeAuthenticated from './hocs/haveToBeAuthenticated';
import haveToBeGuest from './hocs/haveToBeGuest';

const App = () => {

    return (
        <>
            <Header/>
            <Switch>

                <Route path={'/'} component={(props) => <HomePage {...props}/>} exact/>

                <Route exact path='/post/create' component={haveToBeAuthenticated(CreatePostPage)}/>

                <Route exact path={'/post/:id'} component={DetailsPage} />

                <Route exact path={'/post/:id/edit'} component={haveToBeAuthenticated(EditPostPage)}/>

                <Route exact path={'/user/sign'} component={haveToBeGuest(SignPage)}/>

                <Route exact path={'/user/:id'} component={haveToBeAuthenticated(ProfilePage)}/>

                <Route exact path={'/user/logout'} component={haveToBeAuthenticated(Logout)}/>

                <Route exact path='/error' component={ErrorPage}/>

                <Route component={ErrorPage}/>

            </Switch>
            <Footer/>
        </>
    );
}

export default App;
