const validDate = (dateFrom, dateTo, dateToCheck) => {
    let myDateFrom = new Date(dateFrom);
    let myDateTo = new Date(dateTo);
    let myDateToCheck = new Date(dateToCheck);
    myDateFrom.setHours(0, 0, 0, 0)
    myDateTo.setHours(0, 0, 0, 0)
    myDateToCheck.setHours(0, 0, 0, 0)
    if (myDateFrom <= myDateToCheck && myDateToCheck <= myDateTo) {
        return true;
    }
    return false;
}

export default validDate;