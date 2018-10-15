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

    let totalTemperatureM1 = 0,
        totalTemperatureM2 = 0,
        totalTemperatureM3 = 0,
        totalTemperatureM4 = 0;

    let totalHumidityM1 = 0,
        totalHumidityM2 = 0,
        totalHumidityM3 = 0,
        totalHumidityM4 = 0;

    let totalAirQualityM1 = 0,
        totalAirQualityM2 = 0,
        totalAirQualityM3 = 0,
        totalAirQualityM4 = 0;

    sensorDb.forEach(element => {

        hours.push(element.date.hours.toString().concat(':', element.date.minutes));

        moduleTemperature.m1.push(element.temperature[0]);
        totalTemperatureM1 += element.temperature[0];
        moduleTemperature.m2.push(element.temperature[1]);
        totalTemperatureM2 += element.temperature[1];
        moduleTemperature.m3.push(element.temperature[2]);
        totalTemperatureM3 += element.temperature[2];
        moduleTemperature.m4.push(element.temperature[3]);
        totalTemperatureM4 += element.temperature[3];

        moduleHumidity.m1.push(element.humidity[0]);
        totalHumidityM1 += element.humidity[0];
        moduleHumidity.m2.push(element.humidity[1]);
        totalHumidityM2 += element.humidity[1];
        moduleHumidity.m3.push(element.humidity[2]);
        totalHumidityM3 += element.humidity[2];
        moduleHumidity.m4.push(element.humidity[3]);
        totalHumidityM4 += element.humidity[3];

        moduleAirQuiality.m1.push(element.airQuality[0]);
        totalAirQualityM1 += element.airQuality[0];
        moduleAirQuiality.m2.push(element.airQuality[1]);
        totalAirQualityM2 += element.airQuality[1];
        moduleAirQuiality.m3.push(element.airQuality[2]);
        totalAirQualityM3 += element.airQuality[2];
        moduleAirQuiality.m4.push(element.airQuality[3]);
        totalAirQualityM4 += element.airQuality[3];

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

    let totalTemperatureModules = [];
    totalTemperatureModules.push(totalTemperatureM1 / moduleTemperature.m1.length);
    totalTemperatureModules.push(totalTemperatureM2 / moduleTemperature.m2.length);
    totalTemperatureModules.push(totalTemperatureM3 / moduleTemperature.m3.length);
    totalTemperatureModules.push(totalTemperatureM4 / moduleTemperature.m4.length);

    let totalHumidityModules = [];
    totalHumidityModules.push(totalHumidityM1 / moduleHumidity.m1.length);
    totalHumidityModules.push(totalHumidityM2 / moduleHumidity.m2.length);
    totalHumidityModules.push(totalHumidityM3 / moduleHumidity.m3.length);
    totalHumidityModules.push(totalHumidityM4 / moduleHumidity.m4.length);

    let totalAirQuialityModules = [];
    totalAirQuialityModules.push(totalAirQualityM1 / moduleAirQuiality.m1.length);
    totalAirQuialityModules.push(totalAirQualityM2 / moduleAirQuiality.m2.length);
    totalAirQuialityModules.push(totalAirQualityM3 / moduleAirQuiality.m3.length);
    totalAirQuialityModules.push(totalAirQualityM4 / moduleAirQuiality.m4.length);

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
        totalTemperatureModules,
        totalHumidityModules,
        totalAirQuialityModules,
        hours
    }

}

module.exports = {
    getDataDay
}