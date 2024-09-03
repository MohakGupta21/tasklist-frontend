import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createTask } from "../utils/taskFunc";

function Add() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [status,setStatus] = useState("todo");
  const navigate = useNavigate('/');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await createTask(title,desc,status);
    // console.log(response?.data);
    navigate('/');
  };
  
  return (
    <div className="details-bg">
      <div className="details-box large">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label text-muted">
              <small>Title</small>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="new-input w-100"
              placeholder="Enter Title"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label text-muted">
              <small>Description</small>
            </label>
            <input
              type="text"
              id="desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="new-input w-100"
              placeholder="Enter Description"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label text-muted">
              <small>Status</small>
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              id="select"
              className="form-select"
              aria-label="Default select example"
              required
            >
              <option defaultValue="todo">todo</option>
              <option defaultValue="in progress">in progress</option>
              <option defaultValue="done">done</option>
         </select>{" "}
          </div>

          <div className="d-flex closeBtn">
            <button type="submit" className="btn btn-light me-2">
              Add Task
            </button>
            <Link to="/" className="btn btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Add;
