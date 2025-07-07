import React, { useState } from "react";
import LeaveData from "../../DataStore/leave.json";
import EmployeeData from "../../DataStore/employees.json";

export default function LeavePop({ onClose }) {
  const [leaveRequests, setLeaveRequests] = useState(LeaveData);

  const handleStatusChange = (leaveId, newStatus) => {
    const updatedLeaves = leaveRequests.map((leave) =>
      leave.leaveId === leaveId ? { ...leave, status: newStatus } : leave
    );
    setLeaveRequests(updatedLeaves);
  };

  return (
    <div
      className="fixed inset-0 bg-blue-200 bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl p-6 w-[90vw] max-w-6xl max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Leave Requests</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {leaveRequests.map((leave, index) => {
            const employee = EmployeeData.find(emp => emp.id === leave.employeeId);

            return (
              <div
                key={index}
                className="border rounded-xl p-4 bg-gray-50 shadow-sm hover:shadow-md transition"
              >
                <div className="mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {employee?.name || "Unknown Employee"}
                  </h3>
                  <p className="text-sm text-gray-500">{employee?.position || "Role not available"}</p>
                </div>

                <div className="text-sm text-gray-700 mb-1">
                  <strong>Leave Type:</strong> {leave.type}
                </div>
                <div className="text-sm text-gray-700 mb-1">
                  <strong>From:</strong> {leave.fromDate}
                </div>
                <div className="text-sm text-gray-700 mb-1">
                  <strong>To:</strong> {leave.toDate}
                </div>
                <div className="text-sm text-gray-700 mb-2">
                  <strong>Reason:</strong> {leave.reason}
                </div>

                <div className="text-sm font-semibold mb-3">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-white text-xs ${
                      leave.status === "Approved"
                        ? "bg-green-500"
                        : leave.status === "Rejected"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {leave.status}
                  </span>
                </div>

                {leave.status === "Pending" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStatusChange(leave.leaveId, "Approved")}
                      className="flex-1 cursor-pointer px-3 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(leave.leaveId, "Rejected")}
                      className="flex-1 cursor-pointer px-3 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="mt-8 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg block mx-auto"
        >
          Close
        </button>
      </div>
    </div>
  );
}
