import React, { Fragment } from 'react'
import Sidebar from './Sidebar';
import "../index.css";
import "../App.css";
import "./Sidebar.css";

function Dashboard({setAuth}) {
    
    
    const logout = e => {
        console.log(e);
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
    };

    return (
        <Fragment>
            <div id="dashboard-outer-container">
                <Sidebar pageWrapId={'page-wrap'} outerContainerId={'dashboard-outer-container'} />
                <div id="page-wrap" className="container">
                    <h1>dashboard copmonent</h1>
                    <button onClick = {e => logout(e)}>Logout</button>
                </div>
            </div>
        </Fragment>
        
    )
}

export default Dashboard
