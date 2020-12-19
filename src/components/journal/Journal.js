import React, { Fragment, useState} from 'react'
import '../../css/Journal.css';
import '../../App.css';

export default function Journal() {
    
    const today = new Date().toLocaleDateString();
    const [journalEntry, setJournalEntry] = useState("");
    const [feeling, setFeeling] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const onSubmitEntry = async (e) => {
        e.preventDefault();
        
        console.log(journalEntry);
        console.log(feeling);

        const data = {
            feeling: feeling,
            journalEntry: journalEntry
        };
        console.log(data);

        // todo: axios.post here
    }

    const onTextAreaChange = (e) => {
        setJournalEntry(e.target.value);
    }

    return (
        <Fragment>
            <div className="container border">
            <h1>Journal Entry</h1>
            <form onSubmit={onSubmitEntry}>
                <div className="row border">
                    <div className="col-8 offset-2 border">
                        Today: {today}
                    </div>
                </div>
                <div className="form-group col-8 offset-2">
                    <div className="form-group row">
                        How were you today? (define colour scheme)
                    </div>
                    <div className="form-group row">
                        <div className="col-2 justify-content-center">
                            <center>
                            <div onChange={e => setFeeling(e.target.value)}>
                            <input id="feelingAngry" type="radio" name="feelings" value="angry"/>
                            <label htmlFor="feelingAngry"><i className="fas fa-angry fa-5x"></i></label>
                            </div>
                            </center>
                        </div>
                        <div className="col-2 justify-content-center">
                            <center>
                            <div onChange={e => setFeeling(e.target.value)}>
                            <input id="feelingReallySad" type="radio" name="feelings" value="reallySad"/>
                            <label htmlFor="feelingReallySad"><i className="fas fa-sad-cry fa-5x"></i></label>
                            </div>
                            </center>
                        </div>
                        <div className="col-2 justify-content-center">
                            <center>
                                <div onChange={e => setFeeling(e.target.value)}>
                                <input id="feelingSad" type="radio" name="feelings" value="sad"/>
                                <label htmlFor="feelingSad"><i className="fas fa-frown fa-5x"></i></label>
                                </div>
                            </center>
                        </div>
                        <div className="col-2 justify-content-center">
                            <center>
                                <div onChange={e => setFeeling(e.target.value)}>
                                <input id="feelingNeutral" type="radio" name="feelings" value="neutral"/>
                                <label htmlFor="feelingNeutral"><i className="fas fa-meh fa-5x"></i></label>
                                </div>
                            </center>
                        </div>
                        <div className="col-2 justify-content-center">
                            <center>
                                <div onChange={e => setFeeling(e.target.value)}>
                                <input id="feelingGood" type="radio" name="feelings" value="good"/>
                                <label htmlFor="feelingGood"><i className="fas fa-smile fa-5x"></i></label>
                                </div>
                            </center>
                        </div>
                        <div className="col-2 justify-content-center">
                            <center>
                                <div onChange={e => setFeeling(e.target.value)}>
                                <input id="feelingGreat" type="radio" name="feelings" value="great"/>
                                <label htmlFor="feelingGreat"><i className="fas fa-grin fa-5x"></i></label>
                                </div>
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
                            rows="20"
                            cols="200"
                            onChange={e => onTextAreaChange(e)}
                            />
                    </div>
                    <div className="form-group row">
                        <div className="col-3 offset-9">
                            <button className="btn btn-primary btn-block">Save Entry</button>
                        </div>
                    </div>
                    <div>
                        <p id="error">{errorMsg}</p>
                    </div>
                </div>
            </form>
            </div>
        </Fragment>
    )
}
