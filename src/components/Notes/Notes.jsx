import React, { useContext, useEffect, useState } from "react";
import "./Notes.css";
import Header from "../Header/Header";
import AddNotes from "../AddNotes/AddNotes";
import NoteItem from "../NoteItem/NoteItem";
import { TodoContext } from "../../Context/TodoContext";

const Notes = () => {
  const { todoItems, isCompleteActive, completedItems } =
    useContext(TodoContext);
  return (
    <div className="notes-container">
      <Header />
      <AddNotes />
      {/* {!isCompleteActive ? <div className='todoItems-container'>
            {todoItems.map((item) => (
                <NoteItem itemDetails = {item} key = {item._id}/>
            ))}
        </div> : <div className='todoItems-container'>
            {completedItems.map((item) => (
                <NoteItem itemDetails = {item} key = {item._id}/>
            ))}
        </div>} */}
      {!isCompleteActive && (
        todoItems.length !==0 ? <div className="todoItems-container">
          {todoItems.map((item) => (
            <NoteItem itemDetails={item} key={item._id} />
          ))}
        </div> : <div className="empty-note-para"> <p> Notemaker is Empty Please Add your notes </p> </div>
      )}{" "}
      {isCompleteActive && (
        completedItems.length !== 0? <div className="todoItems-container">
          {completedItems.map((item) => (
            <NoteItem itemDetails={item} key={item._id} />
          ))}
        </div> : <div className="empty-note-para"> <p> completed notes are Empty </p> </div>
      )}
    </div>
  );
};

export default Notes;
