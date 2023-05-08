import React from "react";

function InputBox({
  label,
  type,
  id,
  name,
  value,
  onChange,
  placeholder,
  text,
  message,
  valid,
}) {
  const validClass = "valid";
  const invalidClass = "invalid";
  return (
    <div
      className={`input_box ${
        message ? (valid ? validClass : invalidClass) : ""
      }`}
    >
      <input
        label={label}
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        text={text}
      />
      {message && (
        <div className={`message ${valid ? "_hidden" : "_visible"}`}>
          {message}
        </div>
      )}
    </div>
  );
}

export default InputBox;
