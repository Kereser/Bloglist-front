import React from "react";

const LoginForm = ({
  username,
  handleChangeUsername,
  password,
  handleChangePassword,
  handleSubmit }) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Username:
          <input
            type='text'
            value={username}
            name='Username'
            onChange={handleChangeUsername}
          />
        </div>
        <div>
          Password:
          <input
            type='password'
            value={password}
            name='Password'
            onChange={handleChangePassword}
          />
        </div>
        <button type="Submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm