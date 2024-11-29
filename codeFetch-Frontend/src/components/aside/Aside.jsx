function Aside({ savedRequests, showRequest }) {
  const datesOfRequests = Object.keys(savedRequests);

  return (
    <aside className="fixed left-0 top-0 h-dvh bg-gray-100/20 border-r w-1/5 flex flex-col justify-start items-center pt-10 z-50">
      <h2 className="text-lg font-bold mb-4">Solicitudes Guardadas</h2>
      {datesOfRequests.length === 0 ? (
        <p>No hay consultas guardadas</p>
      ) : (
        datesOfRequests.map((date) => (
          <div key={date}>
            <h3 className="font-semibold">{date}</h3>
            {savedRequests[date]?.map((req, index) => (
              <p key={index}>
                <button onClick={() => showRequest(req)}>{req.config.url}</button>
              </p>
            ))}
          </div>
        ))
      )}
    </aside>
  );
}

export default Aside;
