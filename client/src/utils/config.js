export const config = {
    development: {
        baseURL: `http://localhost:${process.env.PORT || 5000}`
    },
    production: {
        baseURL: `https://blog-system-application.herokuapp.com`
    }
}
