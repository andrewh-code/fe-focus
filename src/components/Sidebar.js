import React from 'react'
import { slide as Menu } from 'react-burger-menu';

function Sidebar({setAuth}) {
    
  const logout = e => {
      console.log(e);
      e.preventDefault();
      localStorage.removeItem("token");   
      setAuth(false);
  };

    return (
        <Menu>
        <a className="menu-item" href="/dashboard">
          Home
        </a>
        <a className="menu-item" href="/profile">
          Profile
        </a>
        <a className="menu-item" href="/journal">
          Journal
        </a>
        <a className="menu-item" href="/" onClick ={e => logout(e)}>
          Logout
        </a>
      </Menu>
    )
}

export default Sidebar
