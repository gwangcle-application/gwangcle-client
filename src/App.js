import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Oauth from './routes/Oauth';
import StudyBoard from './routes/StudyBoard';
import Registration from './routes/Registration';
import Join from './routes/Join';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Oauth />}/>
        <Route path="/board" element={<StudyBoard />}/>
        <Route path="/registration" element={<Registration />}/>
        <Route path="/join" element={<Join />}/>
      </Routes>
    </Router>
  );
}

export default App;
