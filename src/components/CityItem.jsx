import PropTypes from 'prop-types';
import styles from './CityItem.module.css'
import { Link } from 'react-router-dom';
import { useCitiesPath } from '../Contexts/CitiesProvider';

function CityItem({city}) {
  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(new Date(date));

    const flagemojiToPNG = (flag) => {
      var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt()).map(char => String.fromCharCode(char-127397).toLowerCase()).join('')
      return (<img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt='flag' />)
  }

  const {cityName , emoji , date ,id ,position} = city
  const {currentCity,deleteCity} = useCitiesPath();

  function handledelete(e){
    e.preventDefault()
    deleteCity(id)
    
  }

  return (
    <li>
      <Link className={`${styles.cityItem} ${id === currentCity.id ? styles["cityItem--active"] : ""}`} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
      <span className={styles.emoji}>{flagemojiToPNG(emoji)}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handledelete}>&times;</button>
      </Link>
    </li>
  )
}

CityItem.propTypes = {
  city:  PropTypes.shape({
    cityName: PropTypes.string,
    emoji: PropTypes.string,
    date: PropTypes.string,
    id: PropTypes.number,
    position: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
  }).isRequired
};

export default CityItem;
