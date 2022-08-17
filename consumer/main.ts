import "reflect-metadata";
import { initializeDatabase } from "./src/database/database.connection";
import { initialize, registerHashQueue } from "./src/utils/hash.queue";

async function initializeQueue() {
  await initialize();
  await registerHashQueue();
}

async function main() {
  await initializeDatabase();
  await initializeQueue();
}

main();
