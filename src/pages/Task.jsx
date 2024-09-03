import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { deleteTask } from '../utils/taskFunc';

function Task({id,title,desc,createdAt}) {
  // const navigate = useNavigate();

  const handleDelete = async()=>{

    await deleteTask(id);
    window.location.reload();
  }
  return (
    <div className="task mb-2">
        <h4>{title}</h4>
        <p>{desc}</p>
        <p className='text-muted created mt-5'>{createdAt}</p>
        <div>
            <button type='button' className='btn btn-danger ms-0 m-1' onClick={handleDelete}>Delete</button>
            <Link to={`edit/${id}`} className='btn colorBtn m-1'>Edit</Link>
            <Link to={`details/${id}`} className='btn btn-primary m-1'>View Details</Link>
        </div>
    </div>
  )
}

export default Task