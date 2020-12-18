import React, { Fragment, useState} from 'react'
import '../../css/Journal.css'

export default function Journal() {
    
    const today = new Date().toLocaleDateString();
    const [journalEntry, setJournalEntry] = useState("");

    
    const onSubmitEntry = async (e) => {
        e.preventDefault();
        console.log(e);
    }
    
    const onTextAreaChange = (e) => {
        
    }

    return (
        <Fragment>
            <div clasName="container border">
            Hello container journal
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
                            <input id="feelingAngry" type="radio" name="feelings" value="angry"/>
                            <label for="feelingAngry"><i class="fas fa-angry fa-5x"></i></label>
                            </center>
                        </div>
                        <div className="col-2 justify-content-center">
                            <center>
                            <input id="feelingReallySad" type="radio" name="feelings" value="reallySad"/>
                            <label for="feelingReallySad"><i class="fas fa-sad-cry fa-5x"></i></label>
                            </center>
                        </div>
                        <div className="col-2 justify-content-center">
                            <center>
                                <input id="feelingSad" type="radio" name="feelings" values="sad"/>
                                <label for="feelingSad"><i class="fas fa-frown fa-5x"></i></label>
                            </center>
                        </div>
                        <div className="col-2 justify-content-center">
                            <center>
                                <input id="feelingNeutral" type="radio" name="feelings" values="neutral"/>
                                <label for="feelingNeutral"><i class="fas fa-meh fa-5x"></i></label>
                            </center>
                        </div>
                        <div className="col-2 justify-content-center">
                            <center>
                                <input id="feelingGood" type="radio" name="feelings" values="good"/>
                                <label for="feelingGood"><i class="fas fa-smile fa-5x"></i></label>
                            </center>
                        </div>
                        <div className="col-2 justify-content-center">
                            <center>
                                <input id="feelingGreat" type="radio" name="feelings" values="great"/>
                                <label for="feelingGreat"><i class="fas fa-grin fa-5x"></i></label>
                            </center>
                        </div>
                    </div>
                    <div className="form-group row">
                        What happened?
                    </div>
                    <div className="form-group row">
                        <textarea 
                            id="journalContent"
                            value={journalEntry}
                            rows="20"
                            cols="200"
                            onChange={e => onTextAreaChange(e)}/>
                    </div>
                    <div className="form-group row">
                        <div className="col-3 offset-9">
                            <button className="btn btn-primary btn-block">Save Entry</button>
                        </div>
                    </div>
                </div>
            </form>
            </div>
        </Fragment>
    )
}
