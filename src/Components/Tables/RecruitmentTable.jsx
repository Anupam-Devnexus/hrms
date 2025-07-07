import React, { useState } from 'react';
import RecruitmentData from '../../DataStore/recruitments.json';

const PAGE_SIZE = 9;

export default function RecruitmentTable() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const [modalJob, setModalJob] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (e) => setSearch(e.target.value);
  const handleStatusChange = (e) => setStatusFilter(e.target.value);
  const handleSort = () => setSortAsc(!sortAsc);
  const closeModal = () => setModalJob(null);

  const filteredData = RecruitmentData
    .filter(item =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.department.toLowerCase().includes(search.toLowerCase())
    )
    .filter(item => (statusFilter ? item.status === statusFilter : true))
    .sort((a, b) => {
      const dateA = new Date(a.postedOn);
      const dateB = new Date(b.postedOn);
      return sortAsc ? dateA - dateB : dateB - dateA;
    });

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const paginatedData = filteredData.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="p-6 w-full max-w-7xl text-black mx-auto">
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search by title or department..."
          value={search}
          onChange={handleSearch}
          className="px-4 py-2 border rounded w-full sm:w-[300px]"
        />
        <div className="flex items-center gap-4">
          <select
            value={statusFilter}
            onChange={handleStatusChange}
            className="px-4 py-2 border rounded"
          >
            <option value="">All Statuses</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
          <button
            onClick={handleSort}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Sort by Date {sortAsc ? '↑' : '↓'}
          </button>
        </div>
      </div>

      <div className="overflow-auto rounded-lg shadow">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Job ID</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Department</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Posted</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map(job => (
              <tr key={job.jobId} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{job.jobId}</td>
                <td className="px-4 py-2">{job.title}</td>
                <td className="px-4 py-2">{job.department}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded text-white text-xs ${job.status === 'Open' ? 'bg-green-500' : 'bg-red-500'}`}>{job.status}</span>
                </td>
                <td className="px-4 py-2">{new Date(job.postedOn).toLocaleDateString()}</td>
                <td className="px-4 py-2">
                  <button
                    className="text-blue-600 hover:underline text-sm"
                    onClick={() => setModalJob(job)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center gap-2">
        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-3 py-1 border rounded">Prev</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-3 py-1 border rounded">Next</button>
      </div>

      {/* Modal Popup */}
      {modalJob && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50" onClick={closeModal}>
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-semibold mb-4">{modalJob.title} Details</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li><strong>Job ID:</strong> {modalJob.jobId}</li>
              <li><strong>Department:</strong> {modalJob.department}</li>
              <li><strong>Location:</strong> {modalJob.location}</li>
              <li><strong>Vacancies:</strong> {modalJob.vacancies}</li>
              <li><strong>Status:</strong> {modalJob.status}</li>
              <li><strong>Posted On:</strong> {new Date(modalJob.postedOn).toDateString()}</li>
            </ul>
            <button
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
