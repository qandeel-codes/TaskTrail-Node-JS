module.exports = {
  isDevelopment: process.env.NODE_ENV
    ? process.env.NODE_ENV == "development"
    : true,
  port: process.env.PORT || 3000,
  databaseOptions: () => {
    const result = {};

    if (process.env.DB_NAME) result.database = process.env.DB_NAME;
    if (process.env.DB_HOST) result.host = process.env.DB_HOST;
    if (process.env.DB_PORT) result.port = process.env.DB_PORT;
    if (process.env.DB_USERNAME) result.username = process.env.DB_USERNAME;
    if (process.env.DB_PASSWORD) result.password = process.env.DB_PASSWORD;
    if (process.env.DB_DIALECT) result.dialect = process.env.DB_DIALECT;
    if (process.env.DB_STORAGE) result.storage = process.env.DB_STORAGE;
    if (
      process.env.DB_POOL_MAX |
      process.env.DB_POOL_MIN |
      process.env.DB_POOL_ACQUIRE |
      process.env.DB_POOL_IDLE
    ) {
      const pool = {};
      if (process.env.DB_POOL_MAX) pool.max = Number(process.env.DB_POOL_MAX);
      if (process.env.DB_POOL_MIN) pool.min = Number(process.env.DB_POOL_MIN);
      if (process.env.DB_POOL_ACQUIRE)
        pool.acquire = Number(process.env.DB_POOL_ACQUIRE);
      if (process.env.DB_POOL_IDLE)
        pool.idle = Number(process.env.DB_POOL_IDLE);

      result.pool = pool;
    }
    if (process.env.DB_LOGGING && process.env.DB_LOGGING === "false")
      result.logging = false;

    return result;
  },
};
