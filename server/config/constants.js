export const msg = {
    DB_CONNECTED: (host, name, port) => `Successfully connected to http://${host}:${port}/database:${name}/`,
    DB_CONNECTION_ERROR: "Connection error: ",
    APPLICATION_RUNNING: (port) => `Application is up & listening on port ${port} ...`
}
