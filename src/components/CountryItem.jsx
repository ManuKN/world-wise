import PropTypes from 'prop-types';
import styles from "./CountryItem.module.css";

function CountryItem({ country }) {

  CountryItem.propTypes = {
    country:  PropTypes.array.isRequired
}
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
