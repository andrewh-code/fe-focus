import axios from 'axios';


export const retrieveUserCreationDate = (userId, token) => {
    
    const retrieveCreationDateEndpoint = `http://localhost:1236/dashboard/api/users/${userId}/created`;

    axios({
        method: 'get',
        url: retrieveCreationDateEndpoint,
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
        }
    })
    .then(serverResponse => {
        console.log(serverResponse);
        if (!serverResponse.data.result.createdOnDate){
            throw new Error("unable to parse succesfull server response");
        }
        return serverResponse.data.result.createdOnDate;
    })
    .catch(err => {
        console.log(err)
        console.log("error: " + err.response);
        return err.response;
    });
}