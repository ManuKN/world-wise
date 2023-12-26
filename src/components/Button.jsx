import styles from './Button.module.css'
import PropTypes from 'prop-types';
function Button({children ,type , onClick}) {

    Button.propTypes = {
        children:  PropTypes.string.isRequired,
        type:PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired
        // backfunction:PropTypes.func.isRequired
    }
  return (
    <div>
        <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>{children}</button>
    </div>
  )
}

export default Button