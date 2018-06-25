import {
  GET_WEATHER_DATA,
  CHANGE_CITY,
  DELETE_CITY, ADD_CITY
} from '../actions/types';


const initialState = {
  activeCityIndex: 0,
  cities: [
    {name: "New York", id: 5128581},
    {name: "Toronto", id: 6167865}
  ],
  weatherData: null,
};

export default function citiesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WEATHER_DATA:
      return {
        ...state,
        weatherData: action.payload.weatherData,
        activeCityIndex: action.payload.activeCityIndex
      };
    case CHANGE_CITY:
      console.log('from actions', action.payload);

      return {
        ...state,
        activeCityIndex: action.payload
      };
    case ADD_CITY:
      return {
        ...state,
        weatherData: action.payload.weatherData,
        activeCityIndex: action.payload.activeCityIndex
      };
    default:
      return state;
    case DELETE_CITY:
      return {
        ...state,
        weatherData: action.payload.weatherData,
        activeCityIndex: action.payload.activeCityIndex
      }
  }
}