import Student from "../dashboard/students/page";

const { default: axios } = require("axios");

const GetAllGrades = () => axios.get("/api/grade");
const CreateNewStudent = (data) => axios.post("/api/student", data);
const GetAllStudents = () => axios.get("/api/student");
const DeleteStudentRecord = (id) => axios.delete("/api/student?id=" + id);
const GetAttendenceList = (grade, month) =>
  axios.get("/api/attendence?grade=" + grade + "&month=" + month);

const MarkAttendence = (data) => {
  return axios.post("/api/attendence", data);
};

const MarkAbsent = (studentId, day, date) =>
  axios.delete(
    "/api/attendence?studentId=" + studentId + "&day=" + day + "&date=" + date
  );

export default {
  GetAllGrades,
  CreateNewStudent,
  GetAllStudents,
  DeleteStudentRecord,
  GetAttendenceList,
  MarkAttendence,
  MarkAbsent,
};
