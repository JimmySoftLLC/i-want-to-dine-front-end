class consoleLogTimeElasped {
    constructor(myString) {
        this.myDate = new Date()
        this.myString = myString
    }

    timeElasped() {
        let timeElasped = new Date() - this.myDate
        this.myDate = new Date();
        console.log(this.myString + ": ", timeElasped);;
    }
}

export default consoleLogTimeElasped