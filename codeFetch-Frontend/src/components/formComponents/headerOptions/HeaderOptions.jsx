function HeaderOptions({ headerOptions, selectedHeaders, toggleHeader }) {
  // Convertimos el objeto en un array de pares [key, value]
  const headerArray = Object.entries(headerOptions);

  return (
    <div className="mb-2">
      <label>Cabeceras</label>
      <div className="grid grid-cols-2 gap-2">
        {headerArray.map(([key, value]) => (
          <label key={key} className="flex items-center">
            <input
              type="checkbox"
              checked={!!selectedHeaders[key]}
              onChange={() => toggleHeader(key)} 
              className="mr-2"
            />
            {key} ({value})
          </label>
        ))}
      </div>
    </div>
  );
}

export default HeaderOptions;
