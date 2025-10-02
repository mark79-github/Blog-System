export const config = {
    development: {
        baseURL: `http://localhost:${process.env.PORT || 5000}`
    },
    production: {
        baseURL: process.env.BASE_API_URL
    }
}
