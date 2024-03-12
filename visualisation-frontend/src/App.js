import './App.css';
import { BrowserRouter as Router ,Routes,Route, Link} from 'react-router-dom';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import Errorpage from './pages/ErrorPage';
import PageLayout from './components/Layouts/PageLayout';
import Home from './pages/Home';


function App() {
  return (
    <Router>

        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/*" element={<Errorpage/>} />
        </Routes>
    </Router>
  );
}

export default App;
