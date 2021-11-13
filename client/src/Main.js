import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Student from "./student/student"
import App from "./dashboard/App";

export default function Main() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/student">Student Input</Link>
            </li>
           
          </ul>
        </nav>

        {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/student" element={<Student/>}/>
          <Route path="/" element={<App/>}/>
          
        </Routes>
      </div>
    </Router>
  );
}
