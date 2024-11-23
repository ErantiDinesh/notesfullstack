import React, { useContext, useEffect, useState } from 'react';
import './header.css';
import { CgNotes } from "react-icons/cg";
import { IoIosSearch } from "react-icons/io";
import { TodoContext } from '../../Context/TodoContext';

const Header = () => {
  const [userSearch, setUserSearch] = useState("");
  const { getSearchedData, getAllTodos, handleCompletedButton, isCompleteActive } = useContext(TodoContext);

  const handleChange = (e) => {
    setUserSearch(e.target.value); 
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      getSearchedData(userSearch); 
    }
  };

  useEffect(() => {
    if (userSearch === "") {
      getAllTodos()
    }
  },[userSearch])

  return (
    <div>
      <div className="header-container">
        <div className="notes-logo">
          <CgNotes className="logo-image" />
          <h1>Note Maker</h1>
        </div>
        <div className="notes-searchbar">
          <input
            type="text"
            className="notes-inputbar"
            value={userSearch}
            placeholder="Search Notes"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <IoIosSearch className="search-icon" />
        </div>
        <div className="notes-completed-button">
          <button onClick = {handleCompletedButton} className={!isCompleteActive ? "completed-btn" : "completed-btn activebtn"}>Completed</button>
        </div>
      </div>
      <hr/>
    </div>
  );
};

export default Header;
