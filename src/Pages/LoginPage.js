import React, { useContext, useState } from "react";
import {Navigate} from 'react-router-dom'
import toast, {Toaster} from "react-hot-toast";
import { UserContext } from "../UserContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext);

  async function login(ev){
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST', 
      body: JSON.stringify({username, password}),
      headers: {'Content-type':'application/json'},
      credentials: 'include', 
    })
    if(response.ok){
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        setRedirect(true);

      })
    }
    else{
      toast.error("Invalid Credentials");
    }
  }

  if(redirect){
    return <Navigate to={'/'} />
  }
  return (
    <div>
      <form className="login" onSubmit={login}>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button>Login</button>
      </form>
      <Toaster />
    </div>
  );
};

export default LoginPage;