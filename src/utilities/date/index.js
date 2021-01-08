export const formatDate = (date) => {
    // check if "string" is date
    if (!date){
        return null;
    }
    return new Date(date).toLocaleDateString();
}