import { createContext, useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: 'This item from context',
      rating: 10
    }
  ]);

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  const handleAdd = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete ?")) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  const handleUpdateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map((item) => item.id === id ? { ...item, ...updItem } : item)
    );
  }

  const handleEdit = (item) => {
    setFeedbackEdit({ item, edit: true });
  }

  return <FeedbackContext.Provider value={{
    feedback,
    feedbackEdit,
    handleDelete,
    handleAdd,
    handleEdit,
    handleUpdateFeedback,
  }}>
    {children}
  </FeedbackContext.Provider>

}

export default FeedbackContext;