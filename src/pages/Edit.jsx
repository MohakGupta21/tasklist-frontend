import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getTaskById, updateTaskPut } from "../utils/taskFunc";
import useTaskStore from "../store/user";

function Edit() {
  const params = useParams();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    const id = params.id;
    // const task = useTaskStore.getState().tasks.filter((task)=>task._id===id);

    // setTitle(task[0]?.title||"");
    // setDesc(task[0]?.desc||"");
    // setCreatedAt(task[0]?.createdAt||"");
    async function fetchData() {
      const {data,error} = await getTaskById(id);

      if(data){
        // console.log(data);
        setTitle(data?.title);
        setDesc(data?.desc);
      }
      else{
        console.log(error);
      }
    }
    fetchData();

  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await updateTaskPut(params.id, title, desc);
    console.log(data);
    navigate("/");
  };
  return (
    <div className="details-bg">
      <div className="container details-box large">
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
            />
          </div>

          <div className="d-flex closeBtn">
            <button type="submit" className="btn btn-outline-secondary me-2">
              Update
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

export default Edit;
