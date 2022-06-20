export const getTime = (dateTime) => {
    const today = new Date();
    let time = today.getTime()
    let differenceTime = time - dateTime 
    let differenceDays = Math.floor(differenceTime / (1000*3600*24))
    return differenceDays
}