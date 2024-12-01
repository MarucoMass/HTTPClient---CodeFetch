function BodyField({ value, onChange }) {
    return (
      <div className="mb-2">
        <label>Cuerpo (JSON)</label>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-2 border rounded min-h-20"
          placeholder='{ "key": "value" }'
        ></textarea>
      </div>
    );
  }
  
  export default BodyField;
  