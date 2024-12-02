/* eslint-disable react/prop-types */
import { useState } from "react";

function Aside({ savedRequests, onSaveAndShow, onDelete }) {
  const [expandedDates, setExpandedDates] = useState({}); 
  const datesOfRequests = Object.keys(savedRequests).sort((a, b) => new Date(b) - new Date(a));

  const toggleDate = (date) => {
    setExpandedDates((prev) => ({
      ...prev,
      [date]: !prev[date], 
    }));
  };

  return (
    <aside className="fixed left-0 top-0 h-dvh bg-gray-100/20 border-r w-96 pt-10 z-50">
      <h2 className="text-lg text-center font-bold mb-4">
        Solicitudes Guardadas
      </h2>
      {datesOfRequests.length === 0 ? (
        <p className="text-center">No hay consultas guardadas</p>
      ) : (
        datesOfRequests.map((date) => (
          <div key={date} className="w-full px-4 mb-2">
            <button
              onClick={() => toggleDate(date)}
              className="w-full flex justify-between items-center font-semibold p-2 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              {date == new Date().toISOString().split("T")[0] ? "Hoy" : date}
              <span
                className={`transform transition-transform ${
                  expandedDates[date] ? "rotate-90" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-right-dashed"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 12h.5m3 0h1.5m3 0h6" />
                  <path d="M13 18l6 -6" />
                  <path d="M13 6l6 6" />
                </svg>
              </span>
            </button>
            {expandedDates[date] && (
              <ul className="mt-2 px-1">
                {savedRequests[date]?.map((req, index) => (
                  <li
                    key={index}
                    className="list-none py-1 flex justify-between items-center"
                  >
                    <button
                      onClick={() => onSaveAndShow(req)}
                      className="text-blue-500 hover:underline truncate"
                    >
                      <span className="uppercase font-bold text-black mr-2">{req.method}</span>
                      {req.url}
                    </button>
                    <button
                      onClick={() => onDelete(req)}
                      className="text-black hover:text-red-700 "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-trash"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M4 7l16 0" />
                        <path d="M10 11l0 6" />
                        <path d="M14 11l0 6" />
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))
      )}
    </aside>
  );
}

export default Aside;
