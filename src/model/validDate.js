const validDate = (dateFrom, dateTo, dateToCheck) => {
    if (dateFrom <= dateToCheck && dateToCheck <= dateTo) {
        return true;
    }
    return false;
}

export default validDate;