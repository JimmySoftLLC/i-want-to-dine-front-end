const dateString = (dateFrom, dateTo, formatType) => {
    // format dates for display
    dateFrom = new Date(dateFrom)
    dateTo = new Date(dateTo)
    let myDate = '';
    switch (formatType) {
        case 'menuCard':
            const myDateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'short', day: '2-digit' })
            const myDateFrom = myDateTimeFormat.formatToParts(dateFrom)
            const myDateTo = myDateTimeFormat.formatToParts(dateTo)
            if (myDateFrom[0].value === myDateTo[0].value && myDateFrom[2].value === myDateTo[2].value && myDateFrom[4].value === myDateTo[4].value) {
                myDate = myDateFrom[0].value + ' ' + myDateFrom[2].value + ' ' + myDateFrom[4].value;
            } else {
                myDate = myDateFrom[0].value + ' ' + myDateFrom[2].value + ' ' + myDateFrom[4].value + ' to ' + myDateTo[0].value + ' ' + myDateTo[2].value + ' ' + myDateTo[4].value;
            }
            return myDate;
        case 'saveToDatabase':
            const myDateTimeFormatDatabase = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' })
            const myDateFromDatabase = myDateTimeFormatDatabase.formatToParts(dateFrom)
            myDate = myDateFromDatabase[4].value + '-' + myDateFromDatabase[0].value + '-' + myDateFromDatabase[2].value + 'T00:00:01';
            return myDate;
        default:
    }
}

export default dateString