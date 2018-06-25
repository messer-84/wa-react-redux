import {
  GET_WEATHER_DATA,
  ADD_CITY,
  CHANGE_CITY,
  DELETE_CITY
} from './types';
import store from '../store';


const key = 'f63a9d133e62d5885fbfa33e55c71be2';


// change city

export const getWeatherData = () => dispatch => {
  // const date = localStorage.getItem('infoDate');
  // const infoDate = date && new Date(parseInt(date));
  // const now = new Date();
  let cities = store.getState().citiesReducer.cities;





  // const dataAge = Math.round((now - infoDate) / (1000 * 60)); // in minutes
  // const tooOld = dataAge >= 2;
  //
  // console.log('cities in action', cities);
  //
  // if (tooOld) {
    const ids = cities.map(city => city.id).join(',');
    const URL = `http://api.openweathermap.org/data/2.5/group?id=${ids}&units=metric&appid=${key}`;
    fetch(URL)
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: GET_WEATHER_DATA,
          payload: {
            weatherData: data.list,
            activeCityIndex: 0
          }
        });
      });
  // } else {
  //   console.log(`Using data from localStorage that are ${dataAge} minutes old.`);
  // }

};

export const changeCity = (index) => {
  return {
    type: CHANGE_CITY,
    payload: index
  }
};


export const addCity = city => dispatch => {
  console.log(city);

  const weatherData = store.getState().citiesReducer.weatherData;

  const arrayNotUniq = weatherData.filter(item => {
    return item.name.toLowerCase() === city.toLowerCase();
  });

  if (arrayNotUniq.length === 0) {
    const URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`;

    fetch(URL)
      .then(res => res.json())
      .then(data => {
        const newWeatherData = [...weatherData, data];
        const cod = data.cod || false;

        if (cod !== "404") {
          dispatch({
            type: ADD_CITY,
            payload: {
              weatherData: newWeatherData,
              activeCityIndex: newWeatherData.length - 1
            }
          });

        }
        else {
          alert(`The city doesn't exist or error in name - ${city}`);
        }

      })
      .catch(err => {
        console.log(err.message);
      });
  }
  else {
    alert('This city is already in the list of cities')
  }


};

// delete city

export const deleteCity = indexWillDelete => dispatch => {
  console.log('delete', indexWillDelete);
  const citiesReducer = store.getState().citiesReducer;
  const {weatherData, activeCityIndex} = citiesReducer;
  let newActiveCityIndex;
  const newWeatherData = weatherData.filter(item => {
    return weatherData[indexWillDelete] !== item;
  });
  const newWDLength = newWeatherData.length;


  //if delete first and active first
  if (indexWillDelete === 0 && activeCityIndex === 0) {
    newActiveCityIndex = 0;
  }
  //if delete last and active last
  else if (indexWillDelete === weatherData.length - 1 && activeCityIndex === weatherData.length - 1) {
    newActiveCityIndex = newWeatherData.length - 1;
  }
  else {
    //if deleteI < activeI
    if (indexWillDelete > activeCityIndex) {
      newActiveCityIndex = activeCityIndex
    }
    else {
      newActiveCityIndex = activeCityIndex - 1;
    }
  }

  if (newWDLength > 0) {
    dispatch({
      type: DELETE_CITY,
      payload: {
        activeCityIndex: newActiveCityIndex,
        weatherData: newWeatherData
      }
    });
  }
  else {
    alert("You can't delete last city ");
  }

};