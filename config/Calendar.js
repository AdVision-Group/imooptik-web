/**
 * 
 * @param {string} timeAndDate Time and date in format HH/MN:DD/MM/YYYY
 * @returns {number} Unix timestamp of provided date
 */
const getTimeStampFromDate = (timeAndDate) => {
    const [time,date] = timeAndDate.split(':')
    const [hours,minutes] = time.split('/').map((item)=>{return parseInt(item)})
    let [day,month,year] = date.split('/').map((item)=>{return parseInt(item)})
    month-=1
    const d = new Date(year,month,day,hours,minutes)
    return Math.floor(d.getTime()/1000)
}

/**
 * 
 * @param {string} date Date to check in format DD/MM/YYYY
 * @returns {number} Day of the week that the date corresponds to 0-6 = Monday-Sunday 
 */

const getDayOrderByDate = (date) => {
    let [dateToCheck,monthToCheck,yearToCheck] = date.split('/').map((item)=>{return parseInt(item)})
    monthToCheck-=1
    var dateObj = new Date(yearToCheck, monthToCheck, dateToCheck)
    
    return dateObj.getDay() == 0 ? 6 : dateObj.getDay() - 1;
}

/**
 * 
 * @param {string} time Time to transform in format HH/mN
 * @returns {number} Time transformed to minutes
 */

const timeToMinutes = (time) => {
    let [hours,minutes] = time.split('/').map((item)=>{return parseInt(item)})
    return hours*60 + minutes
}

/**
 * 
 * @param {number} minutes Minutes to convert to time format
 * @returns {string} Minutes transformed to time format
 */

const minutesToTime = (minutes) => {
    const hours = (Math.floor(minutes/60)).toString().padStart(2,'0')
    const mins = (minutes%60).toString().padStart(2,'0')
    return `${hours}/${mins}`
}
/**
 * 
 * @param {string} date Date in format DD/MM/YYYY
 * @param {Calendar} calendar Calendar object
 * @returns {array} Valid times for the date provided
 */
export const getValidTimesByDate = (date, calendar) => {
    if (validateDate(date)) return []
    const day = getDayOrderByDate(date)
    if (calendar.startTimes[day]=='X' || calendar.endTimes[day]=='X') return {};
    const startTime = timeToMinutes(calendar.startTimes[day])
    const endTime = timeToMinutes(calendar.endTimes[day])
    const interval = calendar.interval
    const except = calendar.exceptDays ? calendar.exceptDays[date] : null
    if (except){
        var [startExc,endExc] = except.split('-').map((item)=>{return timeToMinutes(item)})
    }
    const booked = calendar.booked ? new Set(calendar.booked[date]) : new Set()
    let currTime = startTime
    let validTimes = []
    while (currTime<=endTime){
        if (!booked.has(minutesToTime(currTime))) {
            if (!(except && startExc <= currTime && currTime <= endExc)){
                validTimes.push(minutesToTime(currTime))
            }
        }
        currTime+= interval
    }

    return { times: validTimes };
}

const validateDate = (date) => {
    try{
    let [dateToCheck,monthToCheck,yearToCheck] = date.split('/').map((item)=>{return parseInt(item)})
    monthToCheck-=1
    var dateObj = new Date(yearToCheck, monthToCheck, dateToCheck);
    if (dateObj.getFullYear() == yearToCheck && dateObj.getMonth() == monthToCheck && dateObj.getDate() == dateToCheck) {
        return
    } else {
        return true
    }
    }
    catch(err){
        return true
    }
}