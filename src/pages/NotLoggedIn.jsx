import React from "react";
import { Link } from "react-router-dom";

function NotLoggedIn() {
  return (
    <div className="details-bg pt-5">
        <div className="card details-box">
          <div className="card-body">
            <h5 className="card-title">Not Logged In!</h5>
            <hr />
            <p className="card-text">You need to login or signup first!</p>
            <Link to="/login" className="btn btn-primary me-4">
              Login
            </Link>
            <Link to="/signup" className="btn btn-primary">
              SignUp
            </Link>
          </div>
        </div>
    </div>
  );
}

export default NotLoggedIn;
