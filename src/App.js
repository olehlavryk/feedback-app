import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { FeedbackProvider } from './context/FeedbackContext';
import Header from './components/Header';
import FeedbackList from './components/FeedbackList';
import FeedbackStats from './components/FeedbackStats';
import FeedbackForm from './components/FeedbackForm';
import FeedbackData from './data/FeedbackData';
import AboutIconLink from './components/AboutIconLink';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <FeedbackProvider>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route exact path="/" element={
              <>
                <FeedbackForm />
                <FeedbackStats />
                <FeedbackList />
              </>
            } />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </div>
        <AboutIconLink />
      </Router>
    </FeedbackProvider>
  );
}

export default App;