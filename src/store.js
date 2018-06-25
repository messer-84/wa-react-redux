import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';


const saveStore = (StorageName) => {
    return ({ dispatch, getState }) => next => action => {
        next(action);
        let StoreItem = getState();
        let FinalStoreItem = JSON.stringify(StoreItem);
        localStorage.setItem(StorageName,FinalStoreItem);
    };
};

const initial = (initialState) => {
    if (typeof localStorage === 'undefined') {
        return initialState;
    } else {
        if (localStorage.getItem('reduxStore') === null){
            return initialState;
        } else {
            return JSON.parse(localStorage.getItem('reduxStore'));
        }
    }
};



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

export const store = configureStore(myInitialState);