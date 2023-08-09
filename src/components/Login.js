import React, { useState } from "react";
import { useLoginContext } from "../Context/LoginProvider";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { loginCred, updateLoginCred } = useLoginContext();
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("username: ", username, ", password: ", password);
    // Basic validation
    if (!username) {
      setUsernameError("Username is required");
    }

    if (!password) {
      setPasswordError("Password is required");
    }

    if (username && password) {
      // Perform login action here (e.g., call API)
      updateLoginCred({
        username,
        password,
      });
      setUsernameError(""); // Clear error messages
      setPasswordError("");
      navigate("/");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="card-title text-center">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username:
                  </label>
                  <input
                    type="text"
                    id="username"
                    className={`form-control ${
                      usernameError ? "is-invalid" : ""
                    }`}
                    value={username}
                    onChange={handleUsernameChange}
                    onBlur={() =>
                      !username && setUsernameError("Username is required")
                    }
                  />
                  {usernameError && (
                    <div className="invalid-feedback">{usernameError}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    id="password"
                    className={`form-control ${
                      passwordError ? "is-invalid" : ""
                    }`}
                    value={password}
                    onChange={handlePasswordChange}
                    onBlur={() =>
                      !password && setPasswordError("Password is required")
                    }
                  />
                  {passwordError && (
                    <div className="invalid-feedback">{passwordError}</div>
                  )}
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
