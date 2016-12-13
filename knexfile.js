// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: process.env.DEVELOPMENT_DB_URL
  },
  production: {
    client: 'pg',
    connection: process.env.PRODUCTION_DB_URL
  }
};
