import React, { useState } from "react";
import AttendanceData from "../DataStore/attendence.json";
import EmployeeData from "../DataStore/Employees.json";
import LeaveData from "../DataStore/Leave.json";
import PayrollData from "../DataStore/payroll.json";
import RecruitmentData from "../DataStore/Recruitments.json";
import Card from "../Components/Cards/Dashcard";
import { FaPeopleLine } from "react-icons/fa6";
import { FaPaypal } from "react-icons/fa";
import { IoIosPersonAdd } from "react-icons/io";
import { FcLeave } from "react-icons/fc";
import LeavePop from "../Components/Pop/LeavePop";
import RecruitmentPop from "../Components/Pop/Recruitment";
import PayrollPop from "../Components/Pop/Payroll";
import EmployeeTable from "../Components/Tables/EmployeeTable";

export default function Dashboard() {
  const [popup, setPopup] = useState(false);
  const [recruitmentPopup, setRecruitmentPopup] = useState(false);
  const [payrollPopup, setPayrollPopup] = useState(false);

  const handleRecruitmentPopup = () => setRecruitmentPopup(!recruitmentPopup);
  const handlePopup = () => setPopup(!popup);
  const handlePayrollPopup = () => setPayrollPopup(!payrollPopup);


    // Handle update from edit modal
  const handleUpdate = (id, updatedData) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === id ? { ...emp, ...updatedData } : emp))
    );
  };

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this employee?")) {
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full max-w-7xl mx-auto p-4">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          <Card
            title="Total Employees"
            value={EmployeeData.length}
            icon={<FaPeopleLine className="text-3xl text-blue-600" />}
          />
          <Card
            title="Total Payroll"
            value={`$${PayrollData.reduce((acc, item) => acc + item.netSalary, 0).toLocaleString()}`}
            icon={<FaPaypal className="text-3xl text-green-600" />}
            onClick={handlePayrollPopup}
          />
          <Card
            title="Total Recruitment"
            value={RecruitmentData.length}
            icon={<IoIosPersonAdd className="text-3xl text-purple-600" />}
            onClick={handleRecruitmentPopup}
          />
          <Card
            title="Total Leave Requests"
            value={LeaveData.length}
            icon={<FcLeave className="text-3xl text-red-600" />}
            onClick={handlePopup}
          />
        </div>
      </div>

      {/* All Emplyees Table */}
<div className="p-4">
      <EmployeeTable
        employees={EmployeeData}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
      {/* Popups */}
      {recruitmentPopup && <RecruitmentPop onClose={() => setRecruitmentPopup(false)} />}
      {popup && <LeavePop onClose={() => setPopup(false)} />}
        {payrollPopup && <PayrollPop onClose={() => setPayrollPopup(false)} />}
    </div>
  );
}
