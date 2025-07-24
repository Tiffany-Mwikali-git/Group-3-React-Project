import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../index.css';

function Room() {
    	
Alex Rooney Mwangi
3:13 PM







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
    return (
        <div>
            {/* Room content goes here */}
        </div>
    )
};

export default Room;