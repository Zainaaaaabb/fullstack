import React from 'react'
import PropTypes from 'prop-types'
import "../style/style.css"

const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
}) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    username
                    {/* <input
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                    /> */}
                    <input
                        id='username-input'
                        type='text'
                        value={username}
                        name='username'
                        onChange={handleUsernameChange}
                    // onChange={({ target }) => handleUsernameChange(target.value)} 
                    />
                </div>
                <div>
                    password
                    {/* <input id="password"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                    /> */}
                    <input
                        id='password-input'
                        type='password'
                        value={password}
                        name='password'
                        onChange={handlePasswordChange}
                    // onChange={({ target }) => handlePasswordChange(target.value)} 
                    />
                </div>
                {/* <button id='login-button' type="submit">login</button> */}
                <button
                    className='login-button'
                    type='submit'>
                    Login
                </button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}

export default LoginForm