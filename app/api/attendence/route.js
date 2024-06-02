import { db } from "@/utils/dbConfig";
import { ATTENDENCE, STUDENTS } from "@/utils/schema";
import { and, eq, isNull, or } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const grade = searchParams.get("grade");
  const month = searchParams.get("month");
  const result = await db
    .select({
      name: STUDENTS.name,
      present: ATTENDENCE.present,
      day: ATTENDENCE.day,
      date: ATTENDENCE.date,
      grade: STUDENTS.grade,
      studentId: STUDENTS.id,
      attendenceId: ATTENDENCE.id,
    })
    .from(STUDENTS)
    .leftJoin(
      ATTENDENCE,
      and(eq(STUDENTS.id, ATTENDENCE.studentId), eq(ATTENDENCE.date, month))
    )
    .where(eq(STUDENTS.grade, grade));

  return NextResponse.json(result);
}

export async function POST(req, res) {
  const data = await req.json();
  const result = await db.insert(ATTENDENCE).values({
    studentId: data.studentId,
    present: data.present,
    day: data.day,
    date: data.date,
  });

  return NextResponse.json(result);
}

export async function DELETE(req) {
  const searchParams = req.nextUrl.searchParams;

  const studentId = searchParams.get("studentId");
  const date = searchParams.get("date");
  const day = searchParams.get("day");

  const result = await db
    .delete(ATTENDENCE)
    .where(
      and(
        eq(ATTENDENCE.studentId, studentId),
        eq(ATTENDENCE.date, date),
        eq(ATTENDENCE.day, day)
      )
    );

  return NextResponse.json(result);
}
