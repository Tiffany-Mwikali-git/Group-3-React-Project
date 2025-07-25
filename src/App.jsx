import { Routes, Route } from 'react-router-dom';
import Intro from './components/Intro';
import Room from './components/Room';
import Victory from './components/Victory';
import "./components/styles .css"

function App() {
  return (
    <Routes>
      <Route path = "/" element={<Intro />} />
      <Route path='/room/:id' element={<Room />} />
      <Route path="/victory" element={<Victory />} />
    </Routes>
  );
}

export default App;
