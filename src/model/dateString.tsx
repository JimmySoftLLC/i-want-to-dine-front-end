const dateString = (dateFrom: Date, dateTo: Date, formatType: string) => {
    // format dates for display
    dateFrom = new Date(dateFrom)
    dateTo = new Date(dateTo)
    let myDate: any
    switch (formatType) {
        case 'displayFromTo':
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
            myDate = myDateFromDatabaseFrom[4].value + '-' + myDateFromDatabaseFrom[0].value + '-' + myDateFromDatabaseFrom[2].value + 'T00:00:00.000';
            myDate = new Date(myDate)
            myDate = myDate.toISOString()
            return myDate;
        case 'saveToDatabaseToDate':
            const myDateTimeFormatDatabaseTo = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' })
            const myDateFromDatabaseTo = myDateTimeFormatDatabaseTo.formatToParts(dateFrom)
            myDate = myDateFromDatabaseTo[4].value + '-' + myDateFromDatabaseTo[0].value + '-' + myDateFromDatabaseTo[2].value + 'T23:59:59.999';
            myDate = new Date(myDate)
            myDate = myDate.toISOString()
            return myDate;
        case 'saveToDatabaseDateTime':
            myDate = dateFrom.toISOString()
            let myDateSplit = myDate.split(":")
            myDateSplit[2] = "00.000Z"
            myDate = myDateSplit[0] + ":" + myDateSplit[1] + ":" + myDateSplit[2]
            return myDate;
        case 'displayDataTime':
            const timeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })
            const myTimeFrom = timeFormat.formatToParts(dateFrom)
            myDate = myTimeFrom[4].value + '-' + myTimeFrom[0].value + '-' + myTimeFrom[2].value + ' ' + myTimeFrom[6].value + ':' + myTimeFrom[8].value + ' ' + myTimeFrom[12].value
            return myDate;
        case 'displayTime':
            const timeOnlyFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })
            const myTimeOnlyFrom = timeOnlyFormat.formatToParts(dateFrom)
            myDate = myTimeOnlyFrom[6].value + ':' + myTimeOnlyFrom[8].value + ' ' + myTimeOnlyFrom[12].value
            return myDate;
        default:
    }
}

export default dateString