import React, { useState } from "react";
import PayrollData from "../../DataStore/payroll.json";
import EmployeeData from "../../DataStore/employees.json";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function PayRollTable() {
  const [search, setSearch] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [filterYear, setFilterYear] = useState("");

  const getEmployeeName = (id) => {
    const emp = EmployeeData.find((emp) => emp.id === id);
    return emp ? emp.name : "Unknown";
  };

  const filteredData = PayrollData.filter((item) => {
    const employeeName = getEmployeeName(item.employeeId).toLowerCase();
    return (
      (!search || employeeName.includes(search.toLowerCase())) &&
      (!filterMonth || item.month === filterMonth) &&
      (!filterYear || item.year.toString() === filterYear.toString())
    );
  });

  const totalNetSalary = filteredData.reduce((acc, curr) => acc + curr.netSalary, 0);

  const handleDownload = (record) => {
    const doc = new jsPDF();
    doc.text("Pay Slip", 14, 16);
    doc.autoTable({
      startY: 25,
      head: [["Field", "Details"]],
      body: [
        ["Employee Name", getEmployeeName(record.employeeId)],
        ["Month", record.month],
        ["Year", record.year],
        ["Basic", `$${record.basic}`],
        ["HRA", `$${record.hra}`],
        ["Bonus", `$${record.bonus}`],
        ["Deductions", `$${record.deductions}`],
        ["Net Salary", `$${record.netSalary}`],
        ["Paid On", record.paidOn],
      ],
    });
    doc.save(`${getEmployeeName(record.employeeId)}_Payslip.pdf`);
  };

  return (
    <div className="text-black w-full">
        <div className="flex items-center justify-between gap-3">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Payroll Summary</h2>
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Search employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border rounded"
        />
        <select
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          <option value="">All Months</option>
          {[...Array(12)].map((_, i) => (
            <option key={i} value={new Date(0, i).toLocaleString("default", { month: "long" })}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Year"
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
          className="px-3 py-2 border rounded w-28"
        />
      </div>
             </div>


      <div className="mb-2 font-semibold text-lg text-blue-700">
        Total Net Salary: ${totalNetSalary.toLocaleString()}
      </div>

      <div className="overflow-auto rounded shadow">
        <table className="w-full table-auto border-collapse border border-gray-300 text-sm text-center">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="border px-4 py-2">Employee</th>
              <th className="border px-4 py-2">Month</th>
              <th className="border px-4 py-2">Year</th>
              <th className="border px-4 py-2">Basic</th>
              <th className="border px-4 py-2">HRA</th>
              <th className="border px-4 py-2">Bonus</th>
              <th className="border px-4 py-2">Deductions</th>
              <th className="border px-4 py-2 text-green-700 font-bold">Net Salary</th>
              <th className="border px-4 py-2">Paid On</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan="10" className="py-4 text-gray-500">
                  No payroll records found.
                </td>
              </tr>
            ) : (
              filteredData.map((pay, index) => (
                <tr key={index} className="hover:bg-gray-50 text-black">
                  <td className="border px-4 py-2 text-left font-medium">
                    {getEmployeeName(pay.employeeId)}
                  </td>
                  <td className="border px-4 py-2">{pay.month}</td>
                  <td className="border px-4 py-2">{pay.year}</td>
                  <td className="border px-4 py-2">${pay.basic}</td>
                  <td className="border px-4 py-2">${pay.hra}</td>
                  <td className="border px-4 py-2">${pay.bonus}</td>
                  <td className="border px-4 py-2 text-red-600">-${pay.deductions}</td>
                  <td className="border px-4 py-2 font-bold text-green-600">
                    ${pay.netSalary}
                  </td>
                  <td className="border px-4 py-2">{pay.paidOn}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleDownload(pay)}
                      className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
                    >
                      Download Pay Slip
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
