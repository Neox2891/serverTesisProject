let { getDataDay } = require('./getDataDay');

class Methods {
    constructor() {

    }

}



let getDataMonth = (sensorDb, monthInDays) => {


    let monthDays = [];
    let monthsArray = [];
    let i = 1;
    // let iMonthDay = 0;

    while (i <= monthInDays) {
        monthDays.push(i);
        i++;
    }
    // console.log(monthDays);
    for (let index = 0; index < monthDays.length; index++) {
        let temporalArrayDay = [];
        const element = monthDays[index];
        // console.log(element);
        for (let index = 0; index < sensorDb.length; index++) {

            const sDb = sensorDb[index];
            if (element === sDb.date.day) {
                temporalArrayDay.push(sDb);
            }
        }

        let day = getDataDay(temporalArrayDay);
        // console.log(day);
        let dayObject = {
            id: element,
            temperatureModules: day.totalTemperatureModules,
            humidityModules: day.totalHumidityModules,
            airQuialityModules: day.totalAirQuialityModules,
            totalTemperature: day.totalTemperature,
            totalHumidity: day.totalHumidity,
            totalAirQuiality: day.totalAirQuality
        };
        // console.log(typeof day.totalTemperature);
        if (day.moduleTemperature.m1.length !== 0) {
            monthsArray.push(dayObject);
        }

    }

    return {
        monthsArray
    }
}

module.exports = {
    getDataMonth
}