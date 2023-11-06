import { MenuItem, Select } from "@mui/material";
import React from "react";
import "./styles.scss";

function NormalSelect({ onSelectChange, menuItems, selectValue, placeholder }) {
  return (
    <Select
      className="normal-select"
      value={selectValue}
      placeholder={placeholder}
      onChange={(e) => {
        onSelectChange(e.target.value);
      }}
      sx={{ border: "none" }}
    >
      <MenuItem disabled value="Enter here">
        Enter here
      </MenuItem>
      {menuItems.map((item) => (
        <MenuItem value={item}>{item}</MenuItem>
      ))}
    </Select>
  );
}

export default NormalSelect;
