import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.CONNECTION_URI)

export const startDatabase = async () => {
    try {
        await sequelize.authenticate()
        console.log("Database connected")
    } catch (error) {
        console.log("Database connection failed")
    }
}

export default sequelize