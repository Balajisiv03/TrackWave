import { getUniqueRecords } from "@/app/_services/service";
import { GraduationCap, TrendingDown, TrendingUp } from "lucide-react";
import moment from "moment";
import React, { useState, useEffect } from "react";
import Card from "./Card";

function StatusList({ attendenceList }) {
  const [totalStudent, setTotalStudent] = useState(0);
  const [presentPerc, setPresentPerc] = useState(0);
  useEffect(() => {
    console.log(attendenceList);
    if (attendenceList) {
      const totalSt = getUniqueRecords(attendenceList);
      setTotalStudent(totalSt.length);

      const today = moment().format("D");
      const PresentPerc =
        (attendenceList.length / (totalSt.length * Number(today))) * 100;
      //   console.log(PresentPerc);
      setPresentPerc(PresentPerc);
    }
  }, [attendenceList]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5">
      <Card
        icon={<GraduationCap />}
        title="Total Student"
        value={totalStudent}
      />
      <Card
        icon={<TrendingUp />}
        title="Total  Present"
        value={presentPerc.toFixed(1) + "%"}
      />
      <Card
        icon={<TrendingDown />}
        title="Total  Absent"
        value={(100 - presentPerc).toFixed(1) + "%"}
      />
    </div>
  );
}

export default StatusList;
