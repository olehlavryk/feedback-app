import { useState } from 'react';
import RatingSelect from './RatingSelect';
import Card from "./shared/Card";
import Button from "./shared/Button";

const FeedbackForm = ({ handleAdd }) => {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(10);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState('');

  const handleTextChange = (e) => {
    if (text === '') {
      setBtnDisabled(true);
      setMessage(null);
    } else if (text !== '' && text.trim().length <= 10) {
      setMessage('Text must be at least 10 characters!');
      setBtnDisabled(true);
    } else {
      setMessage(null);
      setBtnDisabled(false);
    }

    setText(e.target.value)
  };

  const handleSabmit = (e) => {
    e.preventDefault();

    if(text.trim().length > 10) {
      const newFeedback = {
        text,
        rating,
      }

      handleAdd(newFeedback);
      setText('');
    }
  }

  return (
    <Card>
      <form onSubmit={handleSabmit}>
        <h2>How would you rate service with us ?</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className="input-group">
          <input
            type="text"
            onChange={handleTextChange}
            placeholder="Write a review"
            value={text}
          />
          <Button
            type="submit"
            version="secondary"
            isDisabled={btnDisabled}
          >
            Send
          </Button>
        </div>
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm