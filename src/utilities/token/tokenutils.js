export const getUserIdFromToken = () => {
    
    try {
        const token = localStorage.getItem("token");
        if (!token){
            throw "unable to find jwt bearer token";
        }

        const decryptedTokenInfo = parseToken(token);
        if (!decryptedTokenInfo.userId){
            throw "unable to determine user id from jwt bearer token";
        }
        return decryptedTokenInfo.userId;
    } catch (err){
        console.log(err);
        return null;
    }
}

export const getToken = () =>{
    return localStorage.getItem("token");
}

const parseToken = (token) =>{
    if (!token){
        return;
    }
    const url = token.split('.')[1];
    const base = url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base)); 
};

