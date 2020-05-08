import React, { useState } from "react";

const Search = () => {
  const [query, setQuery] = useState("");

  const onSearchSubmit = (e) => {
    e.preventDefault();
    if (query == "") {
      return;
    }
    window.location = `/search?query=${query.replace(/\s/g, "_")}`;
  };

  return (
    <div>
      <form onSubmit={onSearchSubmit}>
        <input
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          className="inputStyle"
          type="text"
          placeholder="Search"
        />
        <button type="submit" className="inputButton ml-15">
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </form>
    </div>
  );
};

export default Search;
