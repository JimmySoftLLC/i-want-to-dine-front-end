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
        case 'saveToDatabaseFromDate':
            const myDateTimeFormatDatabaseFrom = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' })
            const myDateFromDatabaseFrom = myDateTimeFormatDatabaseFrom.formatToParts(dateFrom)
            myDate = myDateFromDatabaseFrom[4].value + '-' + myDateFromDatabaseFrom[0].value + '-' + myDateFromDatabaseFrom[2].value + 'T00:00:00';
            return myDate;
        case 'saveToDatabaseToDate':
            const myDateTimeFormatDatabaseTo = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' })
            const myDateFromDatabaseTo = myDateTimeFormatDatabaseTo.formatToParts(dateFrom)
            myDate = myDateFromDatabaseTo[4].value + '-' + myDateFromDatabaseTo[0].value + '-' + myDateFromDatabaseTo[2].value + 'T23:59:59';
            return myDate;
        case 'saveToDatabaseTime':
            const myDateTimeFormatDatabaseTime = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
            const myDateFromDatabaseTime = myDateTimeFormatDatabaseTime.formatToParts(dateFrom)
            myDate = myDateFromDatabaseTime[4].value + '-' + myDateFromDatabaseTime[0].value + '-' + myDateFromDatabaseTime[2].value + "T" + myDateFromDatabaseTime[6].value + ':' + myDateFromDatabaseTime[8].value + ':00'
            return myDate;
        case 'time':
            const timeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })
            const myTimeFrom = timeFormat.formatToParts(dateFrom)
            const myTimeTo = timeFormat.formatToParts(dateTo)
            myDate = myTimeFrom[6].value + ':' + myTimeFrom[8].value + ' ' + myTimeFrom[12].value + " to " + myTimeTo[6].value + ':' + myTimeTo[8].value + ' ' + myTimeTo[12].value
            return myDate;
        default:
    }
}

export default dateString