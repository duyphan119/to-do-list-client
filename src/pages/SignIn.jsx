import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiSignIn } from "../api/apiAuth";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const handleSignIn = (e) => {
    e.preventDefault();
    apiSignIn(user, dispatch, navigate);
  };
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "400px",
          margin: "0 auto",
          backgroundColor: "var(--main-color)",
          padding: "20px",
          transform: "translateY(calc(50vh - 50%))",
        }}
      >
        <h1
          style={{
            textAlign: "center",
          }}
        >
          ĐĂNG NHẬP
        </h1>
        <form onSubmit={handleSignIn}>
          <div className="form-sign-in-group">
            <label htmlFor="username">Tên đăng nhập</label>
            <input
              style={{
                padding: "4px 1px",
              }}
              type="text"
              name="username"
              id="username"
              value={user.username}
              onChange={(e) =>
                setUser((prev) => {
                  return { ...prev, username: e.target.value };
                })
              }
            />
          </div>
          <div className="form-sign-in-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              style={{
                padding: "4px 1px",
              }}
              type="password"
              name="password"
              id="password"
              value={user.password}
              onChange={(e) =>
                setUser((prev) => {
                  return { ...prev, password: e.target.value };
                })
              }
            />
          </div>
          <div className="form-sign-in-group" style={{ textAlign: "center" }}>
            <button
              type="submit"
              style={{
                border: "none",
                color: "var(--main-color)",
                backgroundColor: "white",
                padding: "10px 20px",
                cursor: "pointer",
              }}
            >
              Đăng nhập
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
