import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  jwt_scrict: process.env.JWT_SCRICT_KEY,
  jwt_refesh_scrict: process.env.JWT_SCRICT_KEY_REFESH,
  app_password: process.env.APP_PASSWORD,
};
