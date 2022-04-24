import PropTypes from 'prop-types';
import spinner from "../assets/spinner.gif";

const styles = {
  width: '100px',
  margin: 'auto',
  display: 'block'
}

const Spinner = ({ className }) => {
  return <img src={spinner} alt="Loading..." className={className} style={styles} />
}

Spinner.propTypes = {
  className: PropTypes.string,
}

export default Spinner;