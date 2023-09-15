
import './App.css';
import Employees from './Employees';
import Form from './Form';
import Update from './Update';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={ <Employees/> } />
        <Route path="/form" element={ <Form/> } />
        <Route path="/update/:id" element={ <Update/> } />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
