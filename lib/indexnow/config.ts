import "server-only";
import { z } from "zod";

const indexNowEnvironmentSchema = z.object({
  INDEXNOW_KEY: z.string().trim().min(8).max(128).regex(/^[A-Za-z0-9-]+$/),
  INDEXNOW_SECRET: z.string().min(24),
});

export function getIndexNowEnvironment() {
  return indexNowEnvironmentSchema.safeParse(process.env);
}

