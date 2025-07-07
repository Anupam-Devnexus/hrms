import React, { useState, useEffect } from "react";
import EmployeeData from "../../DataStore/employees.json"; // Your employee data
import AttendanceData from "../../DataStore/attendence.json"; // Your attendance data

const PAGE_SIZE = 10;

export default function AttendanceTable() {
  const [attendance, setAttendance] = useState([]);
  const [search, setSearch] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setAttendance(
      AttendanceData.map((att) => ({
        ...att,
        status: att.status || "Absent",
      }))
    );
  }, []);

  const getStatus = (employeeId, date) => {
    const record = attendance.find(
      (att) => att.employeeId === employeeId && att.date === date
    );
    return record ? record.status : "Absent";
  };

  const toggleStatus = (employeeId, date) => {
    setAttendance((prev) => {
      const index = prev.findIndex(
        (att) => att.employeeId === employeeId && att.date === date
      );
      if (index !== -1) {
        const updated = [...prev];
        updated[index].status =
          updated[index].status === "Present" ? "Absent" : "Present";
        return updated;
      } else {
        return [...prev, { employeeId, date, status: "Present" }];
      }
    });
  };

  const filteredEmployees = EmployeeData.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEmployees.length / PAGE_SIZE);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const getDatesForMonthYear = () => {
    let month = filterMonth ? parseInt(filterMonth) - 1 : new Date().getMonth();
    let year = filterYear ? parseInt(filterYear) : new Date().getFullYear();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let dates = [];
    for (let day = 1; day <= daysInMonth; day++) {
      let d = new Date(year, month, day);
      dates.push(d.toISOString().slice(0, 10));
    }
    return dates;
  };

  const dates = getDatesForMonthYear();

  return (
    <div className="p-4 max-w-full overflow-auto bg-white text-black rounded shadow">
        <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">

      <h2 className="text-2xl font-bold mb-4 text-gray-900">Attendance Management</h2>
       {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4 items-center">
        <input
          type="text"
          placeholder="Search employee..."
          className="px-3 py-2 border rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <select
          className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
        >
          <option value="">Select Month</option>
          {[...Array(12)].map((_, i) => (
            <option key={i} value={i + 1}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Year"
          className="px-3 py-2 border rounded w-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filterYear}
          onChange={(e) => setFilterYear(e.target.value)}
          min="2000"
          max="2100"
        />
      </div>
            </div>

      {/* Guidelines */}
      <div className="mb-4 p-3 rounded bg-yellow-100 border border-yellow-400 text-yellow-800 max-w-xl">
        <strong>Guidelines:</strong>
        <ul className="list-disc list-inside text-sm mt-1">
          <li>Click on any cell to toggle attendance status.</li>
          <li><span className="font-semibold text-green-700">Green (P)</span> indicates Present.</li>
          <li><span className="font-semibold text-red-700">Red (A)</span> indicates Absent.</li>
          <li>Use filters to search employees and select month/year.</li>
        </ul>
      </div>
        </div>


     

      {/* Attendance Table */}
      <table className="table-auto border-collapse w-full min-w-max border border-gray-300 text-center">
        <thead className="bg-gray-100 sticky top-0">
          <tr>
            <th className="border border-gray-300 px-2 py-1 sticky left-0 bg-gray-100 z-10 text-left">Employee</th>
            {dates.map((date) => (
              <th
                key={date}
                className="border border-gray-300 px-2 py-1 text-xs"
                title={date}
              >
                {new Date(date).getDate()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedEmployees.length === 0 ? (
            <tr>
              <td colSpan={dates.length + 1} className="py-4 text-gray-500">
                No employees found.
              </td>
            </tr>
          ) : (
            paginatedEmployees.map((emp) => (
              <tr key={emp.id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-2 py-1 sticky left-0 bg-white z-5 font-medium text-left">
                  {emp.name}
                </td>
                {dates.map((date) => {
                  const status = getStatus(emp.id, date);
                  return (
                    <td
                      key={date}
                      className={`border border-gray-300 px-1 py-1 cursor-pointer select-none text-white font-bold ${
                        status === "Present"
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                      onClick={() => toggleStatus(emp.id, date)}
                      title={`Mark as ${status === "Present" ? "Absent" : "Present"}`}
                    >
                      {status === "Present" ? "P" : "A"}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-center gap-2">
        <button
          className="px-3 py-1 rounded border disabled:opacity-50 hover:bg-gray-100"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        >
          Prev
        </button>
        <span className="px-3 py-1 font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-3 py-1 rounded border disabled:opacity-50 hover:bg-gray-100"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        >
          Next
        </button>
      </div>
    </div>
  );
}
