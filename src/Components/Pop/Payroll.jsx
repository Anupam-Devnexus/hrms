import React, { useState, useMemo } from "react";
import PayrollData from "../../DataStore/payroll.json";
import EmployeeData from "../../DataStore/employees.json";
import { jsPDF } from "jspdf";

export default function PayrollPop({ onClose }) {
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [searchName, setSearchName] = useState("");

  const months = [...new Set(PayrollData.map((p) => p.month))];
  const years = [...new Set(PayrollData.map((p) => p.year))];

  const getEmployeeDetails = (id) =>
    EmployeeData.find((emp) => emp.id === id) || { name: "Unknown", position: "N/A" };

  const filteredPayroll = useMemo(() => {
    return PayrollData.filter((p) => {
      const employee = getEmployeeDetails(p.employeeId);
      const matchesMonth = selectedMonth === "All" || p.month === selectedMonth;
      const matchesYear = selectedYear === "All" || p.year.toString() === selectedYear.toString();
      const matchesName =
        searchName.trim() === "" ||
        employee.name.toLowerCase().includes(searchName.trim().toLowerCase());
      return matchesMonth && matchesYear && matchesName;
    });
  }, [selectedMonth, selectedYear, searchName]);

  const totalPayrollAmount = filteredPayroll.reduce((sum, p) => sum + p.netSalary, 0);

  const downloadPDF = (payroll, employee) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Pay Slip - ${payroll.month} ${payroll.year}`, 20, 20);
    doc.setFontSize(12);
    doc.text(`Employee Name: ${employee.name}`, 20, 40);
    doc.text(`Position: ${employee.position}`, 20, 50);
    doc.text(`Basic: ₹${payroll.basic}`, 20, 70);
    doc.text(`HRA: ₹${payroll.hra}`, 20, 80);
    doc.text(`Bonus: ₹${payroll.bonus}`, 20, 90);
    doc.text(`Deductions: ₹${payroll.deductions}`, 20, 100);
    doc.text(`Net Salary: ₹${payroll.netSalary}`, 20, 110);
    doc.text(`Paid On: ${payroll.paidOn}`, 20, 120);

    doc.save(`Payslip_${employee.name}_${payroll.month}_${payroll.year}.pdf`);
  };

  return (
    <div
      className="fixed inset-0 bg-blue-200 bg-opacity-60 flex items-center justify-center z-50 cursor-pointer"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl p-6 w-[90vw] max-w-6xl max-h-[85vh] overflow-y-auto cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Payroll Summary</h2>

        {/* Filters & Search */}
        <div className="flex flex-wrap gap-4 mb-6 items-center">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border px-3 py-2 rounded-md"
          >
            <option value="All">All Months</option>
            {months.map((m, i) => (
              <option key={i} value={m}>
                {m}
              </option>
            ))}
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border px-3 py-2 rounded-md"
          >
            <option value="All">All Years</option>
            {years.map((y, i) => (
              <option key={i} value={y}>
                {y}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search by employee name..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="border px-3 py-2 rounded-md flex-grow min-w-[200px]"
          />
        </div>

        {/* Total Payroll */}
        <div className="mb-6 text-right text-lg font-semibold text-green-700">
          Total Payroll: ₹{totalPayrollAmount.toLocaleString()}
        </div>

        {/* Payroll Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPayroll.length === 0 ? (
            <p className="text-center text-gray-600 col-span-full">No payroll records found.</p>
          ) : (
            filteredPayroll.map((pay, index) => {
              const employee = getEmployeeDetails(pay.employeeId);
              return (
                <div
                  key={index}
                  className="border rounded-xl p-4 bg-gray-50 shadow hover:shadow-md transition duration-200"
                >
                  <h3 className="text-lg font-semibold text-indigo-700 mb-1">{employee.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{employee.position}</p>
                  <p className="text-sm text-gray-700">
                    <strong>Month:</strong> {pay.month} {pay.year}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Basic:</strong> ₹{pay.basic.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>HRA:</strong> ₹{pay.hra.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Bonus:</strong> ₹{pay.bonus.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Deductions:</strong> ₹{pay.deductions.toLocaleString()}
                  </p>
                  <p className="text-sm font-semibold text-green-600 mt-2">
                    <strong>Net:</strong> ₹{pay.netSalary.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Paid On: {pay.paidOn}</p>

                  <button
                    onClick={() => downloadPDF(pay, employee)}
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded"
                  >
                    Download Pay Slip
                  </button>
                </div>
              );
            })
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg block mx-auto"
        >
          Close
        </button>
      </div>
    </div>
  );
}
