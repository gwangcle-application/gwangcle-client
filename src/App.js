import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Main from './routes/Main';
import Registration from './routes/Registration';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/registration" element={<Registration/>}/>
      </Routes>
    </Router>
  );
}

export default App;
