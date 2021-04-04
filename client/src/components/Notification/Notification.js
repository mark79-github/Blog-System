import React from 'react';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notification = () => (
    <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar
        newestOnTop
        closeButton={false}
        closeOnClick
        draggable
        pauseOnHover
        pauseOnVisibilityChange
        rtl={false} // right to left content
        transition={Flip}
        className="notifications-container"
        toastClassName="notification"
    />
);

export default Notification;
