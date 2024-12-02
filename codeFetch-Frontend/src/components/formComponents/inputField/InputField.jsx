function InputField({ label, value, onChange, placeholder }) {
    return (
      <div className="mb-2">
        <label>{label}</label>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder={placeholder}
        />
      </div>
    );
  }
  
  export default InputField;
  