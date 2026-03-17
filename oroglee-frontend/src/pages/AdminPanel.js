import React, { useState, useEffect, useCallback } from "react";
import { fetchAppointments, updateAppointmentStatus } from "../api";

const STATUS_COLORS = {
  Booked: "bg-blue-50 text-blue-700",
  Completed: "bg-green-50 text-green-700",
  Cancelled: "bg-red-50 text-red-600",
};

function AdminPanel() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [updatingId, setUpdatingId] = useState(null);

  const loadAppointments = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetchAppointments(currentPage, 10);
      setAppointments(res.data.data);
      setPagination(res.data.pagination);
    } catch (err) {
      setError("Failed to load appointments. Make sure the server is running.");
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const res = await updateAppointmentStatus(id, newStatus);
      setAppointments((prev) =>
        prev.map((a) => (a._id === id ? res.data.data : a))
      );
    } catch (err) {
      alert("Failed to update status. Please try again.");
    } finally {
      setUpdatingId(null);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Manage all appointment bookings from here.
          </p>
        </div>
        <button
          onClick={loadAppointments}
          className="border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>

      {/* Summary cards */}
      {!loading && appointments.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          {["Booked", "Completed", "Cancelled"].map((status) => {
            const count = appointments.filter((a) => a.status === status).length;
            const colorMap = {
              Booked: "text-blue-700 bg-blue-50",
              Completed: "text-green-700 bg-green-50",
              Cancelled: "text-red-600 bg-red-50",
            };
            return (
              <div key={status} className="card p-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold ${colorMap[status]}`}>
                  {count}
                </div>
                <span className="text-sm font-medium text-gray-600">{status}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin"></div>
            <p className="text-gray-500 text-sm">Loading appointments...</p>
          </div>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-600 font-medium">{error}</p>
          <button onClick={loadAppointments} className="mt-3 text-sm text-sky-600 hover:underline">
            Try again
          </button>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && appointments.length === 0 && (
        <div className="card p-16 text-center">
          <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-gray-600 font-medium">No appointments yet</p>
          <p className="text-gray-400 text-sm mt-1">Bookings will appear here once patients start scheduling.</p>
        </div>
      )}

      {/* Table */}
      {!loading && !error && appointments.length > 0 && (
        <>
          {/* Desktop table */}
          <div className="card overflow-hidden hidden md:block">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">#</th>
                    <th className="text-left px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Patient</th>
                    <th className="text-left px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Age</th>
                    <th className="text-left px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Gender</th>
                    <th className="text-left px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Date</th>
                    <th className="text-left px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Dentist</th>
                    <th className="text-left px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Clinic</th>
                    <th className="text-left px-5 py-3 font-semibold text-gray-600 text-xs uppercase tracking-wide">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {appointments.map((appt, idx) => (
                    <tr key={appt._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3.5 text-gray-400">
                        {(currentPage - 1) * 10 + idx + 1}
                      </td>
                      <td className="px-5 py-3.5 font-medium text-gray-900">
                        {appt.patientName}
                      </td>
                      <td className="px-5 py-3.5 text-gray-600">{appt.age}</td>
                      <td className="px-5 py-3.5 text-gray-600">{appt.gender}</td>
                      <td className="px-5 py-3.5 text-gray-600">
                        {formatDate(appt.appointmentDate)}
                      </td>
                      <td className="px-5 py-3.5 text-gray-900">
                        {appt.dentist?.name || "—"}
                      </td>
                      <td className="px-5 py-3.5 text-gray-600">
                        {appt.dentist?.clinicName || "—"}
                      </td>
                      <td className="px-5 py-3.5">
                        <select
                          value={appt.status}
                          disabled={updatingId === appt._id}
                          onChange={(e) => handleStatusChange(appt._id, e.target.value)}
                          className={`text-xs font-medium px-2 py-1 rounded-md border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500 ${STATUS_COLORS[appt.status]}`}
                        >
                          <option value="Booked">Booked</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile card list */}
          <div className="flex flex-col gap-3 md:hidden">
            {appointments.map((appt, idx) => (
              <div key={appt._id} className="card p-4 flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-900">{appt.patientName}</p>
                    <p className="text-gray-500 text-xs mt-0.5">
                      {appt.age} yrs · {appt.gender}
                    </p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${STATUS_COLORS[appt.status]}`}>
                    {appt.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <p><span className="text-gray-400">Date: </span>{formatDate(appt.appointmentDate)}</p>
                  <p><span className="text-gray-400">Dentist: </span>{appt.dentist?.name || "—"}</p>
                  <p><span className="text-gray-400">Clinic: </span>{appt.dentist?.clinicName || "—"}</p>
                </div>
                <select
                  value={appt.status}
                  disabled={updatingId === appt._id}
                  onChange={(e) => handleStatusChange(appt._id, e.target.value)}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <option value="Booked">Booked</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between mt-5">
              <p className="text-sm text-gray-500">
                Showing page {pagination.page} of {pagination.totalPages} ({pagination.total} total)
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(pagination.totalPages, p + 1))}
                  disabled={currentPage === pagination.totalPages}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AdminPanel;
