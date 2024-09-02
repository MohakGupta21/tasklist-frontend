import React, { useEffect } from "react";
import useTaskStore from "../store/user";
import LoggedIn from "./LoggedIn";
import NotLoggedIn from "./NotLoggedIn";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";

function Home() {
  const initialize = useTaskStore((state) => state.initialize);

  const updateToken = useTaskStore((state) => state.updateToken);
  const taskData = useTaskStore((state) => state.tasks);

  const isLoggedIn = useTaskStore((state) => state.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');

    if(token){
      // console.log(token);
      updateToken(token);
      // window.location.reload();
    }

    
    initialize();
    // 

  }, []);
  // const user = userInfo((state)=>state.allUserData)
  if (isLoggedIn) {
    return <LoggedIn taskData={taskData} />;
  }
  return <NotLoggedIn />;
}

export default Home;
