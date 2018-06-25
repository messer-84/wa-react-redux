import React, {Component} from 'react';
import {connect} from 'react-redux';

import {addCity} from '../actions'
import {bindActionCreators} from 'redux';


class AddCityForm extends Component {
  constructor() {
    super();
    this.state = {
      value: ''
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {value} = this.state;

    if (value.length < 3) {
        alert('Too short city name')
    } else {
      this.props.onAddCity(value);

      this.setState({
        value: ''
      });

    }

  };

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    })
  };

  render() {
    return (
      <div className="add-form">
        <form
          onSubmit={this.handleSubmit}
        className="form-block"
        >
          <input
            className="field"
            type="text"
            name="city"
            placeholder="Enter the name of the city:"
            value={this.state.value}
            onChange={this.handleChange}/>
          <button className="add-button">Add</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    citiesReducer: state.citiesReducer
});


const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {onAddCity: addCity},
    dispatch
  );

export default connect(mapStateToProps,mapDispatchToProps)(AddCityForm);