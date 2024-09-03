import React, { useEffect, useState } from "react";
import { signup } from "../utils/signinFunc";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

function SignUp() {
  const navigate = useNavigate();
  const [fname,setFname] = useState("");
  const [lname,setLname] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [password2,setPassword2] = useState("");
  
  useEffect(()=>{
    const params = new URLSearchParams(location.search);
    const msg = params.get("message");
    // console.log(error);
    if(msg){
      // console.log(error);
      alert(msg);
      navigate(window.location.pathname, { replace: true });
      // window.location.reload();
    }
  },[])
  const googleAuth = ()=>{
    window.location.href = `${BASE_URL}/auth/google/register`;
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(password !== password2){
      alert("Passwords do not match!")
    }
    else{
      const {data,error} = await signup(fname,lname,email,password,password2);

      if(error)
        alert(error);
      else
        navigate('/');
    }
  }

  return (
    <div className="container py-4">
      <div className="box-container">
        <h5 className="title mb-4">Signup</h5>

        <div className="card box">
          <div className="card-body">
            <form onSubmit={(e)=>handleSubmit(e)}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control w-100"
                  id="firstName"
                  value={fname}
                  onChange={(e)=>setFname(e.target.value)}
                  placeholder="First Name"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control w-100"
                  id="lastName"
                  value={lname}
                  onChange={(e)=>setLname(e.target.value)}
                  placeholder="Last Name"
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  className="form-control w-100"
                  id="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password2"
                  value={password2}
                  onChange={(e)=>setPassword2(e.target.value)}
                  placeholder="Confirm Password"
                  required
                />
              </div>
              <button type="submit" className="w-100 btn btn-primary">
                Signup
              </button>
              <div className="login-footer">
                <p className="fw-light">
                  Already have an account? &thinsp;
                  <Link to="/login" className="text-primary" style={{textDecoration:'none'}}>
                     Login
                  </Link>
                </p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={googleAuth}
                  style={{ textDecoration: "none" }}
                >
                  Signup with <b>Google</b>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
