const baseURL = "http://localhost:5000";
// const baseURL = `http://localhost:${node.env.PORT}`;
const authURL = `${baseURL}/api/auth`;
const usersURL = `${baseURL}/api/users`;
const postURL = `${baseURL}/api/posts`;

const api = {
    auth: {
        registerURL: `${authURL}/register`,
        loginURL: `${authURL}/login`,
    },
    users: {
        base: `${usersURL}`,
    },
    posts: {
        base: `${postURL}`,
        like: `${postURL}/like`,
        unlike: `${postURL}/unlike`,
        comment: `${postURL}/comment`,
    }
};

const globalConstants = {
    AUTH_TOKEN: 'authToken',
    TITLE_MIN_LENGTH: 5,
    PASSWORD_MIN_LENGTH: 5,
    CONTENT_MIN_LENGTH: 20,
    DISPLAY_NAME_MIN_LENGTH: 3,
    DISPLAY_NAME_MAX_LENGTH: 15,
    COMMENT_MIN_LENGTH: 10,
    URL_TO_IMAGE: /^(http[s]?:\/\/.*.(?:png|jpg|gif|svg|jpeg))$/i,
    MAX_FILE_SIZE: 2 * 1024 * 1024,
    IMAGE_FORMATS: [
        'image/jpeg', 'image/jpg', 'image/bmp', 'image/png'
    ]
}

const notificationMsg = {
    loginSuccessfully: 'Successfully login',
    logoutSuccessfully: 'Successfully logout',
    commentSuccessfully: 'Comment created successfully',
    addPostSuccessfully: 'Post created successfully',
    editPostSuccessfully: 'Post edited successfully',
    searchSuccessfully: 'Search successfully',
    likeSuccessfully: 'Post liked successfully',
    unlikeSuccessfully: 'Post disliked successfully',
    deleteCommentSuccessfully: 'Comment deleted successfully',
    deletePostSuccessfully: 'Post deleted successfully',
    showCommentsSuccessfully: 'Comments show successfully',
    hideCommentsSuccessfully: 'Comments hide successfully',
    noComments: 'There are no comments to display',
    requiredField: 'Required field ...',
    titleMinLength: `Title must be at least ${globalConstants.TITLE_MIN_LENGTH} characters long`,
    passwordMinLength: `Password must be at least ${globalConstants.PASSWORD_MIN_LENGTH} characters long`,
    contentMinLength: `Content must be at least ${globalConstants.CONTENT_MIN_LENGTH} characters long`,
    displayNameMinLength: `Display name must be at least ${globalConstants.DISPLAY_NAME_MIN_LENGTH} characters long`,
    displayNameMaxLength: `Display name must be at most ${globalConstants.DISPLAY_NAME_MAX_LENGTH} characters long`,
    commentMinLength: `Comment must be at least ${globalConstants.COMMENT_MIN_LENGTH} characters long`,
    urlToImageValidate: `Provide valid URL with image`,
    emailValidate: `Invalid email format`,
    repeatPasswordValidate: 'Repeat password not match',
    largeFileSize: 'The file is too large',
    supportedFormats: 'Accepted formats: .jpeg, .jpg, .bmp, .png',
};

const routes = {};

export {api, notificationMsg, routes, globalConstants};
