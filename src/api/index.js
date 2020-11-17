import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
    let changeableUrl  = url;
    if(country) {
        changeableUrl = `${url}/countries/${country}`
    }

    try{    
        const response = await axios.get(`${changeableUrl}`);
        //Destructuring 
        const { data: { confirmed, recovered, deaths, lastUpdate }} = response;
        
        return { confirmed, recovered, deaths, lastUpdate, }
    } catch (error) {

    }
}

export const fetchDailyData  = async () => {
    try{
        const response = await axios.get(`${url}/daily`);
        const { data } = response;
        console.log(data)
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
            // recovered: dailyData.recovered.total
        }))
        console.log(modifiedData)
        return modifiedData;
    } catch (error){
        console.log(error);
    }
}

export const fetchCountries  = async () => {
    try{
        const response = await axios.get(`${url}/countries`);
        const { data: { countries } } = response;

        return countries.map((country) => country.name)
    } catch (error){
        console.log(error);
    }
}