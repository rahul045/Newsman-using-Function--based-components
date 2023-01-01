
import './App.css';
import React, { useState } from 'react'
import Navbar from './Components/Navbar';
import Newscomp from './Components/Newscomp';
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
const App = () => {
  const pagesize = 12;
  const [progress, setProgress] = useState(0)
  const apiKey = process.env.REACT_APP_NEWS_API;

  return (
    <>
      <Router>
        <div>
          <Navbar />
          <LoadingBar
            height={3}
            color='#f11946'
            progress={progress}

          />
          <Routes>
            <Route exact path='/' element={<Newscomp apiKey={apiKey} setProgress={setProgress} key="general" pagesize={pagesize} country="in" category="general" />} />
            <Route exact path='/business' element={<Newscomp apiKey={apiKey} setProgress={setProgress} key="business" pagesize={pagesize} country="in" category="business" />} />
            <Route exact path='/entertainment' element={<Newscomp apiKey={apiKey} setProgress={setProgress} key="entertainment" pagesize={pagesize} country="in" category="entertainment" />} />
            <Route exact path='/general' element={<Newscomp apiKey={apiKey} setProgress={setProgress} key="general" pagesize={pagesize} country="in" category="general" />} />
            <Route exact path='/health' element={<Newscomp apiKey={apiKey} setProgress={setProgress} key="health" pagesize={pagesize} country="in" category="health" />} />
            <Route exact path='/science' element={<Newscomp apiKey={apiKey} setProgress={setProgress} key="science" pagesize={pagesize} country="in" category="science" />} />
            <Route exact path='/sports' element={<Newscomp apiKey={apiKey} setProgress={setProgress} key="sports" pagesize={pagesize} country="in" category="sports" />} />
            <Route exact path='/technology' element={<Newscomp apiKey={apiKey} setProgress={setProgress} key="technology" pagesize={pagesize} country="in" category="technology" />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App;
