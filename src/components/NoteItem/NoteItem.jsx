import React, {useContext, useState } from "react";
import "./NoteItem.css";
import { TodoContext } from "../../Context/TodoContext";

const NoteItem = (props) => {
  const { itemDetails } = props;
  const { title, description, category, _id } = itemDetails;

  const {ClickedDelete, clickedDoneButton, completedItems} = useContext(TodoContext);

  const [isEditActive, setIsEditActive] = useState(false)
  const [todoInput, setTodoInput] = useState(description)

  let editcontent
  if (isEditActive) {
    editcontent = "Save"
  } else {
    editcontent = "Edit"
  }

  let isItemCompleted 
  if (completedItems.some((item) => (item._id === _id))) {
    isItemCompleted = true
  } else {
    isItemCompleted = false
  }

  console.log(isItemCompleted)

  const onClickedDelete = () => {
    ClickedDelete(_id);
  }

  const saveItemDetails = async () => {
    const tododetails = {
      title,
      description: todoInput,
      category,
    };
  
    const url = `https://notesappbackend-up2u.onrender.com/update/${_id}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tododetails),
    };
  
    try {
      const response = await fetch(url, options);
      const res = await response.json();
    //   console.log("Post data response:", res);
      setTodoInput(res.data.description)
    } catch (error) {
      console.error("Error saving item details:", error.message);
    }
  };
  

  const clickedEditButton = (event) => {
    setIsEditActive(!isEditActive)
    if (editcontent === "Save") {
        saveItemDetails()
    }
  }

  const onClickedDoneButton = () => {
    clickedDoneButton(_id)
  }

 

  return (
    <div className="noteitem-main-container">
      <div className="noteitem-container">
        <div>
          <div className="noteitem-title-and-category-cont">
            <p className="noteItem-titl"> {title} </p>
            <div className="categor-and-don-btn">
              <div className="noteItem-categ-cont">
            <p className="noteItem-categ"> {category} </p>
            </div>
            <button className={isItemCompleted ? "note-item-done-btn addnote-edit-btn completedItem" : "note-item-done-btn addnote-edit-btn"} onClick = {onClickedDoneButton}>Done</button>
            </div>
          </div>
          <hr />
        </div>
        <div className="noteitem-description-and-buttons">
          {isEditActive ? <input className="noitem-input-edit" type = "text" value = {todoInput} onChange={(event) => setTodoInput(event.target.value) }/> : <p className="noteitem-descrip"> {todoInput} </p>}
          <div className="edi-and-del-btn">
            <button className="addnote-edit-btn" onClick={clickedEditButton}> {editcontent} </button>
            <button className="addnote-edit-btn" onClick={onClickedDelete}> Delete </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
