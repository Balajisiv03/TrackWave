import { db } from "@/utils/dbConfig";
import { ATTENDENCE, STUDENTS } from "@/utils/schema";
import { and, desc, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const date = searchParams.get("date");
  const grade = searchParams.get("grade");

  const result = await db
    .select({
      day: ATTENDENCE.day,
      presentCount: sql`count(${ATTENDENCE.day})`,
    })
    .from(ATTENDENCE)
    .innerJoin(STUDENTS, eq(ATTENDENCE.studentId, STUDENTS.id))
    .groupBy(ATTENDENCE.day)
    .where(and(eq(ATTENDENCE.date, date), eq(STUDENTS.grade, grade)))
    .orderBy(desc(ATTENDENCE.day))
    .limit(7);

  return NextResponse.json(result);
}
