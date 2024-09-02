import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Icon from "../assets/icon.png";
import useTaskStore from "../store/user";
import { logout } from "../utils/signinFunc";
function Header() {
  const isLoggedIn = useTaskStore((state) => state.isLoggedIn);
  const user = useTaskStore((state)=>state.user)
  // useEffect(()=>{
  //   console.log(user)
  // },[])
  return (
    <nav className="navbar navbar-expand-lg header">
      <div className="container-fluid px-4">
        <div className="w-100 d-flex justify-content-between">
          <a className="navbar-brand" href="/">
            <img
              className="fill"
              width="50"
              height="50"
              src={Icon}
              alt="notepad"
            />
          </a>
          <div className="p-2">
            {isLoggedIn && (
              <div className="d-flex align-items-baseline">
                <p className="me-2 fw-light lead">{user}</p>
              <button
                onClick={() => logout()}
                className="btn btn-danger text-light"
              >Logout</button>
              </div>
            )}
            {!isLoggedIn && (
              <div>
                <Link to="login" className="btn btn-light text-primary me-3">
                  Login
                </Link>
                <Link to="signup" className="btn btn-light text-primary">
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
