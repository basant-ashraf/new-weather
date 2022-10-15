let locationInput = document.querySelector('#locationInput');

locationInput.addEventListener('input', function () {
    getApi(locationInput.value);
});

async function getApi(city) {
    let apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=e300caa804764387b4902228221510&q=${city}&days=3`);
    let apiData = await apiResponse.json();
    if (apiResponse.status == 200) {
        displayForecast(apiData);
    }
    return apiResponse.status;
}
getApi('cairo');




function displayForecast(data) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let temp_c = data.current.temp_c;
    let location = data.location.name;
    let { text, icon } = data.current.condition;
    let currentDate = new Date();
    let currentDay = currentDate.getDay();
    let currentDayNumber = currentDate.getDate();
    let currentMonth = currentDate.getMonth();

    let nextDate1 = new Date(data.forecast.forecastday[1].date);
    let nextDateDay1 = nextDate1.getDay();
    let { maxtemp_c, mintemp_c } = data.forecast.forecastday[1].day;
    // let { text, icon } = data.forecast.forecastday[1].day.condition;
    let text1 = data.forecast.forecastday[1].day.condition.text;
    let icon1 = data.forecast.forecastday[1].day.condition.icon;

    let nextDate2 = new Date(data.forecast.forecastday[2].date);
    let nextDateDay2 = nextDate2.getDay();
    // let { maxtemp_c, mintemp_c } = data.forecast.forecastday[1].day;
    let maxtemp_c2 = data.forecast.forecastday[2].day.maxtemp_c;
    let mintemp_c2 = data.forecast.forecastday[2].day.mintemp_c;
    let text2 = data.forecast.forecastday[2].day.condition.text;
    let icon2 = data.forecast.forecastday[2].day.condition.icon;



    let cartoona = `
        <div class="col-lg-4 today p-0">
            <div class="date-container d-flex justify-content-between muted-color">
                <div id="day">${days[currentDay]}</div>
                <div id="date">${currentDayNumber + ' ' + month[currentMonth]} </div>
            </div>
            <div class="weather-container">
                <div class="location muted-color">
                    ${location}
                </div>
                <div class="degree-container d-flex justify-content-center ps-3 flex-wrap">
                    <div class="degree fw-bolder pe-4">
                        ${temp_c}°C
                    </div>
                    <div class="image d-flex justify-content-center align-items-center pe-3">
                        <img src="https:${icon}" alt="" width="90px">
                    </div>
                </div>
                <div class="status">${text}</div>
                <div class="symbols mt-3">
                    <ul class="list-unstyled d-flex">
                        <li class="symbol">
                            <i class="fa-solid fa-umbrella"></i>20%
                        </li>                                
                        <li class="symbol">
                            <i class="fa-solid fa-wind"></i>18km/h
                        </li>
                        <li class="symbol">
                            <i class="fa-solid fa-compass me-1"></i>East
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="col-lg-4 forecast forecast-one text-center pb-3 pt-0 px-0">
            <div class="date-container">
                <div class="day muted-color">${days[nextDateDay1]}</div>
            </div>
            <div class="weather-container py-5">
                <div class="img">
                    <img src="https:${icon1}" alt="weather-logo" width="50px" class="mb-3">
                </div>
                <div class="max-degree fw-bolder fs-4"> ${maxtemp_c}°C</div>
                <div class="min-degree fs-6 muted-color">${mintemp_c}°c</div>
                <div class="status my-3"> ${text1}</div>
            </div>                   
        </div>

        <div class="col-lg-4 forecast forecast-two text-center pb-3 pt-0 px-0">
            <div class="date-container">
                <div class="day muted-color">${days[nextDateDay2]}</div>
            </div>
            <div class="weather-container py-5">
                <div class="img">
                    <img src="https:${icon2}" alt="weather-logo" width="50px" class="mb-3">
                </div>
                <div class="max-degree fw-bolder fs-4"> ${maxtemp_c2}°C</div>
                <div class="min-degree fs-6 muted-color">${mintemp_c2}°c</div>
                <div class="status my-3"> ${text2}</div>
            </div>                   
        </div>
    `;
    document.querySelector('#rowData').innerHTML = cartoona;
}

