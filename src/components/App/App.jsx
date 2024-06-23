import { useEffect, useState } from 'react';
import Description from '../Description/Description';
import Feedback from '../Feedback/Feedback';
import Options from '../Options/Options';
import Notification from '../Notification/Notification.jsx';

const App = () => {
  const [clicks, setClicks] = useState(() => {
    const dataFeedbacks = window.localStorage.getItem('dataFeedback');
    if (dataFeedbacks !== null) {
      return JSON.parse(dataFeedbacks);
    }
    return {
      good: 0,
      neutral: 0,
      bad: 0,
    };
  });

  const updateFeedback = feedbackType => {
    setClicks({
      ...clicks,
      [feedbackType]: clicks[feedbackType] + 1,
    });
  };

  const totalFeedback = clicks.good + clicks.neutral + clicks.bad;
  const positiveFeedback =
    totalFeedback > 0 ? ((clicks.good / totalFeedback) * 100).toFixed(0) : 0;

  const resetClicks = () => {
    setClicks({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  useEffect(() => {
    window.localStorage.setItem('dataFeedback', JSON.stringify(clicks));
  }, [clicks]);

  return (
    <>
      <Description />
      <Options
        updateFeedback={updateFeedback}
        resetClicks={resetClicks}
        totalFeedback={totalFeedback}
      />
      {totalFeedback > 0 ? (
        <Feedback
          good={clicks.good}
          neutral={clicks.neutral}
          bad={clicks.bad}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
      ) : (
        <Notification />
      )}
    </>
  );
};

export default App;
