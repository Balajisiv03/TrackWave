import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
const sql = neon(
  "postgresql://attendencetracker_owner:5ozQLaCsSUw1@ep-blue-band-a5z31miq.us-east-2.aws.neon.tech/attendencetracker?sslmode=require"
);
export const db = drizzle(sql, { schema });
