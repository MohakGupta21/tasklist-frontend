import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useTaskStore from "../store/user";
// import { getTaskById } from "../utils/taskFunc";
import apiInstance from "../utils/axiosInstance";
import { getTaskById } from "../utils/taskFunc";

function Details() {
  const params = useParams();
  const [title,setTitle] =useState("");
  const [desc,setDesc] =useState("");
  const [createdAt,setCreatedAt] =useState("");

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
        setCreatedAt(data?.createdAt);

      }
      else{
        console.log(error);
      }
    }
    fetchData();

  },[])


  return (
    <div className="details-bg">
      <div className="container details-box large">
        <h4 className="h4 mb-4">Task Details</h4>
        <h5 className="h5">Title: {title}</h5>
        <h5 className="h5 text-muted">Description: {desc}</h5>
        <p className="text-muted">Created At: {createdAt}</p>
        <Link to="/" className="btn btn-primary closeBtn">Close</Link>
      </div>
    </div>
  );
}

export default Details;
