import React, { useState } from "react";
import toast, {Toaster} from "react-hot-toast";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    }).then((res) => {
      if (res.status === 200) {
        toast.success("Registration Successful");
      } else {
        toast.error("Registration Failed");
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
    <div>
      <form className="register" onSubmit={register}>
        <h1>Register</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(ev) => {
            setUsername(ev.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button>Register</button>
      </form>
      <Toaster />
    </div>
  );
};

export default RegisterPage;
