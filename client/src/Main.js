import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import App from "./dashboard/App"
import Student from "./student/student"
import App from "./dashboard/App";
import Login from "./student/login";

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
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>

        {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/student" element={<Login/>}/>
          <Route path="/student" element={<Student/>}/>
          <Route path="/" element={<App/>}/>
          
        </Routes>
      </div>
    </Router>
  );
}
