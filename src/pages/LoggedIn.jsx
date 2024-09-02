import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import HomeNavbar from "./HomeNavbar";
import TaskList from "./TaskList";
import { DragDropContext } from "react-beautiful-dnd";
import { updateTaskStatus } from "../utils/taskFunc";

function LoggedIn({ taskData }) {
  const [searchInpt, setSearchInpt] = useState("");
  const [inProgress, setInProgress] = useState([]);
  const [done, setDone] = useState([]);
  const [todo, setTodo] = useState([]);
  const [option, setOption] = useState("Sort By");

  const initialize=()=>{
    setInProgress(taskData.filter((task) => task.status === "in progress"));
    setDone(taskData.filter((task) => task.status === "done"));
    setTodo(taskData.filter((task) => task.status === "todo"));
 
  }
  useEffect(() => {
    console.log("Inside UseEffect!!");
    initialize();
 }, []);

  const onDragEnd = async (result) => {
    const { source, destination } = result;

    // Dropped outside a droppable area
    if (!destination) return;

    // Dropped in the same place
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }



    // Get the task being moved
    const sourceList = getList(source.droppableId);
    const task = sourceList[source.index];
    console.log(task);

    if(source.droppableId === destination.droppableId){
      sourceList.splice(source.index,1);
      sourceList.splice(destination.index,0,task);

      updateList(source.droppableId,sourceList);
      return;
    }
    // Remove from source
    const updatedSourceList = [...sourceList];
    updatedSourceList.splice(source.index, 1);

    // Add to destination
    const destinationList = getList(destination.droppableId);
    destinationList.splice(destination.index, 0, task);

    // Update the state accordingly
    updateList(source.droppableId, updatedSourceList);
    updateList(destination.droppableId, destinationList);

    if (source.droppableId !== destination.droppableId) {
      // updatestatus function

      await updateTaskStatus(task._id, destination.droppableId);
    }
  };

  const getList = (id) => {
    if (id === "todo") return todo;
    if (id === "in progress") return inProgress;
    if (id === "done") return done;
  };

  const updateList = (id, updatedList) => {
    if (id === "todo") setTodo(updatedList);
    if (id === "in progress") setInProgress(updatedList);
    if (id === "done") setDone(updatedList);
  };
  const filterBySearch = () => {
    if (searchInpt === "") {
      window.location.reload();
    } else {
      console.log(searchInpt);
      const regex = new RegExp(searchInpt, "i"); // 'i' makes the search case-insensitive

      const filteredTodo = todo.filter(
        (task) => regex.test(task.title) || regex.test(task.desc)
      );
      const filteredInProgress = inProgress.filter(
        (task) => regex.test(task.title) || regex.test(task.desc)
      );
      const filteredDone = done.filter(
        (task) => regex.test(task.title) || regex.test(task.desc)
      );

      setTodo(filteredTodo);
      setDone(filteredDone);
      setInProgress(filteredInProgress);
    }
  };

  const sortByFilter = (e) => {
    setOption(e.target.value);
    const selected = e.target.value;
    if(selected === "Sort By")
      window.location.reload();

    else if(selected === "createdAt"){
      // window.location.reload();

      const todoByTime = [...todo].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      console.log(todoByTime);
      setTodo(todoByTime);

      const inProgressByTime = inProgress.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      console.log(inProgressByTime);
      setInProgress(inProgressByTime);

      const doneByTime = done.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      console.log(doneByTime);
      setDone(doneByTime);      
    }
    else {
      // window.location.reload();
      
      const todoAsc = [...todo].sort((a, b) => a[selected].localeCompare(b[selected]));
      console.log(todoAsc);
      setTodo(todoAsc);

      const inProgressAsc = [...inProgress].sort((a, b) => a[selected].localeCompare(b[selected]));
      console.log(inProgressAsc);
      setInProgress(inProgressAsc);

      const doneAsc = [...done].sort((a, b) => a[selected].localeCompare(b[selected]));
      console.log(doneAsc);
      setDone(doneAsc);
    }


  }
  return (
    <div>
      <Link to="/add" className="btn addbtn">
        Add Task
      </Link>
      <nav className="navbar navbar-expand-lg navbar-filter">
        <div className="container-fluid">
          <div className="d-flex mb-3">
            <input
              className="form-control me-2"
              value={searchInpt}
              onChange={(e) => setSearchInpt(e.target.value)}
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-dark"
              type="button"
              onClick={() => filterBySearch()}
            >
              Search
            </button>
          </div>
          <div className="d-flex align-items-baseline mb-3">
            <label htmlFor="select" className="form-label me-2">
              Sort&nbsp;By:
            </label>
            <select
              value={option}
              onChange={(e) => sortByFilter(e)}
              id="select"
              className="form-select"
              aria-label="Default select example"
            >
              <option defaultValue="Sort By">Sort By</option>
              <option defaultValue="title">title</option>
              <option defaultValue="desc">desc</option>
              <option defaultValue="createdAt">createdAt</option>
            </select>
            {/* <button className="btn btn-primary ms-2" type="button" onClick={()=>sortByFilter()}>Sort</button> */}
          </div>
        </div>
      </nav>
      {taskData.length === 0 ? (
        <h2 className="p-5 display-6">No tasks found</h2>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="container-fluid">
            <div className="row">
              <TaskList category="todo" data={todo} />
              <TaskList category="in progress" data={inProgress} />
              <TaskList category="done" data={done} />
            </div>
          </div>
        </DragDropContext>
      )}
    </div>
  );
}

export default LoggedIn;
