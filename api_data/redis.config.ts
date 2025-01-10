import { createClient } from "redis";

const redisClient = createClient({
  url: "redis://api_data:6379",
}); // * 1

redisClient.on("error", (err) => {
  // * 2
  console.info("Redis Client Error", err);
});
redisClient.on("connect", () => {
  console.info("redis connected");
});

export default redisClient;
