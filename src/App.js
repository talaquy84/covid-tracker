import React from 'react';
import styles from './App.module.css';
import { fetchData } from './api';
import { Cards, Chart, CountryPicker } from './Components';
import covidImage from './image/covid-image.png';

class App extends React.Component {
  state = {
    data: {},
    country: '',
  }

  async componentDidMount() {
    const fetchedData = await fetchData();
    
    this.setState({data: fetchedData});
  }

  handleCountryChange = async (country) => {
    console.log(country);
    //fetch the data
    const fetchedData = await fetchData(country);
    //set the state
    this.setState({ data: fetchedData, country: country })
  }

  render(){
    const { data, country } = this.state;
    return(
      <div className={styles.container}>
        <img className={styles.image} alt='covid-19' src={covidImage} />
        <Cards data={ data }/>
        <CountryPicker handleCountryChange={this.handleCountryChange}/>
        <Chart data={data} country={country} />
      </div>
    )
  }
}

export default App;
