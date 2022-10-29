const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  apiSecret: process.env.API_SECRET,
  apiKey: process.env.API_KEY,
  port: process.env.PORT,
  baseUrl: process.env.BASE_URL,
  grapeUrl: process.env.GRAPE_URL,
  exchange: process.env.EXCHANGE,
};
