import React from "react";
import RecruitmentData from "../../DataStore/recruitments.json";

export default function RecruitmentPop({ onClose }) {
  return (
    // Overlay
    <div
      className="fixed inset-0 bg-blue-200 bg-opacity-60 flex items-center justify-center z-50 cursor-pointer"
      onClick={onClose}
    >
      {/* Modal */}
      <div
        className="bg-white rounded-2xl shadow-2xl p-6 w-[90vw] max-w-6xl max-h-[85vh] overflow-y-auto cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Open Job Positions</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {RecruitmentData.map((job, index) => (
            <div
              key={index}
              className="border rounded-xl p-4 bg-gray-50 shadow hover:shadow-md transition duration-200"
            >
              <h3 className="text-lg font-semibold text-indigo-700 mb-1">{job.title}</h3>
              <p className="text-sm text-gray-600 mb-1"><strong>Department:</strong> {job.department}</p>
              <p className="text-sm text-gray-600 mb-1"><strong>Location:</strong> {job.location}</p>
              <p className="text-sm text-gray-600 mb-1"><strong>Posted On:</strong> {job.postedOn}</p>
              <p className="text-sm text-gray-600 mb-1"><strong>Vacancies:</strong> {job.vacancies}</p>
              <span
                className={`inline-block mt-2 px-3 py-1 text-xs font-semibold text-white rounded-full ${
                  job.status === "Open"
                    ? "bg-green-500"
                    : job.status === "Closed"
                    ? "bg-red-500"
                    : "bg-gray-400"
                }`}
              >
                {job.status}
              </span>
            </div>
          ))}
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
