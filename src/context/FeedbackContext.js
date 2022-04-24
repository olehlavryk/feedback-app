/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  const initFeedbackItems = async () => {
    const feedbackItems = await fetchFeedback();
    setFeedback(feedbackItems);
    setLoading(false);
  }
  useEffect(() => {
    initFeedbackItems();
  }, []);

  async function fetchFeedback() {
    try {
      const response = await fetch('/feedback?_sort=id&order=desc');
      const data = await response.json();

      return data;

    } catch (e) {
      console.error(e.message);
    }
  }


  const handleAdd = async (newFeedback) => {
    try {
      const response = await fetch('/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFeedback)
      })

      const data = await response.json();
      setFeedback([data, ...feedback]);
    } catch (e) {
      console.error(e.message);
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete ?")) {
      try {
        await fetch(`/feedback/${id}`, { method: 'DELETE' })
        setFeedback(feedback.filter((item) => item.id !== id));
      } catch (e) {
        console.error(e.message);
      }
    }
  };

  const handleUpdateFeedback = async (id, updItem) => {
    try {
      const response = await fetch(`/feedback/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updItem)
      })

      const data = await response.json();

      setFeedback(
        feedback.map((item) => item.id === id ? { ...item, ...data } : item)
      );
    } catch (e) {
      console.error(e.message);
    }
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
    isLoading,
  }}>
    {children}
  </FeedbackContext.Provider>

}

export default FeedbackContext;