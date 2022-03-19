import { useContext } from 'react';
import { FaTimes, FaEdit } from 'react-icons/fa'
import PropTypes from 'prop-types';
import Card from "./shared/Card";
import FeedbackContext from '../context/FeedbackContext';

const FeedbackItem = ({ item }) => {
  const { id, rating, text } = item;
  const { handleDelete, handleEdit } = useContext(FeedbackContext);

  return (
    <Card>
      <div className="num-display">{rating}</div>
      <button onClick={() => handleDelete(id)} className='close'>
        <FaTimes color="purple" />
      </button>
      <button className="edit" onClick={() => handleEdit(item)}>
        <FaEdit color="purple" />
      </button>
      <div className="text-display">
        {text}
      </div>
    </Card>
  )
};

FeedbackItem.propTypes = {
  item: PropTypes.object.isRequired,
}

export default FeedbackItem;