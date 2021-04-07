# Blog System

### Final project

### [ReactJS - march 2021](https://softuni.bg/trainings/3315/reactjs-march-2021) course of [SoftUni](https://softuni.bg/)

## Project Description

Blog System is a blog like application for posting all sort of articles.

## MERN Application

## Built With

#### Front-end:

* [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
* [react-router](https://reactrouter.com/) - React Router is a collection of navigational components that compose
  declaratively with your application.
* [react-toastify](https://www.npmjs.com/package/react-toastify) - React-Toastify allows you to add notifications to
  your app with ease.
* [moment](https://momentjs.com/) - Parse, validate, manipulate, and display dates and times in JavaScript.
* [react-loader-spinner](https://www.npmjs.com/package/react-loader-spinner) - react-spinner-loader provides simple
  React SVG spinner component which can be implemented for async await operation before data loads to the view.
* [formik](https://formik.org/) - Formik is the world's most popular open source form library for React and React
  Native.
* [yup](https://www.npmjs.com/package/yup) - Yup is a JavaScript schema builder for value parsing and validation.

#### Back-end:

* [Node.js](https://nodejs.org/en/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
* [express](https://expressjs.com/) - Fast, minimalist web framework for Node.js
* [mongoose](https://mongoosejs.com/) - Elegant MongoDB object modeling for Node.js
* [bcrypt](https://www.npmjs.com/package/bcrypt) - A library to help you hash passwords.
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - JSON Web Token (JWT) is an open standard that defines a
  way for securely transmitting information between parties as a JSON object.
* [cors](https://www.npmjs.com/package/cors) - CORS is a node.js package for providing a Connect/Express middleware that
  can be used to enable CORS with various options.

## Author

* **Martin Dimitrov** - [mark79-github](https://github.com/mark79-github/)

## Functionality

### Public Part

###### The public part is visible by any user with or without authentication:

- **Sign page** 
  _Anonymous users can sign in/up. For register user have to provide display name, email, password and to
  upload an image._
- **Home page** 
  _All users can view all posts, search by title or change the order by different criteria. Authenticated
  users have ability to view their own posts._
- **Details page** 
  _All users can view detail information for each post. Guests can see only the button to show/hide
  comments for given post. Other users can see the option to like/dislike the article. The author of post have ability
  to edit or delete post. At the comments section of detail view authenticated users can write or delete comments._
- **Error page**

### Private Part

###### The private part is visible by authenticated users:

- **Create/Edit post page** 
  _Authenticated users have ability to create/edit posts._

### User

* model with the following fields : displayName, avatarImageUrl, email,password.

### Post

* model with the following fields : title, content, author, urlToImage, publishedAt, comments, likes, visits.

## License

* this project is licensed under the MIT License

## Deploy

* See application LIVE at: [https://blog-system-application.netlify.app](https://blog-system-application.netlify.app/)
* Server running at: [https://blog-system-application.herokuapp.com](https://blog-system-application.herokuapp.com/)
* MongoDB Atlas for storing database at cloud service: [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)



