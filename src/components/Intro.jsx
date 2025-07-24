import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../index.css';

function Intro() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('Intro useEffect triggered');
    const checkRedirect = () => {
      setIsLoading(true);
      setTimeout(() => {
        const saved = localStorage.getItem('currentRoom');
        console.log('Saved currentRoom:', saved);
        if (saved && ['1', '2', '3'].includes(saved)) {
          console.log('Redirecting to /room/', saved);
          navigate(`/room/${saved}`);
        } else {
          console.log('No valid currentRoom, staying on intro');
          localStorage.removeItem('currentRoom'); // Clear invalid value
        }
        setIsLoading(false);
      }, 1000); // 1-second delay
    };
    checkRedirect();
  }, [navigate]);

  if (isLoading) {
    return <div className="intro"><p>Loading...</p></div>;
  }

  const handleStart = () => {
    console.log('Starting escape, navigating to /room/1');
    navigate('/room/1');
  };

  return (
    <div className="intro">
      <h1>🧠 EscapeIQ</h1>
      <p>Welcome to the Digital Escape Room Challenge!</p>
      <p>Solve puzzles to move through rooms and escape. Good luck!</p>
      <Link to={`/room/${1}`}>
      <button onClick={handleStart} className="start-btn">Start Escape</button>
      </Link>
      
      <button onClick={() => { localStorage.removeItem('currentRoom'); alert('Progress reset!'); }} className="reset-btn">
        Reset Progress
      </button>
    </div>
  );
}

export default Intro;