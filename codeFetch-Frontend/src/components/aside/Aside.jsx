function Aside({ savedRequests, onSaveAndShow, onDelete }) {
  const datesOfRequests = Object.keys(savedRequests);

  return (
    <aside className="fixed left-0 top-0 h-dvh bg-gray-100/20 border-r w-96 flex flex-col justify-start items-center pt-10 z-50">
      <h2 className="text-lg font-bold mb-4">Solicitudes Guardadas</h2>
      {datesOfRequests.length === 0 ? (
        <p>No hay consultas guardadas</p>
      ) : (
        datesOfRequests.map((date) => (
          <div key={date}>
            <h3 className="font-semibold">{date}</h3>
            {savedRequests[date]?.map((req, index) => (
              <div key={index} className=" gap-2 hover:bg-gray-200 transition-colors">
                <div className=" py-1 flex justify-start ">
                  <button onClick={() => onSaveAndShow(req)}>
                    {req.config.url}
                  </button>
                  <button className="" onClick={() => onDelete(req)}>🗑</button>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </aside>
  );
}

export default Aside;
