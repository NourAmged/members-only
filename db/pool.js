require("dotenv").config();

const { Pool } = require("pg");

module.exports = new Pool({
  connectionString: `postgresql://${process.env.USER}:${process.env.PASSWORD}@localhost:${process.env.PORT_DB}/members_only`,
});
