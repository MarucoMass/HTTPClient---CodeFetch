function FieldToggles({ options, activeFields, setActiveFields }) {
    const toggleField = (field) => {
      setActiveFields((prev) =>
        prev.includes(field)
          ? prev.filter((f) => f !== field)
          : [...prev, field]
      );
    };
  
    return (
      <div className="mb-4">
        <label>Opciones Disponibles</label>
        <div className="grid grid-cols-2 gap-2">
          {options.map((field) => (
            <label key={field} className="flex items-center">
              <input
                type="checkbox"
                checked={activeFields.includes(field)}
                onChange={() => toggleField(field)}
                className="mr-2"
              />
              {field}
            </label>
          ))}
        </div>
      </div>
    );
  }
  
  export default FieldToggles;
  