// Runs a real PostgreSQL in-process for local preview (no Docker needed).
import EmbeddedPostgres from "embedded-postgres";
import fs from "node:fs";

const dir = "./.localpg";
const pg = new EmbeddedPostgres({
  databaseDir: dir,
  user: "postgres",
  password: "postgres",
  port: 5433,
  persistent: true,
});

const initialized = fs.existsSync(dir) && fs.existsSync(dir + "/PG_VERSION");
if (!initialized) {
  console.log("initialising postgres data dir...");
  await pg.initialise();
}
console.log("starting postgres...");
await pg.start();
try {
  await pg.createDatabase("gmr");
  console.log("created database 'gmr'");
} catch {
  console.log("database 'gmr' already exists (ok)");
}
console.log("POSTGRES_READY on port 5433");
process.stdin.resume();
setInterval(() => {}, 1 << 30);
