"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { MonthSelection } from "../_components/MonthSelection";
import GradeSelection from "../_components/GradeSelection";
import GlobalApi from "../_services/GlobalApi";
import moment from "moment";
import StatusList from "./_components/StatusList";
import { BarChartComponent } from "./_components/BarChartComponent";
import PieChartComponent from "./_components/PieChartComponent";

function Dashboard() {
  const { setTheme } = useTheme();

  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedGrade, setSelectedGrade] = useState();
  const [attendenceList, setAttendenceList] = useState();
  const [totalPresentData, setTotalPresentData] = useState([]);

  useEffect(() => {
    // setTheme("light");
    getStudentAttendence();
    getTotalPresentCountByDay();
  }, [selectedGrade]);

  useEffect(() => {
    getStudentAttendence();
    getTotalPresentCountByDay();
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

  const getTotalPresentCountByDay = () => {
    GlobalApi.TotalPresentCountByDay(
      moment(selectedMonth).format("MM/yyyy"),
      selectedGrade
    ).then((resp) => {
      setTotalPresentData(resp.data);
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <BarChartComponent
            attendenceList={attendenceList}
            totalPresentData={totalPresentData}
          />
        </div>
        <div>
          <PieChartComponent attendenceList={attendenceList} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
