import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import {saveStore, initial} from 'redux-simple-localstorage1'


const locState = localStorage.getItem('reduxStore');

let myInitialState;

if (locState === null) {
    myInitialState = {
        activeCityIndex: 0,
        cities: [
            {name: "New York", id: 5128581},
            {name: "Toronto", id: 6167865}
        ],
        weatherData: null,
    };
} else {
    myInitialState = JSON.parse(locState).citiesReducer;
}


let finalCreateStore = compose(
    applyMiddleware(thunk, saveStore('reduxStore')),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
)(createStore);


export function configureStore(initialState) {
    return finalCreateStore(rootReducer, initial(initialState));
}

console.log('store-myIni', myInitialState);
export const store = configureStore(myInitialState);