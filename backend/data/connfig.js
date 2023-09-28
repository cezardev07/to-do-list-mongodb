import { connect } from "mongoose"

const handleConnectionMongoDB = async () => {
    try {
        await connect(process.env.CONNECT_MONGODB)
    } catch (error) {
        console.log("[ ERRO ] -> " + error)
    }
}

export {
    handleConnectionMongoDB
}