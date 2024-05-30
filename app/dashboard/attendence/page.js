import { MonthSelection } from "@/app/_components/MonthSelection";
import React from "react";

const Attendence = () => {
  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold">Attendence</h2>
      {/* search option */}
      <div>
        <MonthSelection />
      </div>
      {/* student attendence grid */}
    </div>
  );
};

export default Attendence;
