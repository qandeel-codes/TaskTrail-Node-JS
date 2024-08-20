module.exports = {
  isDevelopment: process.env.NODE_ENV
    ? process.env.NODE_ENV == "development"
    : true,
  port: process.env.PORT || 3000,
  sessionSecret: process.env.SESSION_SECRET,

  databaseSettings: {
    path: process.env.DB_PATH,
    fileName: process.env.DB_FILE_NAME,
    poolMax: Number(process.env.DB_POOL_MAX ?? 5),
    poolMin: Number(process.env.DB_POOL_MIN ?? 0),
    poolAcquire: Number(process.env.DB_POOL_ACQUIRE ?? 60000),
    poolIdle: Number(process.env.DB_POOL_IDLE ?? 10000),
    logging:
      process.env.DB_LOGGING && process.env.DB_LOGGING === "false"
        ? false
        : null,
  },
};
