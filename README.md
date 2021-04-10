# Blog System

#### Final project of SoftUni's course

![Software University 2021](client/public/logo.png)

### [ReactJS - March 2021](https://softuni.bg/trainings/3315/reactjs-march-2021)

## Project Description

Blog System is a blog like **MERN** application for posting all sort of articles.

## Author

* **Martin Dimitrov** - [mark79-github](https://github.com/mark79-github/)

## Built With

#### Front-End (Styling with CSS)

* [React](https://reactjs.org/) - JavaScript library for building user interfaces.
* [react-router](https://reactrouter.com/) - collection of navigational components.
* [react-toastify](https://www.npmjs.com/package/react-toastify) - add notifications to your app with ease.
* [moment](https://momentjs.com/) - parse, validate, manipulate, and display dates and times in JavaScript.
* [react-loader-spinner](https://www.npmjs.com/package/react-loader-spinner) - provides simple React SVG spinner
  component which can be implemented for async await operation before data loads to the view.
* [formik](https://formik.org/) - the world's most popular open source form library for React and React Native.
* [yup](https://www.npmjs.com/package/yup) - JavaScript schema builder for value parsing and validation.

#### Back-End

* [Node.js](https://nodejs.org/en/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
* [express](https://expressjs.com/) - fast & minimalist web framework for Node.js
* [mongoose](https://mongoosejs.com/) - elegant MongoDB object modeling for Node.js
* [bcrypt](https://www.npmjs.com/package/bcrypt) - library to hash passwords.
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - securely transmitting information between parties as a
  JSON object.
* [cors](https://www.npmjs.com/package/cors) - CORS is a node.js package to enable CORS with various options.

### DB Schema

#### User

* Model with the following fields : displayName, avatarImageUrl, email, password.

#### Post

* Model with the following fields : title, content, author, urlToImage, publishedAt, comments, likes, visits.

## Functionality

### Public Part

###### The public part is visible by any user with or without authentication:

- **Sign page**
  _Anonymous users can sign in/up. For register user have to provide display name, email, password and to upload an
  image._
- **Home page**
  _All users can view all posts, search by title or change the order by different criteria. Authenticated users have
  ability to view their own posts._
- **Details page**
  _All users can view detail information for each post. Guests can see only the button to show/hide comments for given
  post. Other users can see the option to like/dislike the article. The author of post have ability to edit or delete
  post. At the comments section of detail view authenticated users can write or delete comments._
- **Error page**

### Private Part

###### The private part is visible by authenticated users:

- **Create/Edit post page**
  _Authenticated users have ability to create/edit posts._
  
### How to run this project

- install commands both from server and client folder

 <pre>yarn install</pre>

- run commands both from server and client folder

 <pre>yarn start</pre>

## License

This project is licensed under the following [license](LICENSE)

## Deploy

[![Netlify Status](https://api.netlify.com/api/v1/badges/a456b18c-e699-4167-a469-9ed284ba1981/deploy-status)](https://app.netlify.com/sites/blog-system-application/deploys)
* See application LIVE at: [https://blog-system-application.netlify.app](https://blog-system-application.netlify.app/)
* Server running at: [https://blog-system-application.herokuapp.com](https://blog-system-application.herokuapp.com/)
* MongoDB Atlas for storing database at cloud
  service: [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)



