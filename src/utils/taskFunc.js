import useTaskStore from "../store/user";
import apiInstance from "./axiosInstance";
//Receive all tasks of user
// Received via post request for security
export const updateTaskStatus = async (taskId, status) => {
  // const updateTask = useTaskStore((state) => state.updateTask);
  try {
    const email = useTaskStore.getState().user;

    console.log(taskId);
    console.log(email);
    console.log(status);
    const {data} = await apiInstance.patch(`/task/update/status/${taskId}`, {
      status: status, // Update the status based on the destination
      email:email
    });
    console.log(data);
    useTaskStore.getState().updateToken(data.token);

    return { data, error: null };
  } catch (error) {
    console.error("Failed to update task status:", error);
    // Handle error (e.g., rollback changes in the UI)
    return {
      data: null,
      status: error.response.data?.detail || "Something went wrong",
    };
  }
};

export const updateTaskPut = async (taskId, title, desc) => {
  try {
    const email = useTaskStore.getState().user;
    const {data,status} = await apiInstance.put(`/task/update/${taskId}`, {
      title: title,
      desc: desc,
      email:email
      // Update the status based on the destination
    });

    if(status===200){
      useTaskStore.getState().updateToken(data.token);
      console.log(data);
      return { data, error: null };
    }


  } catch (error) {
    console.error("Failed to update task status:", error);
    // Handle error (e.g., rollback changes in the UI)
    return {
      data: null,
      status: error.response?.data?.detail || "Something went wrong",
    };
  }
};

export const deleteTask = async (taskId) => {
  try {
    const email = useTaskStore.getState().user;
    const {data,status} = await apiInstance.delete(`/task/delete/${taskId}`,{
      params:{email:email}
    });

    if(status === 200){
      console.log(data);
      useTaskStore.getState().updateToken(data.token);
  
      alert("Deleted successfully!");
      return { data, error: null };
    }

  } catch (error) {
    console.error("Failed to delete task:", error);

    return {
      data: null,
      status: error.response.data?.detail || "Something went wrong",
    };
  }
};

export const createTask = async (title, desc, statusVal) => {
  try {

    const email = useTaskStore.getState().user;

    const response = await apiInstance.post('/task/', {
      // Replace the following with your actual data
      title: title,
      desc: desc,
      status: statusVal,
      email: email
    });

    // Access the data from the response
    const data = response.data;
    console.log(data);
    useTaskStore.getState().updateToken(data.token);
    // You can now work with the data
    // For example, set it to a state or process it
    return {data,error:null};
  } catch (error) {
    console.error('Error making the POST request:', error);
    return {data:null,
      status: error.response.data?.detail || "Something went wrong",
    };
  }
  
  
};
