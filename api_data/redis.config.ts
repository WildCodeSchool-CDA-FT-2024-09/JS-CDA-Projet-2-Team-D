import * as dotenv from "dotenv";
import { createClient } from "redis";

dotenv.config();
const { REDIS_HOST, REDIS_PORT } = process.env;

const redisClient = createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
}); // * 1

redisClient.on("error", (err) => {
  // * 2
  console.info("Redis Client Error", err);
});
redisClient.on("connect", () => {
  console.info("redis connected");
});

export default redisClient;
