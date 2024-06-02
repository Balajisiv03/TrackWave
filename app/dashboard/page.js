"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { MonthSelection } from "../_components/MonthSelection";
import GradeSelection from "../_components/GradeSelection";
import GlobalApi from "../_services/GlobalApi";
import moment from "moment";
import StatusList from "./_components/StatusList";

function Dashboard() {
  const { setTheme } = useTheme();

  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedGrade, setSelectedGrade] = useState();
  const [attendenceList, setAttendenceList] = useState();

  useEffect(() => {
    // setTheme("light");
    getStudentAttendence();
  }, [selectedGrade]);

  useEffect(() => {
    getStudentAttendence();
  }, [selectedMonth]);

  //used to get attendence for givn month and grade
  const getStudentAttendence = () => {
    GlobalApi.GetAttendenceList(
      selectedGrade,
      moment(selectedMonth).format("MM/yyyy")
    ).then((resp) => {
      setAttendenceList(resp.data);
    });
  };

  return (
    <div className="p-10">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl">Dashboard</h2>

        <div className="flex items-center gap-4">
          <MonthSelection selectedMonth={setSelectedMonth} />
          <GradeSelection selectedGrade={(v) => setSelectedGrade(v)} />
        </div>
      </div>
      <StatusList attendenceList={attendenceList} />
    </div>
  );
}

export default Dashboard;
