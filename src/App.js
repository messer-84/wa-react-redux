import React, {Component} from 'react';
import { connect} from 'react-redux';
import './assets/App.scss';
import {bindActionCreators} from 'redux';

import {getWeatherData} from "./actions";
import Tabs from './components/Tabs';
import ShowBlock from './components/ShowBlock';
import AddCityForm from "./components/AddCityForm";



class App extends Component {
  componentWillMount() {
    // console.log('comp will mount');


    // localStorage.getItem('state') && this.setState(JSON.parse(localStorage.getItem('localState')));
  }


  componentDidMount() {
    // console.log('component did mount');

    // const date = localStorage.getItem('infoDate');
    // const infoDate = date && new Date(parseInt(date));
    // const now = new Date();
    //
    // const dataAge = Math.round((now - infoDate) / (1000 * 60)); // in minutes
    // const tooOld = dataAge >= 2;

      // store.dispatch(getWeatherData());
      this.props.onFetchData()

    // if (tooOld) {
    //   console.log('data age', dataAge);
    //
    //   console.log('too old', tooOld);
    //   // const isLocalState = localStorage.getItem('state');
    //
    //     // if (!isLocalState) {
    //     // store.dispatch(getWeatherData());
    //   // }
    //
    //
    // } else {
    //   console.log(`Using data from localStorage that are ${dataAge} minutes old.`);
    // }


  }

  render() {
    return (

        <div className="container">
          <h1>Weather App</h1>
          <div className="row">
            <div className="main">
              <AddCityForm/>
              <ShowBlock/>
            </div>
            <Tabs/>
          </div>
        </div>

    );
  }
}

const mapStateToProps = state => ({
    citiesReducer: state.citiesReducer
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {onFetchData: getWeatherData},
        dispatch
    );

export default connect(mapStateToProps,mapDispatchToProps)(App);
