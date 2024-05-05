const moment = require('moment');

function calculateDate(startDate, endDate) {
// const formatStartDate = moment(startDate).format("DD/MM/YYYY");
// const formatEndDate = moment(endDate).format("DD/MM/YYYY");
const timeDifference = moment.duration(moment(endDate).diff(moment(startDate)));

const years = timeDifference.years();
const months = timeDifference.months();
const days = timeDifference.days();

// let newStartDate = new Date(formatStartDate);
// let newEndDate = new Date(formatEndDate);
// let timeDifference = newEndDate - newStartDate
// let getDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
// let getMonths = Math.floor(getDays / 30.44);
// let getYears =  Math.floor(getMonths / 12)
 
if(years > 0) {
    return `${years} Tahun`
} else if (months > 0) {
    return `${months} Bulan`
} else {
    return `${days} Hari`
}

}

module.exports = {calculateDate}

