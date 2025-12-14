import mongoose from "mongoose";

export const liveness = (req, res) => {
    return res.status(200).json({
        status: "ok",
        uptimeSec: Math.floor(process.uptime()),
        timestamp: new Date().toISOString(),
    })
}

export const readiness = async (req, res) => {
    const mongoState = mongoose.connection.readyState;
    const mongoOk = mongoState === 1;

    if (!mongoOk) {
        return res.status(503).json({
            status: "not_ready",
            mongo: {ok: false, state: mongoState},
            timestamp: new Date().toISOString(),
        })
    }

    try {
        await mongoose.connection.db.admin().ping();

        return res.status(200).json({
            status: "ready",
            mongo: {ok: true, state: mongoState},
            timestamp: new Date().toISOString(),
        })
    } catch (error) {
        console.warn("[healthcheck] Mongo ping failed:", error?.name, error?.message);

        return res.status(503).json({
            status: "not_ready",
            mongo: {ok: false, state: mongoState, error: "ping_failed"},
            timestamp: new Date().toISOString(),
        })
    }
}
