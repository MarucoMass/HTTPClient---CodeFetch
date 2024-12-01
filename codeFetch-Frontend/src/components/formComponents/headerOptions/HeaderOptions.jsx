function HeaderOptions({ headerOptions, selectedHeaders, toggleHeader, headers, setHeaders }) {
    return (
      <>
        <div className="mb-2">
          <label>Cabeceras estándar</label>
          <div className="grid grid-cols-2 gap-2">
            {headerOptions.map((header) => (
              <label key={header.key} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedHeaders.includes(header.key)}
                  onChange={() => toggleHeader(header.key)}
                  className="mr-2"
                />
                {header.key} ({header.value})
              </label>
            ))}
          </div>
        </div>
        <div className="mb-2">
          <label>Cabeceras personalizadas (JSON)</label>
          <textarea
            value={headers}
            onChange={(e) => setHeaders(e.target.value)}
            className="w-full p-2 border rounded min-h-20"
            placeholder='{ "key": "value" }'
          ></textarea>
        </div>
      </>
    );
  }
  
  export default HeaderOptions;
  