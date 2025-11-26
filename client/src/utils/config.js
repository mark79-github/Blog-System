export const config = {
    development: {
        baseURL: `http://localhost:${import.meta.env.PORT || 5000}`
    },
    production: {
        baseURL: import.meta.env.VITE_BASE_API_URL
    }
}
