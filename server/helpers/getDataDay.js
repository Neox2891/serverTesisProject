const getDataDay = (sensorDb) => {

    let moduleTemperature = {
        m1: [],
        m2: [],
        m3: [],
        m4: [],
    };
    let moduleHumidity = {
        m1: [],
        m2: [],
        m3: [],
        m4: [],
    };
    let moduleAirQuiality = {
        m1: [],
        m2: [],
        m3: [],
        m4: [],
    };
    let totalRelativeTemperature = [];
    let totalRelativeHumidity = [];
    let totalRelativeAirQuality = [];
    let hours = [];
    let totalTemperature = [],
        totalHumidity = [],
        totalAirQuality = [],
        totalTemperatureContainer = 0,
        totalHumidityContainer = 0,
        totalAirQualityContainer = 0;

    sensorDb.forEach(element => {

        hours.push(element.date.hours.toString().concat(':', element.date.minutes));

        moduleTemperature.m1.push(element.temperature[0]);
        moduleTemperature.m2.push(element.temperature[1]);
        moduleTemperature.m3.push(element.temperature[2]);
        moduleTemperature.m4.push(element.temperature[3]);

        moduleHumidity.m1.push(element.humidity[0]);
        moduleHumidity.m2.push(element.humidity[1]);
        moduleHumidity.m3.push(element.humidity[2]);
        moduleHumidity.m4.push(element.humidity[3]);

        moduleAirQuiality.m1.push(element.airQuality[0]);
        moduleAirQuiality.m2.push(element.airQuality[1]);
        moduleAirQuiality.m3.push(element.airQuality[2]);
        moduleAirQuiality.m4.push(element.airQuality[3]);

        let temperatureArray = [],
            humidityArray = [],
            airQualityArray = [],
            temperatureContainer = 0,
            humidityContainer = 0,
            airQualityContainer = 0;

        for (let i = 0; i < element.temperature.length; i++) {

            totalTemperature.push(element.temperature[i]);
            totalTemperatureContainer += element.temperature[i];
            temperatureArray.push(element.temperature[i]);

            if (temperatureArray.length === 4) {

                temperatureContainer = 0;
                for (let i = 0; i < temperatureArray.length; i++) {
                    temperatureContainer += temperatureArray[i];
                }
                totalRelativeTemperature.push(temperatureContainer / 4);
                temperatureArray = [];
            }
        }


        element.humidity.forEach((humidityDb, index) => {
            totalHumidity.push(humidityDb);
            totalHumidityContainer += humidityDb;
            humidityArray.push(element.humidity[index]);

            if (humidityArray.length === 4) {

                humidityContainer = 0;
                for (let i = 0; i < humidityArray.length; i++) {
                    humidityContainer += humidityArray[i];
                }
                totalRelativeHumidity.push(humidityContainer / 4);
                humidityArray = [];
            }
        });

        element.airQuality.forEach((airQualityDb, index) => {
            totalAirQuality.push(airQualityDb);
            totalAirQualityContainer += airQualityDb;
            airQualityArray.push(element.airQuality[index]);

            if (airQualityArray.length === 4) {

                airQualityContainer = 0;
                for (let i = 0; i < airQualityArray.length; i++) {
                    airQualityContainer += airQualityArray[i];
                }
                totalRelativeAirQuality.push(airQualityContainer / 4);
                airQualityArray = [];
            }
        });
    });


    return {
        moduleTemperature,
        moduleHumidity,
        moduleAirQuiality,
        totalRelativeTemperature,
        totalRelativeHumidity,
        totalRelativeAirQuality,
        totalTemperature: totalTemperatureContainer / totalTemperature.length,
        totalHumidity: totalHumidityContainer / totalHumidity.length,
        totalAirQuality: totalAirQualityContainer / totalAirQuality.length,
        hours
    }

}

module.exports = {
    getDataDay
}