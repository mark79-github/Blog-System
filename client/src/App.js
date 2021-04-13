import React, {useContext} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import AuthContext from './contexts';

import HomePage from './pages/home-page';
import SignPage from './pages/sign-page';
import DetailsPage from './pages/details-page';
import ErrorPage from './pages/error-page';
import CreatePostPage from './pages/create-post-page';
import EditPostPage from './pages/edit-post-page';
import Notification from './components/Notification';
import Header from './components/Header';
import Footer from './components/Footer';
import Logout from './components/Logout';

import isAuth from './hoc';

const App = () => {

    const {isLoggedIn} = useContext(AuthContext);

    return (
        <>
            <Notification/>
            <Header/>
            <Switch>

                <Route path={'/'} component={(props) => <HomePage {...props}/>} exact/>

                <Route exact path='/post/create' component={isAuth(CreatePostPage)}/>

                <Route exact path='/post/:id/edit' render={(props) => (
                    isLoggedIn ? <EditPostPage {...props}/> : <Redirect to='/user/sign'/>
                )}/>
                {/*<Route exact path={'/post/:id/edit'} component={(props) => <EditPostPage {...props}/>}/>*/}
                {/*<Route exact path={'/post/:id/edit'} component={isAuth(<EditPostPage/>)}/>*/}

                <Route path={'/post/:id'} component={DetailsPage} exact/>

                <Route exact path="/user/sign" render={() => (
                    isLoggedIn ? <Redirect to='/'/> : <SignPage/>
                )}/>
                {/*<Route path={'/user/sign'} component={SignPage} exact/>*/}

                <Route exact path="/user/logout" render={() => (
                    isLoggedIn ? <Logout/> : <Redirect to="/"/>
                )}/>
                {/*<Route path={'/user/logout'} component={Logout} exact/>*/}

                <Route exact path='/error' component={ErrorPage}/>
                <Route component={ErrorPage}/>

            </Switch>
            <Footer/>
        </>
    );
}

export default App;
