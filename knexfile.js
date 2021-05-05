const { DB_URL } = process.env;

const ENV = process.env.NODE_ENV || "development";

const { attachPaginate } = require("knex-paginate");
attachPaginate();

const baseConfig = {
  client: "pg",
  migrations: { directory: "./db/migrations" },
  seeds: { directory: "./db/seeds" },
};

const customConfigs = {
  development: {
    connection: { database: "nc_news", username: "joe", password: "password" },
  },
  production: {
    connection: {
      connectionString: DB_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
  test: {
    connection: {
      database: "nc_news_test",
      username: "joe",
      password: "password",
    },
  },
};

module.exports = { ...baseConfig, ...customConfigs[ENV] };
