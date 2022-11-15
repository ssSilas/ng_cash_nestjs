export default () => ({
  portApp: process.env.PORT_APP || 3000,
  secretKey: process.env.SECRET_KEY,
  durationToken: process.env.DURATION_TOKEN,
  database: {
    host: process.env.DATA_BASE_HOST,
    user: process.env.DATA_BASE_USER,
    pass: process.env.DATA_BASE_PASSWORD,
    port: parseInt(process.env.PORT, 10),
    dbname: process.env.DATA_BASE_NAME_DEFAULT,
    dialect: process.env.DATA_BASE_DIALECT,
  }
});