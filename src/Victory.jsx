import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../index.css';

function Victory() {
  const [completionTime, setCompletionTime] = useState(null);

  // Clear progress and calculate completion time
  useEffect(() => {
    localStorage.removeItem('currentRoom');
    const startTime = localStorage.getItem('startTime');
    if (startTime) {
      const endTime = Date.now();
      const timeTaken = (endTime - parseInt(startTime)) / 1000; // Time in seconds
      setCompletionTime(timeTaken);
      localStorage.removeItem('startTime'); // Clean up
    }
  }, []);

  return (
    <div className="victory">
      <h1>:tada: Congratulations!</h1>
      <p>You've escaped all 3 rooms in EscapeIQ!</p>
      {completionTime && <p>Time taken: {completionTime.toFixed(1)} seconds</p>}
      <p>Your journey is complete!</p>
      <Link to="/" className="return-btn">Return to Intro</Link>
    </div>
  );
}

export default Victory;