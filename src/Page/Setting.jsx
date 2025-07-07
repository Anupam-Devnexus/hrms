import React, { useState } from "react";

export default function Settings() {
  // State hooks for example settings
  const [companyName, setCompanyName] = useState("My Company Pvt Ltd");
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [workingHours, setWorkingHours] = useState(8);
  const [enableHoliday, setEnableHoliday] = useState(true);
  const [leaveApproval, setLeaveApproval] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [passwordPolicy, setPasswordPolicy] = useState("Strong");
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  // Save handler (replace with real API call)
  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="max-w-5xl text-blue-600 mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">HRMS Settings</h1>

      {/* General Settings */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">General Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1 text-gray-700">Company Name</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-700">Timezone</label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
              <option value="UTC">UTC</option>
              <option value="America/New_York">America/New_York (EST)</option>
              <option value="Europe/London">Europe/London (GMT)</option>
              {/* Add more as needed */}
            </select>
          </div>
        </div>
      </section>

      {/* Attendance Settings */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Attendance Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1 text-gray-700">Working Hours Per Day</label>
            <input
              type="number"
              min="1"
              max="24"
              value={workingHours}
              onChange={(e) => setWorkingHours(parseInt(e.target.value))}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

         
        </div>
      </section>

      {/* Leave Management */}
      <div className="flex items-center justify-start gap-5">

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Leave Management</h2>
        <div className="flex items-center space-x-4">
          <label className="font-medium text-gray-700">Require Leave Approval</label>
          <input
            type="checkbox"
            checked={leaveApproval}
            onChange={() => setLeaveApproval(!leaveApproval)}
            className="h-5 w-5 text-blue-600"
          />
        </div>
      </section>

      {/* Notifications */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Notifications</h2>
        <div className="flex items-center space-x-4">
          <label className="font-medium text-gray-700">Email Notifications</label>
          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={() => setEmailNotifications(!emailNotifications)}
            className="h-5 w-5 text-blue-600"
          />
        </div>
      </section>
      </div>

      {/* Security Settings */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-1 text-gray-700">Password Policy</label>
            <select
              value={passwordPolicy}
              onChange={(e) => setPasswordPolicy(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Weak">Weak</option>
              <option value="Medium">Medium</option>
              <option value="Strong">Strong</option>
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <label className="font-medium text-gray-700">Enable Two-Factor Authentication</label>
            <input
              type="checkbox"
              checked={twoFactorAuth}
              onChange={() => setTwoFactorAuth(!twoFactorAuth)}
              className="h-5 w-5 text-blue-600"
            />
          </div>
        </div>
      </section>

      {/* Save Button */}
      <div className="text-right">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
