import React, { useState, useEffect, useCallback } from "react";
import DentistCard from "../components/DentistCard";
import BookAppointment from "../components/BookAppointment";
import { fetchDentists } from "../api";

function DentistList() {
  const [dentists, setDentists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedDentist, setSelectedDentist] = useState(null);

  const loadDentists = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetchDentists(search);
      setDentists(res.data.data);
    } catch (err) {
      setError("Failed to load dentists. Please make sure the server is running.");
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    loadDentists();
  }, [loadDentists]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(searchInput.trim());
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSearch("");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Find a Dentist</h1>
        <p className="text-gray-500 mt-1 text-sm">
          Browse our trusted dental professionals and book your appointment today.
        </p>
      </div>

      {/* Search bar */}
      <form onSubmit={handleSearchSubmit} className="mb-6 flex gap-3">
        <div className="relative flex-1 max-w-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by name, location, or specialty..."
            className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          />
        </div>
        <button
          type="submit"
          className="bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
        >
          Search
        </button>
        {search && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="border border-gray-300 text-gray-600 hover:bg-gray-50 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Clear
          </button>
        )}
      </form>

      {/* Search result label */}
      {search && !loading && (
        <p className="text-sm text-gray-500 mb-4">
          {dentists.length > 0
            ? `Showing ${dentists.length} result${dentists.length !== 1 ? "s" : ""} for "${search}"`
            : `No results found for "${search}"`}
        </p>
      )}

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin"></div>
            <p className="text-gray-500 text-sm">Loading dentists...</p>
          </div>
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <p className="text-red-600 font-medium">{error}</p>
          <button
            onClick={loadDentists}
            className="mt-3 text-sm text-sky-600 hover:underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && dentists.length === 0 && (
        <div className="text-center py-20">
          <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-600 font-medium">No dentists found</p>
          <p className="text-gray-400 text-sm mt-1">Try a different search term</p>
        </div>
      )}

      {/* Dentist grid */}
      {!loading && !error && dentists.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {dentists.map((dentist) => (
            <DentistCard
              key={dentist._id}
              dentist={dentist}
              onBookClick={setSelectedDentist}
            />
          ))}
        </div>
      )}

      {/* Booking modal */}
      {selectedDentist && (
        <BookAppointment
          dentist={selectedDentist}
          onClose={() => setSelectedDentist(null)}
          onSuccess={() => {}}
        />
      )}
    </div>
  );
}

export default DentistList;
