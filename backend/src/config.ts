import Joi from "joi";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

interface Config {
  client_id: string;
  redirect_uri: string;
  client_secret: string;
  proxy_url: string;
}

const config: Config = {
  client_id: process.env.VITE_CLIENT_ID || "",
  redirect_uri: process.env.VITE_REDIRECT_URI || "",
  client_secret: process.env.VITE_CLIENT_SECRET || "",
  proxy_url: process.env.VITE_PROXY_URL || "",
};

const envVarsSchema = Joi.object({
  client_id: Joi.string().required(),
  redirect_uri: Joi.string().required(),
  client_secret: Joi.string().required(),
  proxy_url: Joi.string().required(),
});

const { error } = envVarsSchema.validate(config);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default config;
