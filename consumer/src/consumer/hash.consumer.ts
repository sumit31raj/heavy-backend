import { Job } from "bull";
import { findingNonce } from "../utils/hash.service";

async function hashConsumer(job: Job) {
  try {
    await findingNonce(job);
  } catch (error) {
    throw new Error(error.message);
  }
}

export default hashConsumer;
