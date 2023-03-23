var APIKey = "fe7e419a8aac3df2147463d52d2c4dee";

let count = 0;

function getWeather(city) {

  console.log('city', city)
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=fe7e419a8aac3df2147463d52d2c4dee";

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log('tst', data)
        let latitude = data.coord.lat;
        let longtitude = data.coord.lon;

        getweatherInfo(latitude, longtitude);
      });
    } else {
      alert('Error: ' + response.statusText);
    }
  });

}

function displayCurrentWeather(data) {
  $("#temperature").text("temperature:" + data.current.temp);
  $("#humidity").text("humidity:" + data.current.humidity);
  $("#wind-speed").text("windSpeed:" + data.current.wind_speed);
  displayFutureWeather(data)
}

function displayFutureWeather(data) {

  for (let i = 0; i < 5; i++) {
    console.log(data.daily[i].wind_speed)
    const epochTime = data.daily[i].dt;
    const dateString = moment.unix(epochTime).format("MM/DD/YYYY");
    $(`#day-${i}`).text(dateString)
    $(`#temp-${i}`).text("temperature:" + moment(data.daily[i].temp.day));
    $(`#hum-${i}`).text("humidity:" + data.daily[i].humidity);
    $(`#wind-${i}`).text("windSpeed:" + data.daily[i].wind_speed);
  }

}

function getweatherInfo(latitude, longtitude) {
  apiURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longtitude + "&exclude=minutely,hourly&units=imperial&appid=71311474f5b26fb7bbfa0bc1985b90cd";

  fetch(apiURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayCurrentWeather(data);
      })
    }
  });

}

$("#search-button").on("click", function (e) {
  e.preventDefault();
  let city = $('#cityName').val().trim()
  $("#city-name")[0].textContent = city + " (" + moment().format('MM/D/YYYY') + ")";
  getWeather(city);
  $("#city-list").append(`<button type="button" class="btnOld" value=${city}>` + city);
  localStorage.setItem(`city${city}`, city);
  $(".btnOld").on('click', function () {
    console.log('cming hh', $(this))
    let cityOld = $(this).text();
    let cityValue = localStorage.getItem(`city${cityOld}`);
    $("#city-name")[0].textContent = cityValue + " (" + moment().format('MM/D/YYYY') + ")";
    getWeather(cityValue);
  })
})



