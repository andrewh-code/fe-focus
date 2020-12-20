import React from 'react'

function GlobalHeader({setAuth}) {
    
    const logout = e => {
        console.log(e);
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
    };

    return (
        <div className="container-fluid d-flex justify-content-end">
            <a 
                href="/"
                onClick = {e => logout(e)}>logout</a>
        </div>
    )
}

export default GlobalHeader
