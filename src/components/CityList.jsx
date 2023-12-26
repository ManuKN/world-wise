import PropTypes from 'prop-types';
import CityItem from './CityItem'
import styles from './CityList.module.css'
import Spinner from './Spinner'
import Message from './Message'
import { useCitiesPath } from '../Contexts/CitiesProvider';

function CityList() {
  const {cities , isLoading} = useCitiesPath()

    CityList.propTypes = {
         cities: PropTypes.array.isRequired,
         isLoading: PropTypes.bool.isRequired
       };
  
    if(!cities.length)
     return <Message message= 'Add your first city by clicking on a city on a Map🗺️' />
    if(isLoading) return <Spinner />

  return (
   <ul className={styles.cityList}>
    {cities.map(city => <CityItem city={city} key={city.id} />)}
   </ul>
  )
}

export default CityList