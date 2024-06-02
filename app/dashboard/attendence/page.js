"use client";
import GradeSelection from "@/app/_components/GradeSelection";
import { MonthSelection } from "@/app/_components/MonthSelection";
import GlobalApi from "@/app/_services/GlobalApi";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import moment from "moment";
import AttendenceGrid from "./_components/AttendenceGrid";

const Attendence = () => {
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedGrade, setSelectedGrade] = useState();
  const [attendenceList, setAttendenceList] = useState();

  // fetches attendence list for given month and grade
  const onSearchHandler = () => {
    const month = moment(selectedMonth).format("MM/YYYY");

    GlobalApi.GetAttendenceList(selectedGrade, month).then((resp) => {
      setAttendenceList(resp.data);
    });
  };
  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold">Attendence</h2>
      {/* search option */}
      <div className="flex gap-5 my-5 border p-5 rounded-lg shadow-sm ">
        <div className="flex gap-2 items-center">
          <label>Select Month:</label>
          <MonthSelection selectedMonth={(value) => setSelectedMonth(value)} />
        </div>
        <div className="flex gap-2 items-center">
          <label>Select Grade</label>
          <GradeSelection selectedGrade={(v) => setSelectedGrade(v)} />
        </div>
        <Button onClick={() => onSearchHandler()}>Search </Button>
      </div>
      {/* student attendence grid */}
      <AttendenceGrid
        attendenceList={attendenceList}
        selectedMonth={selectedMonth}
      />
    </div>
  );
};

export default Attendence;
