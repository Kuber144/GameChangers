import React from "react";

const InputField = ({ id, label, value, onChange, required = true }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <input
      type="text"
      id={id}
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);

export default InputField;
