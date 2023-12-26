import PropTypes from 'prop-types';
import CountryItem from './CountryItem'
import styles from './CountryList.module.css'
import Spinner from './Spinner'
import Message from './Message'
import { useCitiesPath } from '../Contexts/CitiesProvider';

function CountryList() {
  const{cities , isLoading} = useCitiesPath()

    CountryList.propTypes = {
         cities: PropTypes.array.isRequired,
         isLoading: PropTypes.bool.isRequired
       };
  
    if(!cities.length)
     return <Message message= 'Add your first city by clicking on a city on a Map🗺️' />
    if(isLoading) return <Spinner />

const countries = cities.reduce((arr , city) =>{ if(!arr.map((el)=>el.country).includes(city.country))
return[...arr , {country:city.country , emoji : city.emoji}]
else return arr} ,[])

  return (
   <ul className={styles.countryList}>

    {countries.map(country => <CountryItem country={country} key={country.country}  />)}
    
   </ul>
  )
}

export default CountryList