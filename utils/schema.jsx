import {
  integer,
  pgTable,
  serial,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";

export const GRADES = pgTable("grades", {
  id: integer("id").primaryKey(),
  grade: varchar("grade", { length: 10 }).notNull(),
});

export const STUDENTS = pgTable("students", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 20 }).notNull(),
  grade: varchar("grade", { length: 10 }).notNull(),
  address: varchar("address", { length: 50 }),
  contact: varchar("contact", { length: 11 }),
});

export const ATTENDENCE = pgTable("attendence", {
  id: serial("id").primaryKey(),
  studentId: integer("studentId", { length: 11 }).notNull(),
  present: boolean("present").default(false),
  day: integer("day", { length: 11 }).notNull(), //22
  date: varchar("date", { length: 20 }).notNull(), //05/24
});
