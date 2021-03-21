const credentials = {
    development: {
        username: "",
        password: "",
        db: "blog-system-db",
        server: "127.0.0.1",
        privateKey: "pr1v@t3-k3y",
    },
    production: {
        username: "admin",
        password: "admin",
        db: "blog-system-db",
        server: "cluster0.rexr9.mongodb.net",
        privateKey: "pr1v@t3-k3y",
    }
}

module.exports = credentials[process.env.NODE_ENV.trim()];