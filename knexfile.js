const commonConfig = {
  client: "sqlite3",
  useNullAsDefault: true,
  pool: {
    afterCreate: (conn, done) => {
      conn.run("PRAGMA foreign_keys = ON", done)
    },
  },
  migrations: {
    directory: "./data/migrations",
  },
  seeds: {
    directory: "./data/seeds",
  },
}

module.exports = {
  development: {
    ...commonConfig,
    connection: {
      filename: "./data/lambda.db3",
    },
  },
  testing: {
    ...commonConfig,
    connection: {
      filename: './data/test.db3',
    },
  }
}
