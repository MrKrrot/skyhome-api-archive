import Joi from 'joi'
import 'dotenv/config'

const envVarsSchema = Joi.object({
    JWT_SECRET: Joi.string().required(),
    MONGO_URI: Joi.string().required(),
    PORT: Joi.string().default('5000'),
    STORAGE_PATH: Joi.string().required()
}).unknown().required()

const { error, value: envVars } = envVarsSchema.validate(process.env)

if (error) {
    throw new Error(`Config validation error: ${error.message}`)
}

export const {
    JWT_SECRET,
    MONGO_URI,
    PORT,
    STORAGE_PATH
} = envVars