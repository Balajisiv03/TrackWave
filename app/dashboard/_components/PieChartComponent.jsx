import { getUniqueRecords } from "@/app/_services/service";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Pie, PieChart, ResponsiveContainer } from "recharts";

function PieChartComponent({ attendenceList }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(attendenceList);
    if (attendenceList) {
      const totalSt = getUniqueRecords(attendenceList);

      const today = moment().format("D");
      const PresentPerc =
        (attendenceList.length / (totalSt.length * Number(today))) * 100;

      setData([
        {
          name: "Total Present",
          value: Number(PresentPerc.toFixed(1)),
          fill: "#8884d8",
        },
        {
          name: "Total Absent",
          value: 100 - Number(PresentPerc.toFixed(1)),
          fill: "#82ca9d",
        },
      ]);
    }
  }, [attendenceList]);

  return (
    <div className="border p-5 rounded-lg">
      <h2 className="font-bold text-lg">Monthly Attendence</h2>
      <ResponsiveContainer width={"100%"} height={300}>
        <PieChart width={730} height={250}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            label
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PieChartComponent;
