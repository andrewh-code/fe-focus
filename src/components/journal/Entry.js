import React, { Fragment, useState } from 'react'
import axios from 'axios'

function Entry() {

    const today = new Date().toLocaleDateString();
    const [journalEntry, setJournalEntry] = useState("");
    const [entryTitle, setEntryTitle] = useState("");
    const [feeling, setFeeling] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const parseToken = (token) =>{
        if (!token){
            return;
        }
        const url = token.split('.')[1];
        const base = url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base)); 
    };

    const onSubmitEntry = async (e) => {
        e.preventDefault();
        // reset success/error message if user decides to re-submit
        setSuccessMsg("");
        setErrorMsg("");
        // how to get the userid
        const token = localStorage.getItem("token");
        const decryptedTokenInfo = parseToken(token);
        const userId = decryptedTokenInfo.userId;

        const submitJournalEndpoint = `http://localhost:1237/journal/api/users/${userId}/entries`;
        console.log(journalEntry);
        console.log(feeling);

        const data = {
            userId: userId,
            date: today,
            title: entryTitle,
            feeling: feeling,
            content: journalEntry,
        };

        console.log(data);

        axios({
            method: 'post',
            url: submitJournalEndpoint,
            data: data,
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token
            }
        })
        .then(serverResponse => {
            console.log(serverResponse);
            setSuccessMsg("Journal Entry for " + today + " successfully saved");
            // reset other values
            setJournalEntry("");
            setEntryTitle("");
            setFeeling("");
        })
        .catch(err => {
            console.log("error:");
            console.log(err.response);
            setErrorMsg("unable to save journal entry for " + today)
        });
    }

    const onTextAreaChange = (e) => {
        setJournalEntry(e.target.value);
    }
    const onTitleChange = (e) => {
        setEntryTitle(e.target.value);
    }

    return (
        <Fragment>
            <div className="container">
            <form onSubmit={onSubmitEntry}>
                <div className="row">
                    <div className="col-8 offset-2">
                        {/* there's like a 3px offset here */}
                        Today: {today}
                        <hr />
                    </div>
                </div>
                <div className="form-group col-8 offset-2">
                    <div className="form-group row">
                        How were you today? (define colour scheme)
                    </div>
                    <div className="form-group row">
                        <div className="col-2">
                            <center>
                                <div onChange={e => setFeeling(e.target.value)}>
                                    <input id="feelingAngry" type="radio" name="feelings" value="angry" defaultChecked={feeling} />
                                    <label htmlFor="feelingAngry"><i className="fas fa-angry fa-4x"></i></label>
                                </div>
                                <hr />
                            </center>
                        </div>
                        <div className="col-2">
                            <center>
                                <div onChange={e => setFeeling(e.target.value)}>
                                    <input id="feelingReallySad" type="radio" name="feelings" value="reallySad" defaultChecked={feeling}/>
                                    <label htmlFor="feelingReallySad"><i className="fas fa-sad-cry fa-4x"></i></label>
                                </div>
                                <hr />
                            </center>
                        </div>
                        <div className="col-2">
                            <center>
                                <div onChange={e => setFeeling(e.target.value)}>
                                    <input id="feelingSad" type="radio" name="feelings" value="sad" defaultChecked={feeling}/>
                                    <label htmlFor="feelingSad"><i className="fas fa-frown fa-4x"></i></label>
                                </div>
                                <hr />
                            </center>
                        </div>
                        <div className="col-2">
                            <center>
                                <div onChange={e => setFeeling(e.target.value)}>
                                    <input id="feelingNeutral" type="radio" name="feelings" value="neutral" defaultChecked={feeling}/>
                                    <label htmlFor="feelingNeutral"><i className="fas fa-meh fa-4x"></i></label>
                                </div>
                                <hr />
                            </center>
                        </div>
                        <div className="col-2">
                            <center>
                                <div onChange={e => setFeeling(e.target.value)}>
                                    <input id="feelingGood" type="radio" name="feelings" value="good" defaultChecked={feeling}/>
                                    <label htmlFor="feelingGood"><i className="fas fa-smile fa-4x"></i></label>
                                </div>
                                <hr />
                            </center>
                        </div>
                        <div className="col-2">
                            <center>
                                <div onChange={e => setFeeling(e.target.value)}>
                                    <input id="feelingGreat" type="radio" name="feelings" value="great" defaultChecked={feeling}/>
                                    <label htmlFor="feelingGreat"><i className="fas fa-grin fa-4x"></i></label>
                                </div>
                                <hr />
                            </center>
                        </div>
                    </div>
                    <div className="form-group row">
                        What happened?
                    </div>
                    <div className="form-group row">
                        <textarea
                            id="journalContent"
                            name="journalEntry"
                            value={journalEntry}
                            rows="18"
                            cols="200"
                            onChange={e => onTextAreaChange(e)}
                        />
                    </div>
                    <hr />
                    <div className="form-group row">
                        Title for Today's Entry:
                    </div>
                    <div className="form-group row">
                        <input
                            type="text"
                            name="entryTitle"
                            size="40"
                            value={entryTitle}
                            onChange={e => onTitleChange(e)}>
                        </input>
                    </div>
                    <div className="form-group row">
                        <div className="col-3 offset-9">
                            <button className="btn btn-primary btn-block">Save Entry</button>
                        </div>
                    </div>
                    <div>
                        <p id="error">{errorMsg}</p>
                        <p id="success">{successMsg}</p>
                    </div>
                </div>
            </form>
            </div>
        </Fragment>
    )
}

export default Entry
