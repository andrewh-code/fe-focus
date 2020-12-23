import React, { Fragment, useState, useEffect} from 'react'
import '../../css/Journal.css';
import '../../App.css';
import GlobalHeader from '../GlobalHeader';
import Entry from './Entry';
import PreviousEntries from './PreviousEntries';

export default function Journal() {
    
    const [resultOutput, setResultOutput] = useState("");
    const [entryContent, setEntryContent] = useState("");
    const [entryIndex, setEntryIndex] = useState(null);

    const mockEntries = {
        status: "OK",
        code: 200,
        result: {
            userId: 1,
            journalEntries: [
                {
                    entryId: 1,
                    date: "01/01/2020",
                    title: "entry 1 title",
                    feeling: "good",
                    content: "today was a good day"
                },
                {
                    entryId: 2,
                    date: "02/01/2020",
                    title: "entry 2 title",
                    feeling: "great",
                    content: "today was a great day"
                },
                {
                    entryId: 3,
                    date: "03/01/2020",
                    title: "entry 3 title",
                    feeling: "sad",
                    content: "today was a sad day"
                },
                {
                    entryId: 4,
                    date: "04/01/2020",
                    title: "entry 4 title",
                    feeling: "angry",
                    content: "today was an angry day"
                },
                {
                    entryId: 5,
                    date: "05/01/2020",
                    title: "entry 5 title",
                    feeling: "good",
                    content: "today was a good day"
                },
                {
                    entryId: 6,
                    date: "01/01/2020",
                    title: "entry 6 title",
                    feeling: "good",
                    content: "today was a good day"
                },
                {
                    entryId: 7,
                    date: "02/01/2020",
                    title: "entry 7 title",
                    feeling: "great",
                    content: "today was a great day"
                },
                {
                    entryId: 8,
                    date: "03/01/2020",
                    title: "entry 8 title",
                    feeling: "sad",
                    content: "today was a sad day"
                },
                {
                    entryId: 9,
                    date: "04/01/2020",
                    title: "entry 9 title",
                    feeling: "angry",
                    content: "today was an angry day"
                },
                {
                    entryId: 10,
                    date: "05/01/2020",
                    title: "entry 10 title",
                    feeling: "good",
                    content: "today was a good day"
                }
            ]
        }
    }

    const updateEntry = (index, entry) => {
        
        var entryOutput = 
            <div>
                <b>Date:</b> {entry.date}
                <br/>
                <b>Title:</b> {entry.title}
                <br/>
                <b>feeling:</b> {entry.feeling}
                <br/>
                <b>entry:</b>
                <br/>
                {entry.content}
            </div>
            

        setEntryContent(entryOutput);
    }
    
    useEffect(() => {
        let mounted = true;
        
        if (mounted){
            printMock();
        }
        
        return () => mounted = false;
    }, []);

    const printMock = () => {

        // iterate through entries
        var journalEntries = mockEntries.result.journalEntries;
        var output = "";
        output = journalEntries.map((entry, index) => {
            var title = entry.title;
            var content = entry.content;
            var date = entry.date;
            return (
                <div key={ index }>
                    <div className="row border pt-2 pb-2 pl-2" onClick={() => updateEntry(index, entry)}>
                        <center><b>{date}</b></center>
                    </div>
                </div>

                // <tr key = {index}>
                //     <td onClick={setEntryContent(content)}>
                //         Date: {date}
                //         <br/>
                //         Title: {title}
                //     </td>
                // </tr>
            );
        });
        
        setResultOutput(output);
    };

    // const renderJournalEntryList = () => {
        
    //     var journalEntries = mockEntries.result.journalEntries;
    //     const output = "";
    //     resultOutput = journalEntries.map((entry, index) => {
    //         // var title = entry.title;
    //         // var content = entry.content;
    //         // var date = entry.date;
    //         return (
    //             // <div key={ index }>
    //             //     <div className="row border">
    //             //         <b>Date:</b> {date}
    //             //         <b>Title:</b> {title}
    //             //     </div>
    //             // </div>
    //             <h1>hi</h1>
    //         );
    //     });
    //     setResultOutput(resultOutput);
    // }
    

    return (
        <Fragment>
            <GlobalHeader/>
            <div className="container border shadow p-3 mb-5 bg-white rounded">
                <h1>Journal</h1>
                <ul className="nav nav-pills nav-justified" id="myTab" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Write Entry</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">View Previous Entries</a>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade" id="home" role="tabpanel" aria-labelledby="home-tab">
                        {/* <Entry /> */}
                    </div>
                    <div className="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-3 pt-1 border justify-content-center">
                                    <h5>Previous Entries</h5>
                                </div>
                                <div className="col-9 pt-1 border justify-content-center">
                                    <h5>Journal Entry</h5>
                                </div>
                            </div>
                            <div className="row">
                                {/* loop here */}
                                <div className="col-3">
                                    {resultOutput}
                                    {/* {renderJournalEntryList()} */}
                                </div>
                                {/* set this as a variable */}
                                <div className="col-9">
                                    {entryContent}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
