import Axios from 'axios';
import React, { Fragment, useState } from 'react'
import axios from 'axios';

export default function ChildDashboard() {
    
    const [name, setName] = useState("Andrew");

    const retrieveUserCreationDate = () => {
        
        
    }

    const retrieveLastEntryDate = () => {

    }

    return (
        <Fragment>
        <div className="container pt-3">

        </div>
        <div className="container pt-2 shadow p-3 mb-5 bg-white rounded">
            <h3>Welcome {name}</h3>

            <p id="bold">Member since: </p>
            <p id="bold">Last Journal Entry: </p>

        </div>
        </Fragment>
    )
}
