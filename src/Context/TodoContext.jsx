import React, { createContext, useEffect, useState } from "react";

export const TodoContext = createContext(null);

const TodoContextProvider = ({children}) => {
    const name = "Hello world";

    const [todoItems, setTodoItems] = useState([]);
    const [completedItems, setCompletedItems] = useState([]);
    const [isCompleteActive, setIsCompleteActive] = useState(false);

    const getAllTodos = async () => {
        try {
          const response = await fetch("http://localhost:4000/get-todo");
          const res = await response.json();
          if (res.success) {
            const sortedTodos = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setTodoItems(sortedTodos);
          } else {
            console.error("Failed to fetch todos:", res.message);
          }
        } catch (error) {
          console.log(error);
        }
      };
      

    useEffect(() => {
        getAllTodos();
    }, [])


    const clickedAddButton = async (title, description, category) => {
        const todoDetails = {
            title: title,
            description: description,
            category: category,
        }

        // console.log(todoDetails)

        const url = "http://localhost:4000/create-todo";
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(todoDetails),
        }

        try {
            const response = await fetch(url, options);
            const res = await response.json();
            console.log("addata", res);
            setTodoItems((prevState) => ([res.data, ...prevState]))
        } catch (error) {
            console.log("fetchErrorWhileAddingTodo:", error)
        }
        
    }

    const ClickedDelete = async (_id) => {
        try {
            const response = await fetch(`http://localhost:4000/delete/${_id}`, {method: "DELETE",})
            const res = await response.json()
            console.log("deleted:", res)
            setTodoItems((prevState) => (
                prevState.filter((item) => (item._id !== _id))
            ))
            setCompletedItems((prevState) => (
              prevState.filter((item) => (item._id !== _id))
            ))
        } catch (error) {
            console.log(error);
        }
    }

    const getSearchedData =  (searchInput) => {
        try {
            const searchedItems = todoItems.filter((item) => (item.title.toLowerCase().includes(searchInput.toLowerCase())))
            setTodoItems(searchedItems);
            console.log("searchedItems:", searchedItems)
        } catch (error) {
            console.log(error);
        }
    }

    const clickedDoneButton = (id) => {
        const isDone = completedItems.some((item) => item._id === id);   
        if (!isDone) {
          const getItem = todoItems.find((item) => item._id === id);
          if (getItem) {
            setCompletedItems((prevState) => [...prevState, getItem]);
          }
        } else {
          setCompletedItems((prevState) =>
            prevState.filter((item) => item._id !== id)
          );
        }
      };

      console.log("Completed Items:", completedItems);

      const handleCompletedButton = () => {
        setIsCompleteActive((prevState) => !prevState)
      }
    



    const contextValue = {name, getAllTodos, todoItems, clickedAddButton, ClickedDelete, getSearchedData, clickedDoneButton, handleCompletedButton, isCompleteActive, completedItems};

    return(
        <TodoContext.Provider value={contextValue}>
            {children}
        </TodoContext.Provider>
    )
}

export default TodoContextProvider;