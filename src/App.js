import React, {Component} from 'react';
import { connect} from 'react-redux';
import './assets/App.scss';
import {bindActionCreators} from 'redux';

import {getWeatherData} from "./actions";
import Tabs from './components/Tabs';
import ShowBlock from './components/ShowBlock';
import AddCityForm from "./components/AddCityForm";



class App extends Component {
  componentDidMount() {
     console.log('component did mount');
      this.props.onFetchData()
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
    weatherData: state.weatherData
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {onFetchData: getWeatherData},
        dispatch
    );

export default connect(mapStateToProps,mapDispatchToProps)(App);
