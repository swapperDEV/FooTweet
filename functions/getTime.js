export const getTime = (dateTime) => {
    const today = new Date();
    let time = today.getTime()
    console.log(dateTime, time)
    let differenceTime = time - dateTime 
    console.log(differenceTime)
    let differenceDays = Math.floor(differenceTime / (1000*3600*24))
    return differenceDays
}