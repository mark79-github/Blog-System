module.exports = {
    msg: {
        DB_CONNECTED: (host, name, port) => {
            return `Successfully connected to http://${host}:${port}  /database:${name}/`
        },
        DB_CONNECTION_ERROR: "Connection error: ",
        APPLICATION_RUNNING: (port) => {
            return `Application is up & listening on port ${port} ...`;
        },
    }
}
