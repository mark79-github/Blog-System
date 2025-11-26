import {Route, Routes} from 'react-router-dom';

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
    const GuestSignPage = haveToBeGuest(SignPage);
    const AuthenticatedEditPostPage = haveToBeAuthenticated(EditPostPage);
    const AuthenticatedCreatePostPage = haveToBeAuthenticated(CreatePostPage);
    const LogoutPage = haveToBeAuthenticated(Logout);
    const UserProfilePage = haveToBeAuthenticated(ProfilePage);

    return (
        <>
            <Header/>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/post/create' element={<AuthenticatedCreatePostPage/>}/>
                <Route path='/post/:id' element={<DetailsPage/>}/>
                <Route path='/post/:id/edit' element={<AuthenticatedEditPostPage/>}/>
                <Route path='/user/sign' element={<GuestSignPage/>}/>
                <Route path='/user/logout' element={<LogoutPage/>}/>
                <Route path='/user/:id' element={<UserProfilePage/>}/>
                <Route path='/error' element={<ErrorPage/>}/>
                <Route path='*' element={<ErrorPage/>}/>
            </Routes>
            <Footer/>
        </>
    );
};

export default App;
