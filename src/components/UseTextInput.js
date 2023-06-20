import React from "react";
import { useState } from "react";

const UseTextInput = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event) => {
    if (/^[a-zA-Z ]+$/.test(event.target.value)) {
      setValue(event.target.value);
    } else {
      setValue("");
    }
  };

  return [value, handleChange];
};

export default UseTextInput;
