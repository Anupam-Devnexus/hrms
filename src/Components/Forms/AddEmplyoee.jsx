import React, { useState } from "react";

export default function AddEmployee({ onAdd, onCancel }) {
  const [form, setForm] = useState({
    id: "",
    name: "",
    designation: "",
    department: "",
    email: "",
    phone: "",
    location: "",
    doj: "",
    status: "Active",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.id.trim()) newErrors.id = "Employee ID is required";
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.designation.trim()) newErrors.designation = "Designation is required";
    if (!form.department.trim()) newErrors.department = "Department is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email is invalid";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    if (!form.location.trim()) newErrors.location = "Location is required";
    if (!form.doj.trim()) newErrors.doj = "Date of Joining is required";
    if (!form.status.trim()) newErrors.status = "Status is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (onAdd) onAdd(form);
    setForm({
      id: "",
      name: "",
      designation: "",
      department: "",
      email: "",
      phone: "",
      location: "",
      doj: "",
      status: "Active",
    });
  };

  return (
    <div
      className="fixed inset-0 bg-blue-200 bg-opacity-60 flex items-center justify-center z-50"
      onClick={onCancel} // close popup if click outside the form
    >
      <div
        className="bg-white text-black rounded-lg shadow-lg p-6 w-full max-w-4xl mx-4"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside popup
      >
        <h2 className="text-xl font-semibold mb-4">Add New Employee</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2  gap-4">
          {[
            { label: "Employee ID", name: "id", type: "text" },
            { label: "Name", name: "name", type: "text" },
            { label: "Designation", name: "designation", type: "text" },
            { label: "Department", name: "department", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Phone", name: "phone", type: "tel" },
            { label: "Location", name: "location", type: "text" },
            { label: "Date of Joining", name: "doj", type: "date" },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className=" font-medium mb-1" htmlFor={name}>
                {label}
              </label>
              <input
                type={type}
                id={name}
                name={name}
                value={form[name]}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
                  errors[name]
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-blue-400"
                }`}
              />
              {errors[name] && (
                <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
              )}
            </div>
          ))}

          {/* <div>
            <label className="block font-medium mb-1" htmlFor="status">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
                errors.status
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm mt-1">{errors.status}</p>
            )}
          </div> */}

          <div className="flex gap-4 justify-center">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 cursor-pointer py-2 rounded border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 cursor-pointer py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
