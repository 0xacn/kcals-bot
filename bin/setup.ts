const pg = require("pg");

const config = {
  user: "postgres",
  database: "postgres",
  password: "simon123",
  host: "localhost",
  port: 5432,
  max: 10,
  idleTimeoutMillis: 50000,
};

(async () => {
  const pool = new pg.Pool(config);

  pool.connect(() => {
    return;
  });
})();