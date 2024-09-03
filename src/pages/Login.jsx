import React, { useEffect, useState } from "react";
import { login } from "../utils/signinFunc";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

function Login() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();


  useEffect(()=>{
    const params = new URLSearchParams(location.search);
    const msg = params.get("message");
    console.log(msg);
    if(msg){
      // console.log(error);
      alert(msg);
      navigate(window.location.pathname, { replace: true });
      // window.location.reload();
    }
  },[])

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const {data,error} = await login(email,password);
    if(error)
      alert(error);
    else
      navigate('/');

  }

  const googleAuth = async()=>{
    window.location.href = `${BASE_URL}/auth/google`;
  }
  return (
    <div className="container py-4">
      <div className="box-container">
        <h5 className="title mb-4">Login</h5>

        <div className="card box">
          <div className="card-body">
            <form onSubmit={(e)=>handleSubmit(e)}>
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
              <button type="submit" className="w-100 btn btn-primary">
                Login
              </button>
              <div className="login-footer">
                <p className="fw-light">
                  Don't have an account?&nbsp;
                  <Link
                    to="/signup"
                    className="text-primary"
                    style={{ textDecoration: "none" }}
                  >
                    Signup
                  </Link>
                </p>
                <button type="button" onClick={googleAuth} className="btn btn-primary">
                  Login with <b>Google</b>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
