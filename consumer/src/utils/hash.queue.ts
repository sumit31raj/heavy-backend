import { ConfigService } from "@nestjs/config";
import Bull from "bull";
import hashConsumer from "../consumer/hash.consumer";

export function initialize() {
  let configService = new ConfigService();
  return new Bull("hexadecimal", {
    redis: {
      host: configService.get("REDIS_HOST"),
      port: configService.get("REDIS_PORT"),
    },
  });
}

export function registerHashQueue() {
  initialize().process("process-nonce", hashConsumer);
}
