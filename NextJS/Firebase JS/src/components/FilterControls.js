import React, { useState, useEffect } from "react";

import { TextInput, Button } from "@mantine/core";

("../styles/FilterControls.module.css");

export default function FilterControls({ onUserInput, numItems }) {
  const handleChange = (e, type, value) => {
    e.preventDefault();
    onUserInput(type, value);
  };

  const handleTextChange = (e) => {
    handleChange(e, "name", e.target.value);
  };

  return (
    <>
      <div className=" flex flex-row items-center justify-center">
        <TextInput
          className="w-1/2"
          id="outlined-search"
          placeholder="Search by Name..."
          type="search"
          autoComplete="off"
          onChange={handleTextChange}
        />
        <h2 className=" w-10 h-10 m-3 p-2 bg-gray-300 rounded-xl">{numItems}</h2>
      </div>
    </>
  );
}
