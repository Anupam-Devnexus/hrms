import React, { useState } from "react";
import EmployeeTable from "../Components/Tables/EmployeeTable";
import EmployeeData from "../DataStore/employees.json";
import AddEmployee from "../Components/Forms/AddEmplyoee";

export default function EmployeeManagement() {
  // Use state to allow updates and deletes
    const [showAddForm, setShowAddForm] = useState(false);
  const [employees, setEmployees] = useState(EmployeeData);

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

  const handleAdd = (newEmployee) => {
    setEmployees((prev) => [...prev, newEmployee]);
    setShowAddForm(false);
  };
  return (
    <div className="flex flex-col items-center justify-start w-full h-full">
      <div className="flex justify-between items-center w-full bg-gray-100 rounded-xl p-6 max-w-7xl mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Employees</h1>
        <button
          className="bg-blue-600 cursor-pointer shadow-xl hover:shadow-2xl hover:bg-blue-700 text-white px-4 py-2 rounded"
         onClick={() => setShowAddForm(true)}
        >
          Add Employee
        </button>
      </div>

      <div className="w-full max-w-7xl">
        <EmployeeTable
          employees={employees}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </div>

       {showAddForm && (
        <AddEmployee onAdd={handleAdd} onCancel={() => setShowAddForm(false)} />
      )}
    </div>
  );
}
