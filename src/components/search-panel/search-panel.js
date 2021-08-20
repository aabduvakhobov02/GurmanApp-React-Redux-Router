import React from "react";
import { connect } from "react-redux";
import "./search-panel.scss";

const SearchPanel = () => {
  let value = "";
  return (
    <input
      className="search-input"
      type="text"
      placeholder="Search from tweets"
      onChange={(e) => (e.target.value = value)}
    />
  );
};

const mapStateToProps = ({ searchValue }) => {
  return {
    searchValue,
  };
};

export default connect(mapStateToProps)(SearchPanel);
