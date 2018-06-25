import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {changeCity, deleteCity} from '../actions'


class Tabs extends Component {

  changeCity(e, index) {
    e.preventDefault();
    this.props.onChangeCity(index);
  }
  deleteCity(index){
    console.log('del ind', index);

    this.props.onDeleteCity(index);
  }

  render() {
    const {activeCityIndex, weatherData} = this.props.citiesReducer;


    const tabs = weatherData ? weatherData.map((item, index) => {
      return (
        <div
          className={`tab ${activeCityIndex === index ? 'active' : ''}`}
          key={item.id}
        >
          <a href="#" onClick={(e) => this.changeCity(e, index)}>
            {item.name}
          </a>
          <button onClick={() => this.deleteCity(index)} />
        </div>
      );
    }) : null;


    return (
      <div className="sidebar">
        <div className="tabs-block">
          <div className="title">Cities:</div>
          <div className="tabs">
            {tabs}
          </div>
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
    {onChangeCity: changeCity,
    onDeleteCity: deleteCity},
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);