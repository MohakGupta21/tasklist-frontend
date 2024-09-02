import { useEffect } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";
import Task from "./Task";

function TaskList({ category, data }) {
  return (
    <Droppable droppableId={category}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="col-md-4 col-12"
        >
          <div className="navbar-filter w-100" style={{ minHeight: "500px" }}>
            <h3 className="container-fluid h5 head">{category}</h3>
            {data.length > 0 &&
              data.map((task, ind) => (
                <Draggable key={task._id} draggableId={task._id} index={ind}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Task title={task.title} desc={task.desc} id={task._id} createdAt={task.createdAt}/>
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );

  // return (
  //   <Droppable droppableId={category}>
  //     {(provided) => (
  //       <div
  //         className="col-md-4 col-12"
  //         ref={provided.innerRef}
  //         {...provided.droppableProps}
  //       >

  //       </div>
  //     )}
  //   </Droppable>
  // );
}

export default TaskList;
