import React, { useState } from "react";

function DentistCard({ dentist, onBookClick }) {
  const [imgError, setImgError] = useState(false);

  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    dentist.name
  )}&background=0ea5e9&color=fff&size=128`;

  return (
    <div className="card p-5 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200">
      {/* Top section: photo + basic info */}
      <div className="flex items-start gap-4">
        <img
          src={imgError ? fallbackAvatar : dentist.photo || fallbackAvatar}
          alt={dentist.name}
          onError={() => setImgError(true)}
          className="w-16 h-16 rounded-full object-cover flex-shrink-0 border-2 border-sky-100"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-base truncate">
            {dentist.name}
          </h3>
          <p className="text-sky-600 text-sm font-medium">{dentist.specialization}</p>
          <p className="text-gray-500 text-xs mt-0.5">{dentist.qualification}</p>
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <span className="text-gray-400 text-xs uppercase tracking-wide">Experience</span>
          <p className="font-medium text-gray-800">
            {dentist.yearsOfExperience} {dentist.yearsOfExperience === 1 ? "year" : "years"}
          </p>
        </div>
        <div>
          <span className="text-gray-400 text-xs uppercase tracking-wide">Clinic</span>
          <p className="font-medium text-gray-800 truncate">{dentist.clinicName}</p>
        </div>
      </div>

      {/* Address */}
      <div className="flex items-start gap-2 text-sm text-gray-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <span className="line-clamp-2">
          {dentist.address}, {dentist.location}
        </span>
      </div>

      {/* Book button */}
      <button
        onClick={() => onBookClick(dentist)}
        className="mt-auto w-full bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium py-2.5 rounded-lg transition-colors duration-200"
      >
        Book Appointment
      </button>
    </div>
  );
}

export default DentistCard;
