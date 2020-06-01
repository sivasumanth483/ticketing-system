function getTimeStamp(date) {
    if (date) {
        return Math.floor(new Date().getTime(date) / 1000);
    }
    return Math.floor(new Date().getTime() / 1000);
}

module.exports = getTimeStamp;