import React from 'react'
import { slide as Menu } from 'react-burger-menu';
import { useHistory } from 'react-router-dom';

function Sidebar({setAuth}) {
  
  const history = useHistory();

  const logout = e => {
      console.log(e);
      e.preventDefault();
      localStorage.removeItem("token");   
      setAuth(false);
      history.push("/login");
  };

    return (
        <Menu>
        <a className="menu-item" href="/dashboard">
          Home
        </a>
        <a className="menu-item" href="/dashboard">
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
