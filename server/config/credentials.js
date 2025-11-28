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
        db: "blog-system",
        server: "cluster0.rqyl3.mongodb.net",
        privateKey: "pr1v@t3-k3y",
    }
}

const env = process.env.NODE_ENV?.trim() || "development";

export default credentials[env];
