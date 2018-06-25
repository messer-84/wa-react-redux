import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middleware = [thunk];

const enhancer = compose(
  applyMiddleware(...middleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const saveToLocalStorage = state => {
  console.log('save to local storage');

  try{
    const serializeState = JSON.stringify(state);
    localStorage.setItem('state', serializeState);
    console.log('save - state -', serializeState);

  } catch (e) {
    console.log(e);

  }
};

const loadFromLocalStorage = () =>{
  console.log('load from local storage');

  try{
    const serializedState = localStorage.getItem('state');
    if(serializedState === null){
      console.log('way - 1');

      return undefined;
    }
    return JSON.parse(serializedState);
  }
  catch(e){
    console.log('way - 2');

    console.log(e);
    return undefined;
  }
};


const persistedState = loadFromLocalStorage();
console.log('pers state', persistedState);

const store = createStore(
  rootReducer,
  persistedState,
  enhancer
);

store.subscribe(() => {
  console.log('subs', store.getState().citiesReducer);
  saveToLocalStorage(store.getState().citiesReducer);
});


export default store;