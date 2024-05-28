import React from "react";
import AddNewStudents from "./_components/AddNewStudents";

const Student = () => {
  return (
    <div className="p-7">
      <h2 className="font-bold text-2xl flex justify-between items-center">
        Students <AddNewStudents />
      </h2>
    </div>
  );
};

export default Student;
