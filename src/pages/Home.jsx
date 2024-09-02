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
    const params = new URLSearchParams(location.search);
    // console.log(params);
    const token = params.get("token");
    // console.log(token);
    if(token){
      // console.log(token);
      updateToken(token);
      // window.location.reload();
      navigate(window.location.pathname, { replace: true });

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
