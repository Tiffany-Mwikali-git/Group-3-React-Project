import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../index.css';

function Room() {

  const {id:roomId} = useParams();
  console.log(roomId)
  const navigate = useNavigate();
  const [answer, setAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [puzzle, setPuzzle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('Fetching puzzle for roomId:', roomId);
    if ([1, 2, 3].includes(roomId)) {
      console.log('Invalid roomId, redirecting to /');
      return 
    }
    setIsLoading(true);
    fetch(`http://localhost:3000/puzzles/${roomId}`)
      .then((response) => {
        if (!response.ok) throw new Error('Puzzle not found');
        return response.json();
      })
      .then((data) => {
        console.log('Puzzle fetched:', data);
        setPuzzle(data);
      })
      .catch((error) => {
        console.error('Error fetching puzzle:', error);
        navigate('/');
      })
      .finally(() => setIsLoading(false));
    if (roomId === '1' && !localStorage.getItem('startTime')) {
      localStorage.setItem('startTime', Date.now());
    }
  }, [roomId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!answer.trim()) {
      alert('Please enter an answer.');
      return;
    }
    if (puzzle && answer.toLowerCase() === puzzle.answer) {
      if (puzzle.nextRoom === 'victory') {
        navigate('/victory');
      } else {
        localStorage.setItem('currentRoom', puzzle.nextRoom);
        navigate(`/room/${puzzle.nextRoom}`);
      }
    } else {
      alert('Incorrect answer. Try again!');
    }
    setAnswer('');
  };

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset your progress?')) {
      localStorage.removeItem('currentRoom');
      localStorage.removeItem('startTime');
      navigate('/');
    }
  };

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  if (isLoading) {
    return <div className="room"><p>Loading puzzle...</p></div>;
  }

  return (
    <div className="room">
      <h2>Room {roomId}</h2>
      <p>Progress: Room {roomId} of 3</p>
      {puzzle ? (
        <>
          <p>{puzzle.description}</p>
          {showHint && <p>Hint: {puzzle.hint}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter your answer"
              className="answer-input"
            />
            <button type="submit" className="submit-btn">Submit</button>
          </form>
          <button onClick={toggleHint} className="hint-btn">
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </button>
          <button onClick={handleResetProgress} className="reset-btn">Reset Progress</button>
        </>
      ) : (
        <p>Puzzle not found! Redirecting...</p>
      )}
    </div>
  );
}

export default Room;