import React from 'react'

function Login({setAuth}) {

    return (
        <div>
            <h1>Login component</h1>
            <button onClick = {() => setAuth(true)}>Authenticate</button>
        </div>
    )
}

export default Login
