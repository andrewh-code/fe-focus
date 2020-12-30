import React, { useState, useEffect } from 'react'

function Editable() {

    const [name, setName] = useState("test");
    const [isEditDisabled, setIsEditDisabled] = useState(true);

    const makeEditable = (e) => {
        setIsEditDisabled(!isEditDisabled);
    }
    const changeValue = (e) => {
        setName(e.target.value);
    }

    useEffect(() => {
        setName("Andrew");
    }, [])

    return (
        <div className="container">
            editable container poc

            <input type="text" 
                disabled={isEditDisabled}
                value={name}
                name="name"
                onChange={changeValue}
            />
            
            <button onClick={makeEditable}>Click to Make Editable</button>
        </div>
    )
}

export default Editable
