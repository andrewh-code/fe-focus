import React from 'react'

function Dashboard({setAuth}) {
    return (
        <div>
            <h1>dashboard copmonent</h1>
            <button onClick = {() => setAuth(false)}>Logout</button>
        </div>
    )
}

export default Dashboard
