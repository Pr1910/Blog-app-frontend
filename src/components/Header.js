import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    }).then(() => {
      setUserInfo(null);
      navigate("/login");
    });
  }

  const username = userInfo?.username;

  return (
    <header>
      <nav>
        {username && (
          <>
            <div className="header">
              <Link to="/" className="logo">
                My Blog
              </Link>

              <div className="header-right">
                <span>Hello, {username}</span>
                <Link to="/create">Add Post</Link>
                <a onClick={logout}>Logout</a>
              </div>
            </div>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
