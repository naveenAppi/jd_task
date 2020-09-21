import React from 'react';

function TextInput({
     name,label, placeholder , type , value , error , onChange, hasEror
}) {
  return (

    <div class="form-group">
      <label>{label}</label>
      <input
        name={name}
        type={type}
        class="form-control"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete="off"
      />
      {hasEror === true ? <small style={{ color: "red" }} class="form-text">{error}</small> : null}
  </div>
  )
}

export default TextInput;
