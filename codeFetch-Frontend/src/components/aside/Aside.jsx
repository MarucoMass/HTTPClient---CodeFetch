/* eslint-disable react/prop-types */



function Aside({ savedRequests, onRequestSelect, removeRequest }) {
  const days = Object.keys(savedRequests);
  
  return (
    <aside className="fixed left-0 top-0 h-dvh bg-gray-100/20 border-r w-1/5 flex flex-col justify-center items-center z-50">
      <h2 className="text-lg font-bold mb-4">Solicitudes Guardadas</h2>
      {days.length === 0 && <p>No hay solicitudes guardadas.</p>}
      {days.map((day) => (
        <div key={day} className="mb-4 flex flex-col items-center w-full">
          <h3 className="text-base font-semibold">{day}</h3>
          <ul className=" list-none w-full">
            {savedRequests[day].map((req, index) => (
              <li
                key={index}
                className="py-1 text-sm text-center hover:bg-gray-200 transition"
              >
                <div className="">
                  <button
                    onClick={() => onRequestSelect(req)}
                    className="hover:underline"
                  >
                    <span className="uppercase font-semibold">
                      {req.response.config.method}
                    </span>{" "}
                    {req.response.config.url}
                  </button>
                  <button onClick={removeRequest} className="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
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
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}

export default Aside;
