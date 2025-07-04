import React, { useState, useMemo } from "react";

export default function EmployeeTable({ employees, onUpdate, onDelete }) {
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [editEmployee, setEditEmployee] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", designation: "" });

  const ITEMS_PER_PAGE = 10;

  // Handle search filtering
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [employees, search]);

  // Handle sorting
  const sortedEmployees = useMemo(() => {
    if (!sortConfig.key) return filteredEmployees;

    const sorted = [...filteredEmployees].sort((a, b) => {
      const aValue = a[sortConfig.key]?.toString().toLowerCase() || "";
      const bValue = b[sortConfig.key]?.toString().toLowerCase() || "";
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredEmployees, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedEmployees.length / ITEMS_PER_PAGE);
  const paginatedEmployees = sortedEmployees.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Sorting handler
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Open edit modal
  const openEdit = (emp) => {
    setEditEmployee(emp);
    setEditForm({ name: emp.name, designation: emp.designation });
  };

  // Close edit modal
  const closeEdit = () => {
    setEditEmployee(null);
  };

  // Save edit
  const saveEdit = () => {
    if (onUpdate && editEmployee) {
      onUpdate(editEmployee.id, editForm);
    }
    closeEdit();
  };

  return (
    <div className="max-w-full p-4 bg-white text-black rounded-lg shadow">
      {/* Search */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border text-black px-3 py-2 w-full border-b-2 outline-none sm:w-80"
        />
        <div className="text-sm text-gray-900">
          Page {currentPage} of {totalPages}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border text-gray-900 border-gray-300 rounded">
          <thead className="bg-gray-100">
            <tr>
              {[
                { label: "Name", key: "name" },
                { label: "Designation", key: "designation" },
                { label: "Department", key: "department" },
                { label: "Status", key: "status" },
                { label: "Actions" },
              ].map(({ label, key }) => (
                <th
                  key={label}
                  onClick={() => key && requestSort(key)}
                  className={`py-2 px-4 text-left font-semibold text-gray-700 cursor-pointer ${
                    sortConfig.key === key
                      ? sortConfig.direction === "asc"
                        ? "underline decoration-blue-500"
                        : "underline decoration-red-500"
                      : ""
                  }`}
                  style={{ userSelect: "none" }}
                >
                  {label}
                  {sortConfig.key === key ? (
                    sortConfig.direction === "asc" ? (
                      " ▲"
                    ) : (
                      " ▼"
                    )
                  ) : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedEmployees.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-900">
                  No employees found.
                </td>
              </tr>
            ) : (
              paginatedEmployees.map((emp) => (
                <tr
                  key={emp.id}
                  className="border-t border-gray-300 hover:bg-gray-50 transition"
                >
                  <td className="py-2 px-4">{emp.name}</td>
                  <td className="py-2 px-4">{emp.designation}</td>
                  <td className="py-2 px-4">{emp.department}</td>
                  <td
                    className={`py-2 px-4 font-semibold ${
                      emp.status === "Active"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {emp.status}
                  </td>
                  <td className="py-2 px-4 flex gap-2">
                    <button
                      onClick={() => openEdit(emp)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete && onDelete(emp.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-center gap-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded border border-gray-900 disabled:opacity-50"
        >
          Prev
        </button>
        {[...Array(totalPages).keys()].map((num) => (
          <button
            key={num}
            onClick={() => setCurrentPage(num + 1)}
            className={`px-3 py-1 rounded border border-gray-300 ${
              currentPage === num + 1
                ? "bg-blue-600 text-black"
                : "hover:bg-gray-100"
            }`}
          >
            {num + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Edit Modal */}
      {editEmployee && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          onClick={closeEdit}
        >
          <div
            className="bg-white rounded-lg p-6 w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold mb-4">Edit Employee</h3>
            <label className="block mb-2 font-medium">Name</label>
            <input
              type="text"
              value={editForm.name}
              onChange={(e) =>
                setEditForm((f) => ({ ...f, name: e.target.value }))
              }
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            />
            <label className="block mb-2 font-medium">Designation</label>
            <input
              type="text"
              value={editForm.designation}
              onChange={(e) =>
                setEditForm((f) => ({ ...f, designation: e.target.value }))
              }
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={closeEdit}
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
