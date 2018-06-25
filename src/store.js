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
  try{
    const serializeState = JSON.stringify(state);
    localStorage.setItem('state', serializeState);
    console.log('save to local storage');
    console.log('save - state -', serializeState);
    console.log('=================//////////////finish');

  } catch (e) {
    console.log('error save to loc storage');
    console.log(e);

  }
};

const loadFromLocalStorage = () =>{
  try{
    const serializedState = localStorage.getItem('state');
    if(serializedState === null){
      console.log('way - 1');
      // return undefined;
      return {};
    }
      console.log('way-1-2');
      console.log('load from local storage', JSON.parse(serializedState));
      return JSON.parse(serializedState);
  }
  catch(e){

    console.log('way-2 error load from loc storage');
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
  console.log('///////////=========================start');
  console.log('subs');
  saveToLocalStorage(store.getState().citiesReducer);
});


export default store;