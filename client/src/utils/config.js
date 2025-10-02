export const config = {
    development: {
        baseURL: `http://localhost:${process.env.PORT || 5000}`
    },
    production: {
        baseURL: process.env.REACT_APP_BASE_API_URL
    }
}
