import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import moment from "moment";
import GlobalApi from "@/app/_services/GlobalApi";
import { toast } from "sonner";
// import { getUniqueRecords } from "@/app/_services/service";

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [25, 50, 100];

const AttendenceGrid = ({ attendenceList, selectedMonth }) => {
  const [rowData, setRowData] = useState();
  const [colDefs, setColDefs] = useState([
    { field: "studentId", filter: true },
    { field: "name", filter: true },
  ]);

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  const noOfDays = daysInMonth(
    moment(selectedMonth).format("YYYY"),
    moment(selectedMonth).format("MM")
  );
  const daysArrays = Array.from({ length: noOfDays }, (_, i) => i + 1);

  useEffect(() => {
    if (attendenceList) {
      const userList = getUniqueRecords();

      setRowData(userList);

      daysArrays.forEach((date) => {
        setColDefs((prevData) => [
          ...prevData,
          {
            field: date.toString(),
            width: 50,
            editable: true,
          },
        ]);
        userList.forEach((obj) => {
          obj[date] = isPresent(obj.studentId, date);
        });
      });
    }
  }, [attendenceList]);

  //used to check if user is present or not
  const isPresent = (studentId, day) => {
    const result = attendenceList.find(
      (item) => item.day == day && item.studentId == studentId
    );
    return result ? true : false;
  };

  //used to get distinct user list
  const getUniqueRecords = () => {
    const uniqueRecord = [];
    const existingUser = new Set();
    attendenceList?.forEach((record) => {
      if (!existingUser.has(record.studentId)) {
        existingUser.add(record.studentId);
        uniqueRecord.push(record);
      }
    });
    return uniqueRecord;
  };

  const onMarkAttendence = (day, studentId, presentStatus) => {
    const date = moment(selectedMonth).format("MM/yyyy");
    if (presentStatus) {
      const data = {
        day: day,
        studentId: studentId,
        present: presentStatus,
        date: date,
      };

      GlobalApi.MarkAttendence(data).then((resp) => {
        console.log(resp);
        toast("Student Id:" + studentId + " Marked as present");
      });
    } else {
      GlobalApi.MarkAbsent(studentId, day, date).then((resp) => {
        toast("Student id: " + studentId + " Marked as Absent");
      });
    }
  };

  return (
    <div>
      {" "}
      <div
        className="ag-theme-quartz" // applying the grid theme
        style={{ height: 500 }} // the grid will fill the size of the parent container
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          onCellValueChanged={(e) =>
            onMarkAttendence(e.colDef.field, e.data.studentId, e.newValue)
          }
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
    </div>
  );
};

export default AttendenceGrid;
