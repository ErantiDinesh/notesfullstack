import React, { useContext, useState } from 'react'
import './AddNotes.css'
import { TodoContext } from '../../Context/TodoContext';

const AddNotes = () => {

    const [title, setTitle] = useState("");
    const [description, setdescription] = useState("");
    const [category, setCategory] = useState("");

    const {clickedAddButton} = useContext(TodoContext);

    const onclickedAddButton = () => {
        if (title === "") {
            alert("Please Enter Title");
        } else if (description === "") {
            alert("please Enter Description");
        } else if (category === "") {
            alert("Please Select Category");
        } else {
            clickedAddButton(title, description, category)
            setTitle("");
            setdescription("");
            setCategory("");
        }
    }


  return (

    <div className='addnotes-container'>
        <div>
            <div className='title-and-description'>
            <input onChange={(e) => setTitle(e.target.value)} id = "title" type = "text" placeholder='Title' value = {title} className='addnotes-input'/>
            <br/>
            <hr/>
            <input onChange={(e) => setdescription(e.target.value)} id = "description" type = "text" placeholder='Description' value = {description} className='addnotes-input'/>
            <br/>
            </div>
            <div className='category-and-add'>
            <select className='addnote-options-container' value = {category} onChange={(e) => setCategory(e.target.value)}>
                <option value = "" disabled selected> select a category </option>
                <option value="work"> Work </option>
                <option value="personal"> personal </option>
                <option value="important"> important </option>
                <option value="others"> others </option>
            </select>
            <button className='add-button' onClick={onclickedAddButton}> Add </button>
            </div>
        </div>
    </div>
  )
}

export default AddNotes