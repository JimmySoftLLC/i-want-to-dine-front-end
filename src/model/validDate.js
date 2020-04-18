const validDate = (dateFrom, dateTo, dateToCheck) => {
    let myDateFrom = new Date(dateFrom)
    myDateFrom.setHours(0, 0, 0, 0)
    let myDateTo = new Date(dateTo)
    myDateTo.setHours(0, 0, 0, 0)
    let myDateToCheck = new Date(dateToCheck)
    myDateToCheck.setHours(0, 0, 0, 0)
    if (dateFrom <= myDateToCheck && myDateToCheck <= myDateTo) {
        return true;
    }
    return false;
}

export default validDate;