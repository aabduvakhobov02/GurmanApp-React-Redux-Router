import React from "react";
import "./search-panel.scss";

const SearchPanel = ({ valueChangedHandler }) => {
  const change = (e) => {
    const target = e.target.value;
    valueChangedHandler(target);
  };
  return (
    <input
      className="search-input"
      type="text"
      placeholder="Search from menu"
      onChange={(e) => change(e)}
    />
  );
};

export default SearchPanel;
