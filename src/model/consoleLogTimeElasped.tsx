class consoleLogTimeElasped {
    myDate: Date;
    myString: string;
    constructor(myString: string) {
        this.myDate = new Date()
        this.myString = myString
    }

    timeElasped() {
        const startTime: Date = new Date(this.myDate);
        const endTime: Date = new Date();
        const timeElasped = endTime.valueOf() - startTime.valueOf();
        console.log(this.myString + ": ", timeElasped);;
    }
}

export default consoleLogTimeElasped